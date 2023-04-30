export const validateHandler = (req, res, next, schema) => {
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

export default validateHandler;
