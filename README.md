# 📦 Product API

A Node.js + Express REST API for managing products.

---

##  How to Run the Server

##1. Install dependencies
```bash
npm install
2. Create .env file
Copy .env.example and fill in your values:
PORT=3000
API_KEY=my-api-key

3. Start the server
bash
node server.js

Or with nodemon:
bash
npm run start

4. Authentication
Send this in the headers for protected routes:
  Authorization: my-api-key

5.API Endpoints
GET /api/products
Get all products.

Query Params:
-search (name)
-category
-maxPrice
-inStock (true/false)
-page
-limit

GET /api/products/:id
Get a product by ID.

POST /api/products 
Create a product. Requires:

json
{
  "name": "Item",
  "description": "Description",
  "price": 99,
  "category": "tools",
  "inStock": true
}
PUT /api/products/:id 
Update a product.

DELETE /api/products/:id 
Delete a product.

TEST WITH POSTMAN
Add this header to protected requests:
-Authorization: my-api-key

