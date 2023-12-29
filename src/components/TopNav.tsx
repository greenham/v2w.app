import React from "react";
import { Button, Image, Modal, Nav, Offcanvas, Stack } from "react-bootstrap";
import logoImageUrl from "../assets/logo-128.png";
import { WhyWeigh } from "./WhyWeigh";
import { About } from "./About";
import { HowToUse } from "./HowToUse";

export function TopNav() {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [modalBody, setModalBody] = React.useState<React.ReactNode | string>(
    <></>
  );
  const [showMenu, setShowMenu] = React.useState(false);

  const showContentModal = (title: string, body: React.ReactNode | string) => {
    setModalTitle(title);
    setModalBody(body);
    setModalShow(true);
  };
  const handleCloseMenu = () => setShowMenu(false);

  return (
    <>
      <Stack direction="horizontal" gap={3} className="mb-3">
        <Image src={logoImageUrl} width={64} height={64} />
        <Stack>
          <h1 className="mb-0">volum.io</h1>
          <span>a volume to weight converter for the kitchen</span>
        </Stack>
        <Button
          variant="primary"
          onClick={() => setShowMenu(true)}
          className="ms-auto"
        >
          <i className="fa-solid fa-bars px-2"></i> Menu
        </Button>
      </Stack>
      <Offcanvas show={showMenu} onHide={handleCloseMenu} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <i className="fa-solid fa-bars px-2"></i> Menu
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav variant="pills" className="flex-column fs-2">
            <Nav.Item>
              <Nav.Link
                eventKey="how-to-use"
                onClick={() =>
                  showContentModal("How to use this", <HowToUse />)
                }
              >
                <i className="fa-solid fa-person-chalkboard"></i> How to use
                this
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="why-weigh"
                onClick={() => showContentModal("Why Weigh?", <WhyWeigh />)}
              >
                <i className="fa-solid fa-weight-scale"></i> Why Weigh?
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="about"
                onClick={() => showContentModal("About volum.io", <About />)}
              >
                <i className="fa-solid fa-circle-info"></i> About
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
        </Offcanvas.Body>
      </Offcanvas>
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
          {title ?? ""}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{body ?? <></>}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
