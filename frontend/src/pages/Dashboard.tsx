import { useTasks } from "../hooks/useTasks";
import type { Task } from "../types/task.js";

export default function Dashboard() {
  const { data } = useTasks();

  return (
    <div className="p-6 grid gap-4">
      {data?.map((t: Task) => (
        <div key={t._id} className="border p-4 rounded">
          <h3>{t.title}</h3>
          <p>{t.status}</p>
        </div>
      ))}
    </div>
  );
}
