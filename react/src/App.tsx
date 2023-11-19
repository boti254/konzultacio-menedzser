import "./App.css";
import { Route, Routes } from "react-router-dom";
import MenuPage from "./pages/MenuPage/MenuPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TodoStudentPage from "./pages/TodoStudentPage/TodoStudentPage";
import TodoTeacherPage from "./pages/TodoTeacherPage/TodoTeacherPage";
import UserEditPage from "./pages/UserEditPage/UserEditPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import ListStudentPage from "./pages/ListStudentPage/ListStudentPage";
import ListTeacherPage from "./pages/ListTeacherPage/ListTeacherPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import ChatContactsPage from "./pages/ChatContactsPage/ChatContactsPage";
import AppointmentEditListPage from "./pages/AppointmentEditListPage/AppointmentEditListPage";
import AppointmentTeachertEditPage from "./pages/AppointmentTeachertEditPage/AppointmentTeachertEditPage";
import AppointmentListPage from "./pages/AppointmentListPage/AppointmentListPage";
import AppointmentStudentEditPage from "./pages/AppointmentStudentEditPage/AppointmentStudentEditPage";

function App() {
  return (
    <div className="app-container">
      <div className="app-wrapper">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="menu/:name" element={<MenuPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="todo-student" element={<TodoStudentPage />} />
          <Route path="todo-teacher" element={<TodoTeacherPage />} />
          <Route path="user-edit/:id" element={<UserEditPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="list-teacher" element={<ListTeacherPage />} />
          <Route path="list-student" element={<ListStudentPage />} />
          <Route path="chat/:id" element={<ChatPage />} />
          <Route path="chat-contacts" element={<ChatContactsPage />} />
          <Route
            path="appointment-edit-list"
            element={<AppointmentEditListPage />}
          />
          <Route
            path="appointment-teacher-edit/:id"
            element={<AppointmentTeachertEditPage />}
          />
          <Route path="appointment-list" element={<AppointmentListPage />} />
          <Route
            path="appointment-student-edit/:id"
            element={<AppointmentStudentEditPage />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
