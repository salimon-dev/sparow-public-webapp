import React, { useState } from "react";
import Button from "ui-kit/Button/Botton";
import { CardBody, CardFooter } from "ui-kit/Card";
import Col from "ui-kit/Col";
import Row from "ui-kit/Row";
import TextInput from "ui-kit/TextInput/TextInput";
import { FaPen } from "react-icons/fa";
import { IVerifyPhoneStepProps } from "./props.interface";
const VerifyPhoneStep: React.FC<IVerifyPhoneStepProps> = ({
  phone,
  goBack,
  submited,
}: IVerifyPhoneStepProps) => {
  const [token, set_token] = useState<string>("");
  return (
    <>
      <CardBody>
        <Row align="start">
          <Col col={12} style={{ textAlign: "justify" }}>
            <h4>
              we have sent your verification code into {phone}. please enter the
              code here
            </h4>
          </Col>
        </Row>
        <Row align="start">
          <Col col={12}>
            <TextInput
              value={token}
              onChange={set_token}
              label="verification token"
              icon={<FaPen />}
            />
          </Col>
        </Row>
      </CardBody>
      <CardFooter>
        <Row style={{ marginTop: 15 }}>
          <Col col={6}>
            <Row align="start">
              <Button
                onClick={() => {
                  goBack();
                }}
              >
                back
              </Button>
            </Row>
          </Col>
          <Col col={6}>
            <Row align="end">
              <Button
                onClick={() => {
                  submited(token);
                }}
              >
                submit
              </Button>
            </Row>
          </Col>
        </Row>
      </CardFooter>
    </>
  );
};

export default VerifyPhoneStep;
