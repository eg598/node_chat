'use strict';

const express = require('express');
const cors = require('cors');
const events = require('events');
const { setupAssociations } = require('./setup');

const PORT = process.env.PORT || 5000;
const app = express();
const emitter = new events.EventEmitter();
const messages = [];

app.use(express.json());
setupAssociations();

app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);

app.post('/messages', (req, res) => {
  const { text } = req.body;

  const message = {
    text,
    time: new Date(),
  };

  emitter.emit('message', message);

  messages.push(message);

  res.status(201).send(messages);
});

app.get('/', (req, res) => {
  emitter.once('message', (message) => {
    res.status(200).send(messages);
  });
});

app.get('/messages', (req, res) => {
  res.status(200).send(messages);
});

app.listen(PORT, () => {
  // console.log(`Server running at http://localhost:${PORT}/`);
});
