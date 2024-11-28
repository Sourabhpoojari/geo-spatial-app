import { ErrorException } from "../helpers/errorException";
import { AppDataSource } from "../clients/pgClient";
import { codeInstance } from "../helpers/codeInstanceID";
import {
  getInternalServerTmfError,
  getNotFoundTmfError,
} from "../helpers/commonErrors";
import { Polygon } from "../entities/polygon";
import { PolygonBody } from "../types/polygon.type";

const APP_INSTANCE_ID = codeInstance.getInstance();
const fileName = "Polygon-Service";

export class PolygonService {
  private polygonRepository = AppDataSource.getRepository(Polygon);

  public async createPolygon(polygonBody: PolygonBody) {
    try {
      const polygon = this.polygonRepository.create({
        title: polygonBody.title,
        geometry: {
          type: "Polygon",
          coordinates: polygonBody.coordinates,
        },
        description: polygonBody.description,
      });
      console.log(polygon);

      return await this.polygonRepository.save(polygon);
    } catch (error: any) {
      if (error instanceof ErrorException) throw error;
      console.error(
        `${APP_INSTANCE_ID}: ${fileName} -> Error while stoing polygon-data: ${error}`
      );
      throw getInternalServerTmfError(error.message);
    }
  }

  public async getPolygonData() {
    try {
      const polygons = await this.polygonRepository.find();
      return polygons;
    } catch (error: any) {
      if (error instanceof ErrorException) throw error;
      console.error(
        `${APP_INSTANCE_ID}: ${fileName} -> Error while fetching polygon-data: ${error}`
      );
      throw getInternalServerTmfError(error.message);
    }
  }

  public async getPolygonDataById(id: number) {
    try {
      const polygon = await this.polygonRepository.findOneBy({ id });
      if (!polygon) {
        console.error(
          `${APP_INSTANCE_ID}: ${fileName} -> Error while getting polygon-data by id: ${id}`
        );
        throw getNotFoundTmfError(`polygon-data not found with id: ${id}`);
      }
      return polygon;
    } catch (error: any) {
      if (error instanceof ErrorException) throw error;
      console.error(
        `${APP_INSTANCE_ID}: ${fileName} -> Error while fetching polygon-data: ${error}`
      );
      throw getInternalServerTmfError(error.message);
    }
  }

  public async updatePolygon(id: number, polygonBody: PolygonBody) {
    try {
      const polygon = await this.getPolygonDataById(id);
      polygon.title = polygonBody.title;
      polygon.geometry.coordinates = polygonBody.coordinates;
      polygon.description = polygonBody.description;
      return await this.polygonRepository.save(polygon);
    } catch (error: any) {
      if (error instanceof ErrorException) throw error;
      console.error(
        `${APP_INSTANCE_ID}: ${fileName} -> Error while Updating polygon-data: ${error}`
      );
      throw getInternalServerTmfError(error.message);
    }
  }
}

export const polygonService = new PolygonService();
