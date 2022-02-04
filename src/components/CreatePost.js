import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BASE_URL } from "../App";

const CreatePost = ({ fetchPosts }) => {
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

        history.push("/posts");

        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("");
        setDeliver(false);

        console.log(info);
    }

    if (lsToken) {
        return (
            <div
                className="h-3/4 w-3/4 flex flex-col items-center 
        border-b-slate-400 border-b rounded-lg shadow-sm shadow-gray-400 m-5 bg-slate-50  p-3 space-y-10"
            >
                <p className="">Create Post</p>
                <form
                    className="flex flex-col h-full w-full justify-between"
                    onSubmit={(e) => {
                        e.preventDefault();

                        handleCreatePost();
                    }}
                >
                    <div className="flex flex-col">
                        <label htmlFor="title">Title</label>
                        <input
                            required
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value);
                            }}
                            name="title"
                            placeholder="Post Title"
                            className=""
                        />
                        <label htmlFor="description" className="mt-5">
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
                            className=""
                        />
                        <label htmlFor="price" className="mt-5">
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
                            className=""
                        />
                        <label htmlFor="location" className="mt-5">
                            Location
                        </label>
                        <input
                            value={location}
                            onChange={(e) => {
                                setLocation(e.target.value);
                            }}
                            name="location"
                            placeholder="City, State (Optional)"
                            className=""
                        />
                        <label htmlFor="will-deliver" className="mt-5">
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
                            className=""
                        >
                            <option value=""></option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="flex flex-row justify-center mt-5">
                        <button className="flex flex-row items-center justify-center w-3/4 h-10 rounded-lg bg-blue-500 my-5 hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black">
                            Create Post
                        </button>
                    </div>
                </form>
            </div>
        );
    } else {
        return (
            <div
                className="h-3/4 w-3/4 flex flex-col items-center 
            border-b-slate-400 border-b rounded-lg shadow-sm shadow-gray-400 m-5 bg-slate-50  p-3 space-y-10"
            >
                <p>Please login to create a post</p>
            </div>
        );
    }
};

export default CreatePost;
