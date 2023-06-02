import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Room() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const { segment1, id } = params;

    if (rooms.length === 0) {
      setIsLoading(true);
      const fetchRooms = async () => {
        try {
          const res = await axios.get(
            "https://chatgptmall.tech/api/v1/organization/rooms/"
          );
          setRooms(res.data);
          console.log(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      fetchRooms();
    } else {
      setIsLoading(false);
      const foundRoom = rooms.some(
        (room) =>
          segment1.trim() === room.organization_name.trim() &&
          id.trim() === room.room_id.trim()
      );

      if (foundRoom) {
        console.log("Room found");
      } else {
        console.log("Room not found");
        navigate("/");
      }
    }
  }, [params, rooms, navigate]);

  if (isLoading) {
    return <p>Loading...</p>; // Render a loading indicator while the data is being loaded
  }

  return (
    <>
      <div className="room">
        <div className="form gap-2">
            <input type="text" className="form-control" placeholder="ENTER ROOM ID" />
            <button className="btn border-0 btn-light">Submit</button>
        </div>
      </div>
    </>
  );
}
