import React, { useState } from "react";

export default function Login() {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle login logic here
        console.log("Login details:", formData);

        loginUser();
    };

    const loginUser = () => {
        fetch('http://127.0.0.1:5000/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
        });
    }

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
