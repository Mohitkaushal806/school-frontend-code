import React from 'react';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TransactionDetails from './components/TransactionDetails';
import StatusCheck from './components/StatusCheck';
import Login from './components/Login';
import PrivateRoute from './ProtectedRoutes';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/login" element={<Login />} />
              {/* Private Routes */}
              <Route element={<PrivateRoute />}>
                {/* <Navbar/> */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/school-transactions" element={<TransactionDetails />} />
                <Route path="/status-check" element={<StatusCheck />} />
              </Route>
            </Routes>
          </main>
        </div>
      </HashRouter>
    </AuthProvider>
  );
};

export default App;
