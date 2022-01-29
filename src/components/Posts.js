import React from "react";

const Posts = ({ posts }) => {
    // return <h1>Posts</h1>;
    return (
        <div className="flex-col">
            {posts.map((index) => {
                return (
                    <div key={index._id} className="rounded-md shadow-lg">
                        <h1>{index.title}</h1>
                    </div>
                );
            })}
        </div>
    );
};

export default Posts;
