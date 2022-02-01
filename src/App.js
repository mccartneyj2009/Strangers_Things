import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";

export const BASE_URL =
    "https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT";

const App = (props) => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});

    async function fetchPosts() {
        const response = await fetch(`${BASE_URL}/posts`);
        const info = await response.json();
        setPosts(info.data.posts);
    }

    async function fetchUser() {
        const lsToken = localStorage.getItem("token");
        if (lsToken) {
            const resp = await fetch(`${BASE_URL}/users/me`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${lsToken}`,
                },
            });
            const info = await resp.json();
            setUser(info.data);
        }
    }

    useEffect(() => {
        fetchPosts();
        fetchUser();
    }, [token]);

    return (
        <div className="flex flex-col items-center w-full h-full">
            <Navbar user={user} setUser={setUser} />

            <Route exact path="/">
                <Home user={user} />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
            <Route path="/posts">
                <Posts posts={posts} />
            </Route>
            <Route path="/register">
                <Register setToken={setToken} />
            </Route>
            <Route path="/login">
                <Login setToken={setToken} />
            </Route>
        </div>
    );
};

export default App;
