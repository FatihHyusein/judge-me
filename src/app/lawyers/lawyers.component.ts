import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { LawyerModel } from './LawyerModel';
import { Observable } from 'rxjs/Observable';
import { IgxSnackbar } from 'igniteui-js-blocks/main';

@Component({
  templateUrl: './lawyers.component.html',
  styleUrls: ['./lawyers.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LawyersComponent {
  @ViewChild('snackbar') snackbar: IgxSnackbar;
  pendingAction;
  lawyersCollection: AngularFirestoreCollection<LawyerModel>;
  lawyers$: Observable<LawyerModel[]>;

  constructor(private db: AngularFirestore) {
    this.lawyersCollection = db.collection('users');
    this.lawyers$ = this.lawyersCollection.valueChanges();

    // collection.update(data)
    // collection.delete()
  }

  sendMail(email) {
    window.location.href = `mailto:${email}?Enter%20subject&body=Fill%20your%20complain%20here`;
  }

  startPhoneCall(phoneNumber) {
    window.location.href = `tel://${phoneNumber}`;
  }

  confirmAction({ action, data }) {
    this.snackbar.show();
    this.pendingAction = () => action(data);
  }

  callConfirmedAction() {
    this.snackbar.hide();
    if (typeof this.pendingAction === 'function') {
      this.pendingAction();
    }
  }
}
