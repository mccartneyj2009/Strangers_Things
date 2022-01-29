import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from "../App";

const Register = ({ setToken }) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();

    async function handleRegisterUser() {
        const resp = await fetch(`${BASE_URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: {
                    username: user,
                    password: password,
                },
            }),
        });
        const info = await resp.json();
        if (info.error) {
            setError(info.error.message);
            return;
        }
        localStorage.setItem("token", info.data.token);
        setToken(info.data.token);

        history.push("/");
    }

    return (
        <>
            <form
                onSubmit={(e) => {
                    setError("");
                    e.preventDefault();
                    if (password !== confirm) {
                        return setError("Passwords do not match.");
                    }
                    handleRegisterUser();
                }}
            >
                <input
                    required
                    value={user}
                    onChange={(e) => {
                        setUser(e.target.value);
                    }}
                    placeholder="Username"
                ></input>
                <input
                    required
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    placeholder="Password"
                ></input>
                <input
                    required
                    value={confirm}
                    onChange={(e) => {
                        setConfirm(e.target.value);
                    }}
                    placeholder="Confirm Password"
                ></input>
                <button>Register</button>
            </form>
            <p>{error}</p>
        </>
    );
};

export default Register;
