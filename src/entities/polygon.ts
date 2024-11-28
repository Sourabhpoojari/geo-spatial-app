import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Polygon {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("geometry", { spatialFeatureType: "Polygon", srid: 4326 })
  geometry!: { type: string; coordinates: number[][][] };

  @Column()
  title!: string;

  @Column({ type: "text", nullable: true })
  description?: string;
}
