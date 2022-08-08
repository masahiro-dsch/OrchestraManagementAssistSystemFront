export class Concert {
    id: number;
    title: string;
    date: Date;
    organizations: string[];
    description: string;

    constructor(id: number, title: string, date: Date, organizations: string[], description: string){
        this.id = id;
        this.title = title;
        this.date = date;
        this.organizations = organizations;
        this.description = description;
    }
}
