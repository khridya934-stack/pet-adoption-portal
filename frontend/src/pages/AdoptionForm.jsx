import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/adoptionform.css";

function AdoptionForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    phone: "",
    address: "",
    occupation: "",
    experience: "",
    reason: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const validateForm = () => {
    const newErrors = {};

    const phone = form.phone.trim();

    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }

    if (!form.address.trim()) {
      newErrors.address = "Address is required.";
    }

    if (!form.occupation.trim()) {
      newErrors.occupation = "Occupation is required.";
    }

    if (!form.experience.trim()) {
      newErrors.experience = "Please describe your pet care experience.";
    }

    if (!form.reason.trim()) {
      newErrors.reason = "Please provide a reason for adoption.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!validateForm()){
      return;
    }

    api.post(
      "adoptions/",
      {
        pet: id,
        ...form,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      }
    )
      .then(() => {
        alert("Adoption request submitted successfully!");
        navigate("/my-adoptions");
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to submit adoption request.");
      });
  };

  return (
    <main className="adoption-form-page container-fluid py5">
      <h1 className="adoption-form-title">🐾 Adoption Request</h1>

      <div className="adoption-form-card shadow-sm">
        <form onSubmit={handleSubmit}>
          <label className="adoption-form-label">
            Phone Number:
          </label>

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="form-control adoption-form-input"
            required
          />
          {errors.phone &&(
            <p className="text-danger small mt1">{errors.phone}</p>
          )}

          <label className="adoption-form-label">
            Address:
          </label>

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="form-control adoption-form-input"
            required
          />
          {errors.address &&(
            <p className="text-danger small mt-1">{errors.address}</p>
          )}

          <label className="adoption-form-label">
            Occupation:
          </label>

          <input
            name="occupation"
            placeholder="Occupation"
            value={form.occupation}
            onChange={handleChange}
            className="form-control adoption-form-input"
            required
          />
          {errors.occupation &&(
            <p className="text-danger small mt-1">{errors.occupation}</p>
          )}

          <label className="adoption-form-label">
            Experience :
          </label>

          <textarea
            name="experience"
            placeholder="Pet care experience"
            value={form.experience}
            onChange={handleChange}
            className="form-control adoption-form-input"
            required
          />
          {errors.experience &&(
            <p className="text-danger small mt-1">{errors.experience}</p>
          )}

          <label className="adoption-form-label">
            Reason For Adoption:
          </label>

          <textarea
            name="reason"
            placeholder="Why do you want to adopt this pet?"
            value={form.reason}
            onChange={handleChange}
            className="form-control adoption-form-input"
            required
          />
          {errors.reason &&(
            <p className="text-danger small mt-1">{errors.reason}</p>
          )}


          <button type="submit" className="adoption-form-btn">Submit Request</button>
        </form>
      </div>
    </main>
  );
}

export default AdoptionForm;

