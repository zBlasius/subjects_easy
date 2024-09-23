import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import request from "../../utils/request";
import MyButton from "../../components/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function CourseDetails() {
  const [courseData, setCourse] = useState({
    title: "",
    description: "",
    videoList: [{ description: "", title: "", bucketUrl: "" }],
  });

  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    getCourseById();
  }, []);

  function getCourseById() {
    request("/course/get_by_id", "GET", { id: courseId }).then((ret) => {
      console.log("ret", ret);
      if (ret) {
        setCourse(ret);
      }
    });
  }

  return (
    <Container style={{ height: "100vh", overflowY: "auto" }} fluid="lg">
      <Row
        className="header d-flex align-items-center"
        style={{ height: "12vh", borderBottom: "1px solid #A647E1" }}
      >
        <Col style={{ display: "flex", color: "#A647E1" }}>
          <h3> {courseData.title} </h3>
        </Col>
        <Col style={{ display: "flex", justifyContent: "end" }}>
          <div style={{ width: "50%" }}>
            <MyButton
              onClick={() => navigate(`/new-video/${courseId}`)}
              label="Criar novo vídeo"
            />
          </div>
        </Col>
      </Row>

      <Row style={{ height: "88vh", marginTop: 50 }}>
        <Col
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {courseData.videoList.map((item, index) => (
            <Container style={{ padding: 8 }}>
              <Row>
                <Col
                  xs={2}
                  style={{ padding: "20px", width: "100%", textAlign: "left" }}
                >
                  <div
                    style={{
                      height: "15rem",
                      width: "22rem",
                      marginBottom: 25,
                    }}
                  >
                    <video width="100%" height="100%" controls>
                      <source src={item?.bucketUrl} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  </div>

                  <div>
                    <span style={{ fontWeight: 600, fontSize: 20 }}>
                      {" "}
                      Aula {index + 1} : {item.title}
                    </span>
                    <p style={{ fontSize: 18 }}> {item.description}</p>
                  </div>
                </Col>
              </Row>
              <div
                style={{
                  width: "95%",
                  borderBottom: "1px solid rgb(166 71 225 / 82%)",
                }}
              ></div>
            </Container>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
