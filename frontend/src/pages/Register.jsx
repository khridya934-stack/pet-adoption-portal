import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/register.css";

function Register() {
    const navigate = useNavigate();

    const [user, setUSer] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });

    const handleChange = (e) => {
        setUSer({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user.password !== user.confirmPassword) {
            alert("Passwords do not match! Retry");
            return;
        }

        const { confirmPassword, ...registerData } = user;

        if (!/^[0-9]{10}$/.test(user.phone.trim())){
            alert("Enter a valid 10-digit phone number");
            return;
        }

        api.post('auth/register/', registerData)
            .then(() => {
                alert("Registration Succeful!");
                navigate('/login');
            })
            .catch((error) => {
                console.log(error);
                alert("Registration failed");
            });
    };

    return (
        <main className="register-page">
            <h1 className="register-title">Register</h1>

            <div className="register-card shadow-sm">
                <form action="" onSubmit={handleSubmit}>
                    <label className="register-label">Name</label>

                    <input
                        type="text"
                        name="username"
                        placeholder="UserName"
                        className="form-control register-input"
                        value={user.username}
                        onChange={handleChange}
                        required />

                    <label className="register-label">EMail</label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="form-control register-input"
                        value={user.email}
                        onChange={handleChange}
                        required />

                    <label className="register-label">Password</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control register-input"
                        value={user.password}
                        onChange={handleChange}
                        required />

                    <label className="register-label">Confirm Password</label>

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        className="form-control register-input"
                        value={user.confirmPassword}
                        onChange={handleChange}
                        required />

                    <label className="register-label">Phone</label>

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        className="form-control register-input"
                        value={user.phone}
                        onChange={handleChange}
                        required />

                    <p className="tect-center mt-3">
                        Already have an account? {""}
                        <span className="register-login-link"
                            onClick={() => navigate("/login")}
                            role="button"
                        >
                            Login Here
                        </span>
                    </p>

                    <button type="submit" className="register-button">Register</button>
                </form>
            </div>
        </main>
    )
}

export default Register;