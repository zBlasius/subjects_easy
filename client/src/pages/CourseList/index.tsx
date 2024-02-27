import React, { useContext } from "react";
import DataContext from "../../data/Contesxt";
import MyButton from "../../components/Button";
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import "./index.scss"
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function CourseList() {
    const { courseList } = useContext(DataContext)
    const navigate = useNavigate()

    console.log('courseList', courseList)
    return (
        <Container style={{height:"100vh", overflowY: 'auto'}} fluid="lg">
            <Row className="header d-flex align-items-center" style={{ height: "12vh", borderBottom:"1px solid #A647E1"  }}>
                <Col style={{display:'flex', color: "#A647E1"}}>
                    <h3> Seus cursos </h3>
                </Col>
                <Col style={{display:'flex', justifyContent:"end"}}>
                    <div style={{width:"50%"}}>
                        <MyButton onClick={()=> navigate("/new-course")} label="Criar curso" />
                    </div>
                </Col>
            </Row>
            <Row style={{ height: "88vh", marginTop:50 }}>
                <Col style={{width:"100%", display:"flex",flexDirection:"column", alignItems:"center"}}>
                {courseList.map(item => {
                    return (
                        <Container style={{padding:8}}>
                            <Row>
                                <Col onClick={()=> navigate(`/course-details/${item._id}`)} xs={2} style={{cursor:"pointer", padding:"20px", width:"100%", gap:15, background:"rgb(166 71 225 / 38%)", display:'flex', flexDirection:'column', alignItems:"flex-start", textAlign:'left'}}>
                                    <div style={{height:"30%", fontWeight:700, fontSize:18}}> {item.Name}</div>
                                    <div style={{height:"70%",padding:5 }}> {item.Description}</div>
                                </Col>
                            </Row>
                        </Container>
                    )
                })}
                </Col>
            </Row>
        </Container>
    )
}

/*
 <div className="main-course-list">
            <div className="header d-flex justify-content-around align-items-center" style={{ height: "6rem", borderBottom:"1px solid #cecece", width:"90%", margin:'auto' }}>
                <h3> Cursos disponíveis </h3>

                <div className="w-40 h-40">
                    <MyButton onClick={()=> navigate("/new-course")} label="Criar curso" />
                </div>
            </div>

            <div className="course-list">
                <ListGroup>
                    {courseList.map(item => {
                        return (
                            // <ListGroup.Item 
                            //     className="course-item transparent" 
                            //     action 
                            //     variant="dark"
                            //     onClick={()=> navigate(`/course-details/${item._id}`)}
                            // >
                            //     {item.Name}
                            // </ListGroup.Item>
                            <div>
                                
                            </div>
                        )
                    })}
                </ListGroup>
            </div>

*/