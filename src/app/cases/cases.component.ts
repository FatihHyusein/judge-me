import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { CaseModel } from './CaseModel';

@Component({
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent {
  casesCollection: AngularFirestoreCollection<CaseModel>;
  cases$: Observable<CaseModel[]>;
  casesData = [];

  constructor(private db: AngularFirestore) {
    this.casesCollection = db.collection('cases');
    this.cases$ = this.casesCollection.valueChanges();
    this.cases$.subscribe(data => this.casesData = data);


    // collection.update(data)
    // collection.delete()
  }
}
