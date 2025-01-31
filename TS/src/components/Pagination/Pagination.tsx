import { useEffect, useState } from "react";
import "./Pagination.css";
import Post from "./Post";

export interface IProduct {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
}

interface ProductResponse {
  total: 194;
  skip: 1;
  limit: 7;
  products: IProduct[];
}

const PRODUCT_LIMIT = 20;

export default function Pagination() {
  const [currPage, setCurrPage] = useState(0);
  const [postData, setPostData] = useState<IProduct[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(2);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `https://dummyjson.com/products?limit=${PRODUCT_LIMIT}&skip=${
          currPage * PRODUCT_LIMIT
        }`;
        // console.log(url);
        const res = await fetch(url);
        if (!res.ok) return new Error("something wnet wrong!");

        const data: ProductResponse = await res.json();
        setPostData(data.products);
        setTotalProducts(data.total);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [currPage]);

  const handlePageSelect = (e: any) => {
    const value = e.target.getAttribute("page-action");
    // console.log(value);
    if (!value) return;

    switch (value) {
      case "left": {
        setCurrPage(Math.max(0, currPage - 1));
        return;
      }
      case "right": {
        setCurrPage(
          Math.min(currPage + 1, Math.floor(totalProducts / PRODUCT_LIMIT))
        );
        return;
      }
      case currPage.toString():
        return;
      default:
        setCurrPage(parseInt(value));
    }
  };
  return (
    <div className="pagination">
      <h2>Pagination</h2>
      <div className="posts-container">
        {postData.map((post) => (
          <Post data={post} key={post.id} />
        ))}
      </div>
      <div className="pagination-container" onClick={handlePageSelect}>
        <button
          className="page-number-btn"
          page-action="left"
          disabled={currPage <= 0}
        >
          ◀️
        </button>
        {[...Array(Math.floor(totalProducts / PRODUCT_LIMIT) + 1).keys()].map(
          (_, index) => {
            return (
              <button
                key={index}
                className="page-number-btn"
                page-action={index.toString()}
                style={{
                  backgroundColor: currPage === index ? "aliceblue" : "",
                }}
              >
                {index + 1}
              </button>
            );
          }
        )}
        <button
          className="page-number-btn"
          page-action="right"
          disabled={currPage >= Math.floor(totalProducts / PRODUCT_LIMIT)}
        >
          ▶️
        </button>
      </div>
    </div>
  );
}
