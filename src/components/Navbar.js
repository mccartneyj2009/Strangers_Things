import React from "react";
import { Link, useHistory } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
    const history = useHistory();
    return (
        <header className="bg-blue-500">
            <div className="text-center font-extrabold text-3xl">
                Strangers Things
            </div>
            <div
                className="flex flex-row items-center justify-between"
                id="navbar"
            >
                <div>
                    {user.username && (
                        <span className="just">Hello {user.username}</span>
                    )}
                </div>

                <div className="flex flex-row space-x-4 justify-end pr-4 h-12">
                    <Link
                        className="flex flex-row items-center justify-center rounded-lg h-10 w-20 bg-blue-200 hover:bg-blue-900 hover:text-white hover:shadow-md"
                        to="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="flex flex-row items-center justify-center rounded-lg h-10 w-20 bg-blue-200 hover:bg-blue-900 hover:text-white hover:shadow-md"
                        to="/posts"
                    >
                        Posts
                    </Link>
                    {!user.username ? (
                        <Link
                            className="flex flex-row items-center justify-center rounded-lg h-10 w-20 bg-blue-200 hover:bg-blue-900 hover:text-white hover:shadow-md"
                            to="/register"
                        >
                            Register
                        </Link>
                    ) : null}
                    {!user.username ? (
                        <Link
                            className="flex flex-row items-center justify-center rounded-lg h-10 w-20 bg-blue-200 hover:bg-blue-900 hover:text-white hover:shadow-md"
                            to="/login"
                        >
                            Login
                        </Link>
                    ) : null}
                    {user.username ? (
                        <Link
                            className="flex flex-row items-center justify-center rounded-lg h-10 w-20 bg-blue-200 hover:bg-blue-900 hover:text-white hover:shadow-md"
                            to="/"
                            onClick={() => {
                                setUser("");
                                localStorage.removeItem("token");
                                history.push("/");
                            }}
                        >
                            Logout
                        </Link>
                    ) : null}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
