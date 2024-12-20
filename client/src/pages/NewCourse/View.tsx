import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MyButton from "../../components/Button";

interface ViewCourse {
  handleChangeTitle: (title: string) => void;
  handleChangeDescription: (title: string) => void;
  actionButtonCreate: () => void;
}

export default function View({
  handleChangeTitle,
  handleChangeDescription,
  actionButtonCreate,
}: ViewCourse) {
  return (
    <Container className="vh-100 d-flex justify-content-center align-items-center flex-column w-100">
      <div className="text-center" style={{ width: "90%" }}>
        <h1 className="mb-4">Novo Curso</h1>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formVideoTitle">
              <Form.Label>Nome do Curso</Form.Label>
              <Form.Control
                onChange={(e) => handleChangeTitle(e.target.value)}
                type="text"
                placeholder="Insira o nome do curso"
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formVideoDescription">
              <Form.Label>Descrição do Curso</Form.Label>
              <Form.Control
                onChange={(e) => handleChangeDescription(e.target.value)}
                as="textarea"
                rows={3}
                placeholder="Insira a descrição do curso"
              />
            </Form.Group>
          </Row>
        </Form>
      </div>
      <div style={{ height: "4%", width: "50%" }}>
        <MyButton onClick={actionButtonCreate} label="Criar" />
      </div>
    </Container>
  );
}
