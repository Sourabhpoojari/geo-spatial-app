import { body } from "express-validator";

export const validateCoordinates = [
  body("coordinates.*.*").custom((value) => {
    const [longitude, latitude] = value;

    if (typeof longitude !== "number" || !Number.isFinite(longitude)) {
      throw new Error(`Longitude must be a floating-point number`);
    }
    if (typeof latitude !== "number" || !Number.isFinite(latitude)) {
      throw new Error(`Latitude must be a floating-point number`);
    }
    if (longitude < -180 || longitude > 180) {
      throw new Error(
        `Longitude ${longitude} is out of range. It must be between -180 and 180`
      );
    }

    // Validate latitude
    if (latitude < -90 || latitude > 90) {
      throw new Error(
        `Latitude ${latitude} is out of range. It must be between -90 and 90`
      );
    }
    return true;
  }),
];
