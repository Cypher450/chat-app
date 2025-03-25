import React, { useState } from "react";
import toast from "react-hot-toast";
import { createRoomApi, joinChatApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router";

const JoinCreateChat = () => {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });

  const { setRoomID, setCurrentUser, setConnected } = useChatContext();
  const navigate = useNavigate();

  function handleFormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  function validateRoom() {
    if (detail.roomId.trim() === "" || detail.userName.trim() === "") {
      toast.error("Room ID and User Name cannot be empty");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (!validateRoom()) return;

    try {
      const room = await joinChatApi(detail.roomId);
      setRoomID(room.roomId);
      setCurrentUser(detail.userName);
      setConnected(true);
      navigate("/chat");
      toast.success("Joined room successfully");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data || "Room doesn't exist");
      } else {
        toast.error("Failed to join room");
      }
      console.error("Join room error:", error);
    }
  }

  async function createRoom() {
    if (!validateRoom()) return;

    try {
      const response = await createRoomApi(detail.roomId);
      toast.success("Room created successfully");
      setRoomID(response.roomId);
      setCurrentUser(detail.userName);
      setConnected(true);
      navigate("/chat");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Room already exists");
      } else {
        toast.error("Error creating room");
      }
      console.error("Create room error:", error);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f7ecea",
      }}
    >
      <div
        style={{
          border: "1px solid #d1d5db",
          padding: "2rem",
          width: "100%",
          maxWidth: "28rem",
          borderRadius: "0.375rem",
          backgroundColor: "#ffffff",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "#1f2937",
          }}
        >
          Join or Create a Room
        </h1>

        {/* Name div */}
        <div style={{ marginBottom: "1rem" }}>
          <label
            htmlFor="userName"
            style={{
              display: "block",
              fontWeight: 500,
              marginBottom: "0.5rem",
              color: "#374151",
            }}
          >
            Your Name
          </label>
          <input
            onChange={handleFormInputChange}
            value={detail.userName}
            type="text"
            id="userName"
            name="userName"
            placeholder="Enter your name"
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              outline: "none",
              fontSize: "1rem",
            }}
          />
        </div>

        {/* Room ID div */}
        <div style={{ marginBottom: "1.5rem" }}>
          <label
            htmlFor="roomId"
            style={{
              display: "block",
              fontWeight: 500,
              marginBottom: "0.5rem",
              color: "#374151",
            }}
          >
            Room ID
          </label>
          <input
            name="roomId"
            onChange={handleFormInputChange}
            value={detail.roomId}
            placeholder="Enter room ID"
            type="text"
            id="roomId"
            style={{
              width: "100%",
              padding: "0.5rem 1rem",
              border: "1px solid #d1d5db",
              borderRadius: "0.375rem",
              outline: "none",
              fontSize: "1rem",
            }}
          />
        </div>

        {/* Buttons */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <button
            onClick={joinChat}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              fontWeight: 500,
              cursor: "pointer",
              width: "100%",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2563eb")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3b82f6")}
          >
            Join Room
          </button>
          <button
            onClick={createRoom}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#f97316",
              color: "white",
              border: "none",
              borderRadius: "0.375rem",
              fontWeight: 500,
              cursor: "pointer",
              width: "100%",
              transition: "background-color 0.2s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#ea580c")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#f97316")}
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;