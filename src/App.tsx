import { Navigate, Route, Routes } from "react-router";
import { DashboardPage } from "./pages/DashboardPage";
import { ExamsPage } from "./pages/ExamsPage";
import { LayoutAdmin } from "./components/LayoutAdmin";
import { AuthProvider } from "./contexts/AuthContext";

function Render() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" />} />
      <Route path="admin" element={<LayoutAdmin />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="exams">
          <Route index element={<ExamsPage />} />
        </Route>
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
