require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./models');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// DB connection
db.sequelize.sync({force: false})
    .then(() => console.log('Database Synced'))
    .catch(err => console.error("Sync error: ", err));

// Routes
const eventsRouter = require('./routes/events');
const reviewsRouter = require('./routes/reviews');
const plansRouter = require('./routes/plans');

app.use('/api/events', eventsRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/plans', plansRouter);

// check server
app.get('/', (req, res) => { res.send('PowerHouse Gym API is running!'); });

// start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});