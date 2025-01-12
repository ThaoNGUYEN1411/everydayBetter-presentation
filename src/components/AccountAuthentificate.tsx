import axios from "axios";
import { FC, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface AccountData {
  email: String;
  password: String;
}

const AccountAuthentificate: FC = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<AccountData>();

  const onSubmit: SubmitHandler<AccountData> = async (values) => {
    const { data } = await axios.post(
      "http://localhost:8080/accounts/authenticate",
      JSON.stringify(values),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(values);
  };

  useEffect(() => {
    const obsever = watch((values) => console.log(values));
    return () => obsever.unsubscribe();
  }, [watch]);

  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("accountAuthentificate.title")}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="mandatory">
            {t("createAccount.email")}
          </Form.Label>
          <Col sm="3">
            <Form.Control
              type="text"
              placeholder={t("createAccount.email_placeHolder")}
              {...register("email", {
                required: {
                  value: true,
                  message: t("createAccount.email_errors_message"),
                },
              })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label className="mandatory">
            {t("createAccount.password")}
          </Form.Label>
          <Col sm="3">
            <Form.Control
              type="password"
              placeholder={t("createAccount.password_placeHolder")}
              {...register("password", {
                required: {
                  value: true,
                  message: t("createAccount.password_errors_message"),
                },
              })}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          {t("createAccount.btn")}
        </Button>
      </Form>
    </div>
  );
};

export default AccountAuthentificate;

//todo: revoir titre translate+ validation
