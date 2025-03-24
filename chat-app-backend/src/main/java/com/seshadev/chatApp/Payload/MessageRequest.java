package com.seshadev.chatApp.Payload;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MessageRequest {

	private String content;
	private String sender;
	private String roomId;
	private LocalDateTime messageTime;
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getSender() {
		return sender;
	}
	public void setSender(String sender) {
		this.sender = sender;
	}
	public String getRoomId() {
		return roomId;
	}
	public void setRoomId(String roomId) {
		this.roomId = roomId;
	}

	public LocalDateTime getMessageTime() {
		return messageTime;
	}
	public void setMessageTime(LocalDateTime messageTime) {
		this.messageTime = messageTime;
	}
	
}
