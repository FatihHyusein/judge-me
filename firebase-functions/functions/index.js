const functions = require('firebase-functions');

exports.updateStatus = functions.firestore
  .document('cases/{caseID}')
  .onWrite(event => {
    const document = event.data.data();

    if (event.data.previous) {
      const oldDocument = event.data.previous.data();
    }

    if(!document.status && document.plaintiff && document.defendant) {
      document.status = document.plaintiff.uid;
      const winnerId = [document.plaintiff.uid, document.defendant.uid][Math.round(Math.random()%2)];

      console.log(event);
      console.log(event.data);

      return event.data.ref.set({
        status: winnerId
      }, {merge: true});
    }

    return;
  });

