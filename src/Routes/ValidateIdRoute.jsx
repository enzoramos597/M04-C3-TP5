import { Navigate, useParams } from "react-router-dom";

export default function ValidateIdRoute({ children }) {
  const { id } = useParams();

  // Si el id NO es número → home
  if (isNaN(Number(id))) {
    return <Navigate to="/" replace />;
  }

  return children;
}
