import React, { useState } from "react";
import useSignup from "../hooks/useSignup.js";
import { signedCookie } from "cookie-parser";
import { Link } from "react-router-dom";

export default function Signup() {
    const { loading, signup } = useSignup();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmation: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        // Check if passwords match
        if (formData.password !== formData.confirmation) {
            alert("Passwords do not match!");
            return;
        }

        // Handle signup logic here
        console.log("Signup details:", formData);

        // signupUser();
        await signup(formData)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Sign Up</h3>

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="Pick a cool name 😎"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    minLength={4}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    minLength={6}
                />

                <label htmlFor="confirmation">Confirm Password</label>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    id="confirmation"
                    value={formData.confirmation}
                    onChange={handleChange}
                    minLength={6}
                />

                <button type="submit">Sign Up</button>
                <div>
                    Already have an account? <Link to='/login'>Log in</Link>
                </div>
            </form>
        </div>
    );
}