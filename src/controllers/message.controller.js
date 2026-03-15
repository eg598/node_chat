const { Message } = require('../models/message.model.js');
const { messageService } = require('../services/message.service.js');

// const getById = async (req, res) => {
//   const { id } = req.body;

//   const message = await messageService.getOne(id);

//   if (!message) {
//     return res.status(404).send({ message: 'Message not found' });
//   }

//   res.send(message);
// };

const getAll = async (res, req) => {
  const { roomId } = req.params;

  const messages = await Message.findAll({
    where: { roomId },
    order: [['createdAt', 'ASC']],
  });

  if (!messages) {
    return res.status(404).send({ message: 'No messages found' });
  }

  res.send(messages);
};

const renameMessage = async (req, res) => {
  const { id, name } = req.body;

  if (!name) {
    return res.status(404).send({ message: 'No name was provided' });
  }

  const message = await messageService.update(id, name);

  res.send(message);
};

const createMessage = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(404).send({ message: 'No name was provided' });
  }

  await messageService.create(name);

  res.sendStatus(201);
};

const deleteMessage = async (req, res) => {
  const { id } = req.body;

  const message = await messageService.getOne(id);

  if (!message) {
    return res.status(404).send({ message: 'Message not found' });
  }

  await messageService.remove(id);

  res.sendStatus(204);
};

const messageController = {
  getAll,
  renameMessage,
  createMessage,
  deleteMessage,
};

module.exports = {
  messageController,
};
