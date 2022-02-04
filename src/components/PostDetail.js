import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { BASE_URL } from "../App";

const PostDetail = ({ posts, user, fetchPosts }) => {
    const [message, setMessage] = useState("");

    const { id } = useParams();
    const lsToken = localStorage.getItem("token");
    const history = useHistory();

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

        history.push("/posts");
    }

    async function handleSendMessage() {
        //console.log(`${BASE_URL}/posts/${id}/messages`);
        const resp = await fetch(`${BASE_URL}/posts/${id}/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${lsToken}`,
            },
            body: JSON.stringify({
                message: {
                    content: message,
                },
            }),
        });
        const info = await resp.json();
        console.log(info);

        fetchPosts();

        setMessage("");
    }

    console.log(posts);

    return (
        <div className="flex flex-col w-3/4 h-auto border-b-slate-400 border-b rounded-lg shadow-sm shadow-gray-400 m-5 bg-slate-50  p-3">
            {posts.map((element) => {
                if (element._id === id) {
                    return (
                        <div key={element._id}>
                            <h1>{element.title}</h1>
                            <div>Description: {element.description}</div>
                            <div>Location: {element.location}</div>
                            <div>
                                Will Deliver:{" "}
                                {element.willDeliver ? "Yes" : "No"}
                            </div>
                            <div>Created By: {element.author.username}</div>
                            <div>Price: {element.price}</div>
                            <div>
                                Created At: {element.createdAt.slice(0, 10)}{" "}
                                {element.createdAt.slice(11, 19)}
                            </div>
                            <div>
                                Modified At: {element.updatedAt.slice(0, 10)}{" "}
                                {element.updatedAt.slice(11, 19)}
                            </div>

                            <div>
                                {element.messages.map((message) => {
                                    return <p>{message}</p>;
                                })}
                            </div>

                            {/* If the user is logged in, a message can be sent or posting can be deleted */}
                            {lsToken ? (
                                //The user is signed in and looking at a post that is their own
                                element.author._id === user._id ? (
                                    <form
                                        id="message-form"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                        }}
                                        className="flex flex-col items-center mt-10"
                                    >
                                        <textarea
                                            onChange={(e) => {
                                                setMessage(e.target.value);
                                            }}
                                            value={message}
                                            placeholder="Enter a message..."
                                            rows="5"
                                            wrap="soft"
                                            maxLength="250"
                                            form="message-form"
                                            className="w-3/4"
                                        ></textarea>
                                        <button
                                            onClick={() => {
                                                handleSendMessage();
                                            }}
                                            className="flex flex-row items-center justify-center w-3/4 h-10 rounded-lg bg-blue-500 my-5 hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black"
                                        >
                                            Send Message
                                        </button>
                                        <button
                                            onClick={() => {
                                                handleDeletePost(id);
                                            }}
                                            className="flex flex-row items-center justify-center w-3/4 h-10 rounded-lg bg-blue-500 my-5 hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black"
                                        >
                                            Delete Posting
                                        </button>
                                    </form>
                                ) : (
                                    //The user is signed in and looking at some one elses post
                                    <form
                                        id="message-form"
                                        onSubmit={(e) => {
                                            e.preventDefault();
                                        }}
                                        className="flex flex-col items-center mt-10"
                                    >
                                        <textarea
                                            onChange={(e) => {
                                                setMessage(e.target.value);
                                            }}
                                            value={message}
                                            placeholder="Enter a message..."
                                            rows="5"
                                            wrap="soft"
                                            maxLength="250"
                                            form="message-form"
                                            className="w-3/4"
                                        ></textarea>
                                        <button
                                            onClick={() => {
                                                handleSendMessage();
                                            }}
                                            className="flex flex-row items-center justify-center w-3/4 h-10 rounded-lg bg-blue-500 my-5 hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black"
                                        >
                                            Send Message
                                        </button>
                                    </form>
                                )
                            ) : null}
                        </div>
                    );
                }
            })}
        </div>
    );
};

export default PostDetail;
