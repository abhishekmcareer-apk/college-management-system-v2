import {Navigate,Outlet} from "react-router-dom"
import {useSelector} from "react-redux"

const ProtectedRoute = ({allowedRole})=>{
    
    const user = useSelector((state)=>state.auth.user)

    if(!user){
        return <Navigate to="/login" replace/>
    }

    if(user.role!==allowedRole){
        return <Navigate to="/" replace/>
    }

    return <Outlet/>
    
}

export default ProtectedRoute