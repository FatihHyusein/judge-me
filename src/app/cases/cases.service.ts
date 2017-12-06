import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import {CaseModel} from './CaseModel';

@Injectable()

export class CasesService {

  constructor(private db: AngularFirestore) {}

  updateLawyerStats(caseItemData,
    usersCollection: AngularFirestoreCollection<CaseModel>,
    casesCollection: AngularFirestoreCollection<CaseModel>) {

    if (caseItemData.status) {
      const defendant = usersCollection.doc(caseItemData.defendant.uid);
      const plaintiff = casesCollection.doc(caseItemData.plaintiff.uid);
      const defendantResult = caseItemData.status === caseItemData.defendant.uid ? 'wins' : 'loses';
      const plaintiffResult = caseItemData.status === caseItemData.plaintiff.uid ? 'wins' : 'loses';

      defendant.ref.get()
        .then(doc => {
          const docData = doc.data();

          defendant.set(
            {
              cases: {[caseItemData.id]: defendantResult},
            }, {merge: true})
            .then(() => {
              defendant.ref.get()
                .then(newDoc => {
                  const defendantCases = newDoc.data().cases;
                  let wins = 0;
                  let loses = 0;

                  Object.keys(defendantCases).forEach(propName => {
                    if (defendantCases[propName] === 'wins') {
                      wins++;
                    }
                    if (defendantCases[propName] === 'loses') {
                      loses++;
                    }
                  });

                  defendant.set(
                    {
                      wins: wins,
                      loses: loses
                    }, {merge: true});
                });
            });
        });

      plaintiff.ref.get()
        .then(doc => {
          const docData = doc.data();

          plaintiff.set(
            {
              cases: {[caseItemData.id]: plaintiffResult},
            }, {merge: true})
            .then(() => {
              plaintiff.ref.get()
                .then(newDoc => {
                  const plaintiffCases = newDoc.data().cases;
                  let wins = 0;
                  let loses = 0;

                  Object.keys(plaintiffCases).forEach(propName => {
                    if (plaintiffCases[propName] === 'wins') {
                      wins++;
                    }
                    if (plaintiffCases[propName] === 'loses') {
                      loses++;
                    }
                  });

                  plaintiff.set(
                    {
                      wins: wins,
                      loses: loses
                    }, {merge: true});
                });
            });

        });

    }
  }
}
