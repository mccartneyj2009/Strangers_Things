import React from "react";
import { Link, Redirect } from "react-router-dom";

const ActivePosts = ({ user }) => {
    const activePosts = [];

    if (user._id) {
        user.posts.forEach((index) => {
            if (index.active === true) {
                activePosts.push(index);
            }
        });
    }

    return (
        <div
            className="flex flex-col items-center w-3/4 my-6 overflow-y-scroll"
            id="my-active-posts"
        >
            <h2 className="text-center w-3/4 text-xl border-b-2 border-b-black">
                My Active Posts ({activePosts.length})
            </h2>
            {
                /* {map over the posts the user has created} */
                user.posts.map((index) => {
                    if (index.active) {
                        return (
                            <div
                                key={index._id}
                                className="flex flex-row w-3/4"
                            >
                                <Link
                                    to={`/postdetail/${index._id}`}
                                    className="flex flex-row items-center justify-start w-full h-10 mt-2 px-2 hover:bg-gray-300"
                                >
                                    <span className="font-bold">
                                        Post Title:{" "}
                                        <span className="font-normal">
                                            {index.title.length > 10
                                                ? index.title.substring(0, 10) +
                                                  "......"
                                                : index.title}
                                        </span>
                                    </span>
                                </Link>
                            </div>
                        );
                    } else {
                        null;
                    }
                })
            }
        </div>
    );
};

const MyMessages = ({ user }) => {
    const messagesToMe = user.messages.filter((index) => {
        return index.fromUser._id !== user._id;
    });

    return (
        <div
            className="flex flex-col items-center w-3/4 my-6 overflow-y-scroll"
            id="my-messages"
        >
            <h2 className="text-center w-3/4 text-xl border-b-2 border-b-black">
                My Messages ({messagesToMe.length})
            </h2>

            <table className="w-3/4">
                <thead>
                    <tr>
                        <th className="text-left">Post Title</th>
                        <th className="text-left">Message Preview</th>
                    </tr>
                </thead>
                <tbody>
                    {messagesToMe.map((index) => {
                        return (
                            <tr
                                key={index._id}
                                className="h-10 hover:bg-gray-300 hover:rounded-md"
                            >
                                <td className="">
                                    <Link
                                        className="hover:font-bold"
                                        to={`/postdetail/${index.post._id}`}
                                    >
                                        {index.post.title}
                                    </Link>
                                </td>
                                <td>
                                    <div>
                                        {index.content.length > 10
                                            ? index.content.substring(0, 20) +
                                              "......"
                                            : index.content}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

const Profile = ({ user }) => {
    const lsToken = localStorage.getItem("token");

    if (lsToken) {
        return (
            <>
                {user._id ? (
                    <div
                        className="h-3/4 w-11/12 flex flex-col items-center 
        border-b-slate-400 border-b rounded-lg shadow-sm shadow-gray-400 m-5 bg-slate-50 "
                    >
                        <h1 className="text-center w-3/4 text-3xl">Profile</h1>
                        <Link
                            to="/createpost"
                            className="flex flex-row items-center justify-center h-10 my-5 px-9 rounded-lg bg-blue-500  shadow-gray-600 shadow-md hover:bg-blue-900 hover:text-white hover:shadow-lg hover:shadow-black"
                        >
                            Make a new posting
                        </Link>
                        <section className="flex flex-row basis-full w-full h-auto px-3">
                            <ActivePosts user={user} />
                            <MyMessages user={user} />
                        </section>
                    </div>
                ) : (
                    "Loading Profile..."
                )}
            </>
        );
    } else {
        return <Redirect to="/" />;
    }
};

export default Profile;
