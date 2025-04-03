const isSerializable = (value: unknown): boolean => {
  try {
    JSON.stringify(value);
    return true;
  } catch {
    return false;
  }
};

const convertBigIntToString = (value: unknown): unknown => {
  if (typeof value === "bigint") {
    return value.toString();
  }

  if (Array.isArray(value)) {
    return value.map(convertBigIntToString);
  }

  if (value && typeof value === "object" && !isSerializable(value)) {
    const valueKeys = Object.keys(value);

    if (valueKeys.length === 0) {
      return value;
    }

    const acc: { [key: string]: unknown } = {};

    for (const key of valueKeys) {
      const val = (value as { [key: string]: unknown })[key];
      acc[key] = convertBigIntToString(val);
    }

    return acc;
  }

  return value;
};

export default convertBigIntToString;
