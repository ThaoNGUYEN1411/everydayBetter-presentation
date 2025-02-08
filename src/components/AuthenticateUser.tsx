import axios from "axios";
import { FC } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export interface UserData {
  email: string;
  password: string;
}

const UserAuthenticate: FC = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UserData>();
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<UserData> = async (values) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/users/authenticate",
        values,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, //add the cookies if server send Set-Cookie
        }
      );

      // Sauvegarder le token uniquement si le serveur ne le met pas en cookie
      //The cookie will expire in 3600 seconds (1 hour)
      document.cookie = `token=${data.token}; Path=/; Secure; Max-Age=3600`;
      window.alert(t("user.userAuthenticate.alert.success"));
      navigate("/activities");
    } catch (error) {
      console.error("Error during authentication", error);
      window.alert(t("user.userAuthenticate.alert.error"));
    }
  };

  // useEffect(() => {
  //   const subscription = watch((values) => null);
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  const { t } = useTranslation();

  return (
    <div className="mt-5 mx-5 px-5">
      <h1 className="mt-5 mb-3">{t("user.userAuthenticate.title")}</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label className="mandatory">{t("user.email.title")}</Form.Label>
          <Col sm="3">
            <Form.Control
              type="text"
              placeholder={t("user.email.placeholder")}
              {...register("email", {
                required: t("user.email.errors_message"),
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: t("user.email.invalid_message"),
                },
              })}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback className="small" type="invalid">
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
              })}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback className="small" type="invalid">
              {errors.password?.message}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
        <div className="mx-5 px-5">
          <Button variant="primary" type="submit" size="sm" className="px-5">
            {t("user.userAuthenticate.btn")}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UserAuthenticate;
