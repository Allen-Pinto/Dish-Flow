import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Dish from '../models/Dish.js';
import connectDB from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Read dishes from JSON file
    const dishesPath = path.join(__dirname, '../data/dishes.json');
    const dishesData = JSON.parse(fs.readFileSync(dishesPath, 'utf-8'));

    console.log(`Found ${dishesData.length} dishes to seed`);

    // Clear existing dishes
    const deleteResult = await Dish.deleteMany();
    console.log(`Deleted ${deleteResult.deletedCount} existing dishes`);

    // Insert new dishes
    const insertedDishes = await Dish.insertMany(dishesData);
    console.log(`Successfully inserted ${insertedDishes.length} dishes`);

    // Display summary
    const publishedCount = insertedDishes.filter((d) => d.isPublished).length;
    const unpublishedCount = insertedDishes.filter((d) => !d.isPublished).length;
    const vegetarianCount = insertedDishes.filter((d) => d.isVegetarian).length;
    const veganCount = insertedDishes.filter((d) => d.isVegan).length;

    console.log('\nSeed Summary:');
    console.log(`   Total: ${insertedDishes.length}`);
    console.log(`   Published: ${publishedCount}`);
    console.log(`   Unpublished: ${unpublishedCount}`);
    console.log(`   Vegetarian: ${vegetarianCount}`);
    console.log(`   Vegan: ${veganCount}`);

    process.exit(0);
  } catch (error) {
    console.error('Seed Error:', error);
    process.exit(1);
  }
};

seedDatabase();