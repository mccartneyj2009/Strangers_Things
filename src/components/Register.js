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
                className="h-3/4 w-1/4 flex flex-col items-center 
        border-b-slate-400 border-b rounded-lg shadow-sm shadow-gray-400 m-5 bg-slate-50  p-3"
                onSubmit={(e) => {
                    setError("");
                    e.preventDefault();
                    if (password !== confirm) {
                        return setError("Passwords do not match.");
                    }
                    if (password.length > 5) {
                        handleRegisterUser();
                    } else {
                        setError("Password must be atleast 6 characters.");
                    }
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
                    type="password"
                    required
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    placeholder="Password"
                ></input>
                <input
                    type="password"
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
