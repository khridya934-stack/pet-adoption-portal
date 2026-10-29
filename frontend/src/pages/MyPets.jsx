import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import PetCard from "../components/PetCard";
import "../styles/mypets.css";

function MyPets() {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        api.get("pets/")
            .then((response) => {
                const userId = Number(localStorage.getItem("userId"));
                const myPets = response.data.filter(
                    (pet) => pet.owner === userId
                );

                setPets(myPets);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <main className="my-pets-page container-fluid py-5">
            <h1 className="my-pets-title text-center mb-4">
                🐾 My Pets
            </h1>

            {loading ? (
                <p className="my-pets-loading text-center">Loading pets...</p>
            ) : pets.length === 0 ? (
                <div className=" my-pets-empty alert alert-info text-center">
                    You havn't added any pets yet.
                </div>
            ) : (
                <div className="row g-4">
                    {pets.map((pet) => (
                        <div className="col-md-6 col-lg-4" key={pet.id}>
                            <PetCard pet={pet} />

                            <button
                                className="btn btn-success w-100 mt-2"
                                onClick={() =>
                                    navigate(`/my-pets/${pet.id}/add-vaccination`)
                                }
                            >
                                Add Vaccination Record
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </main>
    )
}

export default MyPets;