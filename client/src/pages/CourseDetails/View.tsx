import MyButton from "../../components/Button";
import Navbar from "../../components/NavBar";
import { Container } from "react-bootstrap";
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

const ACCENT = "#A647E1";

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
  const navbar = (
    <Navbar
      firstColumn={
        <MyButton
          onClick={navBarFirstFunc}
          label={`← ${navBarFirstLabel}`}
          variant="secondary"
          style={{
            width: "auto",
            height: "auto",
            padding: "0.5rem 1.1rem",
            fontSize: "0.9rem",
            fontWeight: 600,
          }}
        />
      }
      secondColumn={
        typeUser == "Teacher" ? (
          <MyButton onClick={navBarSecondFunc} label={navBarSecondLabel} />
        ) : (
          <></>
        )
      }
    />
  );

  if (firstAcess) {
    return (
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          minHeight: "100vh",
        }}
      >
        {navbar}

        <div style={{ maxWidth: 640, textAlign: "center" }}>
          <h1 style={{ marginBottom: "1rem", fontWeight: 700 }}>
            {courseData.title}
          </h1>

          <p
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.6,
              opacity: 0.8,
              textAlign: "center",
              marginBottom: "2.5rem",
            }}
          >
            {courseData.description}
          </p>

          <MyButton
            label="Start Course"
            style={{
              fontSize: "1rem",
              width: "auto",
              padding: "0.75rem 2.5rem",
              backgroundColor: ACCENT,
              borderColor: ACCENT,
            }}
            onClick={() => handleStartCourse()}
          />
        </div>
      </Container>
    );
  }

  return (
    <Container style={{ minHeight: "100vh", overflowY: "auto", paddingBottom: "3rem" }}>
      <style>{`
        .lesson-card {
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }
        .lesson-card:hover {
          background-color: rgba(255, 255, 255, 0.07) !important;
          border-color: rgba(255, 255, 255, 0.16) !important;
        }
      `}</style>

      {navbar}

      <div style={{ maxWidth: 860, margin: "0 auto", paddingTop: "14vh" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "2rem" }}>
          {courseData.title}
        </h1>

        {courseData.videoList.length === 0 ? (
          <div style={{ opacity: 0.6, textAlign: "center", padding: "3rem 0" }}>
            No lessons available yet.
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {courseData.videoList.map((item, index) => (
              <div
                key={index}
                className="lesson-card"
                style={{
                  background: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderLeft: `3px solid ${ACCENT}`,
                  borderRadius: 12,
                  padding: "1.5rem",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: ACCENT,
                    marginBottom: 4,
                  }}
                >
                  Aula {index + 1}
                </div>

                <div
                  style={{
                    fontSize: 19,
                    fontWeight: 600,
                    marginBottom: item.description ? 6 : 16,
                  }}
                >
                  {item.title}
                </div>

                {item.description && (
                  <p style={{ fontSize: 15, opacity: 0.75, marginBottom: "1rem" }}>
                    {item.description}
                  </p>
                )}

                <video
                  width="100%"
                  height="100%"
                  controls
                  style={{ borderRadius: 8, display: "block", background: "#000" }}
                >
                  <source src={item?.bucketUrl} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
