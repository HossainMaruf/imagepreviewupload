import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Button, ProgressBar } from "react-bootstrap";

const FileUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [progress, setProgress] = useState();

  const submitHandler = (e) => {
    e.preventDefault(); //prevent the form from submitting
    // console.log(selectedFiles);
    // return;
    let formData = new FormData();


    // console.log(Array.from(selectedFiles));
    Array.from(selectedFiles).forEach((file) => {
      formData.append('file', file);
    })

    axios.post("http://localhost:5000/upload_file", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (data) => {
        //Set the progress value to show the progress bar
        setProgress(Math.round((100 * data.loaded) / data.total));
      },
    });
  };
  return (
    <Container>
      <Row>
        <Col lg={{ span: 4, offset: 3 }}>
          <Form
            encType="multipart/form-data"
            onSubmit={submitHandler}
          >
            <Form.Group>
              <input
                type="file"
                name="file"
                multiple
                onChange={(e) => setSelectedFiles(e.target.files)}
              ></input>
            </Form.Group>

            <Form.Group>
              <Button variant="info" type="submit">
                Upload
              </Button>
            </Form.Group>
            {progress && <ProgressBar now={progress} label={`${progress}%`} />}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FileUpload;
