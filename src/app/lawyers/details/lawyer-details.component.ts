import {ChangeDetectorRef, Component, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IgxToast } from 'igniteui-js-blocks/main';
import DocumentData = firebase.firestore.DocumentData;
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  templateUrl: './lawyer-details.component.html',
  styleUrls: ['./lawyer-details.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LawyerDetailsComponent implements OnDestroy {
  @ViewChild('toast') toast: IgxToast;

  lawyer: DocumentData;
  phoneNumber: number;
  displayName: string;
  myForm: FormGroup;
  docRef: DocumentData;

  constructor(private db: AngularFirestore, private route: ActivatedRoute, public afAuth: AngularFireAuth, private ref: ChangeDetectorRef) {
    this.route.params.subscribe((params) => {
      if (params.lawyerId) {
        this.docRef = db.collection('users').doc(params.lawyerId).ref;

        this.docRef.get()
          .then(doc => {
            this.lawyer = doc.data();
            this.myForm = new FormGroup({
              phoneNumber: new FormControl(this.lawyer.phoneNumber, Validators.required),
              displayName: new FormControl(this.lawyer.displayName, Validators.required)
            });

            this.afAuth.auth.onAuthStateChanged((data) => {
              this.ref.detectChanges();

              if (!data || (data && this.afAuth.auth.currentUser.uid !== params.lawyerId)) {
                this.myForm.disable();
              } else {
                this.myForm.enable();
              }
            });
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  }

  ngOnDestroy() {
    this.ref.detach();
  }

  onImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      this.lawyer.photoURL = reader.result;
    });

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.docRef.set({
      phoneNumber: this.myForm.controls['phoneNumber'].value,
      displayName: this.myForm.controls['displayName'].value,
      photoURL: this.lawyer.photoURL
    }, { merge: true }).then(() => {
      this.toast.show();
    });
  }

}
