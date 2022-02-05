import React, { useEffect } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from "../App";
import { FaSearch } from "react-icons/fa";
import { useState } from "react/cjs/react.development";

const Posts = ({ posts, fetchPosts, fetchUser }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const lsToken = localStorage.getItem("token");
    const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
    const postsToDisplay = searchTerm.length ? filteredPosts : posts;

    async function handleDeletePost(postId) {
        const resp = await fetch(`${BASE_URL}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${lsToken}`,
            },
        });
        const info = await resp.json();

        fetchPosts();
        fetchUser();
    }

    function postMatches(post, text) {
        return post.title.toLowerCase().includes(text.toLowerCase());
    }

    useEffect(() => {
        fetchPosts();
        fetchUser();
    }, [posts]);

    if (posts.length > 0) {
        return (
            <div className=" flex flex-col justify-center items-center  w-full h-auto">
                <div className="flex flex-row justify-between w-3/4">
                    {lsToken ? (
                        // Create post button
                        <Link
                            to="/createpost"
                            className="flex flex-row items-center justify-center h-10 px-9 rounded-lg bg-blue-500 my-5 shadow-gray-600 shadow-md hover:bg-blue-900 hover:text-white hover:shadow-lg hover:shadow-black"
                        >
                            Make a new posting
                        </Link>
                    ) : (
                        <Link
                            to="/"
                            className="flex flex-row items-center justify-center h-10 px-9 rounded-lg bg-blue-500 my-5 shadow-gray-600 shadow-md hover:bg-blue-900 hover:text-white hover:shadow-lg hover:shadow-black"
                        >
                            Make a new posting
                        </Link>
                    )}
                    {/* Search form */}
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                        className="flex flex-row items-center justify-between  mt-5 text-gray-600 border-2 border-gray-300 bg-white h-10 px-4 rounded-lg text-sm shadow-md shadow-gray-600 hover:shadow-black hover:shadow-lg"
                    >
                        <input
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                            }}
                            value={searchTerm}
                            className=" focus:outline-none"
                            type="search"
                            name="search"
                            placeholder="Search"
                        />
                        <button type="submit" className="flex flex-row">
                            <FaSearch className="" />
                        </button>
                    </form>
                </div>
                {/* Posts */}
                {postsToDisplay.map((index) => {
                    return (
                        <div
                            key={index._id}
                            className="flex flex-col border-b-slate-400 border-b rounded-lg shadow-sm shadow-gray-400 m-5 bg-slate-50 w-3/4 p-3"
                        >
                            <Link
                                to={`/postdetail/${index._id}`}
                                className="text-2xl font-semibold border-b border-b-slate-400 hover:font-bold"
                            >
                                {index.title}
                            </Link>
                            <p className="font-semibold">
                                Description:{" "}
                                <span className="font-normal">
                                    {index.description}
                                </span>
                            </p>
                            <p className="font-semibold">
                                Price:{" "}
                                <span className="font-normal">
                                    {index.price}
                                </span>
                            </p>
                            <p className="font-semibold">
                                Location:{" "}
                                <span className="font-normal">
                                    {index.location}
                                </span>
                            </p>
                            <p className="font-semibold">
                                Post by:{" "}
                                <span className="font-normal">
                                    {index.author.username}
                                </span>
                            </p>
                            <p className="font-semibold">
                                Post created:{" "}
                                <span className="font-normal">
                                    {index.createdAt.slice(0, 10)}{" "}
                                    {index.createdAt.slice(11, 19)}
                                </span>
                            </p>
                            {index.isAuthor ? (
                                <div className="flex flex-row justify-center">
                                    <button
                                        onClick={() => {
                                            handleDeletePost(index._id);
                                        }}
                                        className="flex flex-row items-center justify-center w-1/4 h-10 rounded-lg bg-blue-500 my-5 shadow-gray-600 shadow-md hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black"
                                    >
                                        Delete
                                    </button>
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        );
    } else {
        return <>No Posts</>;
    }
};

export default Posts;
