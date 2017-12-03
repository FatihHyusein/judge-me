import { Component, ViewChild } from '@angular/core';
import { IgxDialog } from 'igniteui-js-blocks/main';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent {
  @ViewChild('form') loginDialog: IgxDialog;
  email;
  password;
  lawyersCollection;

  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore) {
    this.lawyersCollection = db.collection('users');
  }

  openDialog() {
    this.loginDialog.open();
  }

  basicLogin() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password).then((data: firebase.User) => {
      this.loginDialog.close();
      this.addToUsersIfDontExist(data);
    });
  }

  googleLogin() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((data: firebase.User) => {
      this.loginDialog.close();
      this.addToUsersIfDontExist(data);
    });
  }

  addToUsersIfDontExist({ uid, displayName, email, phoneNumber, photoURL }) {
    this.lawyersCollection.add({ uid, displayName, email, phoneNumber, photoURL, wins: 0, loses: 0 });
  }
}
