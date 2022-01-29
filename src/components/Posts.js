import React from "react";

const Posts = ({ posts }) => {
    // return <h1>Posts</h1>;
    return (
        <div>
            {posts.map((index) => {
                return <h1 key={index._id}>{index.title}</h1>;
            })}
        </div>
    );
};

export default Posts;
