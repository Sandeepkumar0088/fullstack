import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import Protected from "./components/Protected";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import GroupDetails from "./pages/GroupDetails";
import AddExpense from "./pages/AddExpense";
import EditGroup from "./pages/EditGroup";
import EditExpense from "./pages/EditExpense";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <Protected>
                <Dashboard />
              </Protected>
            }
          />

          <Route
            path="/group/:id"
            element={
              <Protected>
                <GroupDetails />
              </Protected>
            }
          />

          <Route
            path="/group/edit/:id"
            element={
              <Protected>
                <EditGroup />
              </Protected>
            }
          />

          <Route
            path="/group/:id/add-expense"
            element={
              <Protected>
                <AddExpense />
              </Protected>
            }
          />

          <Route
            path="/expense/edit/:id"
            element={
              <Protected>
                <EditExpense />
              </Protected>
            }
          />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
