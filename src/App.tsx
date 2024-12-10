import { Navigate, Route, Routes } from "react-router";
import { DashboardPage } from "./pages/DashboardPage";
import { QuestionsExamPage } from "./pages/ExamsPage/QuestionsExamPage";
import { LayoutAdmin } from "./components/LayoutAdmin";
import { AuthProvider } from "./contexts/AuthContext";
import { ExamsPage } from "./pages/ExamsPage";
import { TextsExamPage } from "./pages/ExamsPage/TextsExamPage";
import CreateTextPage from "./pages/ExamsPage/TextsExamPage/CreateTextPage";

function Render() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" />} />
      <Route path="admin" element={<LayoutAdmin />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="exams">
          <Route index element={<ExamsPage />} />
          <Route path=":idExam">
            <Route index element={<Navigate to="questions" />} />
            <Route path="questions" element={<QuestionsExamPage />} />
            <Route path="texts">
              <Route index element={<TextsExamPage />} />
              <Route path="create" element={<CreateTextPage />} />
            </Route>
          </Route>
        </Route>

        <Route index element={<Navigate to="/admin/dashboard" />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" />}></Route>
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Render />
    </AuthProvider>
  );
}

export default App;
