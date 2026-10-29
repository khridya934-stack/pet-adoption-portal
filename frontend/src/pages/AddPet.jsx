import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/addpets.css";

function AddPet() {
  const navigate = useNavigate();

  const [pet, setPet] = useState({
    name: "",
    pet_type: "",
    breed: "",
    age: "",
    gender: "",
    description: "",
    image: null,

    vaccine_name: "",
    vaccination_date: "",
    next_due_date: "",
    veterinarian: "",
  });

  const handleChange = (e) => {
    setPet({
      ...pet,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setPet({
      ...pet,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", pet.name);
    formData.append("pet_type", pet.pet_type);
    formData.append("breed", pet.breed);
    formData.append("age", pet.age);
    formData.append("gender", pet.gender);
    formData.append("description", pet.description);

    if (pet.image) {
      formData.append("image", pet.image)
    }

    try {
      const petResponse = await api.post("pets/", formData);
      const newPet = petResponse.data;

      if (pet.vaccine_name.trim() && pet.vaccination_date) {
        const vaccinationData = {
          pet: newPet.id,
          vaccine_name: pet.vaccine_name.trim(),
          vaccination_date: pet.vaccination_date,
          next_due_date: pet.next_due_date || null,
          veterinarian: pet.veterinarian.trim(),
        };
        await api.post("vaccinations/", vaccinationData);
      }
      alert(
        pet.vaccine_name.trim() && pet.vaccination_date
          ? "Pet and vaccination record added successfully!"
          : "Pet added successfully!"
      );

      navigate("/pets");
    } catch (error) {
      console.log(error.response?.data || error);

      alert("Something went wrong.Please check the consoleand your records");
    }

  };

  return (
    <main className="add-pet-page container-fluid py-5">

      <div className="add-pet-card shadow-sm mx-auto" >

        <div className="add-pet-form">

          <div className="add-pet-header">
            <h1 className="h3 mb-0">
              🐾 Add Pet
            </h1>
          </div>

          <form onSubmit={handleSubmit}>

            <input
              className="form-control mb-3"
              name="name"
              placeholder="Pet Name"
              value={pet.name}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              name="pet_type"
              placeholder="Pet Type"
              value={pet.pet_type}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              name="breed"
              placeholder="Breed"
              value={pet.breed}
              onChange={handleChange}
              required
            />

            <input
              className="form-control mb-3"
              type="number"
              name="age"
              placeholder="Age"
              value={pet.age}
              onChange={handleChange}
              required
            />

            <select
              className="form-select mb-3"
              name="gender"
              value={pet.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <div className="mb-3">
              <label className="form-label">Pet Image</label>

              <input
                type="file"
                name="image"
                className="form-control"
                accept="image/*"
                onChange={handleImageChange} />

            </div>

            <textarea
              className="form-control mb-3"
              name="description"
              placeholder="Description"
              value={pet.description}
              onChange={handleChange}
              rows="4"
              required
            />

            <hr className="my-4" />

            <h2 className="h5 mb-3">💉 Vaccination Details (Optional)</h2>

            <input
              className="form-control mb-3"
              name="vaccine_name"
              placeholder="Vaccine Name"
              value={pet.vaccine_name}
              onChange={handleChange}
            />

            <label className="form-label">Vaccination Date</label>
            <input
              type="date"
              className="form-control mb-3"
              name="vaccination_date"
              value={pet.vaccination_date}
              onChange={handleChange}
            />

            <label className="form-label">Next Due Date (Optional)</label>
            <input
              type="date"
              className="form-control mb-3"
              name="next_due_date"
              value={pet.next_due_date}
              onChange={handleChange}
            />

            <input
              className="form-control mb-3"
              name="veterinarian"
              placeholder="Veterinarian Name (Optional)"
              value={pet.veterinarian}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="add-pet-btn w-100"
            >
              Add Pet
            </button>

          </form>

        </div>
      </div>

    </main>
  );
}

export default AddPet;