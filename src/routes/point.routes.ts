import { Router } from "express";
import { body } from "express-validator";
import { pointController } from "../controllers/point.controller";

const router = Router();

router.post(
  "",
  body("name")
    .isString()
    .withMessage("name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Place name is required"),
  body("latitude")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be a valid number between -90 and 90"),
  body("longitude")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be a valid number between -180 and 180"),
  body("address").isString().notEmpty().withMessage("Address is required"),
  pointController.storePointData
);

router.put(
  "/:id",
  body("name")
    .isString()
    .withMessage("name must be a string")
    .trim()
    .notEmpty()
    .withMessage("Place name is required"),
  body("latitude")
    .isFloat({ min: -90, max: 90 })
    .withMessage("Latitude must be a valid number between -90 and 90"),
  body("longitude")
    .isFloat({ min: -180, max: 180 })
    .withMessage("Longitude must be a valid number between -180 and 180"),
  body("address").isString().notEmpty().withMessage("Address is required"),
  pointController.updatePointData
);

router.get("", pointController.getAllPointData);

export default router;
