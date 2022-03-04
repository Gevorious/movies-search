import axios from "axios";
import { useEffect, useState } from "react";
import { transformData } from "../helpers/transformData";
import Spinner from "./utils/Spinner";

const Modal = ({ modalHandler }) => {
  const [logs, setLogs] = useState();
  const [loading, setLoading] = useState(false);

  const getSearchlog = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://movies-search-55694-default-rtdb.europe-west1.firebasedatabase.app/tags.json"
      );
      setLogs(transformData(response.data).reverse());
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => getSearchlog(), []);

  return (
    <>
      <div className="backdrop" onClick={() => modalHandler(false)}></div>
      <div className="search-logs-modal">
        {loading ? (
          <Spinner />
        ) : (
          <ul>
            {logs &&
              logs.map((log, i) => {
                return <li key={`log-${i}`}>{log}</li>;
              })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Modal;
