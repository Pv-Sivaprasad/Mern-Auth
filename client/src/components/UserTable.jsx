import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

function UserTable() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchQuery,setSearchQuery]=useState('')

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

 
  const handleDelete = (id) => {
    console.log('Delete user with ID:', id);
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this user. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/admin/delete/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
          });
  
          if (!res.ok) {
            throw new Error('Network response was not ok');
          }
  
          const data = await res.json();
          console.log(data);
  
          // Update state to remove the deleted user
          setUsers(prevUsers => prevUsers.filter(user => user._id !== id));
  
          
        } catch (error) {
          console.log('Error deleting user:', error);
          Swal.fire(
            'Error!',
            'There was an issue deleting the user.',
            'error'
          );
        }
      } else {
        console.log('Deletion canceled');
      }
    });
  };
  
const filteredUsers=users.filter(user=>user.username.toLowerCase().includes(searchQuery.toLowerCase()))

return (
  <div className="overflow-x-auto">
    <div className="  mb-4">
      <input
        type="text"
        placeholder="Search by username"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border border-gray-300 rounded bg-gray-800 text-white placeholder-gray-500"
  />
    </div>
    <table className="min-w-full bg-gray-800 text-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-600 bg-gray-700 text-left text-sm font-semibold">Index</th>
          <th className="py-2 px-4 border-b border-gray-600 bg-gray-700 text-left text-sm font-semibold">Image</th>
          <th className="py-2 px-4 border-b border-gray-600 bg-gray-700 text-left text-sm font-semibold">Name</th>
          <th className="py-2 px-4 border-b border-gray-600 bg-gray-700 text-left text-sm font-semibold">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map((user, index) => (
          <tr key={user._id}>
            <td className="py-2 px-4 border-b border-gray-600 text-center">{index + 1}</td>
            <td className="py-2 px-4 border-b border-gray-600 text-center">
              <img className="w-16 h-16 rounded-full mx-auto" src={user.profilePicture} alt={user.username} />
            </td>
            <td className="py-2 px-3 border-b border-gray-600 text-center">{user.username}</td>
            <td className="py-2 px-3 border-b border-gray-600 text-center">
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


  // return (



  //   <div className="overflow-x-auto">
  //     <table className="min-w-full bg-gray-800  text-white">
  //       <thead>
  //         <tr>
  //         <th className="py-2 px-4 border-b border-gray-600 bg-gray-700 text-left text-sm font-semibold">Index</th>
  //           <th className="py-2 px-4 border-b border-gray-600 bg-gray-700 text-left text-sm font-semibold">Image</th>
  //           <th className="py-2 px-4 border-b border-gray-600 bg-gray-700 text-left text-sm font-semibold">Name</th>
  //           <th className="py-2 px-4 border-b border-gray-600 bg-gray-700 text-left text-sm font-semibold">Actions</th>
  //         </tr>
  //       </thead>
  //       <tbody>
  //         {users.map((user,index) => (
  //           <tr key={user._id}>
  //             <td className="py-2 px-4 border-b border-gray-600 text-center" >{index+1}</td>
  //             <td className="py-2 px-4 border-b border-gray-600 text-center">
  //               <img className="w-16 h-16 rounded-full mx-auto" src={user.profilePicture} alt={user.name} />
  //             </td>
  //             <td className="py-2 px-3 border-b border-gray-600 text-center">{user.username}</td>
  //             <td className="py-2 px-3 border-b border-gray-600 text-center">
  //               <button
  //                 className="text-green-400 hover:text-green-300 mr-2"
  //                 onClick={() => handleEdit(user._id)}
  //               >
  //                 Edit
  //               </button>
  //               <button
  //                 className="text-red-400 hover:text-red-300"
  //                 onClick={() => handleDelete(user._id)}
  //               >
  //                 Delete
  //               </button>
  //             </td>
  //           </tr>
  //         ))}
  //       </tbody>
  //     </table>
  //   </div>
  // );
}

export default UserTable;
