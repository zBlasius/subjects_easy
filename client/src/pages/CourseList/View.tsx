import "./index.scss";
import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SwitchNavBar from "../../components/SwitchNavBar";
import DataContext from "../../data/Contesxt";
import MyButton from "../../components/Button";

interface CourseDetails {
  id: string;
  title: string;
  description: string;
  codeSearch?: number;
}

interface ViewProps {
  navbarButton: () => void;
  courseList: CourseDetails[];
  onClick: (e?: string) => void;
  typeUser: string;
}

export default function View({
  navbarButton,
  courseList,
  onClick,
  typeUser,
}: ViewProps) {
  const { theme } = useContext(DataContext);

  return (
    <>
      {" "}
      <Row
        className="header d-flex align-items-center"
        style={{
          height: "12vh",
          position: "fixed",
          width: "100%",
          zIndex: 1,
          padding: 0,
          margin: 0,
        }}
      >
        <SwitchNavBar typeUser={typeUser} teacherTitle="Your courses" />
      </Row>
      <Container
        fluid
        className="course-scroll-container"
        style={{ height: "100vh", overflowY: "auto", width: "100%" }}
      >
        <Row style={{ height: "88vh", marginTop: 150 }}>
          <Col
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h5>{typeUser}</h5>
            {typeUser === "Teacher" && <h6>Your current courses</h6>}

            <div className="course-list-container">
              {typeUser === "Teacher" && (
                <div className="navbar-teacher-btn">
                  <MyButton onClick={navbarButton} label={"New course"} />
                </div>
              )}
              <div className="course-cards-list">
                {courseList.map((item) => (
                  <div
                    key={item.id}
                    className={`course-card course-card--${theme}`}
                    onClick={() => onClick(item.id)}
                  >
                    <div className="course-card__info">
                      <span className="course-card__title">{item.title}</span>
                      <span className="course-card__desc">
                        {item.description}
                      </span>
                    </div>
                    <span className="course-card__dots">⋮</span>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
