const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const responseTime = require('response-time');

const connectDB = require('./config/db');
const doctorRoute = require('./routes/doctor')

const server = express();
server.use(express.json());
server.use(cors());
server.use(responseTime());
dotenv.config();
connectDB();

server.use("/uploads", express.static("uploads"));

server.use('/api', doctorRoute)

server.listen(5000, () => {
    console.log("server is up and running");
})