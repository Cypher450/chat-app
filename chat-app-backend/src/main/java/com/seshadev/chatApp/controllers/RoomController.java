package com.seshadev.chatApp.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.seshadev.chatApp.entities.Message;
import com.seshadev.chatApp.entities.Room;
import com.seshadev.chatApp.repo.RoomRepo;

@RestController
@RequestMapping("api/v1/room")
@CrossOrigin("http://localhost:5173")

public class RoomController {
	private RoomRepo roomRepository;

	public RoomController(RoomRepo roomRepository) {
		super();
		this.roomRepository = roomRepository;
	}

	@PostMapping
	public ResponseEntity<?> createRoom(@RequestBody String roomId) {

		if (roomRepository.findByRoomId(roomId) != null) {
			return ResponseEntity.badRequest().body("Room already exists");
		}

		Room room = new Room();
		room.setRoomId(roomId);
		Room savedRoom = roomRepository.save(room);
		return ResponseEntity.status(HttpStatus.CREATED).body(room);

	}

	@GetMapping("/{roomId}")
	public ResponseEntity<?> joinRoom(@PathVariable String roomId) {

		Room room = roomRepository.findByRoomId(roomId);

		if (room == null) {
			return ResponseEntity.badRequest().body("Room not found!!");
		}

		return ResponseEntity.ok(room);
	}

	@GetMapping("/{roomId}/messages")
	public ResponseEntity<List<Message>> getMessages( @PathVariable String roomId, 
			@RequestParam(defaultValue = "0", required = false) int page,
			@RequestParam(defaultValue = "20", required = false) int size
			){
		
		Room room = roomRepository.findByRoomId(roomId);
		
		if(room == null) {
			return ResponseEntity.badRequest().build();
		}
		
		List<Message> messages = room.getMessages();
		
		int start = Math.max(0, messages.size() - (page+1)*size);
		int end = Math.min(messages.size(), start+size);
		List<Message> paginatedMessages = messages.subList(start, end);
		
		
		return ResponseEntity.ok(paginatedMessages);
			
	}

}
