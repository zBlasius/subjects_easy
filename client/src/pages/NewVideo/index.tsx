import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MyButton from "../../components/Button";
import MyInput from "../../components/Input";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import request from "../../utils/request";
import Navbar from "../../components/NavBar";

const NewVideo = () => {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [disableButton, setDisableButton] = useState(false)
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name || "");
    const sizeInMB = selectedFile.size / (1024 * 1024);
    const finalSize = sizeInMB.toFixed(2);
    setSize(finalSize);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    const _courseId = courseId?.toString() || "";
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("storageUsage", size);
    formData.append("fileName", fileName);
    formData.append("courseId", _courseId);

    try {
      await request(
        "/course/file/upload_by_course",
        "POST",
        {},
        formData
      );

      navigate(`/course-details/${courseId}`);

    } catch (error: any) {
      console.error("Erro ao enviar o arquivo:", error.message);
    }
  };

  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center flex-column w-100">
      <div className="text-center" style={{ width: "90%" }}>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formVideoTitle">
              <Form.Label style={{ fontSize: 20 }}> New video </Form.Label>
              <Form.Control
                onChange={handleFileChange}
                type="file"
                placeholder="Insert new video"
                accept="video/*"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formVideoTitle">
              <Form.Label style={{ fontSize: 20 }}>Video name</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Insert video name"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formVideoDescription">
              <Form.Label style={{ fontSize: 20 }}>
                Video description
              </Form.Label>
              <Form.Control
                onChange={(e) => setDescription(e.target.value)}
                as="textarea"
                rows={3}
                placeholder="Insert video description"
              />
            </Form.Group>
          </Row>
        </Form>
      </div>
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        width: "57%",
        height: "10%"
      }}>
        <MyButton disabled={disableButton} label="Upload file" onClick={(e)=>{
          setDisableButton(true)
          handleUpload()
        }} />
        <MyButton
          onClick={() => navigate(`/course-details/${courseId}`)}
          label="Back"
          variant="secondary"
        />
      </div>
    </Container>
  );
};

export default NewVideo;
