import React, { useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import MyButton from '../../components/Button';
import MyInput from '../../components/Input';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import request from '../../utils/request';

const NewVideo = () => {
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("")
  const [size, setSize] = useState("");
  const { courseId } = useParams();
  const navigate = useNavigate();

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name || "")
    const sizeInMB = selectedFile.size / (1024 * 1024);
    const finalSize = sizeInMB.toFixed(2);
    setSize(finalSize)
  };

  const handleUpload = async () => {
    const formData = new FormData();
    const _courseId = courseId?.toString() || "";
    formData.append('file', file);
    formData.append('Title', title);
    formData.append('Description', description);
    formData.append('StorageUsage', size);
    formData.append('FileName', fileName);
    formData.append('courseId', _courseId);

    try {
      const response = await request("/course/file/upload_by_course", "POST", {})

      if (response.ok) {
        navigate(`/course-details/${courseId}`)
      } else {
        console.error('Erro ao enviar o arquivo:', response.statusText);
      }
    } catch (error: any) {
      console.error('Erro ao enviar o arquivo:', error.message);
    }
  };

  return (
    // <div>
    //   <input type="file" onChange={handleFileChange} />
    //   <MyInput onChange={(e)=>setTitle(e.target.value)} label='Título do video' />
    //   <MyInput onChange={(e)=>setDescription(e.target.value)}  label='Descrição do video' />
    //   <MyButton label='Enviar Arquivo' onClick={handleUpload}/>
    // </div>

    <Container className="vh-100 d-flex justify-content-center align-items-center flex-column w-100">
      <div className="text-center" style={{ width: "90%" }}>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formVideoTitle">
              <Form.Label style={{fontSize:20}}>Novo vídeo</Form.Label>
              <Form.Control onChange={handleFileChange} type="file" placeholder="Insira o novo video" accept='video/*' />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formVideoTitle">
              <Form.Label style={{fontSize:20}}>Nome do Curso</Form.Label>
              <Form.Control onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Insira o nome do curso" />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formVideoDescription">
              <Form.Label style={{fontSize:20}}>Descrição do Curso</Form.Label>
              <Form.Control onChange={(e) => setDescription(e.target.value)} as="textarea" rows={3} placeholder="Insira a descrição do curso" />
            </Form.Group>
          </Row>
        </Form>
      </div>
      <div style={{ height: "4%", width: '50%' }}>
        <MyButton label='Enviar Arquivo' onClick={handleUpload} />
      </div>
    </Container>
  );
};

export default NewVideo;
