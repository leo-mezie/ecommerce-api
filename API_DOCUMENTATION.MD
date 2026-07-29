Ecommerce api Documentation
Backend Standalone tech crush Project


Base URL:* http://localhost:7000


## Get All users

Retrieves a list of all products available in the e-commerce store.

### Request

- **Method:** GET
- **URL:** `http://localhost:7000/api/users/`
- **Auth:** None
- **Query Parameters:** None
- **Request Body:** None

### Response

Returns a JSON array of users objects.

**Status:** `200 OK`

```json
{
  "message": "Users retrieved successfully",
  "users": [
    {
      "_id": "6a6245d4e11b53fb9ed0f707",
      "name": "Admin",
      "email": "chimezieokwuosah@gmail.com",
      "isAdmin": true,
      "isConfirmed": true,
      "__v": 0
    },
    {
      "_id": "6a6245d4e11b53fb9ed0f708",
      "name": "John Doe",
      "email": "john@example.com",
      "isConfirmed": false,
      "__v": 0,
      "isAdmin": true
    },
    {
      "_id": "6a6245d4e11b53fb9ed0f709",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "isAdmin": false,
      "isConfirmed": false,
      "__v": 0
    }
  ]
}
```
    ## Get a Single user
   *Method:* GET
   *URL Path:* /users/:id (Example: /users/1)
   *Success Response (200 OK):* Returns the details of that single user.
   *Error Response (404 Not Found):* Happens if the user ID does not exist.

## Get All order

Retrieves a list of all order available in the e-commerce store.

### Request

- **Method:** GET
- **URL:** `http://localhost:7000/api/orders`
- **Auth:** None
- **Query Parameters:** None
- **Request Body:** None

### Response

Returns a JSON array of order objects.

**Status:** `200 OK`

```json
[
  {
    "shippingAddress": {
      "address": "123 Main Street",
      "city": "Onitsha",
      "postalCode": "430001",
      "country": "Nigeria"
    },
    "_id": "6a63a1d17f05b6ba56a2be32",
    "user": null,
    "orderItems": [
      {
        "name": "Wireless Mouse",
        "qty": 2,
        "image": "/images/mouse.png",
        "price": 50,
        "product": "6a63a1d17f05b6ba56a2be2f",
        "_id": "6a63a1d17f05b6ba56a2be33"
      }
    ],
    "paymentMethod": "Paystack",
    "totalPrice": 100,
    "isPaid": false,
    "isDelivered": false,
    "status": "Pending",
    "__v": 0,
    "createdAt": "2026-07-24T17:33:05.897Z",
    "updatedAt": "2026-07-24T17:33:05.897Z"
  },
  {
    "shippingAddress": {
      "address": "456 Market Road",
      "city": "Awka",
      "postalCode": "420001",
      "country": "Nigeria"
    },
    "_id": "6a63a1d17f05b6ba56a2be34",
    "user": null,
    "orderItems": [
      {
        "name": "Mechanical Keyboard",
        "qty": 1,
        "image": "/images/keyboard.png",
        "price": 120,
        "product": "6a63a1d17f05b6ba56a2be31",
        "_id": "6a63a1d17f05b6ba56a2be35"
      }
    ],
    "paymentMethod": "Paystack",
    "totalPrice": 120,
    "isPaid": false,
    "isDelivered": false,
    "status": "Pending",
    "__v": 0,
    "createdAt": "2026-07-24T17:33:05.899Z",
    "updatedAt": "2026-07-24T17:33:05.899Z"
  }
]

## Get All Products

Retrieves a list of all products available in the e-commerce store.

### Request

- **Method:** GET
- **URL:** `http://localhost:7000/api/products/`
- **Auth:** None
- **Query Parameters:** None
- **Request Body:** None

### Response

Returns a JSON array of product objects.

**Status:** `200 OK`

```json
[
  {
    "_id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "image": "string (URL)",
    "stock": "number",
    "__v": "number"
  }
]
```
