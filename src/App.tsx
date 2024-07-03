import * as React from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { Login } from './auth/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { useAuth } from './hooks/useAuth';
import { Toaster } from './components/ui/toaster';
import { Sidebar } from './components/sidebar/Sidebar';
import { Header } from './components/header/Header';
import { Users } from './pages/users/User';

const AppBody: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </React.Fragment>
  );
};

const PrivateRoute: React.FC<{ element: React.ReactNode }> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  console.log('isAuthenticated', isAuthenticated);
  return <>{element}</>;
  // return isAuthenticated ? <>{element}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route element={<PrivateRoute element={<AppBody />} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
          </Route>
        </Routes>
      </div>
      <Toaster />
    </Router>
  );
}

export default App;
