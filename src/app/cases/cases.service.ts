import { Injectable } from '@angular/core';
import {AngularFirestoreCollection} from 'angularfire2/firestore';
import {CaseModel} from './CaseModel';

@Injectable()

export class CasesService {

  constructor() {}

  updateLawyerStats(caseItemData, usersCollection: AngularFirestoreCollection<CaseModel>) {

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
          });
      });
  }
}
