import bcrypt from 'bcryptjs';

export const registerController = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Name, email and password are required to register user.',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Spara i databas

    res.status(201).json({
      message: 'User registered successfully',
      user: { name, email, password: hashedPassword },
    });
  } catch (error) {
    next(error);
  }
};
