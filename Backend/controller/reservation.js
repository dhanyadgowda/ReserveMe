// import ErrorHandler from "../error/error.js";
// import {Reservation} from '../models/reservationSchema.js'

// export const sendReservation = async (req, res, next) => {
//   const { firstName, lastName, email, date, time, phone } = req.body;
//   if (!firstName || !lastName || !email || !date || !time || !phone) {
//     return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
//   }

//   try {
//     await Reservation.create({ firstName, lastName, email, date, time, phone });
//     res.status(201).json({
//       success: true,
//       message: "Reservation Sent Successfully!",
//     });
//   } catch (error) {
//     // Handle Mongoose validation errors
//     if (error.name === 'ValidationError') {
//       const validationErrors = Object.values(error.errors).map(err => err.message);
//       return next(new ErrorHandler(validationErrors.join(', '), 400));
//     }

//     // Handle other errors
//     return next(error);
//   }
// };




import ErrorHandler from "../error/error.js";
import { Reservation } from '../models/reservationSchema.js';

export const sendReservation = async (req, res, next) => {
  const { firstName, lastName, email, date, time, phone } = req.body;

  // Ensure that all required fields are provided
  if (!firstName || !lastName || !email || !date || !time || !phone) {
    return next(new ErrorHandler("Please Fill Full Reservation Form!", 400));
  }

  try {
    // Attempt to create the reservation
    const reservation = await Reservation.create({ firstName, lastName, email, date, time, phone });

    // Send a success response if reservation is created
    res.status(201).json({
      success: true,
      message: "Reservation Sent Successfully!",
      reservation,
    });
  } catch (error) {
    console.error(error);  // Log the error for debugging

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return next(new ErrorHandler(validationErrors.join(', '), 400));
    }

    // Handle any other errors
    return next(new ErrorHandler("Something went wrong while making reservation", 500));
  }
};
