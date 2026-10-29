import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/profile.css";

function MyProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get("auth/profile/")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  if (!profile) {
    return (
      <main className="profile-page container-fluid py-5 text-center">
        <p>Loading profile...</p>
      </main>
    );
  }

  return (
    <main className="profile-page container-fluid py-5">
      <div className="profile-card shadow-sm">

        <div className="profile-header">
          <div className="profile-avatar">👤</div>

          <h1 className="h3 mb-1">My Profile</h1>

          <p className="mb-0">
            Your personal information
          </p>
        </div>

        <div className="profile-details">
          <div className="profile-detail">
            <div className="profile-label">Username</div>
            <div>{profile.username}</div>
          </div>

          <div className="profile-detail">
            <div className="profile-label">Email</div>
            <div>{profile.email}</div>
          </div>

          <div className="profile-detail">
            <div className="profile-label">Phone</div>
            <div>{profile.phone || "Not provided"}</div>
          </div>
        </div>

      </div>
    </main>
  );
}

export default MyProfile;