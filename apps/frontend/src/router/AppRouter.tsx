import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from '@views/Home';
import Search from '@views/Search';
import DefaultLayout from '@layout/DefaultLayout';
import AppointmentStepper from '@views/AppointmentStepper';
import Login from '@views/Login';
import Logout from '@views/Logout';
// import UserDashboard from '@/views/UserDashboard';
// import ProviderDashboard from '@/views/ProviderDashboard';
// import AdminDashboard from '@/views/AdminDashboard';

const AppRouter = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <DefaultLayout>
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/search-stepper" element={<AppointmentStepper />} />
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/logout" element={<Logout />} />
              {/* <Route path="/dashboard/user" element={<UserDashboard />} />
            <Route path="/dashboard/provider" element={<ProviderDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} /> */}
            </Routes>
          </main>
        </DefaultLayout>
      </div>
    </Router>
  );
};

export default AppRouter;
