import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import Posts from "./components/Posts";
import Register from "./components/Register";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import CreatePost from "./components/CreatePost";
import PostDetail from "./components/PostDetail";

export const BASE_URL =
    "https://strangers-things.herokuapp.com/api/2110-FTB-ET-WEB-PT";

const App = () => {
    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState("");
    const [user, setUser] = useState({});

    const lsToken = localStorage.getItem("token");

    async function fetchPosts() {
        if (lsToken) {
            const response = await fetch(`${BASE_URL}/posts`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${lsToken}`,
                },
            });
            const info = await response.json();
            setPosts(info.data.posts);
        } else {
            const response = await fetch(`${BASE_URL}/posts`);
            const info = await response.json();
            setPosts(info.data.posts);
        }
    }

    async function fetchUser() {
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
        fetchUser();
        fetchPosts();
    }, [token]);

    return (
        <div className="flex flex-col items-center w-full h-full">
            <Navbar user={user} setUser={setUser} fetchPosts={fetchPosts} />

            <Route exact path="/">
                <Home user={user} />
            </Route>
            <Route path="/profile">
                <Profile user={user} fetchUser={fetchUser} />
            </Route>
            <Route path="/postdetail/:id">
                <PostDetail
                    posts={posts}
                    fetchPosts={fetchPosts}
                    fetchUser={fetchUser}
                />
            </Route>
            <Route path="/posts">
                <Posts
                    posts={posts}
                    fetchUser={fetchUser}
                    fetchPosts={fetchPosts}
                />
            </Route>
            <Route path="/createpost">
                <CreatePost
                    token={token}
                    fetchPosts={fetchPosts}
                    fetchUser={fetchUser}
                />
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
