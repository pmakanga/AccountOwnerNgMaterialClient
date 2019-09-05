import { Owner } from './owner.model';


export interface Account{
    id: string;
    dateCreated: Date;
    accountType: string;
    ownerId?: string;
    owner: string;

}