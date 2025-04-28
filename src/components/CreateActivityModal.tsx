import { FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Actions, useStoreActions, useStoreState } from "easy-peasy";
import { AppStoreModel } from "../store";
import { CreateActivity } from "../store/activity.model";

interface Props {
  show: boolean;
  handleClose: () => void;
  refreshActivities: () => void;
  // isUpdate: boolean;
}

const CreateActivityModal: FC<Props> = ({
  show,
  handleClose,
  refreshActivities,
  // isUpdate,
}) => {
  const { t } = useTranslation();
  const { categoryList } = useStoreState((state: any) => state.referentialData);
  const { getAllCategoryList } = useStoreActions(
    (actions: Actions<AppStoreModel>) => actions.referentialData
  );
  const { create } = useStoreActions(
    (actions: Actions<AppStoreModel>) => actions.activity
  );
  // const { currentActivityDetail } = useStoreState(
  //   (state: any) => state.activity
  // );
  // Load Data on Component Mount
  useEffect(() => {
    getAllCategoryList();
  }, [show]);
  console.log(show);

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
    reset,
  } = useForm<CreateActivity>();

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<CreateActivity> = async (values) => {
    // setLoading(true); // Active loading
    console.log(values);
    // setCreateActivityFormDraft({ ...values });
    const response = await create(values);
    reset();
    handleClose(); // Close modal
    refreshActivities(); // Refresh list
    //   alert(t("activity.modal_create_activity.alert.success"));
    // } catch (error) {
    //   alert(t("activity.modal_create_activity.alert.error"));
    // } finally {
    //   setLoading(false); // Disable loading mode
    // }
    setLoading(false); // Active loading
  };

  // const prefillForm = async () => {
  //   if (currentActivityDetail) {
  //     reset(currentActivityDetail);
  //   }
  // };

  // if (isUpdate) {
  //   prefillForm();
  // }
  console.log("show", show);

  return (
    <Modal show={show} onHide={handleClose} className="p-5">
      <Modal.Header closeButton>
        <Modal.Title>
          <h2 className="mx-3 mt-3">
            {t("activity.modal_create_activity.title")}
          </h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="mx-5 mb-5">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-4">
            <Form.Label for="title" className="mandatory">
              {t("activity.modal_create_activity.input_name.title")}
            </Form.Label>
            <Form.Control
              type="text"
              placeholder={t(
                "activity.modal_create_activity.input_name.placeholder"
              )}
              id="title"
              {...register("name", {
                required: {
                  value: true,
                  message: t(
                    "activity.modal_create_activity.input_name.errors_message"
                  ),
                },
              })}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid" className="small">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              {t("activity.modal_create_activity.description.title")}
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder={t(
                "activity.modal_create_activity.description.placeholder"
              )}
              {...register("description", { maxLength: 1000 })}
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback>
              {errors.description?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Label className="mb-4 mandatory">
            {t("activity.modal_create_activity.type.title")}
          </Form.Label>
          <div>
            <Form.Check
              inline
              id="positive-radio"
              label={
                <label htmlFor="positive-radio">
                  {t("activity.modal_create_activity.type.positive")}
                </label>
              }
              type="radio"
              value="true"
              {...register("positive", {
                required: t(
                  "activity.modal_create_activity.type.errors_message"
                ),
              })}
            />
            <Form.Check
              inline
              id="negative-radio"
              label={
                <label htmlFor="negative-radio">
                  {t("activity.modal_create_activity.type.negative")}
                </label>
              }
              type="radio"
              value="false"
              {...register("positive", {
                required: t(
                  "activity.modal_create_activity.type.errors_message"
                ),
              })}
            />
            {errors.positive && (
              <Form.Text className="text-danger">
                {t("activity.modal_create_activity.type.errors_message")}
              </Form.Text>
            )}
          </div>
          <Form.Group className="mb-4 mt-4">
            <Form.Label for="category" className="mandatory">
              {t("activity.modal_create_activity.category.title")}
            </Form.Label>
            <Form.Select id="category" {...register("categoryId")}>
              <option value="">
                {t("activity.modal_create_activity.category.placeholder")}
              </option>
              {categoryList.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <div className="text-center">
            <Button
              variant="primary"
              type="submit"
              size="lg"
              className="px-5"
              // disabled={loading}
            >
              {t("activity.modal_create_activity.btn")}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
export default CreateActivityModal;
// !! (Double Bang):
// It ensures a value is explicitly converted to a boolean.
// Example:
// !!null;  // false
// !!"text"; // true
// This ensures isInvalid receives a proper true or false value.

//const categoryIds = watch("categoryIds", []); =>   // Watch categoryIds to keep form state in sync

//setValue in react form: function used to manually update the value of a form field
//setValue(name: string, value: any, options?: Object)
// name: The name of the form field you want to update.
// value: The new value to assign to the field.
// options (optional): Can include { shouldValidate: boolean, shouldDirty: boolean, shouldTouch: boolean } to control validation and form state updates.
// When to Use setValue?
// - need to update form fields programmatically
// - When you're loading initial data into a form.
// - When handling dynamic form inputs (e.g., checkboxes, dropdowns).
//!!!!! for="category" id: important for input=> not validate if not know that
//?? what is differente Actions<AppStoreModel> and Action
// error: () => qqch or ()=>{return qqch}
