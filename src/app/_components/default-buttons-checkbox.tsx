import { useDialogState } from "../hooks/dialog-state";
import { CheckboxWithText } from "./ui/checkbox-with-text";

const DefaultButtonsCheckbox = () => {
  const dialogState = useDialogState((state) => ({
    showDefaultButtons: state.showDefaultButtons,
    setShowDefaultButtons: state.setShowDefaultButtons,
  }));

  return (
    <CheckboxWithText
      id="showDefaultButtons"
      label="Show default buttons"
      defaultChecked={dialogState.showDefaultButtons}
      onClick={() =>
        dialogState.setShowDefaultButtons(!dialogState.showDefaultButtons)
      }
    />
  );
};

export default DefaultButtonsCheckbox;
