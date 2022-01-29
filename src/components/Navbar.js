import React from "react";
import { Link, useHistory } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
    const history = useHistory();
    return (
        <div className="flex flex-row justify-end space-x-4" id="navbar">
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
            {!user.username ? <Link to="/register">Register</Link> : null}
            {!user.username ? <Link to="/login">Login</Link> : null}
            {user.username ? (
                <Link
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

            {user.username && <span>Hello {user.username}</span>}
        </div>
    );
};

export default Navbar;
