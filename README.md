# E-Commerce MERN Stack Application
## LINK: https://ecommerce-project-psi-eight.vercel.app/
## BACKEND: https://ecommerce-project-sk37.onrender.com/
A complete e-commerce web application built with MongoDB, Express.js, React.js, and Node.js.

## Features

- Browse products on the home page
- View detailed product information
- Add/remove products from shopping cart
- Responsive design
- Real-time cart updates

## Tech Stack

- **Frontend**: React.js with React Router
- **Backend**: Node.js with Express.js
- **Database**: MongoDB Atlas
- **State Management**: React Context API

## Project Structure

```
/client     → React frontend
/server     → Node.js + Express backend
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-app
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   ```
   
   Create a `.env` file in the server directory:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on http://localhost:5000

2. **Start the Frontend (in a new terminal)**
   ```bash
   cd client
   npm start
   ```
   Frontend will run on http://localhost:3000

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add item to cart
- `DELETE /api/cart/:id` - Remove item from cart

## Environment Variables

Create a `.env` file in the server directory with:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
