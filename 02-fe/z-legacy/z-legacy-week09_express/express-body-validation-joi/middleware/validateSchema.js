const validateSchema = (joiSchema) => (req, res, next) => {
    const { error } = joiSchema.validate(req.body);
    return error ? next(error) : next();
};

export default validateSchema;
