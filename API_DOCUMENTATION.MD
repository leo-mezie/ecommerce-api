
const content = \`# Ecommerce API Documentation

Backend Standalone — Tech Crush Project

**Base URL:** \\\`http://localhost:7000\\\`

**Authentication:** Protected routes require a Bearer JWT token in the \\\`Authorization\\\` header.
Admin routes additionally require the user to have \\\`isAdmin: true\\\`.

\\\`\\\`\\\`
Authorization: Bearer <your_jwt_token>
\\\`\\\`\\\`

---

## Table of Contents

1. [Users & Authentication](#1-users--authentication)
2. [Products](#2-products)
3. [Cart](#3-cart)
4. [Orders](#4-orders)
5. [Payments](#5-payments)

---

## 1. Users & Authentication

Base path: \\\`/api/users\\\`

| Method | Endpoint | Auth | Description |
|--------|------------------|--------|-------------------------------|
| POST | \\\`/register\\\` | Public | Register a new user |
| POST | \\\`/login\\\` | Public | Login and receive a JWT |
| GET | \\\`/confirm/:token\\\` | Public | Confirm email address |
| POST | \\\`/reset\\\` | Public | Request a password reset email |
| PUT | \\\`/reset/:token\\\` | Public | Reset password using token |
| GET | \\\`/profile\\\` | JWT | Get authenticated user profile |
| GET | \\\`/\\\` | Admin | List all users |
| GET | \\\`/:id\\\` | Admin | Get a single user by ID |
| PUT | \\\`/:id/role\\\` | Admin | Update a user's admin role |

---

### POST \\\`/api/users/register\\\`

Registers a new user and sends a confirmation email.

**Request Body**

\\\`\\\`\\\`json
{
  \"name\": \"Jane Smith\",
  \"email\": \"jane@example.com\",
  \"password\": \"securepassword123\"
}
\\\`\\\`\\\`

**Response — \\\`201 Created\\\`**

\\\`\\\`\\\`json
{
  \"message\": \"Registration successful. Please check your email to confirm.\",
  \"user\": {
    \"_id\": \"6a6245d4e11b53fb9ed0f709\",
    \"name\": \"Jane Smith\",
    \"email\": \"jane@example.com\"
  }
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|--------------------------------|
| 400 | \\\`\"User already exists\"\\\` |
| 400 | \\\`\"Invalid user data\"\\\` |
| 500 | \\\`\"Registration failed\"\\\` |

---

### POST \\\`/api/users/login\\\`

Authenticates a user and returns a JWT token. The user must have confirmed their email before logging in.

**Request Body**

\\\`\\\`\\\`json
{
  \"email\": \"jane@example.com\",
  \"password\": \"securepassword123\"
}
\\\`\\\`\\\`

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"_id\": \"6a6245d4e11b53fb9ed0f709\",
  \"name\": \"Jane Smith\",
  \"email\": \"jane@example.com\",
  \"isAdmin\": false,
  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...\"
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|------------------------------------------------------|
| 401 | \\\`\"Invalid email or password\"\\\` |
| 403 | \\\`\"Please confirm your email before logging in.\"\\\` |

---

### GET \\\`/api/users/confirm/:token\\\`

Confirms a user's email address using the token sent during registration. Token expires after **1 hour**.

**URL Params**

| Param | Type | Description |
|-------|--------|-------------------------------|
| token | string | Email confirmation token |

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"message\": \"Email confirmed successfully. You can now log in.\"
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|------------------------------|
| 400 | \\\`\"Invalid or expired token\"\\\` |

---

### POST \\\`/api/users/reset\\\`

Sends a password reset link to the user's email. Token expires after **1 hour**.

**Request Body**

\\\`\\\`\\\`json
{
  \"email\": \"jane@example.com\"
}
\\\`\\\`\\\`

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"message\": \"Password reset email sent\"
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|----------------------|
| 404 | \\\`\"User not found\"\\\` |

---

### PUT \\\`/api/users/reset/:token\\\`

Resets the user's password using the token from the reset email.

**URL Params**

| Param | Type | Description |
|-------|--------|--------------------------|
| token | string | Password reset token |

**Request Body**

\\\`\\\`\\\`json
{
  \"password\": \"newSecurePassword456\"
}
\\\`\\\`\\\`

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"message\": \"Password reset successful\"
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|------------------------------|
| 400 | \\\`\"Invalid or expired token\"\\\` |

---

### GET \\\`/api/users/profile\\\`

Returns the profile of the currently authenticated user.

**Headers:** \\\`Authorization: Bearer <token>\\\`

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"_id\": \"6a6245d4e11b53fb9ed0f709\",
  \"name\": \"Jane Smith\",
  \"email\": \"jane@example.com\",
  \"isAdmin\": false,
  \"isConfirmed\": true
}
\\\`\\\`\\\`

---

### GET \\\`/api/users\\\`

Returns a list of all registered users. **Admin only.**

**Headers:** \\\`Authorization: Bearer <admin_token>\\\`

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"message\": \"Users retrieved successfully\",
  \"users\": [
    {
      \"_id\": \"6a6245d4e11b53fb9ed0f707\",
      \"name\": \"Admin\",
      \"email\": \"admin@example.com\",
      \"isAdmin\": true,
      \"isConfirmed\": true
    },
    {
      \"_id\": \"6a6245d4e11b53fb9ed0f709\",
      \"name\": \"Jane Smith\",
      \"email\": \"jane@example.com\",
      \"isAdmin\": false,
      \"isConfirmed\": true
    }
  ]
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|----------------------|
| 404 | \\\`\"No users found\"\\\` |

---

### GET \\\`/api/users/:id\\\`

Returns a single user by their ID. **Admin only.**

**Headers:** \\\`Authorization: Bearer <admin_token>\\\`

**URL Params**

| Param | Type | Description |
|-------|--------|-------------|
| id | string | User ID |

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"_id\": \"6a6245d4e11b53fb9ed0f709\",
  \"name\": \"Jane Smith\",
  \"email\": \"jane@example.com\",
  \"isAdmin\": false,
  \"isConfirmed\": true
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|----------------------|
| 404 | \\\`\"User not found\"\\\` |

---

### PUT \\\`/api/users/:id/role\\\`

Updates the \\\`isAdmin\\\` role of a user. **Admin only.**

**Headers:** \\\`Authorization: Bearer <admin_token>\\\`

**Request Body**

\\\`\\\`\\\`json
{
  \"isAdmin\": true
}
\\\`\\\`\\\`

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"message\": \"User role updated successfully\",
  \"user\": {
    \"_id\": \"6a6245d4e11b53fb9ed0f709\",
    \"name\": \"Jane Smith\",
    \"email\": \"jane@example.com\",
    \"isAdmin\": true,
    \"isConfirmed\": true
  }
}
\\\`\\\`\\\`

---

## 2. Products

Base path: \\\`/api/products\\\`

| Method | Endpoint | Auth | Description |
|--------|----------|--------|---------------------------|
| GET | \\\`/\\\` | Public | Get all products |
| GET | \\\`/:id\\\` | Public | Get a single product |
| POST | \\\`/\\\` | Admin | Add a new product |
| PUT | \\\`/:id\\\` | Admin | Update a product |
| DELETE | \\\`/:id\\\` | Admin | Delete a product |

---

### GET \\\`/api/products\\\`

Returns a list of all products in the store.

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
[
  {
    \"_id\": \"6a63a1d17f05b6ba56a2be2f\",
    \"name\": \"Wireless Mouse\",
    \"description\": \"Ergonomic wireless mouse with long battery life.\",
    \"price\": 50,
    \"image\": \"/images/mouse.png\",
    \"stock\": 100,
    \"__v\": 0
  },
  {
    \"_id\": \"6a63a1d17f05b6ba56a2be31\",
    \"name\": \"Mechanical Keyboard\",
    \"description\": \"RGB mechanical keyboard with tactile switches.\",
    \"price\": 120,
    \"image\": \"/images/keyboard.png\",
    \"stock\": 45,
    \"__v\": 0
  }
]
\\\`\\\`\\\`

---

### GET \\\`/api/products/:id\\\`

Returns a single product by ID.

**URL Params**

| Param | Type | Description |
|-------|--------|--------------|
| id | string | Product ID |

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"_id\": \"6a63a1d17f05b6ba56a2be2f\",
  \"name\": \"Wireless Mouse\",
  \"description\": \"Ergonomic wireless mouse with long battery life.\",
  \"price\": 50,
  \"image\": \"/images/mouse.png\",
  \"stock\": 100,
  \"__v\": 0
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|--------------------------|
| 404 | \\\`\"Product not found\"\\\` |

---

### POST \\\`/api/products\\\`

Creates a new product. **Admin only.**

**Headers:** \\\`Authorization: Bearer <admin_token>\\\`

**Request Body**

\\\`\\\`\\\`json
{
  \"name\": \"USB-C Hub\",
  \"description\": \"7-in-1 USB-C hub with HDMI and Ethernet.\",
  \"price\": 75,
  \"image\": \"/images/hub.png\",
  \"stock\": 60
}
\\\`\\\`\\\`

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"_id\": \"6a63a1d17f05b6ba56a2be40\",
  \"name\": \"USB-C Hub\",
  \"description\": \"7-in-1 USB-C hub with HDMI and Ethernet.\",
  \"price\": 75,
  \"image\": \"/images/hub.png\",
  \"stock\": 60,
  \"__v\": 0
}
\\\`\\\`\\\`

---

### PUT \\\`/api/products/:id\\\`

Updates an existing product by ID. **Admin only.**

**Headers:** \\\`Authorization: Bearer <admin_token>\\\`

**Request Body** *(any updatable field)*

\\\`\\\`\\\`json
{
  \"price\": 65,
  \"stock\": 55
}
\\\`\\\`\\\`

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"_id\": \"6a63a1d17f05b6ba56a2be40\",
  \"name\": \"USB-C Hub\",
  \"description\": \"7-in-1 USB-C hub with HDMI and Ethernet.\",
  \"price\": 65,
  \"image\": \"/images/hub.png\",
  \"stock\": 55,
  \"__v\": 0
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|--------------------------|
| 404 | \\\`\"Product not found\"\\\` |

---

### DELETE \\\`/api/products/:id\\\`

Deletes a product by ID. **Admin only.**

**Headers:** \\\`Authorization: Bearer <admin_token>\\\`

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"message\": \"Deleted\"
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|--------------------------|
| 404 | \\\`\"Product not found\"\\\` |

---

## 3. Cart

Base path: \\\`/api/cart\\\`

All cart endpoints require a valid JWT token.

| Method | Endpoint | Auth | Description |
|--------|----------------|------|-------------------------------|
| POST | \\\`/\\\` | JWT | Add an item to the cart |
| GET | \\\`/\\\` | JWT | Get the current user's cart |
| DELETE | \\\`/:productId\\\` | JWT | Remove an item from the cart |
| DELETE | \\\`/\\\` | JWT | Clear the entire cart |
| POST | \\\`/checkout\\\` | JWT | Convert cart to an order |

---

### POST \\\`/api/cart\\\`

Adds a product to the authenticated user's cart. If the product already exists in the cart, its quantity is incremented.

**Headers:** \\\`Authorization: Bearer <token>\\\`

**Request Body**

\\\`\\\`\\\`json
{
  \"product\": \"6a63a1d17f05b6ba56a2be2f\",
  \"name\": \"Wireless Mouse\",
  \"qty\": 2,
  \"price\": 50,
  \"image\": \"/images/mouse.png\"
}
\\\`\\\`\\\`

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"_id\": \"6a64b2e09f12c7cd45b3cf10\",
  \"user\": \"6a6245d4e11b53fb9ed0f709\",
  \"cartItems\": [
    {
      \"product\": \"6a63a1d17f05b6ba56a2be2f\",
      \"name\": \"Wireless Mouse\",
      \"qty\": 2,
      \"price\": 50,
      \"image\": \"/images/mouse.png\",
      \"_id\": \"6a64b2e09f12c7cd45b3cf11\"
    }
  ],
  \"totalPrice\": 100,
  \"status\": \"Active\",
  \"createdAt\": \"2026-07-24T18:00:00.000Z\",
  \"updatedAt\": \"2026-07-24T18:00:00.000Z\"
}
\\\`\\\`\\\`

---

### GET \\\`/api/cart\\\`

Returns the cart of the authenticated user, with product details populated.

**Headers:** \\\`Authorization: Bearer <token>\\\`

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"_id\": \"6a64b2e09f12c7cd45b3cf10\",
  \"user\": \"6a6245d4e11b53fb9ed0f709\",
  \"cartItems\": [
    {
      \"product\": {
        \"_id\": \"6a63a1d17f05b6ba56a2be2f\",
        \"name\": \"Wireless Mouse\",
        \"price\": 50,
        \"image\": \"/images/mouse.png\",
        \"stock\": 100
      },
      \"name\": \"Wireless Mouse\",
      \"qty\": 2,
      \"price\": 50,
      \"_id\": \"6a64b2e09f12c7cd45b3cf11\"
    }
  ],
  \"totalPrice\": 100,
  \"status\": \"Active\"
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|----------------------|
| 404 | \\\`\"Cart not found\"\\\` |

---

### DELETE \\\`/api/cart/:productId\\\`

Removes a specific product from the cart and recalculates the total.

**Headers:** \\\`Authorization: Bearer <token>\\\`

**URL Params**

| Param | Type | Description |
|-----------|--------|--------------------------------|
| productId | string | ID of the product to remove |

**Response — \\\`200 OK\\\`**

Returns the updated cart object (same shape as \\\`GET /api/cart\\\`).

---

### DELETE \\\`/api/cart\\\`

Clears all items from the cart and sets its status to \\\`\"Abandoned\"\\\`.

**Headers:** \\\`Authorization: Bearer <token>\\\`

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"_id\": \"6a64b2e09f12c7cd45b3cf10\",
  \"user\": \"6a6245d4e11b53fb9ed0f709\",
  \"cartItems\": [],
  \"totalPrice\": 0,
  \"status\": \"Abandoned\"
}
\\\`\\\`\\\`

---

### POST \\\`/api/cart/checkout\\\`

Converts the user's current cart into an order. The cart status is set to \\\`\"Converted\"\\\` after a successful checkout.

**Headers:** \\\`Authorization: Bearer <token>\\\`

**Request Body**

\\\`\\\`\\\`json
{
  \"shippingAddress\": {
    \"address\": \"123 Main Street\",
    \"city\": \"Onitsha\",
    \"postalCode\": \"430001\",
    \"country\": \"Nigeria\"
  },
  \"paymentMethod\": \"Paystack\"
}
\\\`\\\`\\\`

**Response — \\\`201 Created\\\`**

\\\`\\\`\\\`json
{
  \"_id\": \"6a63a1d17f05b6ba56a2be32\",
  \"user\": \"6a6245d4e11b53fb9ed0f709\",
  \"orderItems\": [
    {
      \"name\": \"Wireless Mouse\",
      \"qty\": 2,
      \"price\": 50,
      \"image\": \"/images/mouse.png\",
      \"product\": \"6a63a1d17f05b6ba56a2be2f\",
      \"_id\": \"6a63a1d17f05b6ba56a2be33\"
    }
  ],
  \"shippingAddress\": {
    \"address\": \"123 Main Street\",
    \"city\": \"Onitsha\",
    \"postalCode\": \"430001\",
    \"country\": \"Nigeria\"
  },
  \"paymentMethod\": \"Paystack\",
  \"totalPrice\": 100,
  \"isPaid\": false,
  \"isDelivered\": false,
  \"status\": \"Pending\",
  \"createdAt\": \"2026-07-24T18:05:00.000Z\",
  \"updatedAt\": \"2026-07-24T18:05:00.000Z\"
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|----------------------|
| 400 | \\\`\"Cart is empty\"\\\` |

---

## 4. Orders

Base path: \\\`/api/orders\\\`

| Method | Endpoint | Auth | Description |
|--------|----------------|-------|-------------------------------|
| POST | \\\`/\\\` | JWT | Create a new order |
| GET | \\\`/user/orders\\\` | JWT | Get current user's orders |
| GET | \\\`/:id\\\` | JWT | Get an order by ID |
| GET | \\\`/\\\` | JWT | Get all orders |
| PUT | \\\`/:id\\\` | JWT | Mark an order as paid |
| PUT | \\\`/:id\\\` | Admin | Mark an order as delivered |

---

### POST \\\`/api/orders\\\`

Creates a new order directly (without going through the cart).

**Headers:** \\\`Authorization: Bearer <token>\\\`

**Request Body**

\\\`\\\`\\\`json
{
  \"orderItems\": [
    {
      \"name\": \"Wireless Mouse\",
      \"qty\": 1,
      \"image\": \"/images/mouse.png\",
      \"price\": 50,
      \"product\": \"6a63a1d17f05b6ba56a2be2f\"
    }
  ],
  \"shippingAddress\": {
    \"address\": \"456 Market Road\",
    \"city\": \"Awka\",
    \"postalCode\": \"420001\",
    \"country\": \"Nigeria\"
  },
  \"paymentMethod\": \"Paystack\",
  \"totalPrice\": 50
}
\\\`\\\`\\\`

**Response — \\\`201 Created\\\`**

\\\`\\\`\\\`json
{
  \"_id\": \"6a63a1d17f05b6ba56a2be34\",
  \"user\": \"6a6245d4e11b53fb9ed0f709\",
  \"orderItems\": [
    {
      \"name\": \"Wireless Mouse\",
      \"qty\": 1,
      \"image\": \"/images/mouse.png\",
      \"price\": 50,
      \"product\": \"6a63a1d17f05b6ba56a2be2f\",
      \"_id\": \"6a63a1d17f05b6ba56a2be35\"
    }
  ],
  \"shippingAddress\": {
    \"address\": \"456 Market Road\",
    \"city\": \"Awka\",
    \"postalCode\": \"420001\",
    \"country\": \"Nigeria\"
  },
  \"paymentMethod\": \"Paystack\",
  \"totalPrice\": 50,
  \"isPaid\": false,
  \"isDelivered\": false,
  \"status\": \"Pending\",
  \"createdAt\": \"2026-07-24T18:10:00.000Z\",
  \"updatedAt\": \"2026-07-24T18:10:00.000Z\"
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|----------------------|
| 400 | \\\`\"No order items\"\\\` |

---

### GET \\\`/api/orders/user/orders\\\`

Returns all orders placed by the currently authenticated user.

**Headers:** \\\`Authorization: Bearer <token>\\\`

**Response — \\\`200 OK\\\`**

Returns an array of order objects (same shape as the create order response).

---

### GET \\\`/api/orders/:id\\\`

Returns a single order by ID. The \\\`user\\\` field is populated with their name and email.

**Headers:** \\\`Authorization: Bearer <token>\\\`

**URL Params**

| Param | Type | Description |
|-------|--------|--------------|
| id | string | Order ID |

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"_id\": \"6a63a1d17f05b6ba56a2be34\",
  \"user\": {
    \"_id\": \"6a6245d4e11b53fb9ed0f709\",
    \"name\": \"Jane Smith\",
    \"email\": \"jane@example.com\"
  },
  \"orderItems\": [
    {
      \"name\": \"Wireless Mouse\",
      \"qty\": 1,
      \"price\": 50,
      \"image\": \"/images/mouse.png\",
      \"product\": \"6a63a1d17f05b6ba56a2be2f\"
    }
  ],
  \"shippingAddress\": {
    \"address\": \"456 Market Road\",
    \"city\": \"Awka\",
    \"postalCode\": \"420001\",
    \"country\": \"Nigeria\"
  },
  \"paymentMethod\": \"Paystack\",
  \"totalPrice\": 50,
  \"isPaid\": false,
  \"isDelivered\": false,
  \"status\": \"Pending\"
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|----------------------|
| 404 | \\\`\"Order not found\"\\\` |

---

### GET \\\`/api/orders\\\`

Returns all orders across all users. Each order's \\\`user\\\` field is populated with \\\`id\\\`, \\\`name\\\`, and \\\`email\\\`.

**Headers:** \\\`Authorization: Bearer <token>\\\`

**Response — \\\`200 OK\\\`**

Returns an array of all order objects.

---

### PUT \\\`/api/orders/:id\\\` — Mark as Paid

Updates an order's payment status to \\\`isPaid: true\\\` and status to \\\`\"Paid\"\\\`. Records the payment result from the gateway.

**Headers:** \\\`Authorization: Bearer <token>\\\`

**Request Body**

\\\`\\\`\\\`json
{
  \"id\": \"paystack_transaction_id\",
  \"status\": \"success\",
  \"update_time\": \"2026-07-24T18:30:00.000Z\",
  \"email_address\": \"jane@example.com\"
}
\\\`\\\`\\\`

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"_id\": \"6a63a1d17f05b6ba56a2be34\",
  \"isPaid\": true,
  \"paidAt\": \"2026-07-24T18:30:00.000Z\",
  \"status\": \"Paid\",
  \"paymentResult\": {
    \"id\": \"paystack_transaction_id\",
    \"status\": \"success\",
    \"update_time\": \"2026-07-24T18:30:00.000Z\",
    \"email_address\": \"jane@example.com\"
  }
}
\\\`\\\`\\\`

---

### PUT \\\`/api/orders/:id\\\` — Mark as Delivered

Marks an order as delivered. **Admin only.**

**Headers:** \\\`Authorization: Bearer <admin_token>\\\`

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"_id\": \"6a63a1d17f05b6ba56a2be34\",
  \"isDelivered\": true,
  \"deliveredAt\": \"2026-07-25T10:00:00.000Z\",
  \"status\": \"Delivered\"
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|----------------------|
| 404 | \\\`\"Order not found\"\\\` |

---

## 5. Payments

Base path: \\\`/api/payment\\\`

Integrates with **Paystack** for payment processing. All endpoints require authentication.

| Method | Endpoint | Auth | Description |
|--------|-----------|------|-------------------------------|
| POST | \\\`/initiate\\\` | JWT | Initiate a Paystack payment |
| POST | \\\`/verify\\\` | JWT | Verify a completed payment |

---

### POST \\\`/api/payment/initiate\\\`

Initiates a Paystack payment transaction. Returns an \\\`authorizationUrl\\\` to redirect the user to for payment.

> **Note:** The \\\`amount\\\` is in **Naira (NGN)**. It is automatically converted to kobo (×100) before being sent to Paystack.

**Headers:** \\\`Authorization: Bearer <token>\\\`

**Request Body**

\\\`\\\`\\\`json
{
  \"email\": \"jane@example.com\",
  \"amount\": 50,
  \"orderId\": \"6a63a1d17f05b6ba56a2be34\"
}
\\\`\\\`\\\`

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"authorizationUrl\": \"https://checkout.paystack.com/0peioxfhpn\"
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|-------------------------------|
| 500 | \\\`\"Payment initiation failed\"\\\` |

---

### POST \\\`/api/payment/verify\\\`

Verifies a Paystack transaction using its reference. On success, updates the linked order's status to \\\`\"Paid\"\\\` and saves a payment record.

**Headers:** \\\`Authorization: Bearer <token>\\\`

**Request Body**

\\\`\\\`\\\`json
{
  \"reference\": \"pstk_ref_abc123xyz\",
  \"orderId\": \"6a63a1d17f05b6ba56a2be34\"
}
\\\`\\\`\\\`

**Response — \\\`200 OK\\\`**

\\\`\\\`\\\`json
{
  \"message\": \"Payment successful\",
  \"order\": {
    \"_id\": \"6a63a1d17f05b6ba56a2be34\",
    \"isPaid\": true,
    \"status\": \"Paid\",
    \"paymentResult\": {}
  }
}
\\\`\\\`\\\`

**Error Responses**

| Status | Message |
|--------|--------------------------------|
| 400 | \\\`\"Payment not successful\"\\\` |
| 500 | \\\`\"Payment verification failed\"\\\` |

---

## Error Response Format

All error responses follow this structure:

\\\`\\\`\\\`json
{
  \"message\": \"A human-readable error description\",
  \"error\": \"Optional technical detail\"
}
\\\`\\\`\\\`

## Order Status Flow

\\\`\\\`\\\`
Pending → Paid → Shipped → Delivered
                          └── Cancelled (at any stage)
\\\`\\\`\\\`

## Cart Status Flow

\\\`\\\`\\\`
Active → Converted  (after successful checkout)
       → Abandoned  (after cart is manually cleared)
\\\`\\\`\\\`
\`;
"
