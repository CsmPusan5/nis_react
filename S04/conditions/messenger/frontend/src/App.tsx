import { useState } from "react";
import { BrowserRouter, Navigate, NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage";
import { ProfilePage } from "../pages/ProfilePage";
import { ChatPage } from "../pages/ChatPage";
import { clearToken, getToken, setToken } from "../helpers/authStorage";
import type { User } from "./types";

function Shell() {
  const [token, setTokenState] = useState<string | null>(() => getToken());
  const navigate = useNavigate();

  const handleLoginSuccess = (newToken: string, _user: User) => {
  setToken(newToken);
  setTokenState(newToken);
  navigate("/chat", { replace: true });
};

  const handleLogout = () => {
    clearToken();
    setTokenState(null);
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <nav>
        <NavLink to="/login" hidden={!!token}>Вход</NavLink>{" "}
        <NavLink to="/profile" hidden={!token}>Профиль</NavLink>{" "}
        <NavLink to="/chat" hidden={!token}>Чат</NavLink>{" "}
        {token && <button onClick={handleLogout}>Выйти</button>}
      </nav>

      <Routes>
        <Route
          path="/login"
          element={
            token ? <Navigate to="/chat" replace /> : <LoginPage onLogin={handleLoginSuccess} />
          }
        />
        <Route
          path="/profile"
          element={token ? <ProfilePage token={token} /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/chat"
          element={token ? <ChatPage token={token} /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to={token ? "/chat" : "/login"} replace />} />
      </Routes>
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}

export default App;