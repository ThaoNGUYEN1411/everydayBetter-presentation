import axios from "axios";
import { FC, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export interface ActivityData {
  activityName: String;
  description: String;
  positive: Boolean;
  labelName: String;
}

export const CreateActivity: FC = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<ActivityData>();

  const onSubmit: SubmitHandler<ActivityData> = async (values) => {
    const { data } = await axios.post(
      "http://localhost:8080/activities/create",
      JSON.stringify(values),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
  };

  useEffect(() => {
    const observer = watch((values) => console.log(values));
    return () => observer.unsubscribe();
  }, [watch]);
  const { t } = useTranslation();

  return (
    <Form className="w-50" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb">
        <Form.Label>{t("createActivity.activityName")}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t("createActivity.activityName_placeHolder")}
          {...register("activityName", {
            required: {
              value: true,
              message: t("createActivity.activityName_errors_message"),
            },
          })}
          isInvalid={!!errors.activityName}
        />
        {/*The !! (double bang) operator is a common JavaScript trick to coerce a value to a boolean.undefined or null => false, exist value => true */}
        <Form.Control.Feedback type="invalid">
          {errors.activityName?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>{t("createActivity.description")}</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder={t("createActivity.description_placeHolder")}
          {...register("description", { maxLength: 20 })}
          isInvalid={!!errors.description}
        />
        <Form.Control.Feedback>
          {errors.description?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <div className="mb-3">
        <Form.Check
          inline
          label="Positive"
          type="radio"
          value="true"
          {...register("positive", { required: "You must choose an option" })}
        />
        <Form.Check
          inline
          label="Negative"
          type="radio"
          value="false"
          {...register("positive", { required: "You must choose an option" })}
        />
        {/* Display error message if no option is selected */}
        {errors.positive && (
          <Form.Text className="text-danger">
            {errors.positive.message}
          </Form.Text>
        )}
      </div>
      <Form.Group>
        <Form.Label> {t("createActivity.category")}</Form.Label>
        <Form.Select
          aria-label="Select une étiquette"
          {...register("labelName")}
        >
          <option>Entrez une étiquette</option>
          <option value="Travailler">Travailler</option>
          <option value="Faire de l'exercice">Faire de l'exercice</option>
          <option value="school">school</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        {t("createActivity.btn")}
      </Button>
    </Form>
  );
};
export default CreateActivity;
// !! (Double Bang):
// It ensures a value is explicitly converted to a boolean.
// Example:
// !!null;  // false
// !!"text"; // true
// This ensures isInvalid receives a proper true or false value.
//todo: refactor with translate file
//todo: recuperer list label from back
