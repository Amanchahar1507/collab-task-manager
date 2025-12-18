import { useEffect } from "react";
import { useDashboard } from "../hooks/useDashboard";
import { socket } from "../socket";
import { useQueryClient } from "@tanstack/react-query";

export default function Dashboard() {
  const qc = useQueryClient();
  const { data } = useDashboard();

  useEffect(() => {
    socket.on("task:created", () =>
      qc.invalidateQueries({ queryKey: ["dashboard"] })
    );
    socket.on("task:updated", () =>
      qc.invalidateQueries({ queryKey: ["dashboard"] })
    );

    return () => {
      socket.off("task:created");
      socket.off("task:updated");
    };
  }, [qc]);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-xl">My Tasks</h2>

      {data?.tasks.map((t) => (
        <div key={t._id} className="border p-4 rounded">
          <div>{t.title}</div>
          <div>{t.status}</div>
        </div>
      ))}

      <h2 className="text-xl text-red-600">Overdue</h2>

      {data?.overdue.map((t) => (
        <div key={t._id} className="border p-4 rounded bg-red-50">
          {t.title}
        </div>
      ))}
    </div>
  );
}
