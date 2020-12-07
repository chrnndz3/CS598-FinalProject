import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const Lobby = ({
  username,
  handleUsernameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter a Cooking Room</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="field"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="room">Room name:</label>
        <input
          type="text"
          id="room"
          value={roomName}
          onChange={handleRoomNameChange}
          required
        />
      </div>

      <button className="btn btn-primary" type="submit">
        Join Classroom
      </button>
    </form>
  );
};

export default Lobby;
