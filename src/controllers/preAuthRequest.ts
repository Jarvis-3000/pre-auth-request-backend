import { Request, Response, NextFunction } from 'express';
import PreAuthorizationRequest from '../models/preAuthorizationRequest';
import Patient from '../models/patient';

const PAGE_LIMIT = 10;

// Create a new authorization request
export const createPreAuthorizationRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const {
    patientId,
    providerId,
    treatmentType,
    insurancePlan,
    dateOfService,
    diagnosisCode,
  } = req.body;

  try {
    const newRequest = new PreAuthorizationRequest({
      patientId,
      providerId,
      treatmentType,
      insurancePlan,
      dateOfService,
      diagnosisCode,
    });

    // Save the pre-authorization request
    await newRequest.save();

    // Update the Patient document to link the new request
    await Patient.findByIdAndUpdate(
      patientId,
      { $push: { preAuthorizationRequests: newRequest._id } }, // Push the new request ID to the array
      { new: true } // Return the updated document
    );

    res.status(201).json(newRequest);
  } catch (error) {
    next(error);
  }
};

export const getPreAuthRequestsForPatient = async (
  req: Request,
  res: Response
) => {
  try {
    const { providerId } = req.body;
    const { page = 1, status, patientId } = req.query;

    const pageNumber = parseInt(page as string, 10);

    // Construct the query object
    const query: any = { patientId, providerId }; // Match patient and provider IDs
    if (status) {
      // Add the status filter if provided
      query.status = status;
    }

    // Get total count of pre-auth requests for pagination
    const totalCount = await PreAuthorizationRequest.countDocuments(query);

    // Pagination calculations
    const totalPages =
      Math.ceil(totalCount / PAGE_LIMIT) <= 0
        ? 1
        : Math.ceil(totalCount / PAGE_LIMIT);
    const skip = (pageNumber - 1) * PAGE_LIMIT;
    const hasNextPage = pageNumber < totalPages;
    const hasPreviousPage = pageNumber > 1;

    // Fetch patients with pagination and search
    const authRequests = await PreAuthorizationRequest.find(query)
      .sort({ createdAt: -1 })
      .limit(PAGE_LIMIT)
      .skip(skip)
      .exec();

    // Send the response
    res.status(200).json({
      data: authRequests,
      page: totalPages,
      pages: totalPages,
      next: hasNextPage,
      prev: hasPreviousPage,
    });
  } catch (error) {
    console.error('Error fetching pre-authorization requests:', error);
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get authorization request by ID
export const getPreAuthorizationRequestById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const request = await PreAuthorizationRequest.findById(req.params.id);
    if (!request) {
      res.status(404).json({ message: 'Pre-Authorization request not found' });
      return;
    }
    res.status(200).json(request);
  } catch (error) {
    next(error);
  }
};

// Update an authorization request
export const updatePreAuthorizationRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedRequest = await PreAuthorizationRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedRequest) {
      res.status(404).json({ message: 'Pre-Authorization request not found' });
      return;
    }
    res.status(200).json(updatedRequest);
  } catch (error) {
    next(error);
  }
};

// Delete an authorization request
export const deletePreAuthorizationRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const request = await PreAuthorizationRequest.findByIdAndDelete(
      req.params.id
    );
    if (!request) {
      res.status(404).json({ message: 'Pre-Authorization request not found' });
      return;
    }
    res
      .status(200)
      .json({ message: 'Pre-Authorization request deleted successfully' });
  } catch (error) {
    next(error);
  }
};
