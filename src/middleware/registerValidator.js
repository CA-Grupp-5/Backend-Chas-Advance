import { body, validationResult } from 'express-validator';

export const registerValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required.')
    .custom((value) => {
      const allowedDomain = 'placeholder.com';
      const emailDomain = value.split('@')[1];
      if (emailDomain !== allowedDomain) {
        throw new Error(`Email domain must be ${allowedDomain}.`);
      }
      return true;
    }),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long.')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter.')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number.'),
];

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};
