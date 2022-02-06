import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { BASE_URL } from "../App";

const CreatePost = ({ fetchPosts, fetchUser }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");
    const [deliver, setDeliver] = useState(false);

    const lsToken = localStorage.getItem("token");
    const history = useHistory();

    async function handleCreatePost() {
        const resp = await fetch(`${BASE_URL}/posts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${lsToken}`,
            },
            body: JSON.stringify({
                post: {
                    title: title,
                    description: description,
                    price: price,
                    location: location,
                    willDeliver: deliver,
                },
            }),
        });

        const info = await resp.json();

        fetchPosts();
        fetchUser();
        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setDeliver(false);

        history.push("/posts");
    }

    if (lsToken) {
        return (
            <form
                className="h-auto w-2/4 flex flex-col items-center justify-center py-10 space-y-8 mt-5
        border-b-slate-400 border-b rounded-lg shadow-sm shadow-gray-400 bg-slate-50"
                onSubmit={(e) => {
                    e.preventDefault();

                    handleCreatePost();
                }}
            >
                <p className="text-2xl">Create Post</p>
                <div className="flex flex-col w-full items-center">
                    <label className=" text-lg text-left w-3/4" htmlFor="title">
                        Title
                    </label>
                    <input
                        required
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                        name="title"
                        placeholder="Post Title"
                        className="w-3/4 h-10 pl-2 bg-slate-50 border-b-2 border-blue-500 outline-blue-500 focus:border-none focus:bg-white"
                    />
                    <label
                        className=" text-lg text-left w-3/4 mt-5"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <input
                        required
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                        name="description"
                        placeholder="What is it?"
                        className="w-3/4 h-10 pl-2 bg-slate-50 border-b-2 border-blue-500 outline-blue-500 focus:border-none focus:bg-white"
                    />
                    <label
                        className=" text-lg text-left w-3/4 mt-5"
                        htmlFor="price"
                    >
                        Price
                    </label>
                    <input
                        required
                        value={price}
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                        name="price"
                        placeholder="$0.00"
                        className="w-3/4 h-10 pl-2 bg-slate-50 border-b-2 border-blue-500 outline-blue-500 focus:border-none focus:bg-white"
                    />
                    <label
                        className=" text-lg text-left w-3/4 mt-5"
                        htmlFor="location"
                    >
                        Location
                    </label>
                    <input
                        value={location}
                        onChange={(e) => {
                            setLocation(e.target.value);
                        }}
                        name="location"
                        placeholder="City, State (Optional)"
                        className="w-3/4 h-10 pl-2 bg-slate-50 border-b-2 border-blue-500 outline-blue-500 focus:border-none focus:bg-white"
                    />
                    <label
                        className=" text-lg text-left w-3/4 mt-5"
                        htmlFor="will-deliver"
                    >
                        Will Deliver
                    </label>
                    <select
                        required
                        onChange={(e) => {
                            if (e.target.value === "yes") {
                                setDeliver(true);
                            } else {
                                setDeliver(false);
                            }
                        }}
                        name="will-deliver"
                        className="w-3/4 h-10 pl-2 bg-slate-50 border-b-2 border-blue-500 outline-blue-500 focus:border-none focus:bg-white"
                    >
                        <option value=""></option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </div>
                <div className="w-3/4 flex flex-row justify-center mt-5">
                    <button className="flex flex-row items-center justify-center w-3/4 h-10 rounded-lg bg-blue-500 my-5 shadow-gray-600 shadow-md hover:bg-blue-900 hover:text-white hover:shadow-lg hover:shadow-black">
                        Create Post
                    </button>
                </div>
            </form>
        );
    } else {
        return (
            <div
                className="h-3/4 w-3/4 flex flex-col items-center 
            border-b-slate-400 border-b rounded-lg shadow-sm shadow-gray-400 m-5 bg-slate-50  p-3 space-y-10"
            >
                <p>
                    Please{" "}
                    <Link
                        to="/login"
                        className="text-blue-500 hover:font-bold hover:underline"
                    >
                        login
                    </Link>{" "}
                    or{" "}
                    <Link
                        to="/register"
                        className="text-blue-500 hover:font-bold hover:underline"
                    >
                        register
                    </Link>{" "}
                    to create a post
                </p>
            </div>
        );
    }
};

export default CreatePost;
