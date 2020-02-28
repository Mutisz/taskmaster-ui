import { Size } from "@material-ui/core";
import { Ref } from "react";

declare namespace TaskmasterForm {
  interface InputProps {
    id: string;
    name: string;
    label: string;
    size?: Size;
    inputRef?: Ref<unknown>;
  }

  type InputSelectValue = string | number;

  type InputSelectOption = [InputSelectValue, string];
}
