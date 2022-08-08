export class TotalSales {
    id: number;
    facilityName: string;
    hallName: string;
    concertID: number;
    organization: string;
    class: string;
    numberOfSeats: number;
    soldSeats: number;

    constructor(){};

    // public calculateProgress():string {
    //     let result: number;
    //     result = this.soldSeats / this.numberOfSeats * 100;
    //     return result.toFixed(1);
    // };

    public static calculateProgress(sold:number, total: number):string {
        let result: number;
        result = sold / total * 100;
        return result.toFixed(1);        
    };
}
