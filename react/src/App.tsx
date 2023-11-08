//import { useEffect, useState } from "react";

// interface TestInterface {
//   id: number;
//   text: string;
// }

// function App() {
//   const { data, loading } = useApi("https://szoftarch.webgravir.hu/api/test/1");
//   if (loading) {
//     return <div>Loading...</div>;
//   } else {
//     return <div>{data?.text}</div>;
//   }
// }

// function useApi(initialUrl: string) {
//   const [data, setData] = useState<TestInterface>();
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<Error | null>(null);

//   const fetchData = async (url: string) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const result: TestInterface = await response.json();

//       setData(result);
//     } catch {
//       setError(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(initialUrl);
//   }, [initialUrl]);

//   return { data, loading, error, fetchData };
// }

import "./App.css";
import { Route, Routes } from "react-router-dom";
import MenuPage from "./pages/MenuPage/MenuPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import TodoStudentPage from "./pages/TodoStudentPage/TodoStudentPage";
import TodoTeacherPage from "./pages/TodoTeacherPage/TodoTeacherPage";
import UserEditPage from "./pages/UserEditPage/UserEditPage";
import UsersPage from "./pages/UsersPage/UsersPage";
import ListTeacherPage from "./pages/ListTeacherPage/ListTeacherPage";
import ListStudentPage from "./pages/ListStudentPage/ListStudentPage";
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
          <Route path="menu" element={<MenuPage />} />
          <Route path="todo-student" element={<TodoStudentPage />} />
          <Route path="todo-teacher" element={<TodoTeacherPage />} />
          <Route path="user-edit" element={<UserEditPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="list-teacher" element={<ListTeacherPage />} />
          <Route path="list-student" element={<ListStudentPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="chat-contacts" element={<ChatContactsPage />} />
          <Route
            path="appointment-edit-list"
            element={<AppointmentEditListPage />}
          />
          <Route
            path="appointment-teacher-edit"
            element={<AppointmentTeachertEditPage />}
          />
          <Route path="appointment-list" element={<AppointmentListPage />} />
          <Route
            path="appointment-student-edit"
            element={<AppointmentStudentEditPage />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
