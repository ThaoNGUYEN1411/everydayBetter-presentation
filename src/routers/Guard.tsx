import { Navigate } from "react-router-dom";
import { Role } from "../store/user.model";

interface GuardProps {
  children: JSX.Element;
  allowedRoles: Role[];
  redirectTo?: string;
}

const Guard = ({ children, allowedRoles, redirectTo = "/" }: GuardProps) => {
  const userRole = localStorage.getItem("roles");
  if (!allowedRoles?.includes(userRole as Role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
export default Guard;
