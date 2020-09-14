export class ChatMessage {
	$key?: string;
	email?: string;
	userName?: string;
	message?: string;
	timeSent?: string = String(new Date());
}