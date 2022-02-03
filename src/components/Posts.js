import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from "../App";

const Posts = ({ posts, user, fetchPosts }) => {
    async function handleDeletePost() {
        //stuff to delete post
        const resp = await fetch(`${BASE_URL}/`);

        fetchPosts();
    }

    if (posts.length > 0) {
        return (
            <div className=" flex flex-col justify-center items-center w-full h-auto">
                <form
                    className="w-full flex flex-row justify-center items-center bg-slate-100 h-14"
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                >
                    <label>Search Posts:</label>
                    <input placeholder="Search term"></input>
                    <button>Search</button>
                </form>
                {posts.map((index) => {
                    return (
                        <div
                            onClick={(e) => {
                                console.log(index._id);
                            }}
                            key={index._id}
                            className="flex flex-col border-b-slate-400 border-b rounded-lg shadow-sm shadow-gray-400 m-5 bg-slate-50 w-3/4 p-3"
                        >
                            <h1 className="text-2xl font-semibold border-b border-b-slate-400">
                                {index.title}
                            </h1>
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
                            {index.author._id === user._id ? (
                                <div className="flex flex-row justify-center">
                                    <button
                                        onClick={() => {
                                            console.log("clicked");
                                        }}
                                        className="flex flex-row items-center justify-center w-3/4 h-10 rounded-lg bg-blue-500 my-5 hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black"
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
        return <></>;
    }
};

export default Posts;
