import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserTable() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const res = await fetch('/api/admin/users');
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleEdit = (userId) => {
    navigate(`/admin/edit/${userId}`);
  };

  const handleDelete = (userId) => {
    
    console.log('Delete user with ID:', userId);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-600 bg-gray-700 text-left text-sm font-semibold">Image</th>
            <th className="py-2 px-4 border-b border-gray-600 bg-gray-700 text-left text-sm font-semibold">Name</th>
            <th className="py-2 px-4 border-b border-gray-600 bg-gray-700 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="py-2 px-4 border-b border-gray-600 text-center">
                <img className="w-16 h-16 rounded-full mx-auto" src={user.profilePicture} alt={user.name} />
              </td>
              <td className="py-2 px-4 border-b border-gray-600 text-center">{user.username}</td>
              <td className="py-2 px-4 border-b border-gray-600 text-center">
                <button
                  className="text-green-400 hover:text-green-300 mr-2"
                  onClick={() => handleEdit(user._id)}
                >
                  Edit
                </button>
                <button
                  className="text-red-400 hover:text-red-300"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserTable;
