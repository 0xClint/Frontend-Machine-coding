import { useState } from "react";
import { IProduct } from "./Pagination";
import "./Post.css";

interface IPostProps {
  data: IProduct;
}
export default function Post({ data }: IPostProps) {
  const { title, thumbnail } = data;

  const [loading, setLoading] = useState<boolean>(true);
  return (
    <div className="post-container">
      <div className="post-img-container flex-center">
        {loading && <span>Loading...</span>}
        <img src={thumbnail} onLoad={() => setLoading(false)} />
      </div>
      <span>{title}</span>
    </div>
  );
}
