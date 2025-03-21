import axios from "axios";
import { FC, useEffect } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export interface UserData {
  nickname: String;
  email: String;
  password: String;
}

const CreateUser: FC = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
    reset,
  } = useForm<UserData>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<UserData> = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/users/create",
        JSON.stringify(values),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      //console.log(response.status);

      if (response.status === 201) {
        window.alert(t("user.createUser.alert.success"));
        navigate("/users/authenticate");
      } else {
        window.alert(t("user.createUser.alert.error"));
      }
    } catch (error) {
      //console.log(error);
      window.alert(t("user.createUser.alert.error"));
    }

    reset();
  };

  useEffect(() => {
    const observer = watch((_values) => null);
    return () => observer.unsubscribe();
  }, [watch]);

  const { t } = useTranslation();

  return (
    <div className="mt-5 mx-5 px-5">
      <h1 className="mt-5 mb-3">{t("user.createUser.title")}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="nickname">
          <Form.Label>{t("user.nickname.title")}</Form.Label>
          <Col sm="3">
            <Form.Control
              type="text"
              placeholder={t("user.nickname.placeholder")}
              {...register("nickname")}
            />
          </Col>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="mandatory">{t("user.email.title")}</Form.Label>
          <Col sm="3">
            <Form.Control
              type="text"
              placeholder={t("user.email.placeholder")}
              {...register("email", {
                required: {
                  value: true,
                  message: t("user.email.errors_message"),
                },
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("user.email.invalid_message"),
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
            {t("user.password.title")}
          </Form.Label>
          <Col sm="3">
            <Form.Control
              type="password"
              placeholder={t("user.password.placeholder")}
              {...register("password", {
                required: {
                  value: true,
                  message: t("user.password.errors_message"),
                },
                minLength: {
                  value: 6,
                  message: t("user.password.minLength_message"),
                },
              })}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <div className="mx-5 px-5">
          <Button variant="primary" type="submit" size="lg" className="px-5">
            {t("user.createUser.btn")}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateUser;

//toto: add more condition for password
