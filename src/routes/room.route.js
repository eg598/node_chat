const express = require('express');
const { messageController } = require('../controllers/message.controller');
const { roomController } = require('../controllers/room.controller');
const router = express.Router();

router.get('/:roomId', messageController.getAll);
router.post('/:roomId/messages', messageController.createMessage);
router.delete('/:roomId/messages/:id', messageController.deleteMessage);
router.patch('/:roomId', roomController.renameRoom);
router.post('/', roomController.createRoom);
router.delete('/:roomId', roomController.deleteRoom);
router.get('/', roomController.getAll);

module.exports = { router };
