import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import User from './models/userModels.js';
import Product from './models/productModels.js';
import bcrypt from 'bcrypt';

dotenv.config();
connectDB();

const seedData = async () => {
  try {
    // Clear existing data 
    // await User.deleteMany();
    // await Product.deleteMany();

    // Create Admin User
    const adminUser = new User({
      name: "Admin",
      email: "chimezieokwuosah@gmail.com",
      password: "Admin123", // will be hashed automatically
      isAdmin: true
    });

    await adminUser.save();

    // Create Sample Users
    const users = [
      { name: "John Doe", email: "john@example.com", password: "123456" },
      { name: "Jane Smith", email: "jane@example.com", password: "123456" }
    ];

    await User.insertMany(users);

    // Create Sample Products
    const products = [
      {
        name: "Wireless Headphones",
        description: "High-quality Bluetooth headphones",
        price: 150,
        image: "https://via.placeholder.com/150",
        stock: 20
      },
      {
        name: "Smartphone",
        description: "Latest model with advanced features",
        price: 800,
        image: "https://via.placeholder.com/150",
        stock: 15
      },
      {
        name: "Gaming Laptop",
        description: "Powerful laptop for gaming and work",
        price: 1200,
        image: "https://via.placeholder.com/150",
        stock: 10
      }
    ];

    await Product.insertMany(products);

    console.log("✅ Admin, users, and products seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();