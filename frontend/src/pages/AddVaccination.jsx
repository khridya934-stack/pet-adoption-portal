import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function AddVaccination() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [record, setRecord] = useState({
        vaccine_name: "",
        vaccination_date: "",
        next_due_date: "",
        veterinarian: "",
    });

    const handleChange = (e) => {
        setRecord({
            ...record,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("vaccinations/", {
                pet: Number(id),
                vaccine_name: record.vaccine_name.trim(),
                vaccination_date: record.vaccination_date,
                next_due_date: record.next_due_date || null,
                veterinarian: record.veterinarian.trim(),
            });

            alert("Vaccination record added successfully!");
            navigate("/my-pets");
        } catch (error) {
            console.log(error.response?.data || error);
            alert("Failed to add vaccination record. Please check the console.");
        }
    };

    return (
        <main className="container py-5">
            <div className="card shadow-sm p-4 mx-auto" style={{ maxWidth: "550px" }}>
                <h2 className="mb-4">💉 Add Vaccination Record</h2>

                <form onSubmit={handleSubmit}>
                    <label className="form-label">Vaccine Name</label>
                    <input
                        className="form-control mb-3"
                        name="vaccine_name"
                        value={record.vaccine_name}
                        onChange={handleChange}
                        required
                    />

                    <label className="form-label">Vaccination Date</label>
                    <input
                        type="date"
                        className="form-control mb-3"
                        name="vaccination_date"
                        value={record.vaccination_date}
                        onChange={handleChange}
                        required
                    />

                    <label className="form-label">Next Due Date (Optional)</label>
                    <input
                        type="date"
                        className="form-control mb-3"
                        name="next_due_date"
                        value={record.next_due_date}
                        onChange={handleChange}
                    />

                    <label className="form-label">Veterinarian (Optional)</label>
                    <input
                        className="form-control mb-3"
                        name="veterinarian"
                        value={record.veterinarian}
                        onChange={handleChange}
                    />

                    <button type="submit" className="btn btn-success w-100">
                        Save Vaccination Record
                    </button>
                </form>
            </div>
        </main>
    );
}

export default AddVaccination;