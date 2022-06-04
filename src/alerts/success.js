import React, { useState } from "react";

import Button from "@mui/material/Button";
import { Alert } from "react-bootstrap";

const Success = () => {
  const [show, setShow] = useState(true);
  return (
    <div>
      <Alert show={show} variant="success">
        <Alert.Heading>Successful..!</Alert.Heading>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me y'all!
          </Button>
        </div>
      </Alert>
    </div>
  );
};

export default Success;
