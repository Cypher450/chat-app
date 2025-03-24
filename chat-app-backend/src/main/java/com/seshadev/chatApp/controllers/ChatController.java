package com.seshadev.chatApp.controllers;

import java.time.LocalDateTime;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;

import com.seshadev.chatApp.Payload.MessageRequest;
import com.seshadev.chatApp.entities.Message;
import com.seshadev.chatApp.entities.Room;
import com.seshadev.chatApp.repo.RoomRepo;

@CrossOrigin("http://localhost:3000")
@Controller
public class ChatController {
	
	private RoomRepo roomRepository;

	public ChatController(RoomRepo roomRepository) {
		super();
		this.roomRepository = roomRepository;
	}
	
	@MessageMapping("/sendMessage/{roomId}")
	@SendTo("/topic/room/{roomId}")
	public Message sendMessage(@DestinationVariable String roomId,@RequestBody MessageRequest request) {
		
		Room room = roomRepository.findByRoomId(request.getRoomId());
		
		Message message = new Message();
		message.setContent(request.getContent());
		message.setSender(request.getSender());
		message.setTimeStamp(LocalDateTime.now());
		
		
		if(room == null) {
			room.getMessages().add(message);
			roomRepository.save(room);
		} else {
			throw new RuntimeException("Room not found!!");
		}
		return message; 
		
	}

}
