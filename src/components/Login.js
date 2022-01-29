import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../App";

const Login = ({ setToken }) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();

    async function handleLoginUser() {
        const resp = await fetch(`${BASE_URL}/users/login`, {
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
                    e.preventDefault();
                    handleLoginUser();
                }}
            >
                <input
                    value={user}
                    placeholder="Username"
                    onChange={(e) => {
                        setUser(e.target.value);
                    }}
                ></input>
                <input
                    value={password}
                    placeholder="Password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                ></input>
                <button>Login</button>
            </form>
            <p>{error}</p>
        </>
    );
};

export default Login;
