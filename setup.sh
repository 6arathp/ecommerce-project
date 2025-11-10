#!/bin/bash

echo "🚀 Setting up E-Commerce MERN Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "📦 Installing root dependencies..."
npm install

echo "📦 Installing server dependencies..."
cd server
npm install
cd ..

echo "📦 Installing client dependencies..."
cd client
npm install
cd ..

echo "✅ Installation complete!"
echo ""
echo "🔧 Setup Instructions:"
echo "1. Update the MONGO_URI in server/.env with your MongoDB connection string"
echo "2. Run 'npm run dev' to start both server and client"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "📝 Available Scripts:"
echo "  npm run dev        - Start both server and client"
echo "  npm run server     - Start only the server"
echo "  npm run client     - Start only the client"
echo "  npm run build      - Build client for production"