import { useEffect, useState } from "react";
import api from "../services/api";
import PetCard from "../components/PetCard";
import "../styles/pets.css";

function Pets() {
  const [pets, setPets] = useState([]);

  const [filters, setFilters] = useState({
    pet_type: "",
    breed: "",
    gender: "",
    is_adopted: "",
  });

  useEffect(() => {
    const params = {};

    if (filters.pet_type) {
      params.pet_type = filters.pet_type;
    }

    if (filters.breed) {
      params.breed__icontains = filters.breed;
    }

    if (filters.gender) {
      params.gender = filters.gender;
    }

    if (filters.is_adopted !== "") {
      params.is_adopted = filters.is_adopted;
    }

    api.get("pets/", { params })
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [filters]);

  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="pets-page">
      <div className="container py-5">

        <div className="text-center mb-5">
          <p className="pets-filter-title mb-2">
            FIND YOUR NEW BEST FRIEND
          </p>

          <h1 className="pets-title">
            🐾 Meet Our Lovely Pets
          </h1>

          <p className="text-secondary mt-2">
            Every pet deserves a safe and loving home.
          </p>
        </div>

        <div className="card shadow-sm pets-filter-card mb-5">
          <div className="card-body p-4">

            <h5 className="pets-filter-title mb-3">
              Find Your Perfect Companion
            </h5>

            <div className="row g-3">
              <div className="col-md-3">
                <select
                  name="pet_type"
                  className="form-select pet-filter-input"
                  value={filters.pet_type}
                  onChange={handleChange}
                >
                  <option value="">All Types</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                </select>
              </div>

              <div className="col-md-3">
                <input
                  type="text"
                  name="breed"
                  className="form-control pet-filter-input"
                  placeholder="Search by breed"
                  value={filters.breed}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-3">
                <select
                  name="gender"
                  className="form-select pet-filter-input"
                  value={filters.gender}
                  onChange={handleChange}
                >
                  <option value="">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="col-md-3">
                <select
                  name="is_adopted"
                  className="form-select pet-filter-input"
                  value={filters.is_adopted}
                  onChange={handleChange}
                >
                  <option value="">All Pets</option>
                  <option value="false">Available</option>
                  <option value="true">Adopted</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        <div className="row g-4">
          {pets.length === 0 ? (
            <div className="col-12">
              <div className="pets-empty text-center">
                No pets found. Try changing your filters. 🐾
              </div>
            </div>
          ) : (
            pets.map((pet) => (
              <div className="col-12 col-md-6 col-lg-4" key={pet.id}>
                <PetCard pet={pet} />
              </div>
             
            ))
          )}
        </div>

      </div>
    </main>
  );
}

export default Pets;