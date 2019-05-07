export class Town {
    public constructor(public name: string, public postalCode: number) {
        this.name = name;
        this.postalCode = postalCode;
    }
    public toString() {
        return this.postalCode + ' - ' + this.name;
    }
}
