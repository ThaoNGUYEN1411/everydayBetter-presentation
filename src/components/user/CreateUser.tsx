import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import { FC, useEffect, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../store/user.model";
import { AppStoreModel } from "../../store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

const faEyeIcon: IconProp = faEye;
const faEyeSlashIcon: IconProp = faEyeSlash;

const CreateUser: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { responseStatus, emailError } = useStoreState(
    (state: AppStoreModel) => state.user
  );
  const createUser = useStoreActions(
    (actions: Actions<AppStoreModel>) => actions.user.create
  );
  const [isErrorEmail, setIsErrorEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<UserData>();

  const onSubmit: SubmitHandler<UserData> = async (values) => {
    await createUser(values);
  };

  useEffect(() => {
    if (responseStatus == "success") {
      navigate("/users/authenticate", {
        state: { successMessage: t("user.createUser.success") },
      });
      reset();
    } else if (responseStatus == "error_400") {
      setIsErrorEmail(emailError === "UniqueEmail");
    }
  }, [responseStatus, emailError, navigate, reset]); //useEffect est déclenché quand responseStatus change

  const handleToggle = () => setShowPassword(!showPassword);
  return (
    <div className="page d-flex justify-content-center mt-5">
      <div className="p-5 my-5 shadow col-5">
        <h1 className="mb-4 text-center">{t("user.createUser.title")}</h1>
        <div className="d-flex justify-content-center">
          <Form onSubmit={handleSubmit(onSubmit)} className="w-75">
            <Form.Group className="mb-4" controlId="nickname">
              <Form.Label>{t("user.nickname.title")}</Form.Label>
              <Col>
                <Form.Control
                  className="px-4 py-2"
                  type="text"
                  placeholder={t("user.nickname.placeholder")}
                  {...register("nickname")}
                />
              </Col>
            </Form.Group>
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
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
                {isErrorEmail && (
                  <p className="text-danger small mt-2">
                    {t("user.createUser.email_already_exists")}
                  </p>
                )}
              </Col>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label className="mandatory">
                {t("user.password.title")}
              </Form.Label>
              <div className="d-flex align-items-center border rounded is-invalid">
                <Form.Control
                  className="border-0 flex-grow-1 py-2"
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
                      message: t("user.password.invalid_message"),
                    },
                    maxLength: {
                      value: 255,
                      message: t("user.password.maxLength_message"),
                    },
                  })}
                  isInvalid={!!errors.password}
                />
                <span className="px-3 cursor-pointer" onClick={handleToggle}>
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeIcon : faEyeSlashIcon}
                  />
                </span>
              </div>
              {errors.password && (
                <div className="text-danger mt-1">
                  {errors.password.message}
                </div>
              )}
            </Form.Group>
            {responseStatus == "server_error" && (
              <p className="text-danger small mt-2">
                {t("user.createUser.server.error")}
              </p>
            )}
            <div className="text-center mt-5">
              <Button
                variant="info"
                type="submit"
                size="lg"
                className="px-5 bg-green text-black"
              >
                {t("user.createUser.btn")}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
