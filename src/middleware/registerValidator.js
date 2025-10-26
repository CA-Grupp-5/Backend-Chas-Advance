import { body, validationResult } from 'express-validator';
import allowedCompanies from '../config/allowedDomains.json' with { type: 'json' };

const allowedDomains = allowedCompanies.map((entry) =>
  entry.domain.toLowerCase()
);

export const registerValidationRules = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Valid email is required.')
    .custom((value) => {
      const emailParts = value.split('@');
      if (emailParts.length !== 2) {
        throw new Error('Invalid email format.');
      }

      const domain = emailParts[1].toLowerCase();
      if (!allowedDomains.includes(domain)) {
        throw new Error('Email domain is not allowed.');
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
