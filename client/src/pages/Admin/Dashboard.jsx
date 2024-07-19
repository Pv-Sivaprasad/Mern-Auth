// import React from 'react'
// import UserTable from '../../components/UserTable'
// import {Link} from 'react-router-dom'



// const Dashboard = () => {
  
//   return (
//    <div className='p-3 max-w-lg mx-auto  bg-gray-900 '  >

//      <h1 className='text-3xl font-semibold text-center my-7 '  >Dashboard</h1>
    
//     <div className='text-center pe-5 ' >
//     <UserTable/>
//     </div>


//    </div>
//   )

// }

// export default Dashboard

import React from 'react';
import UserTable from '../../components/UserTable';

const Dashboard = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl font-semibold text-center my-7">Dashboard</h1>
        <div className="text-center">
          <UserTable />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


