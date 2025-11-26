import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import dishRoutes from './routes/dishRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import Dish from './models/Dish.js';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
  },
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Add request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Make io accessible to routes
app.set('io', io);

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Dish Management API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      dishes: '/api/dishes',
      stats: '/api/dishes/stats/summary',
    },
  });
});

app.use('/api/dishes', dishRoutes);

// MongoDB Change Streams for real-time updates
const startChangeStream = async () => {
  try {
    const changeStream = Dish.watch();

    changeStream.on('change', (change) => {
      console.log('📡 Database change detected:', change.operationType);

      // Emit real-time update to all connected clients
      if (change.operationType === 'update' || change.operationType === 'replace') {
        io.emit('dishUpdated', {
          dishId: change.documentKey._id,
          updateDescription: change.updateDescription,
          timestamp: new Date(),
        });
      } else if (change.operationType === 'insert') {
        io.emit('dishAdded', {
          dish: change.fullDocument,
          timestamp: new Date(),
        });
      } else if (change.operationType === 'delete') {
        io.emit('dishDeleted', {
          dishId: change.documentKey._id,
          timestamp: new Date(),
        });
      }
    });

    console.log('MongoDB Change Stream started');
  } catch (error) {
    console.error('Change Stream Error:', error);
  }
};

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
  
  // Start change stream after server is running
  startChangeStream();
});