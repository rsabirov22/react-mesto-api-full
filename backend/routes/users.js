const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser, getUsers, editUser, changeUserAvatar, getCurrentUser } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24),
  }),
}), getUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), editUser);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/^(http[s]?:\/\/(www\.)?)[a-zA-Z1-9\-.]{1,}\.[a-z]{2,3}(\/?([a-zA-Z0-9\-._~:/?#[]@!$&'\(\)*\+,;=])?\/?){1,}#?/),
  }),
}), changeUserAvatar);

module.exports = router;
