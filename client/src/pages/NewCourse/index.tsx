import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MyButton from '../../components/Button';
import request from '../../utils/request';
import DataContext from '../../data/Contesxt';

function NewCourse() {
    const [titleCourse, setTitleCourse] = useState("")
    const [descriptionCourse, setDescriptionCourse] = useState("")
    const { user, setCourseList } = useContext(DataContext)
    const navigate = useNavigate();

    function createCourse() {

        const newData =
        {
            Name: titleCourse,
            Description: descriptionCourse,
            StorageUsage: 1000,
            VideoList: [
                {
                    Title: "Título video 01",
                    Description: "Descrição vídeo 01",
                    StorageUsage: 0,
                    VideoLink: "teste.com"
                }]
        }

        request("/create_new_course", "POST", newData).then(ret=>{
            getCourseList()
            navigate("/course-list")
        })
    }

    function getCourseList() {

        request("/list_all_course", "GET", {
            email: user?.toString()
        }).then(ret=>{
            setCourseList(ret.list);
        }).catch(err=>{
            console.error(err);
            setCourseList([]);
        })
    }
    
    return (
        <Container className="vh-100 d-flex justify-content-center align-items-center flex-column w-100">
            <div className="text-center" style={{ width: "90%" }}>
                <h1 className="mb-4">Novo Curso</h1>
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formVideoTitle">
                            <Form.Label>Nome do Curso</Form.Label>
                            <Form.Control onChange={(e) => setTitleCourse(e.target.value)} type="text" placeholder="Insira o nome do curso" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="formVideoDescription">
                            <Form.Label>Descrição do Curso</Form.Label>
                            <Form.Control onChange={(e) => setDescriptionCourse(e.target.value)} as="textarea" rows={3} placeholder="Insira a descrição do curso" />
                        </Form.Group>
                    </Row>
                </Form>
            </div>
            <div style={{ height: "4%", width: '50%' }}>
                <MyButton onClick={() => createCourse()} label="Criar" />
            </div>
        </Container>
    );
}

export default NewCourse;