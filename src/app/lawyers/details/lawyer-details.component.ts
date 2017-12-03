import { Component, ViewEncapsulation } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { LawyerModel } from '../LawyerModel';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './lawyer-details.component.html',
  styleUrls: ['./lawyer-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LawyerDetailsComponent {
  lawyer: AngularFirestoreDocument<LawyerModel>;
  lawyer$: Observable<LawyerModel>;

  constructor(private db: AngularFirestore, private route: ActivatedRoute) {
    this.route.params.subscribe(({ lawyerId }) => {
      this.lawyer = db.doc(`users/${lawyerId}`);
      this.lawyer$ = this.lawyer.valueChanges();
    });


    // collection.update(data)
    // collection.delete()
  }

}
