// src/controllers/patientController.ts

import { Request, Response, NextFunction } from 'express';
import Patient from '../models/patient';
import Provider from '../models/provider';

const PAGE_LIMIT = 10;

// Create a new patient and link to a provider
export const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, age, treatmentPlan, providerId } = req.body;

  try {
    // Create a new patient
    const newPatient = new Patient({
      name,
      age,
      treatmentPlan,
      medicalHistory: [],
      medicationHistory: [],
      labResults: [],
      providerId, // Link to provider
    });

    await newPatient.save();

    // Update provider's patients list
    await Provider.findByIdAndUpdate(providerId, {
      $push: { patients: newPatient._id },
    });

    res.status(201).json(newPatient);
  } catch (error) {
    next(error);
  }
};

// Get all patients by provider ID
export const getPatients = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Default values for pagination and limit
    const { providerId } = req.body;
    const { search = '', page = 1 } = req.query;

    if (!providerId) {
      res.status(400).json({ message: 'Provider ID is required' });
      return;
    }

    // Convert query params to proper types
    const pageNumber = parseInt(page as string, 10) || 1;

    // Build search query for patient name or other fields if required
    const searchQuery = {
      providerId,
      ...(search ? { name: { $regex: search as string, $options: 'i' } } : {}),
    };

    // Get total count of documents for pagination
    const totalPatients = await Patient.countDocuments(searchQuery);

    // Pagination calculations
    const totalPages = Math.ceil(totalPatients / PAGE_LIMIT);
    const skip = (pageNumber - 1) * PAGE_LIMIT;
    const hasNextPage = pageNumber < totalPages;
    const hasPreviousPage = pageNumber > 1;

    // Fetch patients with pagination and search
    const patients = await Patient.find(searchQuery)
      .sort({ createdAt: -1 })
      .limit(PAGE_LIMIT)
      .skip(skip)
      .exec();

    // Return paginated response
    res.status(200).json({
      page: pageNumber,
      pages: totalPages,
      next: hasNextPage,
      prev: hasPreviousPage,
      patients,
    });
  } catch (error) {
    next(error);
  }
};

// Get a patient by ID
export const getPatientById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const patient = await Patient.findById(req.params.id).populate(
      'preAuthorizationRequests'
    );
    if (!patient) {
      res.status(404).json({ message: 'Patient not found' });
      return;
    }
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};
