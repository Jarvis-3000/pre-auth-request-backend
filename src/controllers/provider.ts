// src/controllers/providerController.ts

import { Request, Response, NextFunction } from 'express';
import Provider from '../models/provider';

// Get a provider by ID
export const getProviderById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get providerId from token
    const providerId = req.body.providerId;

    const provider = await Provider.findById(providerId).populate('patients');
    if (!provider) {
      res.status(404).json({ message: 'Provider not found' });
      return;
    }
    res.status(200).json(provider);
  } catch (error) {
    next(error);
  }
};

// Update a provider
export const updateProvider = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Get providerId from token
    const providerId = req.body.providerId;

    const updatedProvider = await Provider.findByIdAndUpdate(
      providerId,
      req.body,
      { new: true }
    );
    
    if (!updatedProvider) {
      res.status(404).json({ message: 'Provider not found' });
      return;
    }
    res.status(200).json(updatedProvider);
  } catch (error) {
    next(error);
  }
};
