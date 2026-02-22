import type { InputHTMLAttributes } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useId } from "react";

import "./styles.css";
import { useState } from "react";

type CheckboxItem = {
  id: number;
  name: string;
  checked: boolean | "indeterminate";
  children?: CheckboxItem[];
};

type NestedCheckboxProps = {
  data: CheckboxItem[];
};

function updateItemAndDescendants(item: CheckboxItem, value: boolean) {
  item.checked = value;
  if (!item.children) return;
  item.children.forEach((checkboxItem) =>
    updateItemAndDescendants(checkboxItem, value),
  );
}

function resolveCheckboxStates(
  checkboxItem: CheckboxItem,
  indices: ReadonlyArray<number>,
) {
  if (indices.length > 0 && checkboxItem.children) {
    resolveCheckboxStates(checkboxItem.children[indices[0]], indices.slice(1));
  }

  if (!checkboxItem.children) {
    return;
  }

  // Determine new checkbox state based on children.
  const checkedChildren = checkboxItem.children.reduce(
    (total, item) => total + Number(item.checked === true),
    0,
  );
  const uncheckedChildren = checkboxItem.children.reduce(
    (total, item) => total + Number(item.checked === false),
    0,
  );

  if (checkedChildren === checkboxItem.children.length) {
    checkboxItem.checked = true;
  } else if (uncheckedChildren === checkboxItem.children.length) {
    checkboxItem.checked = false;
  } else {
    checkboxItem.checked = "indeterminate";
  }
}

const NestedCheckbox = ({ data }: NestedCheckboxProps) => {
  const [checkboxesData, setCheckboxesData] = useState(data);

  function onCheck(value: boolean, indices: ReadonlyArray<number>) {
    const newCheckBoxData = JSON.parse(JSON.stringify(checkboxesData));
    const nonFirstLevelIndices = indices.slice(1);

    const modifiedCheckboxItem = nonFirstLevelIndices.reduce((item, index) => {
      return item.children[index];
    }, newCheckBoxData[indices[0]]);

    updateItemAndDescendants(modifiedCheckboxItem, value);

    resolveCheckboxStates(newCheckBoxData[indices[0]], nonFirstLevelIndices);

    setCheckboxesData(newCheckBoxData);
  }

  return <CheckboxList data={checkboxesData} onCheck={onCheck} />;
};

type CheckboxListProps = {
  data: CheckboxItem[];
  onCheck: (value: boolean, indices: ReadonlyArray<number>) => void;
};

const CheckboxList = ({ data, onCheck }: CheckboxListProps) => {
  return (
    <ul>
      {data.map((item, idx) => (
        <li key={idx}>
          <div>
            <CheckboxInput
              label={item.name}
              checked={item.checked}
              onChange={(e) => onCheck(e.target.checked, [idx])}
            />
          </div>
          {item.children && item.children.length > 0 && (
            <CheckboxList
              data={item.children}
              onCheck={(value, indices) => onCheck(value, [idx, ...indices])}
            />
          )}
        </li>
      ))}
    </ul>
  );
};

type CheckboxValue = boolean | "indeterminate";

type CheckboxInputProps = {
  label: string;
  checked: CheckboxValue;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "checked">;

const CheckboxInput = ({ label, checked, ...props }: CheckboxInputProps) => {
  const id = useId();
  const ref = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.indeterminate = checked === "indeterminate";
  }, [checked]);
  return (
    <div className="checkbox">
      <input
        ref={ref}
        id={id}
        type="checkbox"
        checked={checked === true || checked === false ? checked : false}
        {...props}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export { NestedCheckbox };
