type CnValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | CnValue[]
  | { [className: string]: any };

function flatten(input: CnValue, out: string[]) {
  if (!input) return;

  if (typeof input === "string" || typeof input === "number") {
    out.push(String(input));
    return;
  }

  if (Array.isArray(input)) {
    for (const v of input) flatten(v, out);
    return;
  }

  if (typeof input === "object") {
    for (const [key, value] of Object.entries(input)) {
      if (value) out.push(key);
    }
  }
}

export function cn(...inputs: CnValue[]) {
  const parts: string[] = [];
  for (const input of inputs) flatten(input, parts);
  return parts.join(" ");
}
