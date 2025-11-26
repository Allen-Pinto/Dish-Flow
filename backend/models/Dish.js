import mongoose from 'mongoose';

const dishSchema = new mongoose.Schema(
  {
    dishId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    dishName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      trim: true,
    },
    cuisine: {
      type: String,
      trim: true,
    },
    preparationTime: {
      type: Number, // in minutes
      min: 0,
    },
    servings: {
      type: Number,
      min: 1,
    },
    spiceLevel: {
      type: String,
      enum: ['none', 'mild', 'medium', 'hot', 'extra-hot'],
      default: 'mild',
    },
    isVegetarian: {
      type: Boolean,
      default: false,
    },
    isVegan: {
      type: Boolean,
      default: false,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    allergens: [{
      type: String,
      trim: true,
    }],
    ingredients: [{
      type: String,
      trim: true,
    }],
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
dishSchema.index({ dishId: 1 });
dishSchema.index({ isPublished: 1 });
dishSchema.index({ category: 1 });
dishSchema.index({ cuisine: 1 });
dishSchema.index({ price: 1 });
dishSchema.index({ createdAt: -1 });

// Text search index for dishName and description
dishSchema.index({ 
  dishName: 'text', 
  description: 'text' 
});

// Instance method to toggle published status
dishSchema.methods.togglePublished = async function() {
  this.isPublished = !this.isPublished;
  return await this.save();
};

const Dish = mongoose.model('Dish', dishSchema);

export default Dish;