import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <Outlet />
    </div>
  );
};
export default AdminLayout;
