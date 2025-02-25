import React, { useState } from "react";
import useLogin from "../hooks/useLogin";
import { Link } from "react-router-dom";

export default function Login() {
    const { loading, login } = useLogin()
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(formData);

    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Login</h3>

                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    placeholder="Email or Phone"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit">Log In</button>
                <div>
                    Don't have an account? <Link to='/signup'>Sign Up</Link>
                </div>
            </form>
        </div>
    );
}
