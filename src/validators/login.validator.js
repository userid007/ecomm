import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const loginValidator = (req, res, next) => {
  const result = schema.validate(req.body);
  if (!result.error) {
    next();
  } else {
    return res.status(400).send({
      success: false,
      message: result.error.details[0].message,
    });
  }
};
