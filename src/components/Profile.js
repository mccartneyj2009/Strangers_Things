import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Profile = ({ user }) => {
    console.log(user);

    const lsToken = localStorage.getItem("token");

    if (lsToken) {
        return (
            <>
                <div
                    className="h-3/4 w-3/4 flex flex-col items-center 
        border-b-slate-400 border-b rounded-lg shadow-sm shadow-gray-400 m-5 bg-slate-50  p-3 overflow-scroll"
                >
                    <h1 className="text-center w-3/4 text-3xl border-b-2 border-b-black">
                        Profile
                    </h1>
                    <Link
                        to="/createpost"
                        className="flex flex-row items-center justify-center w-3/4 h-10 rounded-lg bg-blue-500 my-5 hover:bg-blue-900 hover:text-white hover:shadow-md hover:shadow-black"
                    >
                        Make a new posting
                    </Link>
                    {user.messages ? (
                        <>
                            <p>Messages by me: {user.messages.length}</p>
                            {user.messages.map((message) => {
                                <p>{message}</p>;
                            })}
                            <span>Posts by me: {user.posts.length}</span>
                            {user.posts.map((post) => {
                                return (
                                    <p key={post._id}>Title: {post.title}</p>
                                );
                            })}
                        </>
                    ) : (
                        <p>Messages by me: 0</p>
                    )}
                </div>
            </>
        );
    } else {
        return <div>Please Login or Register to view your profile.</div>;
    }
};

export default Profile;
