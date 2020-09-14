import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { ChatMessage } from '../models/chat-message.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnChanges {
	dummy: ChatMessage = {email: "", message: "", timeSent: "Mon Sep 07 2020 03:10:29 GMT-0700 (Pacific Daylight Time)", userName: ""}
	feed: Observable<ChatMessage[]>;

  constructor(private chat: ChatService) { }

  ngOnInit() {
  	this.feed = this.chat.getMessages();
  }

  ngOnChanges() {
  	this.feed = this.chat.getMessages();
  }

}
