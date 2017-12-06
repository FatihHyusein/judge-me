import {Component, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { CaseModel } from './CaseModel';
import { AngularFireAuth } from 'angularfire2/auth';
import { IgxToast } from 'igniteui-js-blocks/main';
import {User} from 'firebase';

@Component({
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent {
  @ViewChild('toast') toast: IgxToast;
  casesCollection: AngularFirestoreCollection<CaseModel>;
  usersCollection: AngularFirestoreCollection<CaseModel>;
  cases$: Observable<DocumentChangeAction[]>;
  casesData = [];
  currentUser;

  constructor(private db: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.auth.onAuthStateChanged((data) => {

      if (data) {
        this.currentUser = this.afAuth.auth.currentUser;
      } else {
        this.currentUser = null;
      }
    });

    this.usersCollection = db.collection('users');
    this.casesCollection = db.collection('cases');
    this.cases$ = this.casesCollection.snapshotChanges();
    this.cases$.subscribe(data => {
      this.casesData = [];
      data.forEach((caseItem) => {
        const caseItemData = caseItem.payload.doc.data();
        this.casesData.push(Object.assign({ id: caseItem.payload.doc.id }, caseItemData));

        if (caseItemData.status) {
          this.usersCollection.doc(caseItemData.status).ref.get()
            .then(doc => {
              const docData = doc.data();

              this.usersCollection.doc(caseItemData.status).set(Object.assign(doc.data(),
                {win: parseInt(docData.wins, 10) + 1}));
            });
        }

      });
    });
  }

  beDefendant(caseRow) {
    if (this.currentUser) {
      this.getCaseSide(caseRow, 'defendant');
    }
  }

  bePlantiff(caseRow) {
    if (this.currentUser) {
      this.getCaseSide(caseRow, 'plaintiff');
    }
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
        uid: this.currentUser.uid,
        name: this.currentUser.displayName || this.afAuth.auth.currentUser.email
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
      [side]: {
        uid: '',
        name: ''
      }
    }))
      .then(() => {
        this.toast.show();
      })
      .catch(error => {
        console.error(error);
      });
  }
}
