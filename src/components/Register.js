import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Redirect,
    useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from "../App";

const Register = ({ setToken }) => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const history = useHistory();
    const lsToken = localStorage.getItem("token");

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

    if (lsToken) {
        return <Redirect to="/" />;
    } else {
        return (
            <>
                <form
                    className="h-3/4 w-1/4 flex flex-col items-center py-10 space-y-8
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
                        className="w-3/4 h-10 pl-2 bg-slate-50 border-b-2 border-blue-500 outline-blue-500 focus:border-none focus:bg-white"
                    ></input>
                    <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        placeholder="Password"
                        className="w-3/4 h-10 pl-2 bg-slate-50 border-b-2 border-blue-500 outline-blue-500 focus:border-none focus:bg-white"
                    ></input>
                    <input
                        type="password"
                        required
                        value={confirm}
                        onChange={(e) => {
                            setConfirm(e.target.value);
                        }}
                        placeholder="Confirm Password"
                        className="w-3/4 h-10 pl-2 bg-slate-50 border-b-2 border-blue-500 outline-blue-500 focus:border-none focus:bg-white"
                    ></input>
                    <button className="flex flex-row items-center justify-center w-3/4 h-10 rounded-lg bg-blue-500 my-5 shadow-gray-600 shadow-md hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black">
                        Register
                    </button>
                    <p>
                        Already have an account?{" "}
                        <Link
                            to="/login"
                            className="text-blue-500 hover:font-bold hover:underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
                <p>{error}</p>
            </>
        );
    }
};

export default Register;
