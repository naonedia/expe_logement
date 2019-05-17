export class HouseType {
    private translationKey;
    constructor(public name: string, public icon: string) {
        this.name = name;
        this.icon = icon;
        this.translationKey = 'houseType.' + name;
    }
}

export const HouseTypeList = [
    new HouseType('house', 'home'),
    new HouseType('flat', 'building')
];
