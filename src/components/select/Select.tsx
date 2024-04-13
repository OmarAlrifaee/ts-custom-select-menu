import { useEffect, useState } from "react";
import styles from "./select.module.css";
import { SelectOption, SelectProps } from "./select.types";
const Select = ({ onChange, options, value, multi }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlitedIndex, setHighlitedIndex] = useState(0);
  useEffect(() => {
    isOpen && setHighlitedIndex(0);
  }, [isOpen]);
  const clearOptions = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (multi) {
      onChange([]);
    } else {
      onChange(undefined);
    }
  };
  const hundleSelectOption = (
    e:
      | React.MouseEvent<HTMLLIElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>,
    option: SelectOption
  ) => {
    e.stopPropagation();
    if (multi) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      option !== value && onChange(option); // i can't select the same option so it saves performence
    }
    setIsOpen(false);
  };
  const isSelected = (option: SelectOption) =>
    multi ? value.includes(option) : option === value;

  return (
    <div
      className={styles.container}
      tabIndex={0}
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
    >
      <span className={styles.value}>
        {multi
          ? value.map((option) => (
              <button
                onClick={(e) => hundleSelectOption(e, option)}
                className={styles["option-badge"]}
                key={option.value}
              >
                {option.label}
                <span className={styles["remove-btn"]}></span>
                &times;
              </button>
            ))
          : value?.label}
      </span>
      <button
        className={styles["clear-btn"]}
        onClick={clearOptions}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${isOpen && styles.show}`}>
        {options.map((option, index) => (
          <li
            key={option?.value}
            onClick={(e) => hundleSelectOption(e, option)}
            className={`${styles.option} ${
              isSelected(option) && styles.selected
            } ${highlitedIndex === index && styles.highlighted}`}
            onMouseEnter={() => setHighlitedIndex(index)}
          >
            {option?.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
