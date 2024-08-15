const joi = require("joi");

const createUserSchema = joi.object({
  firstName: joi.string().required().max(50),
  lastName: joi.string().min(1).message("welcome").max(50),
  email: joi
    .string()
    .required()
    .email({ tlds: { allow: false } }),
  mobileNumber: joi.string().required(),
  password: joi
    .string()
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@#$%^&+=_!]{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain One upper case, One lower case, One Digit and One of this special characters @#$%^&+=_!",
    }),
});

const loginUser = joi.object({
  email: joi.string().required(),
  password: joi.string().required(),
});

const getAllUsersSchema = joi.object({
  id: joi.string().allow(null, ""),
  firstName: joi.string().required(),
  lastName: joi.string().required(),
});

module.exports = {
  getAllUsersSchema,
  createUserSchema,
  loginUser,
};
