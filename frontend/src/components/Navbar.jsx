import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark portal-navbar">
      <div className="container">

        <Link className="navbar-brand fw-bold" to="/">
          🐾 Pet Adoption Portal
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMenu">
          <div className="navbar-nav ms-auto">

            <Link className="nav-link" to="/">
              Home
            </Link>

            <Link className="nav-link" to="/pets">
              Pets
            </Link>
            <Link className="nav-link" to="/vaccinations">
              Vaccinations
            </Link>

            {!isLoggedIn ? (
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link>

                

              </>
            ) : (
              <>
                <Link className="nav-link" to="/profile">
                  My Profile
                </Link>

                <Link className="nav-link" to="/my-adoptions">
                  My Adoption Applications
                </Link>

                <Link className="nav-link" to="/received-requests">
                  Requests Recieved
                </Link>

                <Link className="nav-link" to="/my-pets">
                  My Pets
                </Link>

                <Link className="nav-link" to="/add-pet">
                  Add Pet
                </Link>

                <button
                  className="btn btn-light btn-sm ms-lg-2 portal-logout"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;