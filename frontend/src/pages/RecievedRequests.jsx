import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/receivedrequests.css";

function ReceivedRequests() {
    const [requests, setRequests] = useState([]);
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const [requestsRes, petsRes] = await Promise.all([
                api.get("adoptions/"),
                api.get("pets/")
            ]);

            const userId = Number(localStorage.getItem("userId"));

            const myPets = petsRes.data.filter(
                pet => Number(pet.owner) === userId
            );

            const myPetIds = myPets.map(pet => pet.id);

            setPets(myPets);
            setRequests(
                requestsRes.data.filter(
                    request => myPetIds.includes(request.pet)
                )
            );
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleAction = async (id, action) => {
        try {
            await api.patch(`adoptions/${id}/${action}/`);

            alert(
                action === "approve"
                    ? "Adoption request approved!"
                    : "Adoption request rejected!"
            );

            fetchData();
        } catch (error) {
            alert(
                error.response?.data?.error ||
                "Unable to process the request."
            );
        }
    };

    return (
        <main className="received-requests-page container-fluid py-5">
            <h1 className="received-requests-title text-center mb-4">
                🐾 Adoption Requests Received
            </h1>

            {loading ? (
                <p className="received-requests-loading text-center">Loading requests...</p>
            ) : requests.length === 0 ? (
                <p className="received-requests text-center">
                    You haven't received any adoption requests yet.
                </p>
            ) : (
                requests.map(request => {
                    const pet = pets.find(
                        item => item.id === request.pet
                    );

                    return (
                        <div className="received-request-card p-3 mb-3" key={request.id}>
                            <h5 className="received-request-pet">Pet: {pet ? pet.name : request.pet}</h5>
                            <p className="received-request-detail">Applicant: {request.applicant_username}</p>
                            <p className="received-request-detail">Phone: {request.phone}</p>
                            <p className="received-request-detail">Occupation: {request.occupation}</p>
                            <p className="received-request-detail">Reason: {request.reason}</p>
                            <p className="received-request-detail">Experience: {request.experience}</p>
                            <p className="received-request-detail">Address: {request.address}</p>
                            <p className="received-request-detail">Status: <span className="received-request-status">{request.status}</span></p>

                            {request.status === "Pending" && (
                                <div>
                                    <button
                                        className="btn received-request-approved me-2"
                                        onClick={() =>
                                            handleAction(request.id, "approve")
                                        }
                                    >
                                        Approve
                                    </button>

                                    <button
                                        className="btn btn-danger received-request-reject"
                                        onClick={() =>
                                            handleAction(request.id, "reject")
                                        }
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </main>
    );
}

export default ReceivedRequests;