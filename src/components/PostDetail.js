import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const PostDetail = (props) => {
    const { id } = useParams();
    return <div>post detail: {id}</div>;
};

export default PostDetail;
