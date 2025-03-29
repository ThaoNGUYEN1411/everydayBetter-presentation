import axios from "axios";
import { Action, Actions, useStoreActions } from "easy-peasy";
import { FC } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { AppStoreModel } from "../../store";
import { UserData } from "../../store/user.model";

const UserAuthenticate: FC = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UserData>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authenticateUser = useStoreActions(
    (actions: Actions<AppStoreModel>) => actions.user.authenticateUser
  );
  const onSubmit: SubmitHandler<UserData> = async (values) => {
    //   // Sauvegarder le token uniquement si le serveur ne le met pas en cookie
    //   //The cookie will expire in 3600 seconds (1 hour)
    //   document.cookie = `token=${data.token}; Path=/; Secure; Max-Age=3600`;
    //   window.alert(t("user.userAuthenticate.alert.success"));
    //   navigate("/activities");
    // } catch (error) {
    //   window.alert(t("user.userAuthenticate.alert.error"));
    // }
    const response = await authenticateUser(values);
    if (response?.success) {
      window.alert(t("user.userAuthenticate.alert.success"));
      navigate("/activities");
    } else {
      window.alert(t("user.userAuthenticate.alert.error"));
    }
    console.log(response);
  };

  // useEffect(() => {
  //   const subscription = watch((values) => null);
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  return (
    <div className="page d-flex justify-content-center mt-5">
      <div className="p-5 my-5 shadow col-5">
        <h1 className="mb-4 text-center">{t("user.userAuthenticate.title")}</h1>
        <div className="d-flex justify-content-center">
          <Form onSubmit={handleSubmit(onSubmit)} className="w-75">
            <Form.Group className="mb-4" controlId="email">
              <Form.Label className="mandatory">
                {t("user.email.title")}
              </Form.Label>
              <Col>
                <Form.Control
                  className="px-4 py-2"
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
                <Form.Control.Feedback className="small" type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <Form.Group className="mb-4" controlId="password">
              <Form.Label className="mandatory">
                {t("user.password.title")}
              </Form.Label>
              <Col>
                <Form.Control
                  className="px-4 py-2"
                  type="password"
                  placeholder={t("user.password.placeholder")}
                  {...register("password", {
                    required: {
                      value: true,
                      message: t("user.password.errors_message"),
                    },
                    pattern: {
                      value:
                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message: t("user.password.incorrect"),
                    },
                  })}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback className="small" type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>
            <div className="text-center mt-5">
              <Button
                variant="info"
                type="submit"
                size="lg"
                className="px-5 bg-green text-black"
              >
                {t("user.userAuthenticate.btn")}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UserAuthenticate;
