import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ProgressBar,
} from "react-bootstrap";

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]); // for upload files
  const [fileProgress, setFileProgress] = useState([]);

  const onChangeHandler = (files) => {
    const filesArray = Array.from(files);
    setSelectedFiles(filesArray);

    const progressFilesArray = filesArray.map((file) => {
      return {
        name: file.name,
        progress: 0
      }
    });
    setFileProgress(progressFilesArray);
  }
  const setProgress = async (name, value) => {
      console.log(name, value);
      let newFiles = [...fileProgress];

      const index = fileProgress.findIndex((file) => file.name === name);
      newFiles[index] = {
        name,
        progress: value
      }
      setFileProgress((oldFiles) => {
        return newFiles;
      });
  }
  const submitHandler = (e) => {
    e.preventDefault(); //prevent the form from submitting
    // console.log(fileProgress);
    // console.log(selectedFiles);
    // return;

    let formData = new FormData();

    // console.log(Array.from(selectedFiles));
    selectedFiles.forEach(async (file) => {
      formData.append("file", file);
      // console.log(file);
      await axios.post("http://localhost:5000/upload_file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: async (data) => {
          //Set the progress value to show the progress bar
          // console.log(file.name, data.progress);
          // setProgress(Math.round(100 * data.progress));
          await setProgress(file.name, Math.round(100*data.progress));
        },
      });
    });
  };
  return (
    <Container>
      <Row>
        <Col lg={{ span: 4, offset: 3 }}>
          <Form encType="multipart/form-data" onSubmit={submitHandler}>
            <Form.Group>
              <input
                type="file"
                name="file"
                multiple
                onChange={(e) => onChangeHandler(e.target.files)}
              ></input>
            </Form.Group>

            <Form.Group>
              <Button variant="info" type="submit">
                Upload
              </Button>
            </Form.Group>
            {/* {progress && <ProgressBar now={progress} label={`${progress}%`} />} */}
            {fileProgress.map((item) => {
              const {name, progress} = item;
              return <div key={name}>
                <p>{name}</p>
                <span>{progress}</span>
              </div>;
            })}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FileUpload;
