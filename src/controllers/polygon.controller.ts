import { StatusCodes } from "http-status-codes";
import { codeInstance } from "../helpers/codeInstanceID";
import { ErrorException } from "../helpers/errorException";
import { Request, Response } from "express";
import {
  getBadRequestError,
  getInternalServerTmfError,
} from "../helpers/commonErrors";
import { validationResult } from "express-validator";
import { pointService } from "../services/point.service";
import { PointBody } from "../types/point.type";
import { PolygonBody } from "../types/polygon.type";
import { polygonService } from "../services/polygon.service";

const APP_INSTANCE_ID = codeInstance.getInstance();

const fileName = "Polygon-Controller";

export class PolygonController {
  public async storePolygonData(req: Request, res: Response) {
    try {
      console.info(
        `${APP_INSTANCE_ID}: ${fileName} -> Got Create Spatial Polygon Request with info ${JSON.stringify(
          req.body
        )}`
      );
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const message = errors
          .array()
          .map((error) => error.msg)
          .join(", ");
        console.error(
          `${APP_INSTANCE_ID}: ${fileName} -> Validation Error: ${message}`
        );
        throw getBadRequestError(message);
      }
      const { title, coordinates, description } = req.body;

      const data: PolygonBody = {
        title,
        coordinates,
        description,
      };
      const polygon = await polygonService.createPolygon(data);
      const message = `Spatial polygon data created successfully!!`;
      console.debug(
        `${APP_INSTANCE_ID}: ${fileName} -> ${message} : ${JSON.stringify(
          polygon
        )}`
      );
      return res
        .status(StatusCodes.CREATED)
        .json({ status: StatusCodes.CREATED, data: polygon, message });
    } catch (error) {
      if (error instanceof ErrorException)
        return res.status(parseInt(error.status)).send(error);

      console.error(`${APP_INSTANCE_ID}: ${fileName} -> Error: ${error}`);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getInternalServerTmfError(error as any));
    }
  }

  public async getAllpolygonData(_req: Request, res: Response) {
    try {
      console.info(
        `${APP_INSTANCE_ID}: ${fileName} -> Getting all Spatial polygon Data`
      );
      const polygons = await polygonService.getPolygonData();
      const message = `Spatial polygon data fetched successfully!!`;
      console.debug(
        `${APP_INSTANCE_ID}: ${fileName} -> ${message} : ${JSON.stringify(
          polygons
        )}`
      );
      return res
        .status(StatusCodes.OK)
        .json({ status: StatusCodes.OK, data: polygons, message });
    } catch (error) {
      if (error instanceof ErrorException)
        return res.status(parseInt(error.status)).send(error);

      console.error(`${APP_INSTANCE_ID}: ${fileName} -> Error: ${error}`);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getInternalServerTmfError(error as any));
    }
  }
  public async getPolygonDataById(req: Request, res: Response) {
    try {
      console.info(
        `${APP_INSTANCE_ID}: ${fileName} -> Getting Spatial polygon Data with id: ${req.params.id}`
      );
      const polygon = await polygonService.getPolygonDataById(
        parseInt(req.params.id)
      );
      const message = `Spatial polygon data fetched successfully!!`;
      console.debug(
        `${APP_INSTANCE_ID}: ${fileName} -> ${message} : ${JSON.stringify(
          polygon
        )}`
      );
      return res
        .status(StatusCodes.OK)
        .json({ status: StatusCodes.OK, data: polygon, message });
    } catch (error) {
      if (error instanceof ErrorException)
        return res.status(parseInt(error.status)).send(error);

      console.error(`${APP_INSTANCE_ID}: ${fileName} -> Error: ${error}`);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getInternalServerTmfError(error as any));
    }
  }

  public async updatePolygonData(req: Request, res: Response) {
    try {
      console.info(
        `${APP_INSTANCE_ID}: ${fileName} -> Got update polygon data request for id: ${
          req.params.id
        } with body: ${JSON.stringify(req.body)}`
      );
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const message = errors
          .array()
          .map((error) => error.msg)
          .join(", ");
        console.error(
          `${APP_INSTANCE_ID}: ${fileName} -> Validation Error: ${message}`
        );
        throw getBadRequestError(message);
      }

      const { title, coordinates, description } = req.body;

      const data: PolygonBody = {
        title,
        coordinates,
        description,
      };
      const polygon = await polygonService.updatePolygon(
        parseInt(req.params.id),
        data
      );
      const message = `Spatial polygon data updated successfully!!`;
      console.debug(
        `${APP_INSTANCE_ID}: ${fileName} -> ${message} : ${JSON.stringify(
          polygon
        )}`
      );
      return res
        .status(StatusCodes.OK)
        .json({ status: StatusCodes.OK, data: polygon, message });
    } catch (error) {
      if (error instanceof ErrorException)
        return res.status(parseInt(error.status)).send(error);

      console.error(`${APP_INSTANCE_ID}: ${fileName} -> Error: ${error}`);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getInternalServerTmfError(error as any));
    }
  }
}

export const polygonController = new PolygonController();
