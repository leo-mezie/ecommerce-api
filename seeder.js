// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import connectDB from './config/db.js';
// import User from './models/userModels.js';
// import Product from './models/productModels.js';
// import Order from './models/orderModels.js';
// import Payment from './models/paymentModel.js';
// import bcrypt from 'bcrypt';

// dotenv.config();
// connectDB();

// const seedData = async () => {
  // try {
    // Clear existing data 
  //   await User.deleteMany();
  // //   await Product.deleteMany();
  // await order.deleteMany();
  // await payments.deleteMany();
  
  //   // Create Admin User
  //   const adminUser = new User({
  //     name: "Admin",
  //     email: "chimezieokwuosah@gmail.com",
  //     password: "Admin123", 
          // isConfirmed: "true",
  //     isAdmin: true;
  //   });

  //   await adminUser.save();

  //   // Create Sample Users
  //   const users = [
  //     { name: "John Doe", email: "john@example.com", password: "123456" },
  //     { name: "Jane Smith", email: "jane@example.com", password: "123456" }
  //   ];

  //   await User.insertMany(users);

  //   // Create Sample Products
  //   const products = [
  //     {
  //       name: "Wireless Headphones",
  //       description: "High-quality Bluetooth headphones",
  //       price: 150,
  //       image: "https://via.placeholder.com/150",
  //       stock: 20
  //     },
  //     {
  //       name: "Smartphone",
  //       description: "Latest model with advanced features",
  //       price: 800,
  //       image: "https://via.placeholder.com/150",
  //       stock: 15
  //     },
  //     {
  //       name: "Gaming Laptop",
  //       description: "Powerful laptop for gaming and work",
  //       price: 1200,
  //       image: "https://via.placeholder.com/150",
  //       stock: 10
  //     }
  //   ];

  //   await Product.insertMany(products);

  //   console.log("✅ Admin, users, and products seeded successfully!");
  //   process.exit();
  // } catch (error) {
  //   console.error("❌ Error seeding data:", error);
  //   process.exit(1);
  // }

 
// };

// seedData();
// seed.js
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import Order from "./models/orderModels.js";
// import Payment from "./models/paymentModel.js";

// dotenv.config();

// async function seed() {
//   try {
//     await mongoose.connect(process.env.DB_URI);

//     // Clear existing data
//     await Order.deleteMany({});
//     await Payment.deleteMany({});

//     // Create sample orders
//     const orders = await Order.insertMany([
//       {
//         user: new mongoose.Types.ObjectId(), // replace with real user ID if available
//         orderItems: [
//           {
//             name: "Wireless Mouse",
//             qty: 2,
//             price: 50,
//             image: "/images/mouse.png",
//             product: new mongoose.Types.ObjectId(), // replace with real product ID
//           },
//         ],
//         shippingAddress: {
//           address: "123 Main Street",
//           city: "Onitsha",
//           postalCode: "430001",
//           country: "Nigeria",
//         },
//         paymentMethod: "Paystack",
//         totalPrice: 100,
//         status: "Pending",
//       },
//       {
//         user: new mongoose.Types.ObjectId(),
//         orderItems: [
//           {
//             name: "Mechanical Keyboard",
//             qty: 1,
//             price: 120,
//             image: "/images/keyboard.png",
//             product: new mongoose.Types.ObjectId(),
//           },
//         ],
//         shippingAddress: {
//           address: "456 Market Road",
//           city: "Awka",
//           postalCode: "420001",
//           country: "Nigeria",
//         },
//         paymentMethod: "Paystack",
//         totalPrice: 120,
//         status: "Pending",
//       },
//     ]);

//     // Create sample payments linked to orders
//     const payments = await Payment.insertMany([
//       {
//         orderId: orders[0]._id,
//         reference: "ref_mouse123",
//         amount: 100,
//         currency: "NGN",
//         email: "customer1@example.com",
//         status: "success",
//         transactionId: "txn_mouse001",
//         channel: "card",
//         paidAt: new Date(),
//         paymentResult: {
//           gateway: "Paystack",
//           raw: { message: "Sample Paystack response for mouse order" },
//         },
//       },
//       {
//         orderId: orders[1]._id,
//         reference: "ref_keyboard456",
//         amount: 120,
//         currency: "NGN",
//         email: "customer2@example.com",
//         status: "success",
//         transactionId: "txn_keyboard002",
//         channel: "bank",
//         paidAt: new Date(),
//         paymentResult: {
//           gateway: "Paystack",
//           raw: { message: "Sample Paystack response for keyboard order" },
//         },
//       },
//     ]);

//     console.log("✅ Seeded advanced orders and payments successfully");
//     mongoose.connection.close();
//   } catch (err) {
//     console.error("❌ Seeding failed:", err);
//     mongoose.connection.close();
//   }
// }

// seed();



