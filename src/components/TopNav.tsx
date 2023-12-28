import React from "react";
import { Button, Image, Modal, Nav, Stack } from "react-bootstrap";
import logoImageUrl from "../assets/logo-128.png";
import { WhyWeigh } from "./WhyWeigh";
import { About } from "./About";

export function TopNav() {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [modalBody, setModalBody] = React.useState<React.ReactNode | string>(
    <></>
  );

  const showWhyWeighModal = () => {
    setModalTitle("Why Weigh?");
    setModalBody(<WhyWeigh />);
    setModalShow(true);
  };

  const showAboutModal = () => {
    setModalTitle("About volum.io");
    setModalBody(<About />);
    setModalShow(true);
  };

  return (
    <>
      <Stack direction="horizontal" gap={3} className="mb-3">
        <Image src={logoImageUrl} width={64} height={64} />
        <Stack>
          <h1 className="mb-0">volum.io</h1>
          <span>a free volume to weight converter for the kitchen</span>
        </Stack>
        <Nav variant="pills">
          <Nav.Item>
            <Nav.Link eventKey="why-weigh" onClick={() => showWhyWeighModal()}>
              Why Weigh?
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="about" onClick={() => showAboutModal()}>
              About
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="https://github.com/greenham/volum.io"
              target="_blank"
              rel="noopener noreferrer"
              eventKey="github"
            >
              <i className="fa-brands fa-github"></i> GitHub
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Stack>
      <BasicContentModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title={modalTitle}
        body={modalBody}
      />
    </>
  );
}

type BasicContentModalProps = {
  show: boolean;
  onHide: () => void;
  title?: string;
  body?: React.ReactNode | string;
};
function BasicContentModal(props: BasicContentModalProps) {
  const { show, onHide, title, body } = props;
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {title ?? "Modal heading"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body ?? (
          <>
            <h4>Centered Modal</h4>
            <p>
              Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
              dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
              ac consectetur ac, vestibulum at eros.
            </p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
