import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { LawyerModel } from './LawyerModel';
import { Observable } from 'rxjs/Observable';

@Component({
  templateUrl: './lawyers.component.html',
  styleUrls: ['./lawyers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LawyersComponent {
  lawyersCollection: AngularFirestoreCollection<LawyerModel>;
  lawyers$: Observable<LawyerModel[]>;

  constructor(private db: AngularFirestore) {
    this.lawyersCollection = db.collection('users');
    this.lawyers$ = this.lawyersCollection.valueChanges();

    // collection.update(data)
    // collection.delete()
  }

}
