[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19729232&assignment_repo_type=AssignmentRepo)
# Express.js RESTful API Assignment

This assignment focuses on building a RESTful API using Express.js, implementing proper routing, middleware, and error handling.

## Assignment Overview

You will:
1. Set up an Express.js server
2. Create RESTful API routes for a product resource
3. Implement custom middleware for logging, authentication, and validation
4. Add comprehensive error handling
5. Develop advanced features like filtering, pagination, and search

## Getting Started

1. Accept the GitHub Classroom assignment invitation
2. Clone your personal repository that was created by GitHub Classroom
3. Install dependencies:
   ```
  pnpm install
   ```
4. Run the server:
   ```
   pnpm start
   ```

## Files Included

- `Week2-Assignment.md`: Detailed assignment instructions
- `server.js`: Starter Express.js server file
- `.env.example`: Example environment variables file

## Requirements

- Node.js (v18 or higher)
- npm or yarn
- Postman, Insomnia, or curl for API testing

## API Endpoints

The API will have the following endpoints:

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a specific product
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

## Submission

Your work will be automatically submitted when you push to your GitHub Classroom repository. Make sure to:

1. Complete all the required API endpoints
2. Implement the middleware and error handling
3. Document your API in the README.md
4. Include examples of requests and responses

## Resources

- [Express.js Documentation](https://expressjs.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) 

# create an env file for the environment variables

#Authentication
all api must include the API key in the header,if the API key is missing or incorrect the unauthorised error message

# API Documentation
-GET /api/products
Description: It retrieve all products (supports pagination and filtering)

Query Parameters:

category: Filter by category (e.g., electronics)

page: Page number (default = 1)

-GET /api/products/stats
Description: Count of products per category

-GET /api/products/:id
Description: Get a product by ID

Response (if found): Product object

Response (if not found):404 status

-POST/api/products
Description: Add a new product

Request Body:product data in json format and a status of 201

-PUT /api/products/:id
Description: Update an existing product

Request Body: Same structure as POST

Response (if not found):404 status

-DELETE /api/products/:id
Description: Delete a product by ID

# Error Handling
Any internal server errors will return:status 500

