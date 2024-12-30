import request from "../../utils/request";
import MyButton from "../../components/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../../components/NavBar";
import { Container } from "react-bootstrap";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

interface Video {
  description: string;
  title: string;
  bucketUrl: string;
}

interface ViewProps {
  courseData: {
    title: string;
    description: string;
    videoList: Video[];
  };
  navBarFirstLabel: string;
  navBarFirstFunc: () => void;
  navBarSecondLabel: string;
  navBarSecondFunc: () => void;
  handleStartCourse: () => void;
  typeUser: string;
  firstAcess: boolean;
}

export default function View({
  firstAcess,
  courseData,
  navBarFirstLabel,
  navBarFirstFunc,
  navBarSecondLabel,
  navBarSecondFunc,
  handleStartCourse,
  typeUser,
}: ViewProps) {
  return (
    <>
      {firstAcess ? (
        <Container
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "2rem",
            height: "100vh",
          }}
        >
          <Navbar
            firstColumn={
              <MyButton
                onClick={navBarFirstFunc}
                label={navBarFirstLabel}
                variant="secondary"
              />
            }
            secondColumn={
              typeUser == "Teacher" ? (
                <MyButton
                  onClick={navBarSecondFunc}
                  label={navBarSecondLabel}
                />
              ) : (
                <></>
              )
            }
          />

          <h1 style={{ textAlign: "center", marginBottom: "1rem", marginTop: "13vh" }}>
            {courseData.title}
          </h1>

          <div
            style={{
              maxWidth: "800px",
              textAlign: "justify",
              marginBottom: "2rem",
            }}
          >
            {courseData.description}
          </div>

          <div style={{ marginTop: "auto" }}>
            <MyButton
              label="Start Course"
              className="p-button-rounded p-button-primary"
              style={{ fontSize: "1rem" }}
              onClick={() => handleStartCourse()}
            />
          </div>
        </Container>
      ) : (
        <Container style={{ height: "100vh", overflowY: "auto" }}>
          <Navbar
            firstColumn={
              <MyButton
                onClick={navBarFirstFunc}
                label={navBarFirstLabel}
                variant="secondary"
              />
            }
            secondColumn={
              typeUser == "Teacher" ? (
                <MyButton
                  onClick={navBarSecondFunc}
                  label={navBarSecondLabel}
                />
              ) : (
                <></>
              )
            }
          />
          <Row style={{ height: "10vh", marginTop: "13vh" }}>
            <h3> {courseData.title} </h3>
          </Row>
          <Row style={{ height: "80vh" }}>
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
                      style={{
                        padding: "20px",
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      <div
                        style={{
                          marginBottom: 25,
                        }}
                      >
                        <div style={{ marginBottom: 15 }}>
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
      )}
    </>
  );
}
