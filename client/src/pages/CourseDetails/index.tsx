import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import request from "../../utils/request";
import MyButton from "../../components/Button";

export default function CourseDetails() {
    const [videoData, setVideoData] = useState({Name:"", Description: "", VideoList:[{Description:"", Title:"", VideoLink:""}]})

    const { courseId } = useParams();

    useEffect(()=>{
        getCourseById();
    },[])

    function getCourseById(){
        request("/get_course_by_id", "GET",{_id: courseId}).then(ret=>{

            if(ret.list && ret.list.length){
                setVideoData(ret.list[0])
            }

        })
    }

    return (
        <div>
            <h2>Curso: {videoData.Name} </h2>
            <h4> Descrição: {videoData.Description} </h4>

            <div>
                {videoData.VideoList.map(item=>(
                    <div style={{paddingTop:100}}>
                        <h2> Título: {item?.Title} </h2>
                        <h2> Descrição: {item?.Description} </h2>
                        <h2> Link01: {item?.VideoLink} </h2>
                    </div>
                ))}
                <MyButton label="Criar novo vídeo"/>
            </div>
        </div>
    )
}