import {Navigate, Outlet} from 'react-router-dom'
import { useSelector } from 'react-redux';
export default function GuestLayout() {

    const { token } = useSelector((state) => state.auth);
    if (token) {
      return <Navigate to={"/login"} />;
    }
  
  return (

    <div>
       
        <Outlet/>    
        </div>
  )
}
