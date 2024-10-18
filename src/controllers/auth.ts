import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Provider from '../models/provider';

// Environment variable for JWT secret
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Signup provider
export const signupProvider = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    // Check if provider already exists for avoiding conflicts
    const existingProvider = await Provider.findOne({ email });

    if (existingProvider) {
      res
        .status(400)
        .json({ message: 'Provider already exists with this email' });
      return;
    }

    // Password hashing
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new provider
    const newProvider = new Provider({ name, email, password: hashedPassword });
    await newProvider.save();

    res.status(201).json({ message: 'Provider created successfully' });
  } catch (error) {
    next(error);
  }
};

// Signin provider
export const signinProvider = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Find provider by email
    const provider = await Provider.findOne({ email });
    if (!provider) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Compare passwords using bcrypt
    const isMatch = await bcrypt.compare(password, provider.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ providerId: provider._id }, JWT_SECRET, {
      expiresIn: '5h',
    });

    res.status(200).json({ token, providerId: provider._id });
  } catch (error) {
    next(error);
  }
};
