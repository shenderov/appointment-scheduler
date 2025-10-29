const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold mb-1">Upcoming Appointments</h2>
          <p>5 scheduled for today</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold mb-1">Providers on Duty</h2>
          <p>3 active providers</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold mb-1">New Clients</h2>
          <p>2 new registrations</p>
        </div>
        <div className="p-4 border rounded shadow">
          <h2 className="font-semibold mb-1">System Health</h2>
          <p>All systems operational</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
