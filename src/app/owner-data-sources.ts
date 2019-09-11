import { DataSource } from '@angular/cdk/table';
import { Owner } from './_models/owner.model';
import { CollectionViewer } from '@angular/cdk/collections';
import { Observable, BehaviorSubject } from 'rxjs';


export class OwnerDataSources implements DataSource<Owner> {

    private ownersSubject = new BehaviorSubject<Owner[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();
    
    connect(collectionViewer: CollectionViewer): Observable<Owner[]> {
        return this.ownersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.ownersSubject.complete();
        this.loadingSubject.complete();
    }
    
}