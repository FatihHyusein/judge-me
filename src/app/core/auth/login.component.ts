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
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((data) => {
      this.loginDialog.close();
      this.addToUsersIfDontExist(data.user);
    });
  }

  addToUsersIfDontExist(data): void {
    const docRef = this.lawyersCollection.doc(data.uid).ref;

    this.model = {
      photoURL: data.photoURL,
      displayName: data.displayName,
      email: data.email,
      phoneNumber: data.phoneNumber,
      wins: 0,
      loses: 0
    };

    docRef.get()
      .then(doc => {
        if (!doc.exists) {
          this.lawyersCollection.doc(data.uid).set(this.model)
            .then(() => {
            })
            .catch(error => {
              console.error(error);
            });
        } else {
          console.log('User already exists!');
        }
      })
      .catch(function(error) {
        console.log('Error getting document:', error);
      });
  }
}
