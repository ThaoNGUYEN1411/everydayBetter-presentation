import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import { Button, ButtonGroup, DropdownButton } from "react-bootstrap";

const ButtonGroup1: FC = () => {
  return (
    <ButtonGroup>
      <DropdownButton
        as={ButtonGroup}
        title=" "
        //   title={<FontAwesomeIcon icon={faChevronDown} />}
        // id="bg-nested-dropdown"
        variant="info"
        className="btn-group"
      >
        <Button value="true">✔</Button>
        <Button value="false">✘</Button>
      </DropdownButton>
    </ButtonGroup>
  );
};

export default ButtonGroup1;
