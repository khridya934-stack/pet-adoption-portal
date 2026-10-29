import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditPet() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [pet, setPet] = useState({
        name: "",
        pet_type: "",
        breed: "",
        age: "",
        gender: "",
        description: "",
        image: null,
    });

    const [currentImage, setCurrentImage] = useState("");

    useEffect(() => {
        api.get(`pets/${id}/`)
            .then((response) => {
                setPet({
                    name: response.data.name,
                    pet_type: response.data.pet_type,
                    breed: response.data.breed,
                    age: response.data.age,
                    gender: response.data.gender,
                    description: response.data.description,
                    image: null,
                });

                setCurrentImage(response.data.image || "");
            })
            .catch((error) => {
                console.log(error);
                alert("Unable to load pet details.");
            });
    }, [id]);

    const handleChange = (e) => {
        setPet({
            ...pet,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", pet.name);
        formData.append("pet_type", pet.pet_type);
        formData.append("breed", pet.breed);
        formData.append("age", pet.age);
        formData.append("gender", pet.gender);
        formData.append("description", pet.description);

        if (pet.image) {
            formData.append("image", pet.image);
        }

        api.patch(`pets/${id}/`, formData)
            .then(() => {
                alert("Pet updated successfully!");
                navigate("/my-pets");
            })
            .catch((error) => {
                console.log(error.response?.data || error);
                alert("Failed to update pet.");
            });
    };

    return (
        <main className="container py-5">
            <div
                className="card shadow mx-auto"
                style={{ maxWidth: "600px" }}>
                <div className="card-body">
                    <h1 className="text-center mb-4">✏️ Edit Pet</h1>

                    {currentImage && (
                        <div className="text-center mb-3">
                            <img
                                src={currentImage}
                                alt="Current pet"
                                style={{
                                    width: "200px",
                                    height: "160px",
                                    objectFit: "cover",
                                }}
                                className="rounded" />
                        </div>
                    )}

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
                            min="0"
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

                        <textarea
                            className="form-control mb-3"
                            name="description"
                            placeholder="Description"
                            value={pet.description}
                            onChange={handleChange}
                            rows="4"
                            required
                        />

                        <label className="form-label">Change Image (optional)</label>
                        <input
                            className="form-control mb-3"
                            type="file"
                            accept="image/*"
                            onChange={(e) =>
                                setPet({
                                    ...pet,
                                    image: e.target.files[0] || null,
                                })
                            }
                        />

                        <button
                            type="submit"
                            className="btn btn-primary w-100"
                        >
                            Save Changes
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}

export default EditPet;