import React, {useEffect} from "react";
import axios from 'axios';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import FileUpload from "./component/FileUpload";

function App() {
  const getServer = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/");
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(function () {
    getServer();
  }, []);
  return (
    <div className="container mt-5">
      <FileUpload />
    </div>
  );
}

export default App;
