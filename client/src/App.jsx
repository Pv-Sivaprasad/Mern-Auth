import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import AdminHeader from './components/AdminHeader';
import PrivateRoute from './components/PrivateRoute';
import PublicRouteAdmin from './components/PublicRouteAdmin';
import PrivateRouteAdmin from './components/PrivateRouteAdmin';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Admin/Login';
import Dashboard from './pages/Admin/Dashboard';
import EditUser from './pages/Admin/EditUser'
import AddUser from './pages/Admin/AddUser'

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      {/* Conditionally render header */}
      {!isAdminRoute  &&  <Header />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />

        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route element={<PublicRouteAdmin />}>
          <Route path='/admin' element={<AdminLayout><Login /></AdminLayout>} />
        </Route>

        <Route element={<PrivateRouteAdmin />}>
          <Route path='/admin/dashboard' element={<AdminLayout>  <Dashboard />  </AdminLayout>} />
          <Route path='/admin/edit/:id' element={<AdminLayout>  <EditUser />  </AdminLayout>} />
          <Route path='/admin/adduser' element={<AdminLayout>  <AddUser />  </AdminLayout>} />

        </Route>
      </Routes>
    </>
  );
}
