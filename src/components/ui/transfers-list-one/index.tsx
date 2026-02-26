import { useState, useId } from "react";
import "./styles.css";

const DEFAULT_ITEMS_LEFT = ["HTML", "JavaScript", "CSS", "TypeScript"];
const DEFAULT_ITEMS_RIGHT = ["React", "Angular", "Vue", "Svelte"];

function generateItemsMap(items: string[]) {
  return new Map(items.map((item) => [item, false]));
}

function hasTransfersItemSelected(sourceItems: Map<string, boolean>) {
  return (
    Array.from(sourceItems.values()).filter((val) => Boolean(val)).length > 0
  );
}

function transferAllItems(
  srcItems: Map<string, boolean>,
  setSrcItems: (items: Map<string, boolean>) => void,
  destItems: Map<string, boolean>,
  setDestItems: (items: Map<string, boolean>) => void,
) {
  setDestItems(new Map([...destItems, ...srcItems]));
  setSrcItems(new Map());
}

function transferSelectedItems(
  srcItems: Map<string, boolean>,
  setSrcItems: (items: Map<string, boolean>) => void,
  destItems: Map<string, boolean>,
  setDestItems: (items: Map<string, boolean>) => void,
) {
  const newSrcItems = new Map(srcItems);
  const newDestItems = new Map(destItems);

  srcItems.forEach((value, key) => {
    if (!value) {
      return;
    }
    newDestItems.set(key, value);
    newSrcItems.delete(key);
  });

  setSrcItems(newSrcItems);
  setDestItems(newDestItems);
}

const TransfersListItem = () => {
  const [itemsLeft, setItemsLeft] = useState(
    generateItemsMap(DEFAULT_ITEMS_LEFT),
  );
  const [itemsRight, setItemsRight] = useState(
    generateItemsMap(DEFAULT_ITEMS_RIGHT),
  );
  return (
    <div className="transfers-list">
      <ItemList items={itemsLeft} setItems={setItemsLeft} />
      <div className="transfers-actions">
        <button
          disabled={itemsLeft.size === 0}
          onClick={() => {
            transferAllItems(
              itemsLeft,
              setItemsLeft,
              itemsRight,
              setItemsRight,
            );
          }}
        >
          transfer all to right
        </button>
        <button
          onClick={() =>
            transferSelectedItems(
              itemsLeft,
              setItemsLeft,
              itemsRight,
              setItemsRight,
            )
          }
          disabled={!hasTransfersItemSelected(itemsLeft)}
        >
          transfer to right
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
          disabled={!hasTransfersItemSelected(itemsRight)}
        >
          transfer to left
        </button>
        <button
          onClick={() =>
            transferAllItems(itemsRight, setItemsRight, itemsLeft, setItemsLeft)
          }
          disabled={itemsRight.size === 0}
        >
          transfer all to left
        </button>
      </div>
      <ItemList items={itemsRight} setItems={setItemsRight} />
    </div>
  );
};

function ItemList({
  items,
  setItems,
}: {
  items: Map<string, boolean>;
  setItems: (items: Map<string, boolean>) => void;
}) {
  return (
    <ul>
      {Array.from(items.entries()).map(([label, checked], idx) => (
        <li key={idx}>
          <CheckboxItem
            label={label}
            checked={checked}
            onChange={(label: string) => {
              const newMap = new Map(items);
              newMap.set(label, !items.get(label));
              setItems(newMap);
            }}
          />
        </li>
      ))}
    </ul>
  );
}

function CheckboxItem({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (label: string) => void;
}) {
  const id = useId();
  return (
    <div className="checkbox-item">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={() => onChange(label)}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export { TransfersListItem };
