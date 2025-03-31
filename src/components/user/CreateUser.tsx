import { Actions, useStoreActions } from "easy-peasy";
import { FC, useState } from "react";
import { Button, Col, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { UserData } from "../../store/user.model";
import { AppStoreModel } from "../../store";

const CreateUser: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isErrorCreate, setIsErrorCreate] = useState(false);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<UserData>();
  const createUser = useStoreActions(
    (actions: Actions<AppStoreModel>) => actions.user.create
  );

  const onSubmit: SubmitHandler<UserData> = async (values) => {
    const response = await createUser(values);
    if (response?.success) {
      // window.alert(t("user.createUser.alert.success"));
      navigate("/users/authenticate");
    } else {
      setIsErrorCreate(true);
    }
    // reset();//
  };

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
                      message: t("user.password.invalid_message"),
                    },
                  })}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password?.message}
                </Form.Control.Feedback>
              </Col>
              {isErrorCreate && (
                // <Form.Control.Feedback>
                //   {t("user.createUser.alert.error")}
                // </Form.Control.Feedback>
                <p className="text-danger small mt-2">
                  {t("user.createUser.alert.error")}
                </p>
              )}
            </Form.Group>
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
