import AdminDashboard from "./admin_dashboard.jsx";
import JemaatDasboard from "./jemaat_dashboard.jsx";

function Dashboard() {
  const role = localStorage.getItem("role");

  if (role === "admin"){
    return <AdminDashboard />;
  }else {
    return <JemaatDasboard />;
  }
}

export default Dashboard;