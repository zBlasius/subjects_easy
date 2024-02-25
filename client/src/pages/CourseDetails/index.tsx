import React from "react";
import { useParams } from "react-router-dom";

export default function CourseDetails(){

    const {courseId} = useParams();

    return(
        <div>
            <h2>Detalhes do curso </h2>
            <h4> id: {courseId} </h4>
        </div>
    )
}