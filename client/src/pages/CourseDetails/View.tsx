import request from "../../utils/request";
import MyButton from "../../components/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../../components/NavBar";
import { Container } from "react-bootstrap";

interface Video {
  description: string;
  title: string;
  bucketUrl: string;
}

interface ViewProps {
  courseData: {
    title: string,
    description: string,
    videoList: Video[],
  };
  navBarFirstLabel: string;
  navBarFirstFunc: () => void;
  navBarSecondLabel: string;
  navBarSecondFunc: () => void;
  typeUser: string;
}

export default function View({
  courseData,
  navBarFirstLabel,
  navBarFirstFunc,
  navBarSecondLabel,
  navBarSecondFunc,
  typeUser
}: ViewProps) {
  return (
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
          typeUser == 'Teacher' ? <MyButton onClick={navBarSecondFunc} label={navBarSecondLabel} /> : <></>
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
                  style={{ padding: "20px", width: "100%", textAlign: "left" }}
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
  );
}
