import { Router, Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/home/homePage";
import LoginPage from "./pages/login/loginPage";
import SignupPage from "./pages/signup/signupPage";
import PrivateRoute from "./router/screens/privateRoute/PrivateRoute";


function App() {
  return (
    // <HomePage />

    <AuthProvider>
        <Routes>
          {/* مسیرهای عمومی */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* مسیرهای محافظت‌شده */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
          </Route>

          {/* هدایت به صفحه لاگین اگر مسیر نامعتبر باشد */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    </AuthProvider>
  );
}

export default App;