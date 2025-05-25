import React from "react";
import { useParams } from "react-router-dom";

const BlogPage = () => {
  const { slug } = useParams;
  return (
    <div>
      BlogPage
      <p>{slug}</p>
    </div>
  );
};

export default BlogPage;
