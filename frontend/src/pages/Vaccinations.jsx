import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/vaccinations.css";

function Vaccinations() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("vaccinations/")
      .then((response) => {
        setRecords(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <main className="vaccinations-page container-fluid py-5">

      <h1 className="vaccinations-title text-center mb-4">
        💉 Vaccination Records
      </h1>

      {records.length === 0 ? (
        <div className="vaccinations-empty text-center">
          No vaccination records found.
        </div>
      ) : (
        <div className="row g-4">

          {records.map((record) => (
            <div className="col-md-6 col-lg-4" key={record.id}>

              <div className="vaccination-card">

                <div className="vaccination-card-body">

                  <h4 className="vaccination-pet-name">
                    🐾 {record.pet_name}
                  </h4>

                  <p className="vaccination-details">
                    <strong>Vaccine:</strong>{" "}
                    {record.vaccine_name}
                  </p>

                  <p className="vaccination-details">
                    <strong>Vaccination Date:</strong>{" "}
                    {record.vaccination_date}
                  </p>

                  <p className="vaccination-details">
                    <strong>Next Due Date:</strong>{" "}
                    {record.next_due_date || "Not specified"}
                  </p>

                  <p className="vaccination-details">
                    <strong>Veterinarian:</strong>{" "}
                    {record.veterinarian || "Not specified"}
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}

    </main>
  );
}

export default Vaccinations;