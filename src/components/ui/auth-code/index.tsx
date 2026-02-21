import type { InputHTMLAttributes } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import "./styles.css";
import { cn } from "@/utility";

type AuthCodeProps = {
  /**
   * length of the auth code.
   */
  length?: number;
  isError?: boolean;
  shouldAutoSubmit?: boolean;
  isSubmitting?: boolean;
  /**
   * Invoked on form submit
   * @param code entered auth code
   * @returns
   */
  onSubmit?: (code: string) => void;
};

const singleNumRegex = /^\d$/;
const numRegex = /^\d+$/;

const AuthCode = ({
  length = 4,
  isError = false,
  shouldAutoSubmit = false,
  isSubmitting = false,
  onSubmit = () => {},
}: AuthCodeProps) => {
  const [focusIndex, setFocusIndex] = useState(0);
  const [code, setCode] = useState<string[]>(Array(length).fill(""));

  function clampIndex(index: number) {
    if (index <= 0) return 0;
    if (index >= length) return length - 1;
    return index;
  }

  function onFocus(index: number) {
    setFocusIndex(index);
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pastedCode = e.clipboardData.getData("text");
    if (!numRegex.test(pastedCode)) return;

    setCode(code.map((codeDigit, idx) => pastedCode[idx] ?? codeDigit));
    setFocusIndex(clampIndex(pastedCode.length));
  }

  function onReset() {
    setCode(Array(length).fill(""));
    setFocusIndex(0);
  }

  const isSubmitEnabled = code.every((codeDigit) => Boolean(codeDigit));
  const isResetEnabled = code.some((codeDigit) => Boolean(codeDigit));

  const isAuthDigitEnabled = (currIndex: number) => {
    if (currIndex === 0) return true;
    const sliced = code.slice(0, currIndex);
    return sliced.every((codeDigit) => Boolean(codeDigit));
  };

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    e.stopPropagation();
    switch (e.key) {
      case "ArrowLeft":
        setFocusIndex(clampIndex(focusIndex - 1));
        break;
      case "ArrowRight":
        setFocusIndex(clampIndex(focusIndex + 1));
        break;
      case "Backspace":
        if (code[index]) {
          setCode(
            code.map((codeDigit, idx) => (index === idx ? "" : codeDigit)),
          );
        } else if (index - 1 >= 0) {
          setCode(
            code.map((codeDigit, idx) => (index - 1 === idx ? "" : codeDigit)),
          );
          setFocusIndex(clampIndex(index - 1));
        }
        break;
      default:
        const value = e.key;
        if (!singleNumRegex.test(value)) {
          return;
        }
        const next = [...code];
        next[index] = value;
        setCode(
          code.map((codeDigit, idx) =>
            index === idx ? String(value) : codeDigit,
          ),
        );
        setFocusIndex(clampIndex(focusIndex + 1));
        break;
    }
  }

  useEffect(() => {
    if (isSubmitEnabled && shouldAutoSubmit) {
      onSubmit(code.join(""));
    }
  }, [isSubmitEnabled]);

  return (
    <form
      onReset={(e) => {
        e.preventDefault();
        onReset();
      }}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(code.join(""));
      }}
    >
      <div className="input-group">
        {code.map((_code, inputIndex) => (
          <InputDigit
            disabled={!isAuthDigitEnabled(inputIndex)}
            readOnly
            value={_code}
            key={inputIndex}
            isFocused={inputIndex === focusIndex}
            onFocus={() => onFocus(inputIndex)}
            onKeyDown={(e) => handleKeyDown(e, inputIndex)}
            onPaste={handlePaste}
            className={cn(
              "f",
              isError && "error",
              isSubmitting && "submitting",
            )}
          />
        ))}
      </div>
      {!shouldAutoSubmit && (
        <div className="button-group">
          <button disabled={!isResetEnabled} type="reset">
            Reset
          </button>
          <button disabled={!isSubmitEnabled || isSubmitting} type="submit">
            Submit
          </button>
        </div>
      )}
    </form>
  );
};

type InputDigitProps = Readonly<{ isFocused: boolean }> &
  Omit<InputHTMLAttributes<HTMLInputElement>, "checked">;

const InputDigit = ({ value, isFocused, ...props }: InputDigitProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused) {
      inputRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <input
      value={value}
      ref={inputRef}
      type="text"
      maxLength={1}
      autoComplete="one-time-code"
      inputMode="numeric"
      {...props}
    />
  );
};

export { AuthCode };
