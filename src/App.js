import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Register from "./components/Register";
import Login from "./components/Login";

const BASE_URL =
    "https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT";

const App = (props) => {
    const [posts, setPosts] = useState([]);

    async function fetchPosts() {
        const response = await fetch(`${BASE_URL}/posts`);
        const info = await response.json();
        setPosts(info.data.posts);
    }

    // console.log(posts);

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <div id="container">
            <div id="navbar">
                <Link to="/">Home</Link>
                <Link to="/posts">Posts</Link>
                <Link to="/register">Register</Link>
                <Link to="/login">Login</Link>
            </div>

            <div className="grid">
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/posts">
                    <Posts posts={posts} />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
            </div>
        </div>
    );
};

export default App;
