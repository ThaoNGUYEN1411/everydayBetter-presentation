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
// import { Icon } from "react-icons-kit";
// import { eyeOff } from "react-icons-kit/feather/eyeOff";
// import { eye } from "react-icons-kit/feather/eye";

const CreateUser: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { responseStatus, emailError } = useStoreState(
    (state: AppStoreModel) => state.user
  );
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState("fa-eye-slash");
  const [showPassword, setShowPassword] = useState(false);

  // const handleToggle = () => {
  //   if (type === "password") {
  //     setIcon("fa-eye");
  //   } else {
  //     setIcon("fa-eye-slash");
  //     setType("password");
  //   }
  // };
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    watch,
  } = useForm<UserData>();
  const createUser = useStoreActions(
    (actions: Actions<AppStoreModel>) => actions.user.create
  );

  const onSubmit: SubmitHandler<UserData> = async (values) => {
    await createUser(values);
    if (responseStatus == "success") {
      navigate("/users/authenticate");
      reset();
    }
  };
  useEffect(() => {
    const subscription = watch((observer) => {
      if (observer.password) {
        return setPassword(observer?.password);
      }
    });
  }, [watch]);
  const handleToggle = () => setShowPassword((prev) => !prev);
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
              <Col className="">
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
                <Form.Control.Feedback type="invalid">
                  {errors.email?.message}
                </Form.Control.Feedback>
                {responseStatus == "error_400" &&
                  emailError === "UniqueEmail" && (
                    <p className="text-danger small mt-2">
                      {t("user.createUser.email_already_exists")}
                    </p>
                  )}
              </Col>
            </Form.Group>
            {/* <Form.Group className="mb-4" controlId="password">
              <Form.Label className="mandatory">
                {t("user.password.title")}
              </Form.Label>
              <Col>
                <Form.Control
                  className="px-4 py-2"
                  type="password"
                  // onChange={(e) => setPassword(e.target.value)}
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
                  })}
                  isInvalid={!!errors.password}
                />
                <span
                  className="flex justify-around items-center"
                  onClick={handleToggle}
                >
                  <FontAwesomeIcon icon={faEye} className="absolute mr-10" />
                  {/* <Icon  icon={icon} size={25} /> */}
            {/* </span>
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Col>
            </Form.Group> */}
            <Form.Group className="mb-4" controlId="password">
              <Form.Label className="mandatory">
                {t("user.password.title")}
              </Form.Label>
              <div className="d-flex justify-content-space-around">
                <Form.Control
                  className="px-4 py-2 pe-10" // pr-10 to make space for icon
                  type={showPassword ? "text" : "password"} // toggle visibility
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
                  })}
                  isInvalid={!!errors.password}
                />
                <span className="eye-icon cursor-pointer">
                  <FontAwesomeIcon
                    icon={showPassword ? faEyeSlash : faEye}
                    onClick={handleToggle}
                  />
                </span>
              </div>
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
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
