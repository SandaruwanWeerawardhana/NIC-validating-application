
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login';
import Register from './pages/Register';
import NICValidator from './pages/NICValidator';
import AddRecord from './pages/AddRecord';
import { Layout } from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* <Route element={<ProtectedRoute />}> */}
          <Route element={<Layout />}>
            <Route path="/" element={<NICValidator />} />
            <Route path="/validate" element={<NICValidator />} />
            <Route path="/add" element={<AddRecord />} />
          </Route>
        {/* </Route> */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
