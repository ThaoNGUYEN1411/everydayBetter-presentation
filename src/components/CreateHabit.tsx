import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";

interface HabitData {
  name: String;
  description: String;
  isPositive: Boolean;
  label: String;
  resetCounter: String;
}

export const CreateHabit = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
  } = useForm<HabitData>();

  const onSubmit: SubmitHandler<HabitData> = async (values) => {
    console.log(values);
  };

  useEffect(() => {
    const obsever = watch((values) => null);
    return () => obsever.unsubscribe();
  }, [watch]);

  return (
    <Form className="w-50" onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb">
        <Form.Label>Nom</Form.Label>
        <Form.Control
          type="text"
          placeholder="Ajouter un titre"
          {...register("name", { required: "Name is required" })}
          isInvalid={!!errors.name}
        />
        {/*The !! (double bang) operator is a common JavaScript trick to coerce a value to a boolean.undefined or null => false, exist value => true */}
        <Form.Control.Feedback type="invalid">
          {errors.name?.message}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Ajouter une note"
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
          {...register("isPositive", { required: "You must choose an option" })}
        />
        <Form.Check
          inline
          label="Negative"
          type="radio"
          value="false"
          {...register("isPositive", { required: "You must choose an option" })}
        />
        {/* Display error message if no option is selected */}
        {errors.isPositive && (
          <Form.Text className="text-danger">
            {errors.isPositive.message}
          </Form.Text>
        )}
      </div>
      <Form.Group>
        <Form.Label>Etiquettes</Form.Label>
        <Form.Select aria-label="Select une étiquette" {...register("label")}>
          <option>Entrez une étiquette</option>
          <option value="Travailler">Travailler</option>
          <option value="Faire de l'exercice">Faire de l'exercice</option>
          <option value="Ecole">Ecole</option>
        </Form.Select>
      </Form.Group>
      <Form.Group>
        <Form.Label>Réinitialiser le compteur</Form.Label>
        <Form.Select aria-label="" {...register("resetCounter")}>
          <option value="Quotidienne">Quotidienne</option>
          <option value="Hebdomadire">Hebdomadire</option>
          <option value="Mensuelle">Mensuelle</option>
        </Form.Select>
      </Form.Group>
      <Button variant="primary" type="submit">
        Créer
      </Button>
    </Form>
  );
};
