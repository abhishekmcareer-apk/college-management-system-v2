import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import api from "./api/api.js";

import { loginSuccess } from "./REDUX/authSlice.js";
import { Routes, Route } from "react-router-dom";

// =======ROUTES=======


// COMPONENTS
import Navbar from "./Components/NAVBAR/Navbar.jsx"
import Footer from "./Components/FOOTER/Footer.jsx"
import ScrollToTop from "./Components/SCROLL/ScrollToTop.jsx";
import Loader from "./Components/LOADER/Loader.jsx";
import ProtectedRoute from "./Components/PROTECTED-ROUTE/ProtectedRoute.jsx";
import PublicRoute from "./Components/PUBLIC-ROUTE/PublicRoute.jsx";
import CustomAlert from "./Components/ALERT-MSG/Alert.jsx";
import NotFound from "./Components/404 Page/NotFound.jsx";


import Home from "./pages/HOME/Home.jsx";
import About from "./pages/ABOUT/About.jsx";
import Courses from "./pages/COURCES/Cources.jsx";
import Faculty from "./pages/FACULTY/Faculty.jsx";
import Contact from "./pages/CONTACT/Contact.jsx";

import Login from "./pages/LOGIN/Login.jsx";
import SignUp from "./pages/SIGNUP/Signup.jsx";


// ADMIN'S ROUTE
import AdminDashBoard from "./pages/ONLY-FOR/ADMIN/DASH-BOARD/AdminDashboard.jsx"
import CreateTeacher from "./pages/ONLY-FOR/ADMIN/TEACHER'S/CREATE-TEACHER/CreateTeacher.jsx";
import ManageTeachers from "./pages/ONLY-FOR/ADMIN/TEACHER'S/MANAGE-TACHERS/ManageTeacher.jsx";
import EditTeacher from "./pages/ONLY-FOR/ADMIN/TEACHER'S/EDIT/EditTeacher.jsx"
import CreateStudent from "./pages/ONLY-FOR/ADMIN/STUDENT'S/CREATE/createStudent.jsx";
import ManageStudents from "./pages/ONLY-FOR/ADMIN/STUDENT'S/MANAGE/manageStudents.jsx";
import EditStudent from "./pages/ONLY-FOR/ADMIN/STUDENT'S/EDIT/EditStudents.jsx";

// TEACHER'S ROUTE
import TeacherDashBoard from "./pages/ONLY-FOR/TEACHER/DASHBOARD/TeacherDashBoard.jsx";
import TeacherSchedule from "./pages/ONLY-FOR/ADMIN/TEACHER'S/TEACHER-SCHEDULE/TeacherSchedule.jsx";

// STUDENT'S ROUTE
import StudentDashBoard from "./pages/ONLY-FOR/STUDENT/DASH-BOARD/StudentDashBoard.jsx"
import Admissions from "./pages/ADMISSION/Admission.jsx";
import ManageCourses from "./pages/ONLY-FOR/ADMIN/COURCES/ManageCources.jsx";
import Messages from "./pages/ONLY-FOR/ADMIN/MESSAGES/Messages.jsx";
import Chat from "./Components/SOCKET-CHAT/Chat.jsx";


function App() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const verifyUser = async () => {
    try {
      const response = await api.get("/auth/verify")
      console.log(response.data)
      const user = response.data.user
      dispatch(loginSuccess(user))
    } catch (error) {
      console.log("User is not logged in")
    } finally {
      setLoading(false)
    }

  }

  useEffect(() => {
    verifyUser()
  }, [dispatch])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <CustomAlert />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}></Route>
        <Route path="/courses" element={<Courses />}></Route>
        <Route path="/faculty" element={<Faculty />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/admission" element={<Admissions />}></Route>

        {/* for PUBLIC */}

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Route>

        {/* for Protected */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>

          {/* THIS IS FOR ADMIN */}
          <Route path="/admin/dashboard" element={<AdminDashBoard />}></Route>

          {/* Admin's Cources */}
          <Route path="/admin/dashboard/manage-courses" element={<ManageCourses />}></Route>
          <Route path="/admin/dashboard/messages" element={<Messages />}></Route>

          {/* Admin's Teachers */}
          <Route path="/admin/dashboard/add-teacher" element={<CreateTeacher />}></Route>
          <Route path="/admin/dashboard/manage-teachers" element={<ManageTeachers />}></Route>
          <Route path="/admin/dashboard/edit-teacher/:id" element={<EditTeacher />}></Route>
          <Route path="/admin/dashboard/teacher-schedule/:teacherId" element={<TeacherSchedule />}></Route>

          {/* Admin's Students */}

          <Route path="/admin/dashboard/add-student" element={<CreateStudent />}></Route>
          <Route path="/admin/dashboard/manage-students" element={<ManageStudents />}></Route>
          <Route path="/admin/dashboard/edit-students/:id" element={<EditStudent />}></Route>
        </Route>



        {/* THIS IS FOR TEACHER  */}
        <Route path="/teacher/dashboard" element={<TeacherDashBoard />}></Route>



        {/* THIS IS FOR STUDENT */}
        <Route path="/student/dashboard" element={<StudentDashBoard />}></Route>

        <Route path="/chat" element={<Chat/>}></Route>

        <Route path="*" element={<NotFound />}></Route>
        
      </Routes>

      <Footer />

    </>
  );
}

export default App;