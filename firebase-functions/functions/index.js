const functions = require('firebase-functions');

exports.updateStatus = functions.firestore
  .document('/cases/{caseID}')
  .onWrite(event => {
    const document = event.data.data();

    if (event.data.previous) {
      const oldDocument = event.data.previous.data();
    }

    if(document.plaintiff.uid && document.defendant.uid) {
      const winnerId = [document.plaintiff.uid, document.defendant.uid][Math.round(Math.random()%2)];

      return event.data.ref.set({
        status: winnerId
      }, {merge: true});

    } else if (!document.plaintiff.uid || !document.defendant.uid) {

      return event.data.ref.set({
        status: ''
      }, {merge: true});

    }

  });

