package com.seshadev.chatApp.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.seshadev.chatApp.entities.Room;

public interface RoomRepo extends MongoRepository<Room, String> {
	
	Room findByRoomId(String roomId);

}
