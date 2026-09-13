import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import MyButton from "../../components/Button";

interface ViewCourse {
  handleChangeTitle: (title: string) => void;
  handleChangeDescription: (title: string) => void;
  actionButtonCreate: () => void;
  handleBack: () => void;
  creating: boolean;
}

export default function View({
  handleChangeTitle,
  handleChangeDescription,
  actionButtonCreate,
  handleBack,
  creating,
}: ViewCourse) {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", padding: "2rem" }}
    >
      <div
        data-bs-theme="dark"
        style={{
          width: "100%",
          maxWidth: 480,
          background: "rgba(255, 255, 255, 0.04)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 16,
          padding: "2.5rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>New course</h1>
          <p style={{ opacity: 0.65, fontSize: 15, margin: 0 }}>
            Fill in the details below to create a new course.
          </p>
        </div>

        <Form>
          <Form.Group className="mb-3" controlId="formVideoTitle">
            <Form.Label style={{ fontWeight: 600, fontSize: 14 }}>
              Course name
            </Form.Label>
            <Form.Control
              onChange={(e) => handleChangeTitle(e.target.value)}
              type="text"
              placeholder="Insert course name"
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="formVideoDescription">
            <Form.Label style={{ fontWeight: 600, fontSize: 14 }}>
              Course description
            </Form.Label>
            <Form.Control
              onChange={(e) => handleChangeDescription(e.target.value)}
              as="textarea"
              rows={3}
              placeholder="description here"
            />
          </Form.Group>
        </Form>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <MyButton onClick={actionButtonCreate} label="Create" loading={creating} />
          <MyButton onClick={handleBack} label="Back" variant="secondary" disabled={creating} />
        </div>
      </div>
    </Container>
  );
}
