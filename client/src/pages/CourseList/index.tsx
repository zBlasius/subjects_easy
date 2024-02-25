import React, { useContext } from "react";
import DataContext from "../../data/Contesxt";
import MyButton from "../../components/Button";
import ListGroup from 'react-bootstrap/ListGroup';
import "./index.scss"
import { useNavigate } from "react-router-dom";

export default function CourseList() {
    const { courseList } = useContext(DataContext)
    const navigate = useNavigate()

    console.log('courseList', courseList)
    return (
        <div className="main-course-list">
            <div className="header d-flex justify-content-around align-items-center" style={{ height: "6rem" }}>
                <h3> Cursos disponíveis </h3>

                <div className="w-40 h-40">
                    <MyButton onClick={()=> navigate("/new-course")} label="Criar curso" />
                </div>
            </div>

            <div className="course-list">
                <ListGroup>
                    {courseList.map(item => {
                        return (
                            <ListGroup.Item 
                                className="course-item transparent" 
                                action 
                                variant="dark"
                                onClick={()=> navigate(`/course-details/${item._id}`)}
                            >
                                {item.Name}
                            </ListGroup.Item>
                        )
                    })}
                </ListGroup>
            </div>
        </div>
    )
}