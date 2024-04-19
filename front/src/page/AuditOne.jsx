import axios from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const AuditOne = () => {
  const { id } = useParams();
  const [auditData, setAuditData] = useState(null);

  const getOne = async () => {
    try {
      const result = await axios.get(`/audit/${id}`);
      setAuditData(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOne();
  }, [id]);
  if (!auditData) {
    return <>Loading</>;
  }
  return <>{auditData._id}</>;
};
