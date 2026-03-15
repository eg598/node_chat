const { userService } = require('../services/user.service.js');

const getById = async (req, res) => {
  const { id } = req.body;

  const user = await userService.getOne(id);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  res.send(user);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(404).send({ message: 'No name was provided' });
  }

  await userService.create(name);

  res.sendStatus(201);
};

const deleteUser = async (req, res) => {
  const { id } = req.body;

  const user = await userService.getOne(id);

  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  await userService.remove(id);

  res.sendStatus(204);
};

const userController = {
  getById,
  createUser,
  deleteUser,
};

module.exports = {
  userController,
};
