import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../App";

const PostDetail = ({ posts, fetchUser, fetchPosts }) => {
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
        fetchUser();

        history.push("/posts");
    }

    async function handleSendMessage() {
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

        fetchPosts();
        setMessage("");
    }

    return (
        <div className="flex flex-col w-3/4 h-auto border-b-slate-400 border-b rounded-lg shadow-sm shadow-gray-400 my-5 bg-slate-50  p-3">
            {posts.map((element) => {
                if (element._id === id) {
                    return (
                        <div className="" key={element._id}>
                            <>
                                <h1 className="font-bold text-2xl border-b-2 border-b-black">
                                    {element.title}
                                </h1>
                                <div className="font-bold">
                                    Description:{" "}
                                    <span className="font-normal">
                                        {element.description}
                                    </span>
                                </div>
                                <div className="font-bold">
                                    Location:{" "}
                                    <span className="font-normal">
                                        {element.location}
                                    </span>
                                </div>
                                <div className="font-bold">
                                    Will Deliver:{" "}
                                    <span className="font-normal">
                                        {element.willDeliver ? "Yes" : "No"}
                                    </span>
                                </div>
                                <div className="font-bold">
                                    Created By:{" "}
                                    <span className="font-normal">
                                        {element.author.username}
                                    </span>
                                </div>
                                <div className="font-bold">
                                    Price:{" "}
                                    <span className="font-normal">
                                        {element.price}
                                    </span>
                                </div>
                                <div className="font-bold">
                                    Created At:{" "}
                                    <span className="font-normal">
                                        {element.createdAt.slice(0, 10)}{" "}
                                        {element.createdAt.slice(11, 19)}
                                    </span>
                                </div>
                                <div className="font-bold">
                                    Modified At:{" "}
                                    <span className="font-normal">
                                        {element.updatedAt.slice(0, 10)}{" "}
                                        {element.updatedAt.slice(11, 19)}
                                    </span>
                                </div>
                            </>
                            {/* If the user is logged in, a message can be sent or posting can be deleted */}

                            {lsToken ? (
                                element.isAuthor ? (
                                    <section className="">
                                        <div className="mt-6 pl-3 font-bold text-xl">
                                            Messages:
                                        </div>
                                        <div className="flex flex-col items-left  h-40  overflow-y-scroll border-2 border-gray-500 rounded-md px-3">
                                            {element.messages.map((message) => {
                                                return (
                                                    <p
                                                        key={message._id}
                                                        className="font-normal text-base "
                                                    >
                                                        <span className="font-bold">
                                                            {
                                                                message.fromUser
                                                                    .username
                                                            }
                                                            :{" "}
                                                        </span>
                                                        <span>
                                                            {message.content}
                                                        </span>
                                                    </p>
                                                );
                                            })}
                                        </div>
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
                                                className="w-3/4 p-2 border-2 border-black rounded-md"
                                            ></textarea>
                                            <button
                                                onClick={() => {
                                                    handleSendMessage();
                                                }}
                                                className="flex flex-row items-center justify-center w-3/4 h-10 rounded-lg bg-blue-500 my-5 shadow-gray-600 shadow-md hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black "
                                            >
                                                Send Message
                                            </button>
                                            <button
                                                onClick={() => {
                                                    handleDeletePost(id);
                                                }}
                                                className="flex flex-row items-center justify-center w-3/4 h-10 rounded-lg bg-blue-500 my-5 shadow-gray-600 shadow-md hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black"
                                            >
                                                Delete Posting
                                            </button>
                                        </form>
                                    </section>
                                ) : (
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
                                            className="w-3/4 p-2 border-2 border-black rounded-md"
                                        ></textarea>
                                        <button
                                            onClick={() => {
                                                handleSendMessage();
                                            }}
                                            className="flex flex-row items-center justify-center w-3/4 h-10 rounded-lg bg-blue-500 my-5 hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black shadow-gray-600 shadow-md"
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
