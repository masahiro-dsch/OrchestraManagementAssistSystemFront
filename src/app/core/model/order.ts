export class Order {
    id: number;
    concertID: number;
    concertName: string;
    orderDetail: Array<{
        floor: string;
        column: string;
        number: string;
        rank: string;    
    }>;
    userID: string;
    nameSei: string;
    nameMei: string;
    postCode: string;
    address: string;
    mail: string;
    phone: string;
    orderDate: Date;
    payMethod: string;
    payStatus: string;
    passMethod: string;
    passStatus: string;
}
