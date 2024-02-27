import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import request from "../../utils/request";
import MyButton from "../../components/Button";

export default function CourseDetails() {
    const [videoData, setVideoData] = useState({ Name: "", Description: "", VideoList: [{ Description: "", Title: "", VideoLink: "" }] })

    const navigate = useNavigate();
    const { courseId } = useParams();

    useEffect(() => {
        getCourseById();
    }, [])

    function getCourseById() {
        request("/get_course_by_id", "GET", { _id: courseId }).then(ret => {
            if (ret.list && ret.list.length) {
                setVideoData(ret.list[0])
            }
        })
    }

    return (
        <div>
            <div className="header d-flex justify-content-around align-items-center" style={{ height: "6rem" }}>
                <h3> Cursos disponíveis </h3>

                <div className="w-40 h-40">
                    <MyButton onClick={() => navigate(`/new-video/${courseId}`)} label="Criar novo vídeo" />
                </div>
            </div>

            <div>
                {videoData.VideoList.map(item => (
                    <div style={{ paddingTop: 100 }}>
                        <h2> Título: {item?.Title} </h2>
                        <h2> Descrição: {item?.Description} </h2>
                        <h2> Link01: {item?.VideoLink} </h2>

                    <div style={{height:"15rem", width:"15rem"}}> 
                        <video width="100%" height="100%" controls>
                            <source src={item?.VideoLink} type="video/mp4" />
                            Seu navegador não suporta o elemento de vídeo.
                        </video>
                    </div>

                    </div>
                ))}



            </div>
        </div>
    )
}