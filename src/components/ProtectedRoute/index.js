import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const jwtToken = Cookies.get('jwt_token');

  useEffect(() => {
    if (!jwtToken) {
      navigate('/login', { replace: true });
    }
  }, [jwtToken, navigate]);

  return jwtToken ? <Outlet /> : null;
};

export default ProtectedRoute;
