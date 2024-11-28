import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "geometry", spatialFeatureType: "Point", srid: 4326 })
  cordinates!: { type: string; coordinates: [number, number] };

  @Column()
  name!: string;

  @Column({ type: "text", nullable: true })
  address?: string;
}
