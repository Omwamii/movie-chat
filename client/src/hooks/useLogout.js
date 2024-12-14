import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

export default useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {

        setLoading(true);

        try {
            const response = await fetch('http://127.0.0.1/api/auth/logout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
            })

            console.log('logging out');
            const data = await response.json();
            console.log(data);

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.removeItem("user")
            setAuthUser(null);

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return { loading, logout }
}