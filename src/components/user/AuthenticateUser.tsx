import { Actions, useStoreActions } from "easy-peasy";
import { FC, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { AppStoreModel } from "../../store";
import { UserData } from "../../store/user.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const UserAuthenticate: FC = () => {
  const location = useLocation();
  const successMessage = location.state?.successMessage;
  const [isError, setIsError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleToggle = () => setShowPassword(!showPassword);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UserData>();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const authenticateUser = useStoreActions(
    (actions: Actions<AppStoreModel>) => actions.user.authenticate
  );
  const onSubmit: SubmitHandler<UserData> = async (values) => {
    try {
      await authenticateUser(values);
      navigate("/activities");
    } catch (error) {
      setIsError(true);
    }
  };

  return (
    <div className="page d-flex justify-content-center mt-5">
      <div className="p-5 my-5 shadow col-5">
        {successMessage && (
          <p className="text-success text-center">{successMessage}</p>
        )}
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
                    maxLength: {
                      value: 340,
                      message: t("user.email.maxLength_message"),
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
              <div className="d-flex align-items-center border rounded is-invalid">
                <Form.Control
                  className="border-0 px-4 py-2"
                  type={showPassword ? "text" : "password"}
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
                    maxLength: {
                      value: 255,
                      message: t("user.password.maxLength_message"),
                    },
                  })}
                  isInvalid={!!errors.password}
                />
                <span className="px-3 cursor-pointer" onClick={handleToggle}>
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
              <Form.Control.Feedback className="small" type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>
            {isError && (
              <p className="text-danger small mt-2">
                {t("user.userAuthenticate.alert.error")}
              </p>
            )}
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

//   // Sauvegarder le token uniquement si le serveur ne le met pas en cookie
//   //The cookie will expire in 3600 seconds (1 hour)
//   document.cookie = `token=${data.token}; Path=/; Secure; Max-Age=3600`;
//   window.alert(t("user.userAuthenticate.alert.success"));
//   navigate("/activities");
// } catch (error) {
//   window.alert(t("user.userAuthenticate.alert.error"));
// }
//useStoreState : hook Easy Peasy pour lire des données depuis le store.
// useStoreActions : hook Easy Peasy pour appeler une action.

// actions.counter.increase : va chercher l’action increase dans le module counter.
