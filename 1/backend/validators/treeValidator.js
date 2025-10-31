const Joi = require('joi');

const treeSchema = Joi.object({
  name: Joi.string().required(),
  treename: Joi.string().required(),
  height: Joi.number().required(),
  radius: Joi.number().required(),
  volume: Joi.number().required(),
  maintain: Joi.date().required()
});

module.exports = { treeSchema };
