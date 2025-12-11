import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ListNotes from "./components/ListNotes";
import CreateNote from "./components/CreateNote";
import UpdateNote from "./components/UpdateNote";
import ManageCategories from "./components/ManageCategories";
import Login from "./components/Login";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />
        <Route
          path="/notes"
          element={isAuthenticated ? <ListNotes /> : <Navigate to="/login" />}
        />
        <Route path="/add-note" element={isAuthenticated ? <CreateNote /> : <Navigate to="/login" />} />
        <Route path="/edit-note/:id" element={isAuthenticated ? <UpdateNote /> : <Navigate to="/login" />} />
        <Route path="/categories" element={isAuthenticated ? <ManageCategories /> : <Navigate to="/login" />} />
        <Route path="/" element={isAuthenticated ? <ListNotes /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
