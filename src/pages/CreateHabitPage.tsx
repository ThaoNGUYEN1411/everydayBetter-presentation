import { FC } from "react";
import { CreateHabit } from "../components/CreateHabit";
import { useTranslation } from "react-i18next";

const CreateHabitPage: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="grid wide">
      <h1>{t("createHabit.title")}</h1>
      <CreateHabit />
    </div>
  );
};

export default CreateHabitPage;
