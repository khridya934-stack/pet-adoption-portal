import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Pets from "./pages/Pets";
import Home from "./pages/Home";
import PetDetails from "./pages/PetDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import MyProfile from "./pages/MyProfile";
import AdoptionForm from "./pages/AdoptionForm";
import MyAdoptions from "./pages/MyAdoptions";
import Vaccinations from "./pages/Vaccinations";
import AddPet from "./pages/AddPet";
import MyPets from "./pages/MyPets";
import EditPet from "./pages/EditPet";
import ReceivedRequests from "./pages/RecievedRequests";
import AddVaccination from "./pages/AddVaccination";

function App() {

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/:id" element={<PetDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        } />
        <Route path="/adopt/:id" element={
          <ProtectedRoute>
            <AdoptionForm />
          </ProtectedRoute>
        } />
        <Route path="/my-adoptions" element={
          <ProtectedRoute>
            <MyAdoptions />
          </ProtectedRoute>
        } />
        <Route path="/vaccinations" element={
            <Vaccinations />
        } />
        <Route path="/add-pet" element={
          <ProtectedRoute>
            <AddPet />
          </ProtectedRoute>
        } />
        <Route path="/my-pets" element={
          <ProtectedRoute>
            <MyPets />
          </ProtectedRoute>
        } />
        <Route path="/edit-pet/:id" element={
          <ProtectedRoute>
            <EditPet />
          </ProtectedRoute>
        } />
        <Route path="/received-requests" element={
          <ProtectedRoute>
            <ReceivedRequests />
          </ProtectedRoute>
        } />
        <Route path="/my-pets/:id/add-vaccination" element={
          <ProtectedRoute>
            <AddVaccination />
          </ProtectedRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App;
