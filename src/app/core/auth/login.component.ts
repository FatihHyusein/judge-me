import { Component, ViewChild } from '@angular/core';
import { IgxDialog } from 'igniteui-js-blocks/main';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import {LawyerModel} from '../../lawyers/LawyerModel';

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

  model: LawyerModel;

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
      console.log('data: ', data);
      this.loginDialog.close();
      this.addToUsersIfDontExist(data);
    });
  }

  addToUsersIfDontExist(data): void {
    this.model = {
      photoURL: data.user.photoURL,
      displayName: data.user.displayName,
      email: data.user.email,
      phoneNumber: data.user.phoneNumber,
      wins: 0,
      loses: 0
    };

    this.db.collection('users').doc(data.user.uid).set(this.model)
      .then(result => {
        console.log('result: ', result);
      })
      .catch(error => {
        console.error(error);
      });

    this.lawyersCollection.add(this.model); // not needed
  }
}
