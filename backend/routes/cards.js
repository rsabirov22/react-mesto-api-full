const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { createCard, getCards, removeCard, likeCard, dislikeCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^(http[s]?:\/\/(www\.)?)[a-zA-Z1-9\-.]{1,}\.[a-z]{2,3}(\/?([a-zA-Z0-9\-._~:/?#[]@!$&'\(\)*\+,;=])?\/?){1,}#?/),
  }),
}), createCard);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), removeCard);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24),
  }),
}), dislikeCard);

module.exports = router;
