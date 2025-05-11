import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
};

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur de chargement des utilisateurs :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-gray-500">Chargement...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-2">Utilisateurs :</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="p-2 bg-gray-100 rounded shadow">
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
