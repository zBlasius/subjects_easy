import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import request from "../../utils/request";
import MyButton from "../../components/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../../components/NavBar";

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
    <Container style={{ height: "100vh", overflowY: "auto", width: "100%" }}>
      <Navbar
        firstColumn={
          <MyButton
            onClick={() => navigate(`/course-list`)}
            label="Voltar"
            variant="secondary"
          />
        }
        secondColumn={
          <MyButton
            onClick={() => navigate(`/new-video/${courseId}`)}
            label="Criar novo vídeo"
          />
        }
      />
      <Row style={{ height: "100vh", marginTop: "20vh" }}>
        <h3> {courseData.title} </h3>
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
                      marginBottom: 25
                    }}
                  >
                    <div style={{marginBottom: 15}}>
                      <span style={{ fontWeight: 600, fontSize: 20 }}>
                        {" "}
                        Aula {index + 1} : {item.title}
                      </span>
                      <p style={{ fontSize: 18 }}> {item.description}</p>

                      <div
                        style={{
                          borderBottom: "1px solid rgb(166 71 225 / 82%)",
                        }}
                      ></div>
                    </div>

                    <video width="100%" height="100%" controls>
                      <source src={item?.bucketUrl} type="video/mp4" />
                      Seu navegador não suporta o elemento de vídeo.
                    </video>
                  </div>

                </Col>

              </Row>
            </Container>
          ))}
        </Col>
      </Row>
    </Container>
  );
}
