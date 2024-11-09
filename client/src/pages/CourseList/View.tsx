import "./index.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SwitchNavBar from "../../components/SwitchNavBar";

interface CourseDetails {
  id: string;
  title: string;
  description: string;
}

interface ViewProps {
  navbarButton: () => void;
  courseList: CourseDetails[];
  onClick: (e?: string) => void;
  typeUser: string
}

export default function View({ navbarButton, courseList, onClick, typeUser}: ViewProps) {
  return (
    <Container style={{ height: "100vh", overflowY: "auto" }} fluid="lg">
      <Row
        className="header d-flex align-items-center"
        style={{ height: "12vh", borderBottom: "1px solid #A647E1" }}
      >
        <SwitchNavBar
          typeUser={typeUser}
          teacherTitle="Your courses"
          teacherTextButton="New course"
          teacherActionButon={navbarButton}
        />
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
        <h5>{typeUser}</h5>
          {courseList.map((item) => {
            return (
              <Container style={{ padding: 8 }}>
                <Row>
                  <Col
                    onClick={() => onClick(item.id)}
                    xs={2}
                    style={{
                      cursor: "pointer",
                      padding: "20px",
                      width: "100%",
                      gap: 15,
                      background: "rgb(166 71 225 / 38%)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{ height: "30%", fontWeight: 700, fontSize: 18 }}
                    >
                      {" "}
                      {item.title}
                    </div>
                    <div style={{ height: "70%", padding: 5 }}>
                      {" "}
                      {item.description}
                    </div>
                  </Col>
                </Row>
              </Container>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}
