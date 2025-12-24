import Joi from "joi";

const schema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().min(0).required()
});

export default (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  next();
};
