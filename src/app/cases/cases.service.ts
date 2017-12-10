import { Injectable } from '@angular/core';
import {AngularFirestoreCollection} from 'angularfire2/firestore';
import {LawyerModel} from '../lawyers/LawyerModel';
import * as firebase from 'firebase/app';

@Injectable()

export class CasesService {

  constructor() {}

  updateLawyer(caseItemData, usersCollection: AngularFirestoreCollection<LawyerModel>) {

    if (caseItemData.status) {
      const defendant = usersCollection.doc(caseItemData.defendant.uid);
      const plaintiff = usersCollection.doc(caseItemData.plaintiff.uid);
      const defendantResult = caseItemData.status === caseItemData.defendant.uid ? 'wins' : 'loses';
      const plaintiffResult = caseItemData.status === caseItemData.plaintiff.uid ? 'wins' : 'loses';

      this.addCasesToLawer(defendant, defendantResult, caseItemData);
      this.addCasesToLawer(plaintiff, plaintiffResult, caseItemData);
    }
  }

  addCasesToLawer(lawyer, laywerResult, caseItemData) {
    lawyer.set(
      {
        cases: {[caseItemData.id]: laywerResult},
      }, {merge: true})
      .then(() => {
        lawyer.ref.get()
          .then(newDoc => {
            const laweyerData = newDoc.data();

            if (laweyerData.cases) {
              const laywerCases = newDoc.data().cases;
              let wins = 0;
              let loses = 0;

              Object.keys(laywerCases).forEach(propName => {
                if (laywerCases[propName] === 'wins') {
                  wins++;
                }
                if (laywerCases[propName] === 'loses') {
                  loses++;
                }
              });

              lawyer.set(
                {
                  wins: wins,
                  loses: loses
                }, {merge: true});
            }

          });
      });
  }

  removeUserCases(usersCollection, casesData) {
    usersCollection.ref.get()
      .then(userData => {
        userData.forEach(userItem => {
          const userItemData = userItem.data();
          const userUid = userItem.id;
          const userRef = usersCollection.doc(userUid);

          if (userItemData.cases) {
            const userCases = userItemData.cases;
            const casesNames = casesData.map(element => element.id);

            Object.keys(userCases).forEach(caseName => {
              if (casesNames.indexOf(caseName) === -1) {
                userRef.update({
                  cases: firebase.firestore.FieldValue.delete()
                });
              }
            });
          } else {
            userRef.set(
              {
                wins: 0,
                loses: 0
              }, {merge: true});
          }

        });
      });
  }
}
