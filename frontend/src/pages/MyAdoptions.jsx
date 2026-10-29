import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/myadoptions.css";

function MyAdoptions() {
    const [requests, setRequests] = useState([]);
    const [pets, setPets] = useState([]);
    const [payments, setPayments] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [requestsRes, petsRes, paymentsRes] = await Promise.all([
                    api.get("adoptions/"),
                    api.get("pets/"),
                    api.get("payments/")
                ]);

                setRequests(
                    requestsRes.data.filter(
                        request =>
                            Number(request.applicant) ===
                            Number(localStorage.getItem("userId"))
                    )
                );

                setPets(petsRes.data);

                const paymentMap = {};
                paymentsRes.data.results
                    ? paymentsRes.data.results.forEach(payment => {
                        paymentMap[payment.adoption_request] = payment;
                    })
                    : paymentsRes.data.forEach(payment => {
                        paymentMap[payment.adoption_request] = payment;
                    });

                setPayments(paymentMap);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handlePayment = async (requestId) => {
        try {
            let payment = payments[requestId];

            if (!payment || payment.status === "Failed") {
                const response = await api.post("payments/", {
                    adoption_request: requestId
                });

                payment = response.data;

                setPayments(prev => ({
                    ...prev,
                    [requestId]: payment
                }));
            }

            if (payment.status === "Pending") {
                const response = await api.post(
                    `payments/${payment.id}/simulate_success/`
                );

                payment = response.data;

                setPayments(prev => ({
                    ...prev,
                    [requestId]: payment
                }));

                alert("Demo payment successful!");
            }
        } catch (error) {
            console.log(error.response?.data || error);
            alert(
                error.response?.data?.error ||
                "Payment could not be completed."
            );
        }
    };

    return (
        <main className="my-adoptions-page container py-4">
            <h1 className="my-adoptions-title text-center mb-4">
                🐾 My Adoption Applications
            </h1>

            {loading ? (
                <p className="adoption-loading text-center">
                    Loading applications...
                </p>
            ) : requests.length === 0 ? (
                <p className="adoption-empty text-center">
                    You haven't submitted any adoption applications yet.
                </p>
            ) : (
                requests.map(request => {
                    const pet = pets.find(item => item.id === request.pet);
                    const payment = payments[request.id];

                    return (
                        <div className="adoption-card p-3 mb-3" key={request.id}>
                            <h5 className="adoption-pet-name">
                                Pet: {pet ? pet.name : request.pet}
                            </h5>

                            <p className="adoption-detail">
                                Application ID: {request.id}
                            </p>

                            <p className="adoption-detail">
                                Status: <span className="adoption-status">
                                    {request.status}
                                </span>
                            </p>

                            {request.status === "Approved" && (
                                <div>
                                    {payment?.status === "Success" ? (
                                        <p className="text-success">
                                            Payment successful — ₹{payment.amount}
                                        </p>
                                    ) : (
                                        <>
                                            <p>Adoption fee: ₹500</p>
                                            <button
                                                className="btn btn-success"
                                                onClick={() => handlePayment(request.id)}
                                            >
                                                {payment?.status === "Pending"
                                                    ? "Complete Demo Payment"
                                                    : "Pay Now"}
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })
            )}
        </main>
    );
}

export default MyAdoptions;