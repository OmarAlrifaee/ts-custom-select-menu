export type SelectOption = {
  label: string;
  value: string | number;
};
type SingleSelectOption = {
  multi?: false;
  value?: SelectOption;
  onChange: (value?: SelectOption) => void;
};
type MultiSelectOption = {
  multi: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};
export type SelectProps = {
  options: SelectOption[];
} & (SingleSelectOption | MultiSelectOption);
