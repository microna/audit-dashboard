import { useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api";
import { useState } from "react";

export const Product = () => {
  const [productInfo, setProductInfo] = useState(null);
  const { id } = useParams();
  console.log("product", id);
  const handleProductInfo = async () => {
    try {
      const result = await axios.get("/posts/" + id);
      setProductInfo(result.data);
    } catch (e) {
      console.log("failed get products");
    }
  };

  useEffect(() => {
    handleProductInfo();
  }, [id]);
  return <div className="">{productInfo && productInfo.title}</div>;
};
