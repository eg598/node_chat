'use strict';

const express = require('express');
const cors = require('cors');
const events = require('events');
const { setupAssociations } = require('./setup');
const { router: roomRouter } = require('./routes/room.route');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
setupAssociations();

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.use('/rooms', roomRouter);

app.listen(PORT, () => {});
