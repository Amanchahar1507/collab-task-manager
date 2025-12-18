import { useEffect } from "react";
import { useNotifications } from "../hooks/useNotifications";
import { socket } from "../socket";
import { useQueryClient } from "@tanstack/react-query";

interface NotificationsProps {
  userId: string;
}

export default function Notifications({ userId }: NotificationsProps) {
  const qc = useQueryClient();
  const { data } = useNotifications();

  useEffect(() => {
    if (!userId) return;

    socket.emit("join", userId);

    socket.on("notification:new", () => {
      qc.invalidateQueries({ queryKey: ["notifications"] });
    });

    return () => {
      socket.off("notification:new");
    };
  }, [userId, qc]);

  return (
    <div className="fixed top-4 right-4 w-80 bg-white shadow">
      {data?.map((n) => (
        <div key={n._id} className="p-3 border-b">
          {n.message}
        </div>
      ))}
    </div>
  );
}
