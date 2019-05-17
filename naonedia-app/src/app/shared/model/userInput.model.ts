import { HouseType } from './houseType.model';
import { Town } from './town.model';
import { DistanceType } from './distanceType.model';
import { POI } from './poi.model';

export class UserInput {
    public constructor(
        public type: HouseType,
        public groundSurface: number,
        public roomNumber: number,
        public location: Town,
        public close: POI[],
        public medium: POI[],
        public far: POI[]
        ) {
        this.type = type;
        this.groundSurface = groundSurface;
        this.roomNumber = roomNumber;
        this.location = location;
        // Points of Interest
        this.close = close;
        this.medium = medium;
        this.far = far;
    }
}
