import { FormControl, InputLabel, Select } from "@material-ui/core";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { TaskmasterForm } from "../../types/taskmasterForm";

interface InputSelectProps extends TaskmasterForm.InputProps {
  valueList: Array<TaskmasterForm.InputSelectOption>;
  defaultValue: TaskmasterForm.InputSelectValue;
}

const InputSelect: FunctionComponent<InputSelectProps> = ({
  id,
  name,
  label,
  valueList,
  defaultValue,
  size = "small",
  inputRef = undefined
}) => {
  const selectLabel = useRef<HTMLLabelElement>(null);
  const [selectLabelWidth, setSelectLabelWidth] = useState<number>(0);
  useEffect(() => {
    setSelectLabelWidth(selectLabel.current?.offsetWidth ?? 0);
  }, []);

  return (
    <FormControl variant="outlined" size={size}>
      <InputLabel htmlFor={id} ref={selectLabel}>
        {label}
      </InputLabel>
      <Select
        native
        labelWidth={selectLabelWidth}
        defaultValue={defaultValue}
        inputRef={inputRef}
        inputProps={{
          id,
          name
        }}
      >
        {valueList.map(([optionValue, optionLabel]) => (
          <option key={optionValue} value={optionValue}>
            {optionLabel}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};

export default InputSelect;
