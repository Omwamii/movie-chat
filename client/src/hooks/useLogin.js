import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async(loginDetails) => {

        setLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
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
            toast.error(error.message)
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return { loading, login }
}

export default useLogin;