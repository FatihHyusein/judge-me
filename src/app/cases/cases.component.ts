import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { CaseModel } from './CaseModel';
import { AngularFireAuth } from 'angularfire2/auth';
import { IgxToast } from 'igniteui-js-blocks/main';

@Component({
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent {
  @ViewChild('toast') toast: IgxToast;
  casesCollection: AngularFirestoreCollection<CaseModel>;
  cases$: Observable<DocumentChangeAction[]>;
  casesData = [];

  constructor(private db: AngularFirestore, public afAuth: AngularFireAuth) {
    this.casesCollection = db.collection('cases');
    this.cases$ = this.casesCollection.snapshotChanges();
    this.cases$.subscribe(data => {
      this.casesData = [];
      data.forEach((caseItem) => {
        this.casesData.push(Object.assign({ id: caseItem.payload.doc.id }, caseItem.payload.doc.data()));
      });
    });
  }

  beDefendant(caseRow) {
    this.getCaseSide(caseRow, 'defendant');
  }

  bePlantiff(caseRow) {
    this.getCaseSide(caseRow, 'plaintiff');
  }

  cancelDefendant(caseRow) {
    this.cancelCaseSide(caseRow, 'defendant');
  }

  cancelPlantiff(caseRow) {
    this.cancelCaseSide(caseRow, 'plaintiff');
  }

  getCaseSide(caseRow, side) {
    this.casesCollection.doc(this.casesData[caseRow].id).set(Object.assign(this.casesData[caseRow], {
      [side]: {
        uid: this.afAuth.auth.currentUser.uid,
        name: this.afAuth.auth.currentUser.displayName || this.afAuth.auth.currentUser.email
      }
    }))
      .then(() => {
        this.toast.show();
      })
      .catch(error => {
        console.error(error);
      });
  }

  cancelCaseSide(caseRow, side) {
    this.casesCollection.doc(this.casesData[caseRow].id).set(Object.assign(this.casesData[caseRow], {
      [side]: null
    }))
      .then(() => {
        this.toast.show();
      })
      .catch(error => {
        console.error(error);
      });
  }
}
