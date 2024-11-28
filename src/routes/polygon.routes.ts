import { Router } from "express";
import { body } from "express-validator";
import { polygonController } from "../controllers/polygon.controller";
import { validateCoordinates } from "../helpers/coordinateValidation";

const router = Router();

router.post(
  "",
  body("title")
    .isString()
    .withMessage("title must be a string")
    .trim()
    .notEmpty()
    .withMessage("title is required"),
  body("coordinates")
    .isArray({ min: 1 })
    .withMessage("Coordinates must be a valid GeoJSON polygon"),
  body("coordinates.*")
    .isArray()
    .withMessage("Each ring must be an array of coordinates"),
  body("coordinates.*.*")
    .isArray({ min: 2 })
    .withMessage("Each coordinate must be an array of [longitude, latitude]"),
  body("description")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("description is required"),
  validateCoordinates,
  polygonController.storePolygonData
);

router.get("", polygonController.getAllpolygonData);
router.get("/:id", polygonController.getPolygonDataById);

router.put(
  "/:id",
  body("title")
    .isString()
    .withMessage("title must be a string")
    .trim()
    .notEmpty()
    .withMessage("title is required"),
  body("coordinates")
    .isArray({ min: 1 })
    .withMessage("Coordinates must be a valid GeoJSON polygon"),
  body("coordinates.*")
    .isArray()
    .withMessage("Each ring must be an array of coordinates"),
  body("coordinates.*.*")
    .isArray({ min: 2 })
    .withMessage("Each coordinate must be an array of [longitude, latitude]"),
  body("description")
    .optional()
    .isString()
    .notEmpty()
    .withMessage("description is required"),
  validateCoordinates,
  polygonController.updatePolygonData
);

export default router;
