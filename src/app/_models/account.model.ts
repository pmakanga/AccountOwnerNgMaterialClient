import { Owner } from './owner.model';


export interface Account{
    id: string;
    accountType: string;
    dateCreated: Date;
    owner: string;
    ownerId: string;

}