import React from "react";

const Posts = ({ posts }) => {
    return (
        <div className=" flex flex-col justify-center items-center">
            {posts.map((index) => {
                return (
                    <div
                        key={index._id}
                        className="border-b-slate-400 border-b rounded-lg shadow-sm shadow-gray-400 m-5 bg-slate-50 w-3/4 p-3"
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
                            <span className="font-normal">{index.price}</span>
                        </p>
                    </div>
                );
            })}
        </div>
    );
};

export default Posts;
