
/*
?   Node modules
*/
import { Navigate, Outlet } from "react-router"
import { useSelector } from "react-redux"
import Error from "../../components/Error"

const AdminRoute = () => {
      const { userInfo } = useSelector(state => state.auth)

      return (
            userInfo && userInfo.isAdmin ? <Outlet /> : <Error message="You are not Admin." />
      )
}

export default AdminRoute
