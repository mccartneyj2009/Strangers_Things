import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Profile = ({ user }) => {
    const lsToken = localStorage.getItem("token");
    const activePosts = [];

    if (user._id) {
        user.posts.forEach((index) => {
            if (index.active === true) {
                activePosts.push(index);
            }
        });
    }

    if (lsToken) {
        return (
            <>
                {user._id ? (
                    <div
                        className="h-3/4 w-3/4 flex flex-col items-center 
        border-b-slate-400 border-b rounded-lg shadow-sm shadow-gray-400 m-5 bg-slate-50 "
                    >
                        <h1 className="text-center w-3/4 text-3xl">Profile</h1>
                        <Link
                            to="/createpost"
                            className="flex flex-row items-center justify-center h-10 my-5 px-9 rounded-lg bg-blue-500  shadow-gray-600 shadow-md hover:bg-blue-900 hover:text-white hover:shadow-lg hover:shadow-black"
                        >
                            Make a new posting
                        </Link>
                        {/* Posts Section */}
                        <section className="flex flex-row basis-full w-full h-auto px-3">
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
                                                        className="flex flex-row items-center justify-start w-full h-10 mt-2 px-2 hover:bg-gray-300 hover:rounded-md"
                                                    >
                                                        <span className="font-bold">
                                                            Post Title:{" "}
                                                            <span className="font-normal">
                                                                {index.title}
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
                            <div
                                className="flex flex-col items-center w-3/4 my-6 overflow-y-scroll"
                                id="my-messages"
                            >
                                <h2 className="text-center w-3/4 text-xl border-b-2 border-b-black">
                                    My Messages ()
                                </h2>
                            </div>
                        </section>
                    </div>
                ) : (
                    "Loading Profile..."
                )}
            </>
        );
    } else {
        return <div>Please Login or Register to view your profile.</div>;
    }
};

export default Profile;
