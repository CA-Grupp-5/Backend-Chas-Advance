import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db
import dotenv from "dotenv";

dotenv.config();

export const loginUserController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required to login.',
            });
        }

        const userResult = await db.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        )

        const user = userResult.rows[0];

        if (!user) {
            return res.status(401).json({ message: 'Invalid email.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password.' });
        }

        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
        });

    } catch (error) {
        next(error);
    }
}