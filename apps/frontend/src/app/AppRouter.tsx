import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@views/Home';
import Search from '@booking/views/Search';
import AppointmentBookingStepper from '@booking/views/AppointmentBookingStepper';
import Login from '@views/Login';
import Logout from '@views/Logout';
import AccountSettings from '@views/AccountSettings';
import RequireAuth from '@auth/guards/RequireAuth';
import DefaultLayout from '@layout/DefaultLayout';
import DashboardLayout from '@layout/DashboardLayout';

import AdminDashboard from '@dashboard/admin/AdminDashboard';
import AdminAppointments from '@dashboard/admin/AdminAppointments';
import AdminClients from '@dashboard/admin/AdminClients';
import AdminProviders from '@dashboard/admin/AdminProviders';
import AdminUsers from '@dashboard/admin/AdminUsers';
import ClinicSettings from '@dashboard/admin/ClinicSettings';
import GeneralSettings from '@dashboard/admin/GeneralSettings';

import ProviderDashboard from '@dashboard/provider/ProviderDashboard';
import ProviderAppointments from '@dashboard/provider/ProviderAppointments';
import ProviderClients from '@dashboard/provider/ProviderClients';
import ProviderSettings from '@dashboard/provider/ProviderSettings';
import RecordAppointment from '@dashboard/provider/RecordAppointment';

import ClientDashboard from '@dashboard/client/ClientDashboard';
import ClientAppointments from '@dashboard/client/ClientAppointments';
import ClientInsuranceDetails from '@dashboard/client/ClientInsuranceDetails';
import ClientContactDetails from '@dashboard/client/ClientContactDetails';

import Unauthorized from '@views/shared/Unauthorized';
import NotFound from '@views/shared/NotFound';
import { Role } from '@shared-models/enums/auth/role.enum';
import { SidebarItem } from '@layout/types/dashboard';

const adminSidebarItems: SidebarItem[] = [
  { text: 'Dashboard', to: '/admin' },
  { text: 'Appointments', to: '/admin/appointments' },
  { text: 'Providers', to: '/admin/providers' },
  { text: 'Clients', to: '/admin/clients' },
  { text: 'Users', to: '/admin/users' },
  { text: 'Clinic', to: '/admin/clinic' },
  { text: 'Settings', to: '/admin/settings' },
];

const providerSidebarItems: SidebarItem[] = [
  { text: 'Dashboard', to: '/provider' },
  { text: 'Appointments', to: '/provider/appointments' },
  { text: 'Clients', to: '/provider/clients' },
  { text: 'Settings', to: '/provider/settings' },
];

const clientSidebarItems: SidebarItem[] = [
  { text: 'Dashboard', to: '/client' },
  { text: 'Appointments', to: '/client/appointments' },
  { text: 'Contact Details', to: '/client/contact' },
  { text: 'Insurance Information', to: '/client/insurance' },
];

const AppRouter = () => (
  <Router>
    <div className="flex flex-col min-h-screen">
      <Routes>
        <Route element={<DefaultLayout />}>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/booking" element={<AppointmentBookingStepper />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/logout" element={<Logout />} />

          {/* Authenticated routes that should keep DefaultLayout */}
          <Route element={<RequireAuth />}>
            <Route path="/account" element={<AccountSettings />} />

            {/* Admin + Provider only. Uses DefaultLayout */}
            <Route
              element={
                <RequireAuth allowedRoles={[Role.ADMIN, Role.PROVIDER]} />
              }
            >
              <Route
                path="/appointments/record"
                element={<RecordAppointment />}
              />
            </Route>
          </Route>

          {/* Shared fallback under DefaultLayout */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[Role.ADMIN]} />}>
          <Route
            path="/admin"
            element={
              <DashboardLayout
                sidebarItems={adminSidebarItems}
                sidebarTitle="Admin Portal"
              />
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="providers" element={<AdminProviders />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="clinic" element={<ClinicSettings />} />
            <Route path="settings" element={<GeneralSettings />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={[Role.PROVIDER]} />}>
          <Route
            path="/provider"
            element={
              <DashboardLayout
                sidebarItems={providerSidebarItems}
                sidebarTitle="Provider Portal"
              />
            }
          >
            <Route index element={<ProviderDashboard />} />
            <Route path="appointments" element={<ProviderAppointments />} />
            <Route path="clients" element={<ProviderClients />} />
            <Route path="settings" element={<ProviderSettings />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={[Role.CLIENT]} />}>
          <Route
            path="/client"
            element={
              <DashboardLayout
                sidebarItems={clientSidebarItems}
                sidebarTitle="My Profile"
              />
            }
          >
            <Route index element={<ClientDashboard />} />
            <Route path="appointments" element={<ClientAppointments />} />
            <Route path="contact" element={<ClientContactDetails />} />
            <Route path="insurance" element={<ClientInsuranceDetails />} />
          </Route>
        </Route>
      </Routes>
    </div>
  </Router>
);

export default AppRouter;
