import { useEffect, useState } from "react";
import "./InfiniteScroll.css";

interface IProducts {
  id: number;
  thumbnail: string;
  title: string;
}

const LIMIT = 10;
export default function InfiniteScroll() {
  const [pageIdx, setPageIdx] = useState(0);
  const [products, setProducts] = useState<IProducts[]>([]);

  const fetchdata = async () => {
    try {
      const res = await fetch(
        `https://dummyjson.com/products?limit=${LIMIT}&skip=${LIMIT * pageIdx}`
      );
      if (!res.ok) throw new Error("Something went wrong!");

      const data = await res.json();
      setProducts((prevState) => [...prevState, ...data.products]);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchdata();
  }, [pageIdx]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (params) => {
        const { isIntersecting } = params[0];

        if (isIntersecting) {
          observer.unobserve(lastItem as any);
          setPageIdx((prev) => prev + 1);
        }
      },
      { threshold: 0.5 }
    );

    const lastItem = document.querySelector(".product-content:last-child");
    if (lastItem) observer.observe(lastItem);

    return () => {
      if (lastItem) observer.unobserve(lastItem);

      observer.disconnect();
    };
  }, [setPageIdx, products]);

  return (
    <div className="infinite-scroll">
      <h2>InfiniteScroll</h2>
      <div className="products-container">
        {products.map(({ id, title, thumbnail }) => (
          <div key={id} className="product-content">
            <div className="img-container">
              <img src={thumbnail} />
            </div>
            <span>{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
