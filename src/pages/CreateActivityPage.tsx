import { FC } from "react";
import { useTranslation } from "react-i18next";
import CreateActivity from "../components/CreateActivity";

const CreateActivityPage: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="grid wide">
      <h1>{t("createActivity.title")}</h1>
      <CreateActivity />
    </div>
  );
};

export default CreateActivityPage;
