import {Component, ViewChild, ViewEncapsulation} from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import DocumentData = firebase.firestore.DocumentData;
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  templateUrl: './lawyer-details.component.html',
  styleUrls: ['./lawyer-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LawyerDetailsComponent {
  lawyer: DocumentData;
  phoneNumber: number;
  myForm: FormGroup;
  docRef: DocumentData;


  constructor(private db: AngularFirestore, private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      if (params.lawyerId) {
        this.docRef = db.collection('users').doc(params.lawyerId).ref;

        this.docRef.get()
          .then(doc => {
            this.lawyer = doc.data();
            this.myForm = new FormGroup({
              phoneNumber: new FormControl(this.lawyer.phoneNumber, Validators.required)
            });
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  }

  onSubmit(): void {
    this.docRef.set({
      phoneNumber: this.myForm.controls['phoneNumber'].value
    }, { merge: true });
  }

}
