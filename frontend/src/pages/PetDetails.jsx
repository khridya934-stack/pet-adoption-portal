import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/petdetails.css";

function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [vaccinations, setVaccinations] = useState([]);

  useEffect(() => {
    api.get(`pets/${id}/`)
      .then((response) => {
        setPet(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    api.get("auth/me/")
      .then((response) => {
        setCurrentUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    api.get("vaccinations/")
      .then((response) => {
        const records = response.data.filter(
          (record) => Number(record.pet) === Number(id)
        );
        setVaccinations(records);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!pet) {
    return (
      <main className="pet-details-page container-fluid py-5 text-center">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="pet-details-page container-fluid py-5">

      <div className="pet-details-card shadow mx-auto" style={{ maxWidth: "600px" }}>

        {pet.image && (
          <img src={pet.image} className="pet-details-image" alt={pet.name}
           />
        )}

        <div className="pet-details-body">

          <h1 className="pet-details-title text-center mb-4">
            🐾 {pet.name}
          </h1>

          <div className="pet-details-info">
            <p>
              <strong className="pet-details-label">Type:</strong> {pet.pet_type}
            </p>
  
            <p>
              <strong className="pet-details-label">Breed:</strong> {pet.breed}
            </p>
  
            <p>
              <strong className="pet-details-label">Age:</strong> {pet.age}
            </p>
  
            <p>
              <strong className="pet-details-label">Gender:</strong> {pet.gender}
            </p>
  
            <p>
              <strong className="pet-details-label">Description:</strong> {pet.description}
            </p>
          

          <p>
            <strong className="pet-details-label">Status:</strong>{" "}
            <span
              className={
                pet.is_adopted
                  ? "pet-status-adopted"
                  : "pet-status-available"
              }
            >
              {pet.is_adopted ? "Adopted" : "Available"}
            </span>
          </p>
          </div>

          <hr />

          <h4 className="pet-vaccination-title mt-4">💉 Vaccination Records</h4>

          {vaccinations.length === 0 ? (
            <p className="pet-vaccination-empty">
              No vaccination records available for this pet.
            </p>
          ) : (
            vaccinations.map((record) => (
              <div className="pet-vaccination-record" key={record.id}>
                <p>
                  <strong>Vaccine:</strong> {record.vaccine_name}
                </p>

                <p>
                  <strong>Vaccination Date:</strong> {record.vaccination_date}
                </p>

                <p>
                  <strong>Next Due Date:</strong>{" "}
                  {record.next_due_date || "Not specified"}
                </p>

                <p className="mb-0">
                  <strong>Veterinarian:</strong>{" "}
                  {record.veterinarian || "Not specified"}
                </p>
              </div>
            ))
          )}


          <div className="text-center mt-4">

            {currentUser && pet.owner === currentUser.id ? (
              <span className="pet-status-available">
                🐾 My Pet
              </span>
            ) : pet.is_adopted ? (
              <span className="pet-status-adopted">
                Adopted
              </span>
            ) : currentUser ? (
              <button
                className="pet-adopt-btn"
                onClick={() => navigate(`/adopt/${pet.id}`)}
              >
                ❤️ Adopt Now
              </button>
            ) : (
              <button className="pet-login-btn"
                onClick={() => navigate("/login")}>
                Login to Adopt
              </button>
            )}

          </div>

        </div>
      </div>

    </main>
  );
}

export default PetDetails;