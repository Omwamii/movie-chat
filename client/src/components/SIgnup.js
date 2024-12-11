import React, { useState } from "react";

export default function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        // Handle signup logic here
        console.log("Signup details:", {
            username: formData.username,
            password: formData.password,
        });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Sign Up</h3>

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="Enter Username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
