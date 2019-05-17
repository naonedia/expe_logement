export class POI {
    private translationKey;

    constructor(public name: string) {
        this.name = name;
        this.translationKey = 'model.input.' + name;
    }
}

export const poiList = [
    new POI('medical'),
    new POI('parks'),
    new POI('transport'),
    new POI('daily'),
    new POI('distractions')
];
