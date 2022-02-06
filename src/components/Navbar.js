import React from "react";
import { Link, useHistory } from "react-router-dom";

const Navbar = ({ user, setUser, fetchPosts }) => {
    const history = useHistory();
    return (
        <header className="bg-blue-500 h-auto w-full shadow-md shadow-gray-700 rounded-b-md">
            {/* Title bar */}
            <div className="text-center font-extrabold text-3xl text-white">
                Strangers Things
            </div>
            {/* Buttons */}
            <div
                className="flex flex-row items-center justify-evenly p-2"
                id="navbar"
            >
                <div className="flex flex-row space-x-4 justify-end pr-4 h-12">
                    <Link
                        className="flex flex-row items-center justify-center rounded-lg h-10 w-20  hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black"
                        to="/"
                    >
                        Home
                    </Link>
                    <Link
                        className="flex flex-row items-center justify-center rounded-lg h-10 w-20  hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black"
                        to="/posts"
                    >
                        Posts
                    </Link>
                    {user.username ? (
                        <Link
                            className="flex flex-row items-center justify-center rounded-lg h-10 w-20  hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black"
                            to="/profile"
                        >
                            Profile
                        </Link>
                    ) : null}
                    {!user.username ? (
                        <Link
                            className="flex flex-row items-center justify-center rounded-lg h-10 w-20  hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black"
                            to="/register"
                        >
                            Register
                        </Link>
                    ) : null}
                    {!user.username ? (
                        <Link
                            className="flex flex-row items-center justify-center rounded-lg h-10 w-20  hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black"
                            to="/login"
                        >
                            Login
                        </Link>
                    ) : null}
                    {user.username ? (
                        <Link
                            className="flex flex-row items-center justify-center rounded-lg h-10 w-20  hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black"
                            to="/"
                            onClick={() => {
                                setUser("");
                                localStorage.removeItem("token");
                                fetchPosts();
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
