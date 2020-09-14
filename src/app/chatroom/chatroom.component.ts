import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit, AfterViewChecked {
	@ViewChild('scroller', {static: false}) private feedContainer: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked() {
  	this.scrollToBottom();
  }

  scrollToBottom(): void {
  	this.feedContainer.nativeElement.scorllTop = this.feedContainer.nativeElement.scrollHeight;
  }

}
