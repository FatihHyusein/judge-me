import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './core/auth/login.component';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { NavigationDrawer } from 'igniteui-js-blocks/main';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('loginDialog') loginDialog: LoginComponent;
  @ViewChild(NavigationDrawer) navDrawer: NavigationDrawer;
  loggedUserData: firebase.User = <firebase.User>{};
  open = false;

  constructor(private router: Router, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((data) => this.loggedUserData = data);
  }

  showLoginDialog() {
    this.loginDialog.openDialog();
  }

  navigateToHome() {
    this.router.navigate(['./']);
  }

  logout() {
    this.navDrawer.close();
    this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  goToMyProfile() {
    this.navDrawer.close();
    this.router.navigate(['lawyers', this.loggedUserData.uid]);
  }
}
