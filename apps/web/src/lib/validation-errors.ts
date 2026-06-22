const fieldLabels: Record<string, string> = {
  name: "Название",
  brand: "Бренд",
  categorySlug: "Категория",
  price: "Цена",
  oldPrice: "Старая цена",
  stock: "На складе",
  description: "Описание",
  image: "Изображение",
};

type ZodFlatten = {
  formErrors?: string[];
  fieldErrors?: Record<string, string[]>;
};

export function formatValidationDetails(details: unknown): string | null {
  if (!details || typeof details !== "object") {
    return null;
  }

  const flatten = details as ZodFlatten;
  const messages: string[] = [];

  for (const [field, errors] of Object.entries(flatten.fieldErrors ?? {})) {
    const label = fieldLabels[field] ?? field;

    for (const message of errors) {
      messages.push(`${label}: ${message}`);
    }
  }

  for (const message of flatten.formErrors ?? []) {
    messages.push(message);
  }

  return messages.length > 0 ? messages.join(" ") : null;
}
