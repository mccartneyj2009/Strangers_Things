import React from "react";

const Posts = ({ posts }) => {
    // return <h1>Posts</h1>;
    return (
        <div className="grid grid-cols-4 gap-4">
            {posts.map((index) => {
                return (
                    <div className="shadow-lg">
                        <h1 key={index._id}>{index.title}</h1>
                    </div>
                );
            })}
        </div>
    );
};

export default Posts;
