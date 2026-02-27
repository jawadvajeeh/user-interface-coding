import { useRef, useState } from "react";
import "./styles.css";
import { useId } from "react";
import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DEFAULT_LEFT_ITEMS_LIST = ["HTML", "JavaScript", "CSS", "TypeScript"];

const DEFAULT_RIGHT_ITEMS_LIST = ["React", "Angular", "Vue", "Svelvte"];

function generateMap(list: string[]) {
  return new Map(list.map((item) => [item, false]));
}

function makeAllCheckboxesTo(
  value: boolean,
  items: Map<string, boolean>,
  setItems: (items: Map<string, boolean>) => void,
) {
  setItems(new Map(Array.from(items.entries()).map(([key]) => [key, value])));
}

function transferSelectedItems(
  sourceList: Map<string, boolean>,
  setSourceList: (items: Map<string, boolean>) => void,
  destList: Map<string, boolean>,
  setDestList: (items: Map<string, boolean>) => void,
) {
  const updatedSrcList = new Map(sourceList);
  const updatedDestList = new Map(destList);

  sourceList.forEach((checked, key) => {
    if (!checked) return;
    updatedDestList.set(key, checked);
    updatedSrcList.delete(key);
  });

  setSourceList(updatedSrcList);
  setDestList(updatedDestList);
}

const TransfersListTwo = () => {
  const [itemsLeft, setItemsLeft] = useState<Map<string, boolean>>(
    generateMap(DEFAULT_LEFT_ITEMS_LIST),
  );
  const [itemsRight, setItemsRight] = useState<Map<string, boolean>>(
    generateMap(DEFAULT_RIGHT_ITEMS_LIST),
  );
  return (
    <div className="transfers-list-two">
      <div className="transfer-list2">
        <NewItem items={itemsLeft} setItemsList={setItemsLeft} />
        <ItemsHeader
          items={itemsLeft}
          onChange={(value: boolean) =>
            makeAllCheckboxesTo(value, itemsLeft, setItemsLeft)
          }
        />
        <ItemsList itemsList={itemsLeft} setItemsList={setItemsLeft} />
      </div>
      <div className="transfer-list2-actions">
        <button
          disabled={getSelectedItemsCount(itemsLeft) === 0}
          onClick={() =>
            transferSelectedItems(
              itemsLeft,
              setItemsLeft,
              itemsRight,
              setItemsRight,
            )
          }
        >
          <ChevronRight />
        </button>
        <button
          onClick={() =>
            transferSelectedItems(
              itemsRight,
              setItemsRight,
              itemsLeft,
              setItemsLeft,
            )
          }
          disabled={getSelectedItemsCount(itemsRight) === 0}
        >
          <ChevronLeft />
        </button>
      </div>
      <div className="transfer-list2">
        <NewItem items={itemsRight} setItemsList={setItemsRight} />
        <ItemsHeader
          items={itemsRight}
          onChange={(value: boolean) =>
            makeAllCheckboxesTo(value, itemsRight, setItemsRight)
          }
        />
        <ItemsList itemsList={itemsRight} setItemsList={setItemsRight} />
      </div>
    </div>
  );
};

function NewItem({
  items,
  setItemsList,
}: {
  items: Map<string, boolean>;
  setItemsList: (itemsList: Map<string, boolean>) => void;
}) {
  const [value, setValue] = useState("");
  function handleEnter(key: string) {
    if (key === "Enter") {
      const newItem = value;
      setValue("");
      if (items.has(newItem)) return;
      const updatedItems = new Map(items);
      updatedItems.set(newItem, false);
      setItemsList(updatedItems);
    }
  }
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => handleEnter(e.key)}
    />
  );
}

function getSelectedItemsCount(items: Map<string, boolean>) {
  return Array.from(items.values()).filter((val) => Boolean(val)).length;
}

function ItemsHeader({
  items,
  onChange,
}: {
  items: Map<string, boolean>;
  onChange: (value: boolean) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);

  const selectedCount = getSelectedItemsCount(items);
  const totalCount = items.size;

  const checked = totalCount > 0 && selectedCount === totalCount;
  const indeterminate = selectedCount > 0 && selectedCount < totalCount;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className="items-header">
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={(e) => {
          onChange(e.target.checked);
        }}
      />
      <label>{`${selectedCount}/${items.size} Selected`}</label>
    </div>
  );
}

function ItemsList({
  itemsList,
  setItemsList,
}: {
  itemsList: Map<string, boolean>;
  setItemsList: (itemsList: Map<string, boolean>) => void;
}) {
  return (
    <ul>
      {Array.from(itemsList.entries()).map(([label, isChecked], idx) => (
        <CheckboxItem
          label={label}
          isChecked={isChecked}
          key={idx}
          onChange={() => {
            const updatedList = new Map(itemsList);
            updatedList.set(label, !updatedList.get(label));
            setItemsList(updatedList);
          }}
        />
      ))}
    </ul>
  );
}

function CheckboxItem({
  isChecked,
  label,
  onChange,
}: {
  label: string;
  isChecked: boolean;
  onChange: () => void;
}) {
  const id = useId();
  return (
    <li>
      <input
        id={id}
        checked={isChecked}
        type="checkbox"
        onChange={() => onChange()}
      />
      <label htmlFor={id}>{label}</label>
    </li>
  );
}

export { TransfersListTwo };
