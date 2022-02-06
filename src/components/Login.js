import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from "../App";

const Login = ({ setToken }) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const lsToken = localStorage.getItem("token");

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

    if (lsToken) {
        return <Redirect to="/" />;
    } else {
        return (
            <>
                <form
                    className="h-3/4 w-1/4 flex flex-col items-center py-10 space-y-8
        border-b-slate-400 border-b rounded-lg shadow-sm shadow-gray-400 m-5 bg-slate-50  p-3"
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
                        className="w-3/4 h-10 pl-2 bg-slate-50 border-b-2 border-blue-500 outline-blue-500 focus:border-none focus:bg-white"
                    ></input>
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        className="w-3/4 h-10 pl-2 bg-slate-50 border-b-2 border-blue-500 outline-blue-500 focus:border-none focus:bg-white"
                    ></input>
                    <button className="flex flex-row items-center justify-center w-3/4 h-10 rounded-lg bg-blue-500 my-5 shadow-gray-600 shadow-md hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black">
                        Login
                    </button>
                    <p>
                        No account?{" "}
                        <Link
                            to="/register"
                            className="text-blue-500 hover:font-bold hover:underline"
                        >
                            Register here
                        </Link>
                        .
                    </p>
                </form>
                <p>{error}</p>
            </>
        );
    }
};

export default Login;
