import {Component, ViewChild} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { CaseModel } from './CaseModel';
import { AngularFireAuth } from 'angularfire2/auth';
import {IgxDialog, IgxToast} from 'igniteui-js-blocks/main';
import {CasesService} from './cases.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import * as firebase from 'firebase/app';
import {LawyerModel} from '../lawyers/LawyerModel';

@Component({
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent {
  @ViewChild('toast') toast: IgxToast;
  @ViewChild('addCase') addCaseDialog: IgxDialog;
  casesCollection: AngularFirestoreCollection<CaseModel>;
  usersCollection: AngularFirestoreCollection<LawyerModel>;
  cases$: Observable<DocumentChangeAction[]>;
  casesData = [];
  currentUser;
  caseIds: Array<string> = [];
  addCaseForm: FormGroup;

  constructor(private db: AngularFirestore, public afAuth: AngularFireAuth, private casesSrv: CasesService) {
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
      this.caseIds = [];

      data.forEach((caseItem) => {
        const caseItemData = caseItem.payload.doc.data();
        this.casesData.push(Object.assign({ id: caseItem.payload.doc.id }, caseItemData));
      });

      this.casesSrv.removeUserCases(this.usersCollection, this.casesData);
      this.casesData.forEach(caseItemData => {
        this.casesSrv.updateLawyer(caseItemData, this.usersCollection);
      });

    });

    this.createAddCaseForm();
  }

  openAddCase() {
    this.addCaseDialog.open();
  }

  closeAddCase() {
    this.addCaseDialog.close();
    this.addCaseForm.reset();
  }

  createAddCaseForm() {
    this.addCaseForm = new FormGroup({
      description: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
    });
  }

  onAddCaseSubmit() {
    if (this.casesCollection) {

      this.casesCollection.add(
        {
          description: this.addCaseForm.controls['description'].value,
          title: this.addCaseForm.controls['title'].value,
          defendant: {},
          plaintiff: {},
          status: '',
          winProbability: Math.floor((Math.random() * 100) + 1)
        })
        .then(() => {
          this.addCaseDialog.close();
          this.addCaseForm.reset();
        });
    }
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
