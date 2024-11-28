import { ErrorException } from "../helpers/errorException";
import { AppDataSource } from "../clients/pgClient";
import { Point } from "../entities/point";
import { codeInstance } from "../helpers/codeInstanceID";
import {
  getInternalServerTmfError,
  getNotFoundTmfError,
} from "../helpers/commonErrors";
import { PointBody } from "../types/point.type";

const APP_INSTANCE_ID = codeInstance.getInstance();
const fileName = "Point-Service";

export class PointService {
  private pointRepository = AppDataSource.getRepository(Point);

  public async createPoint(pointBody: PointBody) {
    try {
      const point = this.pointRepository.create({
        name: pointBody.name,
        cordinates: {
          type: "Point",
          coordinates: [pointBody.longitude, pointBody.latitude],
        },
        address: pointBody.address,
      });
      console.log(point);

      return await this.pointRepository.save(point);
    } catch (error: any) {
      if (error instanceof ErrorException) throw error;
      console.error(
        `${APP_INSTANCE_ID}: ${fileName} -> Error while stoing point-data: ${error}`
      );
      throw getInternalServerTmfError(error.message);
    }
  }

  public async getPointsData() {
    try {
      const points = await this.pointRepository.find();
      return points;
    } catch (error: any) {
      if (error instanceof ErrorException) throw error;
      console.error(
        `${APP_INSTANCE_ID}: ${fileName} -> Error while fetching point-data: ${error}`
      );
      throw getInternalServerTmfError(error.message);
    }
  }

  public async updatePoint(id: number, pointBody: PointBody) {
    try {
      const point = await this.pointRepository.findOneBy({ id });
      if (!point) {
        console.error(
          `${APP_INSTANCE_ID}: ${fileName} -> Error while getting point-data by id: ${id}`
        );
        throw getNotFoundTmfError(`Point-data not found with id: ${id}`);
      }
      point.name = pointBody.name;
      point.cordinates.coordinates = [pointBody.longitude, pointBody.latitude];
      point.address = pointBody.address;
      return await this.pointRepository.save(point);
    } catch (error: any) {
      if (error instanceof ErrorException) throw error;
      console.error(
        `${APP_INSTANCE_ID}: ${fileName} -> Error while Updating point-data: ${error}`
      );
      throw getInternalServerTmfError(error.message);
    }
  }
}

export const pointService = new PointService();
