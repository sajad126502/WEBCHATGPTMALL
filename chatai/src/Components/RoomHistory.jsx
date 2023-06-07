import { Context } from "../context/contextApi";
import React, { useContext, useEffect } from "react";
import History from "./History";

export default function RoomHistory() {
  const { get_Room_History, room_History } = useContext(Context);

  useEffect(() => {
    const supervisor_room_id = localStorage.getItem("supervisor_room_id");
    const supervisor_room_key = localStorage.getItem("supervisor_room_key");
    if (!supervisor_room_id || !supervisor_room_key) {
      window.location.href = "/";
    } else {
      get_Room_History();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="Room_History">
        <p className="room_header">ROOM HISTORY</p>
        <div className="room_history_wrapper">
          <div className="room_history_container">
            {room_History &&
              room_History.map((item, index) => {
                return <History key={index} index={index} item={item} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
}
