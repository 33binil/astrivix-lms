const express = require('express')
const app = express();

// packages
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

// connection to DB and cloudinary
const { connectDB } = require('./config/database');
const { cloudinaryConnect } = require('./config/cloudinary');

// routes
const userRoutes = require('./routes/user');
const profileRoutes = require('./routes/profile');
const paymentRoutes = require('./routes/payments');
const courseRoutes = require('./routes/course');
const categoryRoutes = require('./routes/category');
const projectRoutes = require('./routes/project');
const internshipRoutes = require('./routes/internship');


// middleware 
app.use(express.json()); // to parse json body
app.use(cookieParser());
// CORS configuration
const allowedOrigins = [
  'http://localhost:5173', // Frontend development server
  'http://localhost:3000', // Common frontend port
  'https://nano-robotics-embed-technologies.vercel.app', // Vercel deployment URL
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Allow all localhost and 127.0.0.1 requests for development
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        return callback(null, true);
      }

      if (allowedOrigins.indexOf(origin) === -1) {
        console.log('Blocked by CORS:', origin);
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposedHeaders: ['set-cookie'],
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp'
  })
)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});

// connections
connectDB();
cloudinaryConnect();

// mount route
app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/course', courseRoutes);
app.use('/api/v1/project', projectRoutes);
app.use('/api/v1/internship', internshipRoutes);




// Default Route
app.get('/', (req, res) => {
  // console.log('Your server is up and running..!');
  res.send(`<div>
    This is Default Route  
    <p>Everything is OK</p>
    </div>`);
})