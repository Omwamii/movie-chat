import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export default useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async(loginDetails) => {

        setLoading(true);

        try {
            const response = await fetch('http://127.0.0.1/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(loginDetails)
            })

            const data = await response.json();
            console.log(data);

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("user", JSON.stringify(data))
            setAuthUser(data);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return { loading, login }
}