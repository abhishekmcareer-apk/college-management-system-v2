import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PublicRoute = () => {


    const user = useSelector((state) => state.auth.user)

    if (user) {
        const role = user?.role?.toLowerCase()

        if (role === "admin") {
            return <Navigate to="/admin/dashboard" replace />
        }
        if (role === "teacher") {
            return <Navigate to="/teacher/dashboard" replace />
        }
        if (role === "student") {
            return <Navigate to="/student/dashboard" replace />
        }
        return <Navigate to="/" replace />
    }
    return <Outlet />
}

export default PublicRoute