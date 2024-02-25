import React, {useContext} from "react";
import DataContext from "../../data/Contesxt";

export default function CourseList(){

    const {text} = useContext(DataContext)

    return(
        <h1> {text} </h1>
    )
}