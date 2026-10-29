import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import "../styles/petcard.css";

function PetCard({ pet }) {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const currentUserId = Number(localStorage.getItem("userId"));
  const isOwner = isLoggedIn && pet.owner === currentUserId;

  return (
    <div className="pet-card-column">
      <div className="pet-card shadow-sm">

        {pet.image && (
          <img
            src={pet.image}
            className="pet-card-image"
            alt={pet.name}
          />
        )}

        <div className="pet-card-body">
          <h3 className="pet-card-title">
            🐾 {pet.name}
          </h3>

          <div className="pet-card-details mb-3">
            <div><strong>Type:</strong> {pet.pet_type}</div>
            <div><strong>Breed:</strong> {pet.breed}</div>
            <div><strong>Age:</strong> {pet.age}</div>
            <div><strong>Gender:</strong> {pet.gender}</div>
          </div>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={`badge ${
                pet.is_adopted
                  ? "pet-status-adopted"
                  : "pet-status-available"
              }`}
            >
              {pet.is_adopted ? "Adopted" : "Available"}
            </span>
          </p>

          <Link
            to={`/pets/${pet.id}`}
            className="btn pet-view-button"
          >
            View Details
          </Link>

          {isOwner && (
            <div className="d-flex gap-2 mt-3">
              <button
                className="btn btn-outline-success pet-edit-button"
                onClick={() => navigate(`/edit-pet/${pet.id}`)}
              >
                Edit
              </button>

              <button
                className="btn btn-outline-danger pet-delete-button"
                onClick={async () => {
                  const confirmed = window.confirm(
                    `Are you sure you want to delete ${pet.name}?`
                  );

                  if (!confirmed) return;

                  try {
                    await api.delete(`pets/${pet.id}/`);
                    alert("Pet deleted successfully!");
                    window.location.reload();
                  } catch (error) {
                    console.log(error.response?.data || error);
                    alert("Failed to delete pet.");
                  }
                }}
              >
                Delete
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default PetCard;