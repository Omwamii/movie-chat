import React, { useState } from "react";
import useLogin from "../hooks/useLogin";

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
        // Handle login logic here
        console.log("Login details:", formData);

        // loginUser();
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
            </form>
        </div>
    );
}
