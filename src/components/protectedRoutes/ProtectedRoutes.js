import { useSelector } from "react-redux";
import NonAuthComp from "../nonAuthComp/NonAuthComp";

const ProtectedRoutes = ({ children }) => {
  const { admin } = useSelector((state) => state.auth);

  if (!admin) {
    return (
      <main>
        <div>
          <NonAuthComp />
        </div>
      </main>
    );
  }
  return children;
};

export default ProtectedRoutes;
