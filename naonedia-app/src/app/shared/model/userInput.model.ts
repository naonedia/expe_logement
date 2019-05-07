import { HouseType } from './houseType.model';
import { Town } from './town.model';

export class UserInput {
    public constructor(
        public type: HouseType,
        public groundSurface: number,
        public roomNumber: number,
        public location: Town) {
        this.type = type;
        this.groundSurface = groundSurface;
        this.roomNumber = roomNumber;
        this.location = location;
    }
}
