# 🍽️ Dish Management 

<div align="center">

![Dish Management Dashboard](https://img.shields.io/badge/React-18.2.0-blue?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-brightgreen?style=for-the-badge&logo=mongodb)
![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)

**A professional full-stack application for managing restaurant dishes with real-time updates**

[Features](#-features) • [Demo](#-demo) • [Installation](#-installation) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎯 Overview

The **Dish Management Dashboard** is a modern, full-stack web application designed for restaurants to efficiently manage their menu items. Built with React, Node.js, Express, and MongoDB, it features a clean, intuitive interface with real-time synchronization across all connected clients using WebSocket technology.

**Key Highlights:**
- ⚡ Real-time dish updates across multiple clients
- 🔍 Advanced search and filtering capabilities
- 📊 Comprehensive analytics dashboard
- 🎨 Modern, responsive UI design
- 🔄 Optimistic UI updates for seamless UX

---

## ✨ Features

### Core Functionality
- ✅ **Complete CRUD Operations** - Create, Read, Update, and Delete dishes
- ✅ **Real-time Synchronization** - WebSocket-powered live updates
- ✅ **Publish/Unpublish** - Toggle dish visibility instantly
- ✅ **Advanced Search** - Search by name, description, category, or cuisine
- ✅ **Multi-filter System** - Filter by category, cuisine, dietary preferences, price range, and spice level
- ✅ **Bulk Operations** - Update multiple dishes simultaneously

### Dish Information
- 📸 High-quality dish images
- 💰 Price management
- ⏱️ Preparation time tracking
- 👥 Serving size information
- 🌶️ Spice level indicators
- 🥗 Dietary tags (Vegetarian, Vegan)
- 🚨 Allergen warnings
- 📝 Detailed ingredient lists
- 📖 Full descriptions

### Analytics & Statistics
- 📊 Total dishes count
- ✅ Published vs Unpublished breakdown
- 💵 Average price calculations
- 📈 Category distribution
- 🌍 Cuisine analytics

### User Experience
- 🎨 Clean, modern UI with soft color palette
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🌗 Smooth animations and transitions
- 🔔 Toast notifications for actions
- 🐛 Debug console for development
- ⚡ Optimistic UI updates
- 🔄 Loading states and error handling

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI Framework |
| **Vite** | 5.0.8 | Build tool & dev server |
| **Tailwind CSS** | 3.3.6 | Styling framework |
| **Axios** | 1.6.2 | HTTP client |
| **Socket.IO Client** | 4.6.1 | Real-time communication |
| **Lucide React** | 0.263.1 | Icon library |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Runtime environment |
| **Express** | 4.18.2 | Web framework |
| **MongoDB** | 6.0+ | Database |
| **Mongoose** | 8.0.3 | ODM for MongoDB |
| **Socket.IO** | 4.6.1 | Real-time engine |
| **CORS** | 2.8.5 | Cross-origin support |
| **Dotenv** | 16.3.1 | Environment management |

### Development Tools
- **Nodemon** - Auto-restart server
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

---

## 🏗️ Architecture

### System Architecture

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │         │                 │
│  React Client   │◄───────►│  Express API    │◄───────►│    MongoDB      │
│  (Frontend)     │  HTTP   │  (Backend)      │         │   (Database)    │
│                 │◄───────►│                 │         │                 │
└─────────────────┘ WebSocket└─────────────────┘         └─────────────────┘
        │                            │
        │                            │
        └────────────────────────────┘
           Real-time Updates
        (Socket.IO + Change Streams)
```

### Data Flow

1. **Client Request** → Frontend sends HTTP request via Axios
2. **API Processing** → Express routes handle business logic
3. **Database Operation** → Mongoose executes MongoDB queries
4. **Response** → Data sent back to client
5. **Real-time Sync** → MongoDB Change Streams detect updates
6. **Broadcast** → Socket.IO emits events to all connected clients
7. **UI Update** → React components re-render with new data

---

## 📦 Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **MongoDB** - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud) or [MongoDB Community](https://www.mongodb.com/try/download/community) (Local)
- **Git** - [Download](https://git-scm.com/)

### Quick Start

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/dish-management-dashboard.git
cd dish-management-dashboard
```

#### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your MongoDB URI
nano .env  # or use your preferred editor
```

**Configure `.env` file:**

```env
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dishmanagement
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

**Seed the database:**

```bash
npm run seed
```

**Start the backend server:**

```bash
npm run dev
```

✅ Backend should be running on `http://localhost:5000`

#### 3️⃣ Frontend Setup

Open a new terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your API URL
nano .env
```

**Configure `.env` file:**

```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

**Start the frontend server:**

```bash
npm run dev
```

✅ Frontend should be running on `http://localhost:5173`

#### 4️⃣ Access the Application

Open your browser and navigate to:

```
http://localhost:5173
```

---

## ⚙️ Configuration

### Environment Variables

#### Backend (`backend/.env`)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `5000` | No |
| `MONGODB_URI` | MongoDB connection string | - | **Yes** |
| `NODE_ENV` | Environment mode | `development` | No |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` | Yes |

#### Frontend (`frontend/.env`)

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000` | Yes |
| `VITE_SOCKET_URL` | WebSocket server URL | `http://localhost:5000` | Yes |

### MongoDB Setup

#### Option 1: MongoDB Atlas (Recommended)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (Free tier available)
3. Create database user and password
4. Whitelist your IP address (or use `0.0.0.0/0` for development)
5. Get connection string and add to `.env`

#### Option 2: Local MongoDB

1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```
3. Use connection string: `mongodb://localhost:27017/dishmanagement`

---

## 🎮 Usage

### Basic Operations

#### 1. **Viewing Dishes**
- All dishes are displayed in a responsive grid layout
- Each card shows image, name, price, category, and status

#### 2. **Searching Dishes**
- Use the search bar at the top to filter dishes
- Search works across: name, description, category, and cuisine
- Results update instantly as you type

#### 3. **Filtering Dishes**

**Quick Filters:**
- Published / Unpublished
- Vegetarian
- Vegan

**Advanced Filters:**
- Category (Italian, Asian, Mexican, etc.)
- Cuisine type
- Price range (min/max)
- Spice level
- Sort by (Name, Price, Date)

#### 4. **Publishing/Unpublishing Dishes**
- Click the "Publish" or "Unpublish" button on any dish card
- Changes are instant with optimistic UI updates
- Toast notification confirms the action
- Real-time sync across all connected clients

#### 5. **Viewing Dish Details**
- Click the "ℹ️" button on any dish card
- Modal opens with complete information:
  - Full description
  - Preparation time
  - Servings
  - Ingredients list
  - Allergen warnings
  - Price and spice level
  - Category tags

#### 6. **Real-time Updates**
- Open the app in multiple browser windows
- Changes in one window appear instantly in others
- "Live" indicator shows connection status

---

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### **GET** `/dishes`
Get all dishes with optional filters

**Query Parameters:**
- `category` - Filter by category
- `cuisine` - Filter by cuisine
- `isPublished` - `true` or `false`
- `isVegetarian` - `true` or `false`
- `isVegan` - `true` or `false`
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `spiceLevel` - `none`, `mild`, `medium`, `hot`, `extra-hot`
- `sortBy` - `newest`, `oldest`, `name_asc`, `name_desc`, `price_asc`, `price_desc`
- `search` - Text search
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 50)

**Example Request:**
```bash
curl http://localhost:5000/api/dishes?category=Italian&isPublished=true
```

**Example Response:**
```json
{
  "success": true,
  "count": 5,
  "total": 25,
  "page": 1,
  "pages": 5,
  "data": [
    {
      "_id": "...",
      "dishId": "dish_001",
      "dishName": "Margherita Pizza",
      "imageUrl": "https://...",
      "isPublished": true,
      "category": "Italian",
      "price": 12.99,
      "description": "...",
      "cuisine": "Italian",
      "isVegetarian": true,
      "isVegan": false,
      "preparationTime": 20,
      "servings": 2,
      "ingredients": ["..."],
      "allergens": ["Gluten", "Dairy"],
      "spiceLevel": "mild",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

#### **GET** `/dishes/:dishId`
Get single dish by ID

**Example Request:**
```bash
curl http://localhost:5000/api/dishes/dish_001
```

#### **PATCH** `/dishes/:dishId/toggle`
Toggle dish published status

**Example Request:**
```bash
curl -X PATCH http://localhost:5000/api/dishes/dish_001/toggle
```

**Example Response:**
```json
{
  "success": true,
  "message": "Dish published successfully",
  "data": { "..." }
}
```

#### **GET** `/dishes/stats/summary`
Get dish statistics

**Example Response:**
```json
{
  "success": true,
  "data": {
    "total": 25,
    "published": 20,
    "unpublished": 5,
    "vegetarian": 10,
    "vegan": 5,
    "categoryStats": [...],
    "cuisineStats": [...],
    "priceStats": {
      "avgPrice": 14.99,
      "minPrice": 7.99,
      "maxPrice": 24.99
    }
  }
}
```

#### **PATCH** `/dishes/bulk/update`
Bulk update dishes

**Request Body:**
```json
{
  "dishIds": ["dish_001", "dish_002", "dish_003"],
  "action": "publish"  // or "unpublish"
}
```

### WebSocket Events

#### Client Listens For:

- `dishUpdated` - When a dish is modified
- `dishAdded` - When a new dish is created
- `dishDeleted` - When a dish is removed

**Example:**
```javascript
socket.on('dishUpdated', (data) => {
  console.log('Dish updated:', data);
  // Refetch dishes
});
```

---

## 📁 Project Structure

```
dish-management-dashboard/
│
├── backend/                      # Backend server
│   ├── config/
│   │   ├── db.js                # Database connection
│   │   └── constants.js         # App constants
│   ├── models/
│   │   └── Dish.js              # Dish model schema
│   ├── routes/
│   │   └── dishRoutes.js        # API routes
│   ├── controllers/
│   │   └── dishController.js    # Business logic
│   ├── middleware/
│   │   ├── errorHandler.js      # Error middleware
│   │   └── validation.js        # Validation middleware
│   ├── utils/
│   │   ├── seedData.js          # Database seeder
│   │   ├── logger.js            # Logger utility
│   │   └── helpers.js           # Helper functions
│   ├── data/
│   │   └── dishes.json          # Seed data (25 dishes)
│   ├── .env                     # Environment variables
│   ├── .env.example             # Environment template
│   ├── server.js                # Server entry point
│   ├── package.json             # Dependencies
│   └── .gitignore
│
├── frontend/                     # Frontend application
│   ├── public/
│   │   └── vite.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Reusable components
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Badge.jsx
│   │   │   │   ├── Card.jsx
│   │   │   │   └── Modal.jsx
│   │   │   ├── layout/          # Layout components
│   │   │   │   └── Header.jsx
│   │   │   ├── dishes/          # Dish-specific components
│   │   │   │   ├── DishCard.jsx
│   │   │   │   ├── DishGrid.jsx
│   │   │   │   ├── DishFilters.jsx
│   │   │   │   └── DishDetails.jsx
│   │   │   └── ui/              # UI components
│   │   │       ├── LoadingSpinner.jsx
│   │   │       ├── ErrorMessage.jsx
│   │   │       ├── EmptyState.jsx
│   │   │       └── DebugConsole.jsx
│   │   ├── services/
│   │   │   ├── api.js           # API service
│   │   │   └── socket.js        # Socket service
│   │   ├── hooks/
│   │   │   └── useDishes.js     # Custom hook for dishes
│   │   ├── context/
│   │   │   └── ToastContext.jsx # Toast notifications
│   │   ├── utils/
│   │   │   ├── constants.js     # Frontend constants
│   │   │   └── helpers.js       # Helper functions
│   │   ├── App.jsx              # Main app component
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── .env                     # Environment variables
│   ├── .env.example             # Environment template
│   ├── index.html               # HTML template
│   ├── package.json             # Dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── tailwind.config.js       # Tailwind configuration
│   ├── postcss.config.js        # PostCSS configuration
│   └── .gitignore
│
├── README.md                     # This file
├── LICENSE                       # MIT License
└── .gitignore                    # Git ignore rules
```

---

## 🔧 Development

### Available Scripts

#### Backend

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Seed database with sample data
npm run seed

# Test MongoDB connection
node test-connection.js
```

#### Frontend

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Code Style

This project follows standard JavaScript/React conventions:

- **ES6+ syntax**
- **Functional components** with hooks
- **Arrow functions**
- **Async/await** for asynchronous operations
- **Modular architecture** with separation of concerns

### Naming Conventions

- **Components:** PascalCase (e.g., `DishCard.jsx`)
- **Utilities:** camelCase (e.g., `formatPrice.js`)
- **Constants:** UPPER_SNAKE_CASE (e.g., `DISH_CATEGORIES`)
- **CSS classes:** kebab-case (e.g., `dish-card`)

---

## 🧪 Testing

### Manual Testing Checklist

#### Frontend
- [ ] All dishes load correctly
- [ ] Search functionality works
- [ ] Filters apply correctly
- [ ] Publish/Unpublish toggles work
- [ ] Modal opens and closes
- [ ] Toast notifications appear
- [ ] Responsive design on mobile/tablet
- [ ] Real-time updates work across tabs

#### Backend
- [ ] API endpoints return correct data
- [ ] MongoDB connection is stable
- [ ] WebSocket connections establish
- [ ] Change streams detect updates
- [ ] Error handling works correctly
- [ ] CORS is configured properly

### Testing Real-time Updates

1. Open application in two browser windows
2. Toggle a dish status in window 1
3. Verify update appears instantly in window 2
4. Check "Live" indicator shows green dot

### API Testing with curl

```bash
# Test API health
curl http://localhost:5000

# Get all dishes
curl http://localhost:5000/api/dishes

# Get stats
curl http://localhost:5000/api/dishes/stats/summary

# Toggle dish status
curl -X PATCH http://localhost:5000/api/dishes/dish_001/toggle
```

---

## 🚀 Deployment

### Backend Deployment (Render/Railway/Heroku)

1. **Prepare for deployment:**
   ```bash
   cd backend
   npm install --production
   ```

2. **Set environment variables on your platform:**
   - `MONGODB_URI`
   - `NODE_ENV=production`
   - `FRONTEND_URL` (your frontend URL)
   - `PORT` (usually auto-set)

3. **Deploy:**
   - Push to GitHub
   - Connect repository to Render/Railway/Heroku
   - Deploy from main branch

### Frontend Deployment (Vercel/Netlify)

1. **Build the app:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Set environment variables:**
   - `VITE_API_URL` (your backend URL)
   - `VITE_SOCKET_URL` (your backend URL)

3. **Deploy:**
   - Push to GitHub
   - Connect repository to Vercel/Netlify
   - Deploy from main branch

### MongoDB Atlas (Production Database)

1. Create production cluster
2. Set up database access and network access
3. Get connection string
4. Update `MONGODB_URI` in backend environment

---

## 🐛 Troubleshooting

### Common Issues

#### 1. **Backend won't start**

**Error:** `MongoDB connection failed`

**Solution:**
```bash
# Check MongoDB URI in .env
cat backend/.env | grep MONGODB_URI

# Test connection
cd backend
node test-connection.js

# Ensure MongoDB Atlas IP whitelist includes your IP
```

#### 2. **Frontend can't connect to backend**

**Error:** `Network Error` or `Failed to fetch`

**Solution:**
```bash
# Check if backend is running
curl http://localhost:5000

# Verify VITE_API_URL in frontend/.env
cat frontend/.env

# Check CORS configuration in backend/server.js
```

#### 3. **No dishes showing**

**Solution:**
```bash
# Reseed the database
cd backend
npm run seed

# Check if dishes exist in MongoDB
# Using MongoDB Compass or Atlas UI
```

#### 4. **Search/Filters not working**

**Solution:**
- Open browser DevTools (F12)
- Check Console for errors
- Click Debug Console button (purple bug icon)
- Verify dishes are loaded
- Check filter state

#### 5. **Toggle button doesn't work**

**Solution:**
- Check browser console for errors
- Verify backend API is accessible
- Check network tab for failed requests
- Look for CORS errors

#### 6. **Real-time updates not working**

**Solution:**
```bash
# Check WebSocket connection
# In browser console:
# Should see "✅ Socket connected: xxx"

# Verify Socket.IO is running on backend
# Check backend logs for "Client connected"

# Test in multiple browser windows
```

#### 7. **Build errors**

**Solution:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

### Debug Mode

Enable debug console in development:
- Look for purple bug icon (bottom-left)
- Shows: API status, dishes loaded, active filters, errors

### Getting Help

If issues persist:
1. Check browser console (F12)
2. Check backend logs
3. Review this documentation
4. Create an issue on GitHub with:
   - Error messages
   - Steps to reproduce
   - Screenshots
   - Environment details

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Ways to Contribute

- 🐛 Report bugs
- 💡 Suggest new features
- 📝 Improve documentation
- 🔧 Submit pull requests
- ⭐ Star the repository

### Development Workflow

1. **Fork the repository**

2. **Clone your fork:**
   ```bash
   git clone https://github.com/yourusername/dish-management-dashboard.git
   cd dish-management-dashboard
   ```

3. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**

5. **Commit your changes:**
   ```bash
   git commit -m "Add amazing feature"
   ```

6. **Push to your fork:**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**

### Code Guidelines

- Follow existing code style
- Add comments for complex logic
- Update documentation if needed
- Test your changes thoroughly
- Keep commits atomic and well-described

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2024 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Library
- [Express](https://expressjs.com/) - Backend Framework
- [MongoDB](https://www.mongodb.com/) - Database
- [Socket.IO](https://socket.io/) - Real-time Engine
- [Tailwind CSS](https://tailwindcss.com/) - CSS Framework
- [Vite](https://vitejs.dev/) - Build Tool
- [Lucide](https://lucide.dev/) - Icon Library
- [Unsplash](https://unsplash.com/) - Dish Images

---
