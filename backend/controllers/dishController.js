import Dish from '../models/Dish.js';

// @desc    Get all dishes with filters and sorting
// @route   GET /api/dishes
// @access  Public
export const getAllDishes = async (req, res, next) => {
  try {
    const {
      category,
      cuisine,
      isPublished,
      isVegetarian,
      isVegan,
      minPrice,
      maxPrice,
      spiceLevel,
      search,
      sortBy = 'newest',
      page = 1,
      limit = 50,
    } = req.query;

    // Build query
    const query = {};

    // String filters
    if (category && category !== 'all') query.category = category;
    if (cuisine && cuisine !== 'all') query.cuisine = cuisine;
    if (spiceLevel && spiceLevel !== 'all') query.spiceLevel = spiceLevel;

    // Boolean filters
    if (isPublished !== undefined && isPublished !== '') {
      query.isPublished = isPublished === 'true';
    }
    if (isVegetarian !== undefined && isVegetarian !== '') {
      query.isVegetarian = isVegetarian === 'true';
    }
    if (isVegan !== undefined && isVegan !== '') {
      query.isVegan = isVegan === 'true';
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Search filter - using regex for partial matches
    if (search && search.trim() !== '') {
      query.$or = [
        { dishName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Sort options
    let sort = {};
    switch (sortBy) {
      case 'name':
        sort = { dishName: 1 };
        break;
      case 'name-desc':
        sort = { dishName: -1 };
        break;
      case 'price':
        sort = { price: 1 };
        break;
      case 'price-desc':
        sort = { price: -1 };
        break;
      case 'oldest':
        sort = { createdAt: 1 };
        break;
      case 'newest':
      default:
        sort = { createdAt: -1 };
        break;
    }

    // Pagination
    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10))); // Cap at 100
    const skip = (pageNum - 1) * limitNum;

    // Execute query
    const dishes = await Dish.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean(); // Use lean for better performance

    const total = await Dish.countDocuments(query);

    res.status(200).json({
      success: true,
      count: dishes.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: dishes,
    });
  } catch (error) {
    console.error('Get all dishes error:', error);
    next(error);
  }
};

// @desc    Get single dish by dishId
// @route   GET /api/dishes/:dishId
// @access  Public
export const getDishById = async (req, res, next) => {
  try {
    const { dishId } = req.params;
    const dish = await Dish.findOne({ dishId });

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: 'Dish not found',
      });
    }

    res.status(200).json({
      success: true,
      data: dish,
    });
  } catch (error) {
    console.error('Get dish by ID error:', error);
    next(error);
  }
};

// @desc    Toggle dish published status
// @route   PATCH /api/dishes/:dishId/toggle
// @access  Public
export const toggleDishStatus = async (req, res, next) => {
  try {
    const { dishId } = req.params;
    const dish = await Dish.findOne({ dishId });

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: 'Dish not found',
      });
    }

    // Use the instance method to toggle and save
    const updatedDish = await dish.togglePublished();

    res.status(200).json({
      success: true,
      message: `Dish ${updatedDish.isPublished ? 'published' : 'unpublished'} successfully`,
      data: updatedDish,
    });
  } catch (error) {
    console.error('Toggle dish status error:', error);
    next(error);
  }
};

// @desc    Get dish statistics
// @route   GET /api/dishes/stats/summary
// @access  Public
export const getDishStats = async (req, res, next) => {
  try {
    const total = await Dish.countDocuments();
    const published = await Dish.countDocuments({ isPublished: true });
    const unpublished = await Dish.countDocuments({ isPublished: false });
    const vegetarian = await Dish.countDocuments({ isVegetarian: true });
    const vegan = await Dish.countDocuments({ isVegan: true });

    // Category breakdown
    const categoryStats = await Dish.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          published: { $sum: { $cond: ['$isPublished', 1, 0] } },
          avgPrice: { $avg: '$price' },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Cuisine breakdown
    const cuisineStats = await Dish.aggregate([
      {
        $group: {
          _id: '$cuisine',
          count: { $sum: 1 },
          published: { $sum: { $cond: ['$isPublished', 1, 0] } },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Price statistics
    const priceStats = await Dish.aggregate([
      {
        $group: {
          _id: null,
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total,
        published,
        unpublished,
        vegetarian,
        vegan,
        categories: categoryStats,
        cuisines: cuisineStats,
        priceStats: priceStats[0] || { avgPrice: 0, minPrice: 0, maxPrice: 0 },
      },
    });
  } catch (error) {
    console.error('Get dish stats error:', error);
    next(error);
  }
};

// @desc    Bulk update dishes
// @route   PATCH /api/dishes/bulk/update
// @access  Public
export const bulkUpdateDishes = async (req, res, next) => {
  try {
    const { dishIds, action } = req.body;

    if (!dishIds || !Array.isArray(dishIds) || dishIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of dish IDs',
      });
    }

    let update = {};
    let message = '';
    
    if (action === 'publish') {
      update = { isPublished: true };
      message = 'published';
    } else if (action === 'unpublish') {
      update = { isPublished: false };
      message = 'unpublished';
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid action. Use "publish" or "unpublish"',
      });
    }

    const result = await Dish.updateMany(
      { dishId: { $in: dishIds } },
      { $set: update }
    );

    res.status(200).json({
      success: true,
      message: `${result.modifiedCount} dishes ${message} successfully`,
      data: {
        matchedCount: result.matchedCount,
        modifiedCount: result.modifiedCount,
      },
    });
  } catch (error) {
    console.error('Bulk update dishes error:', error);
    next(error);
  }
};