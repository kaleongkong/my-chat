import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase, private router: Router) {}

  login(email: string, password: string) {
  	return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  		.then((resolve) => {
        const status = 'online';
  			this.setUserStatus(status);
  			this.router.navigate(['chat']);
  		});
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  signUp(email: string, password: string, displayName: string) {
  	return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  		.then((user) => {
  			const status = 'online';
  			this.setUserData(email, displayName, status);
  		}).catch(error => console.log(error));
  }

  authState() {
  	return this.afAuth.authState;
  }

  setUserData(email: string, displayName: string, status: string) {
  	this.afAuth.authState.subscribe(user => {
      const currentUserID = user.uid;
      const path = `users/${currentUserID}`;
	  	const data = {
	  		email,
	  		displayName,
	  		status
	  	};

	  	this.db.object(path).update(data)
	  		.catch(error => console.log(error));
    });
  }

  setUserStatus(status: string) {
  	this.afAuth.authState.subscribe(user => {
  		const currentUserID = user.uid;
	  	const path = `users/${currentUserID}`;
	  	const data = { status };

	  	this.db.object(path).update(data)
	  		.catch(error => console.log(error));
  	});
  }
}
