const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

connectDB();


const app = express();
app.use(cors())
app.use(express.json());


app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

app.get('/', (req, res) => {
    res.send('CollabHub API is running....');
});

// Create Http server and attach Socket.io
const httpServer = http.createServer(app)

const io = new Server(httpServer, {
    cors:{
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

// Socket.io namespaces
const chatNamespace = io.of('/chat');
const taskNamespace = io.of('/tasks');

// Import socket event handlers
const chatSocket = require('./socket/chatSocket');
const taskSocket = require('./socket/taskSocket');

// Attach the handlers
chatSocket(chatNamespace);
taskSocket(taskNamespace);


const PORT = process.env.PORT || 5000

httpServer.listen(PORT, ()=> console.log(`Servers is running via http://localhost:${PORT}`));
