# Grocery Store API

This is a RESTful API for managing a grocery store, built with NestJS and TypeORM. The API allows users to view and book grocery items, and administrators to manage grocery items and inventory levels.

## Table of Contents

- [Grocery Store API](#grocery-store-api)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
  - [API Documentation](#api-documentation)
    - [Endpoints](#endpoints)
    - [Auth Endpoints](#auth-endpoints)
      - [Admin Endpoints](#admin-endpoints)
    - [User Endpoints](#user-endpoints)

## Features

- User authentication with JWT
- Admin and user roles
- CRUD operations for grocery items
- Inventory management
- Order management
- Swagger API documentation

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/grocery-store.git
   cd grocery-store

2. Install dependencies:

## Configuration
1. Create a .env file in the root of the project and add the following environment variables:
  PORT=3000
  JWT_SECRET_KEY=yourSecretKey
  DATABASE_HOST=localhost
  DATABASE_PORT=3306
  DATABASE_USERNAME=root
  DATABASE_PASSWORD=
  DATABASE_NAME=grocery_store
Update the database configuration in app.module.ts if necessary.

## Running the Application

   1. Start the application:
      npm run start
   2. The application will be running at http://localhost:3000.
   3. 

## API Documentation
The API documentation is available at http://localhost:3000/api after starting the application. The documentation is generated using Swagger and provides details about all available endpoints, request parameters, and responses.

### Endpoints
Auth Endpoints
POST /auth/login: User login
### Auth Endpoints
Request: { "email": "user@example.com", "password": "password123" }
Response: { "token": "jwt-token" }
POST /auth/signUp: User sign up

Request: { "email": "user@example.com", "password": "password123", "isadmin": false }
Response: { "message": "User registered successfully" }
#### Admin Endpoints
POST /admin/grocery: Add a grocery item (Admin only)

Request: { "name": "Apple", "price": 1.99, "quantity": 100 }
Response: { "id": 1, "name": "Apple", "price": 1.99, "quantity": 100 }
GET /admin/grocery: Get all grocery items (Admin only)

Response: [ { "id": 1, "name": "Apple", "price": 1.99, "quantity": 100 } ]
PUT /admin/grocery/:id: Update a grocery item (Admin only)

Request: { "name": "Green Apple", "price": 2.99 }
Response: { "message": "Grocery item updated successfully" }
DELETE /admin/grocery/:id: Delete a grocery item (Admin only)

Response: { "message": "Grocery item removed successfully" }
PATCH /admin/grocery/:id/inventory: Manage inventory levels (Admin only)

Request: { "quantity": 30 }
Response: { "message": "Inventory updated successfully" }
### User Endpoints
GET /user/grocery: View available grocery items

Response: [ { "id": 1, "name": "Apple", "price": 1.99, "quantity": 100 } ]
POST /user/order: Book grocery items

Request: { "items": [ { "id": 1, "quantity": 2 }, { "id": 2, "quantity": 3 } ] }
Response: { "orderId": 101, "message": "Order placed successfully" }