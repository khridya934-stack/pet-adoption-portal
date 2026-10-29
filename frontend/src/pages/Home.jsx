import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <main className="home-page">
      <div className="container py-5">

        <div className="row align-items-center py-5">
          <div className="col-md-7 text-center text-md-start">

            <p className="home-label mb-2">
              🐾 EVERY PET DESERVES A LOVING HOME
            </p>

            <h1 className="display-4 home-title">
              Find Your New Best Friend
            </h1>

            <p className="lead mt-3 text-secondary">
              Meet adorable pets waiting for a loving family.
              Explore our portal and give a furry friend a second
              chance at happiness.
            </p>

            <Link to="/pets" className="btn home-button mt-3 me-2">
              Explore Pets 🐾
            </Link>

            <Link
              to="/register"
              className="btn home-register-button mt-3"
            >
              Join Our Community
            </Link>

          </div>

          <div className="col-md-5 text-center mt-5 mt-md-0">
            <div className="home-pet-card shadow-sm">
              <div className="home-pet-icons">🐶 🐱</div>

              <h3 className="home-subtitle fw-bold mt-3">
                Love. Care. Adopt.
              </h3>

              <p className="text-secondary mb-0">
                Every adoption begins with a little kindness.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center py-4">
          <h3 className="home-subtitle">
            A New Friend Is Waiting for You ❤️
          </h3>

          <p className="text-secondary mt-2">
            Discover pets, submit adoption requests, and explore
            vaccination records in one place.
          </p>
        </div>

      </div>
    </main>
  );
}

export default Home;