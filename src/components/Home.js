import React from "react";
import { Link } from "react-router-dom";

const Home = ({ user }) => {
    return (
        <div
            className="h-3/4 w-1/2 flex flex-col items-center 
        border-b-slate-400 border-b rounded-lg shadow-sm shadow-gray-400 m-5 bg-slate-50  p-3 space-y-10"
        >
            <h1 className="text-3xl">
                Welcome to Strangers Things {user.username}
            </h1>
            {user.username ? (
                <>
                    <Link
                        to="/profile"
                        className="flex flex-row w-64 items-center justify-center h-10 px-9 rounded-lg bg-blue-500 my-5 shadow-gray-600 shadow-md hover:bg-blue-900 hover:text-white hover:shadow-lg hover:shadow-black"
                    >
                        View your profile
                    </Link>
                    <Link
                        to="/posts"
                        className="flex flex-row w-64 items-center justify-center h-10 px-9 rounded-lg bg-blue-500 my-5 shadow-gray-600 shadow-md hover:bg-blue-900 hover:text-white hover:shadow-lg hover:shadow-black"
                    >
                        View Posts
                    </Link>
                    <Link
                        to="/createpost"
                        className="flex flex-row w-64 items-center justify-center h-10 px-9 rounded-lg bg-blue-500 my-5 shadow-gray-600 shadow-md hover:bg-blue-900 hover:text-white hover:shadow-lg hover:shadow-black"
                    >
                        Make a new posting
                    </Link>
                </>
            ) : (
                <>
                    <Link
                        to="/login"
                        className="flex flex-row items-center justify-center w-3/4 h-10 rounded-lg bg-blue-500 my-5 hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black"
                    >
                        Login
                    </Link>
                    <h2>Or</h2>
                    <Link
                        to="/register"
                        className="flex flex-row items-center justify-center w-3/4 h-10 rounded-lg bg-blue-500 my-5 hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black"
                    >
                        Signup
                    </Link>
                </>
            )}
        </div>
    );
};

export default Home;
