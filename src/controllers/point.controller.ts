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

const APP_INSTANCE_ID = codeInstance.getInstance();

const fileName = "Point-Controller";

export class PointController {
  public async storePointData(req: Request, res: Response) {
    try {
      console.info(
        `${APP_INSTANCE_ID}: ${fileName} -> Got Create Spatial Point Request with info ${JSON.stringify(
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
      const { name, latitude, longitude, address } = req.body;

      const data: PointBody = {
        name,
        latitude,
        longitude,
        address,
      };
      const point = await pointService.createPoint(data);
      const message = `Spatial point data created successfully!!`;
      console.debug(
        `${APP_INSTANCE_ID}: ${fileName} -> ${message} : ${JSON.stringify(
          point
        )}`
      );
      return res
        .status(StatusCodes.CREATED)
        .json({ status: StatusCodes.CREATED, data: point, message });
    } catch (error) {
      if (error instanceof ErrorException)
        return res.status(parseInt(error.status)).send(error);

      console.error(`${APP_INSTANCE_ID}: ${fileName} -> Error: ${error}`);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getInternalServerTmfError(error as any));
    }
  }

  public async getAllPointData(_req: Request, res: Response) {
    try {
      console.info(
        `${APP_INSTANCE_ID}: ${fileName} -> Getting all Spatial Point Data`
      );
      const points = await pointService.getPointsData();
      const message = `Spatial point data fetched successfully!!`;
      console.debug(
        `${APP_INSTANCE_ID}: ${fileName} -> ${message} : ${JSON.stringify(
          points
        )}`
      );
      return res
        .status(StatusCodes.OK)
        .json({ status: StatusCodes.OK, data: points, message });
    } catch (error) {
      if (error instanceof ErrorException)
        return res.status(parseInt(error.status)).send(error);

      console.error(`${APP_INSTANCE_ID}: ${fileName} -> Error: ${error}`);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(getInternalServerTmfError(error as any));
    }
  }

  public async updatePointData(req: Request, res: Response) {
    try {
      console.info(
        `${APP_INSTANCE_ID}: ${fileName} -> Got update point data request for id: ${
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
      const { name, latitude, longitude, address } = req.body;

      const data: PointBody = {
        name,
        latitude,
        longitude,
        address,
      };
      const point = await pointService.updatePoint(
        parseInt(req.params.id),
        data
      );
      const message = `Spatial point data updated successfully!!`;
      console.debug(
        `${APP_INSTANCE_ID}: ${fileName} -> ${message} : ${JSON.stringify(
          point
        )}`
      );
      return res
        .status(StatusCodes.OK)
        .json({ status: StatusCodes.OK, data: point, message });
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

export const pointController = new PointController();
