const { Message } = require('../models/message.model.js');
const { messageService } = require('../services/message.service.js');

const getAll = async (req, res) => {
  const { roomId } = req.params;

  const messages = await Message.findAll({
    where: { roomId },
  });

  if (!messages) {
    return res.status(404).send({ message: 'No messages found' });
  }

  res.send(messages);
};

const createMessage = async (req, res) => {
  const { authorId, text } = req.body;
  const { roomId } = req.params;

  const time = new Date();

  if (!authorId || !text || !roomId) {
    return res.status(404).send({ message: 'Something went wrong' });
  }

  await messageService.create(authorId, text, time, roomId);

  res.sendStatus(201);
};

const deleteMessage = async (req, res) => {
  const { id } = req.params;

  const message = await messageService.getOne(id);

  if (!message) {
    return res.status(404).send({ message: 'Message not found' });
  }

  await messageService.remove(id);

  res.sendStatus(204);
};

const messageController = {
  getAll,
  createMessage,
  deleteMessage,
};

module.exports = {
  messageController,
};
