import axios from "axios";
import { FC, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface UserData {
  username: String;
  email: String;
  password: String;
}

const CreateUser: FC = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<UserData>();

  const onSubmit: SubmitHandler<UserData> = async (values) => {
    const { data } = await axios.post(
      "http://localhost:8080/users/create",
      JSON.stringify(values),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(values);
    console.log(data);
  };

  useEffect(() => {
    const observer = watch((values) => console.log(values));
    return () => observer.unsubscribe();
  }, [watch]);

  const { t } = useTranslation();

  return (
    <div>
      <h1>{t("createUser.title")}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="username">
          <Form.Label className="mandatory">
            {t("createUser.username")}
          </Form.Label>
          <Col sm="3">
            <Form.Control
              type="text"
              placeholder={t("createUser.username_placeHolder")}
              {...register("username", {
                required: {
                  value: true,
                  message: t("createUser.username_errors_message"),
                },
              })}
              isInvalid={!!errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="mandatory">{t("createUser.email")}</Form.Label>
          <Col sm="3">
            <Form.Control
              type="text"
              placeholder={t("createUser.email_placeHolder")}
              {...register("email", {
                required: {
                  value: true,
                  message: t("createUser.email_errors_message"),
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
            {t("createUser.password")}
          </Form.Label>
          <Col sm="3">
            <Form.Control
              type="password"
              placeholder={t("createUser.password_placeHolder")}
              {...register("password", {
                required: {
                  value: true,
                  message: t("createUser.password_errors_message"),
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
          {t("createUser.btn")}
        </Button>
      </Form>
    </div>
  );
};

export default CreateUser;
