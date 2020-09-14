import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

	user: firebase.User;
	chatMessages: Observable<ChatMessage[]>;
	chatMessage: ChatMessage;
	userName: string;

  constructor(
  	private db: AngularFireDatabase,
  	private afAuth: AngularFireAuth) {
  	this.afAuth.authState.subscribe(auth => {
  		if(auth !== undefined && auth !== null ) {
  			this.user = auth;
  		}

  		this.getUser().valueChanges().subscribe( (a: any) => {
        this.userName = a.displayName;
      });
  	});
  }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = `/users`;
    return this.db.list(path);
  }

  sendMessage(msg: string) {
  	const timestamp = this.getTimeStamp();
  	const email = this.user.email;
  	this.chatMessages = this.getMessages();
  	this.db.list<ChatMessage>('messages', ref => ref.limitToLast(25).orderByKey()).push({
  		message: msg,
  		timeSent: String(new Date(timestamp)),
  		userName: this.userName,
  		email: email,
  	});

  	console.log('Called sendMessage');
  }

  getMessages(): Observable<ChatMessage[]> {
  	return this.db.list<ChatMessage>('messages', ref => ref.limitToLast(25).orderByKey()).valueChanges();
  }

  getTimeStamp() {
  	const now = new Date();
  	const date = now.getUTCFullYear() + '/' + (now.getUTCMonth() + 1) + '/' + now.getUTCDate();
  	const time = now.getUTCHours() + ':' + now.getUTCMinutes() + ':' + now.getUTCSeconds();
  	return (date + ' ' + time);
  }
}
