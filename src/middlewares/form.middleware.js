import formidable from "formidable";

export const formMiddleWare = (req, res, next) => {
  const form = formidable({ multiples: true, keepExtensions: true });

  try {
    form.parse(req, (error, fields, files) => {
      if (error) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
      req.fields = fields;
      req.files = files;
      next();
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
