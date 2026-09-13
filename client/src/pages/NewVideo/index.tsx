import React, { useState } from "react";
import { useParams, useNavigate } from "react-router";
import MyButton from "../../components/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import request from "../../utils/request";

const NewVideo = () => {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [disableButton, setDisableButton] = useState(false);
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
      setDisableButton(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", padding: "2rem" }}
    >
      <div
        data-bs-theme="dark"
        style={{
          width: "100%",
          maxWidth: 480,
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 16,
          padding: "2.5rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>New video</h1>
          <p style={{ opacity: 0.65, fontSize: 15, margin: 0 }}>
            Upload a video and fill in its details.
          </p>
        </div>

        <Form>
          <Form.Group className="mb-3" controlId="formVideoFile">
            <Form.Label style={{ fontWeight: 600, fontSize: 14 }}>
              Video file
            </Form.Label>
            <Form.Control
              onChange={handleFileChange}
              type="file"
              accept="video/*"
            />
            {fileName && (
              <Form.Text style={{ opacity: 0.65 }}>
                {fileName} · {size} MB
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formVideoTitle">
            <Form.Label style={{ fontWeight: 600, fontSize: 14 }}>
              Video name
            </Form.Label>
            <Form.Control
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Insert video name"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formVideoDescription">
            <Form.Label style={{ fontWeight: 600, fontSize: 14 }}>
              Video description
            </Form.Label>
            <Form.Control
              onChange={(e) => setDescription(e.target.value)}
              as="textarea"
              rows={3}
              placeholder="Insert video description"
            />
          </Form.Group>
        </Form>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <MyButton
            loading={disableButton}
            label="Upload file"
            onClick={() => {
              setDisableButton(true);
              handleUpload();
            }}
          />
          <MyButton
            onClick={() => navigate(`/course-details/${courseId}`)}
            label="Back"
            variant="secondary"
          />
        </div>
      </div>
    </Container>
  );
};

export default NewVideo;
