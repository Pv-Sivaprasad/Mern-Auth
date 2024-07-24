import React from 'react';
import UserTable from '../../components/UserTable';
import { Link } from 'react-router-dom';


const Dashboard = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Dashboard</h1>
        <Link to={"/admin/adduser"} >
            <button className='bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 my-9 rounded'>Add User</button>
          </Link>
        <div className="text-center">

          <UserTable />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


