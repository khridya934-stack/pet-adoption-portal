import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import "../styles/login.css";

function Login() {
    const navigate = useNavigate();

    const { setIsLoggedIn } = useContext(AuthContext);

    const [user, setUser] = useState({
        username: "",
        password: "",
    });

    const handelChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        api.post("auth/login/", user)
            .then((response) => {
                localStorage.setItem("access", response.data.access);
                localStorage.setItem("refresh", response.data.refresh);

                api.get("auth/me/")
                    .then((userResponse) => {
                        localStorage.setItem(
                            "userId",
                            userResponse.data.id
                        );

                        setIsLoggedIn(true);
                        navigate("/");
                    })
                    .catch((error) => {
                        console.log(error);
                        alert("Unable to load user details.");
                    });
            })
            .catch((error) => {
                console.log(error);
                alert("Invlaid Credentials");
            });
    };

    return (
        <main className="login-page">
            <h1 className="login-title">Login</h1>

            <div className="login-card shadow-sm">
                <form action="" onSubmit={handleSubmit}>
                    <label className="login-label">Username:</label>

                    <input
                        type="text"
                        name="username"
                        placeholder="UserName"
                        className="form-control login-input"
                        value={user.username}
                        onChange={handelChange}
                        required />

                    <label className="login-label">Password</label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control login-input"
                        value={user.password}
                        onChange={handelChange}
                        required />

                    <p className="tect-center mt-3">
                        Doesn't have an account? {""}
                        <span className="register-login-link"
                            onClick={() => navigate("/register")}
                            role="button"
                        >
                            Register Here
                        </span>
                    </p>

                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </main>
    )
}

export default Login;