$kind: collection
name: ecommerce api
description: |-
  # Ecommerce API

  A RESTful backend API for a full-featured e-commerce platform, built with Node.js and Express. This collection covers all core resources needed to run an online store, organized into five functional modules:

  ## 🔐 Users & Authentication
  Handles user registration, login, email confirmation, and JWT-based authentication. Includes profile management, password reset via email token, and admin-only endpoints for listing and managing user roles.

  **Base URL:** `http://localhost:7000/api/users`

  | Method | Endpoint | Auth | Description |
  |--------|----------|------|-------------|
  | POST | `/register` | Public | Register a new user |
  | POST | `/login` | Public | Login and receive JWT |
  | GET | `/profile` | JWT | Get authenticated user's profile |
  | GET | `/` | Admin | List all users |
  | GET | `/:id` | Admin | Get a single user by ID |
  | PUT | `/:id/role` | Admin | Update a user's role |
  | POST | `/reset` | Public | Request a password reset email |
  | PUT | `/reset/:token` | Public | Reset password using token |
  | GET | `/confirm/:token` | Public | Confirm email address |

  ---

  ## 📦 Products
  Full CRUD management for the store's product catalog. Public users can browse products; only admins can create, update, or delete them.

  **Base URL:** `http://localhost:7000/api/products`

  | Method | Endpoint | Auth | Description |
  |--------|----------|------|-------------|
  | GET | `/` | Public | List all products |
  | GET | `/:id` | Public | Get a single product |
  | POST | `/` | Admin | Add a new product |
  | PUT | `/:id` | Admin | Update a product |
  | DELETE | `/:id` | Admin | Delete a product |

  ---

  ## 🛒 Cart
  Allows authenticated users to manage a persistent shopping cart. Supports adding/removing items and a one-step checkout that converts the cart into an order.

  **Base URL:** `http://localhost:7000/api/cart`

  | Method | Endpoint | Auth | Description |
  |--------|----------|------|-------------|
  | POST | `/` | JWT | Add an item to the cart |
  | GET | `/` | JWT | View the current cart |
  | DELETE | `/:productId` | JWT | Remove a specific item |
  | DELETE | `/` | JWT | Clear the entire cart |
  | POST | `/checkout` | JWT | Convert cart to an order |

  ---

  ## 🧾 Orders
  Manages the full order lifecycle — from creation through payment confirmation to delivery. Admins have visibility into all orders across all users.

  **Base URL:** `http://localhost:7000/api/orders`

  | Method | Endpoint | Auth | Description |
  |--------|----------|------|-------------|
  | POST | `/` | JWT | Create a new order |
  | GET | `/user/orders` | JWT | Get the logged-in user's orders |
  | GET | `/:id` | JWT | Get an order by ID |
  | GET | `/` | JWT | Get all orders |
  | PUT | `/:id` (paid) | JWT | Mark an order as paid |
  | PUT | `/:id` (delivered) | Admin | Mark an order as delivered |

  ---

  ## 💳 Payments
  Integrates with **Paystack** to handle secure payment processing. Supports initiating a payment session and verifying transaction status after completion.

  **Base URL:** `http://localhost:7000/api/payment`

  | Method | Endpoint | Auth | Description |
  |--------|----------|------|-------------|
  | POST | `/initiate` | JWT | Initiate a Paystack payment |
  | POST | `/verify` | JWT | Verify a completed payment |

  ---

  > **Authentication:** Protected routes require a Bearer JWT token in the `Authorization` header. Admin routes additionally require the user to have the `isAdmin` flag set to `true`.
