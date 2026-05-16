// Valida se o ID digitado esta dentro do intervalo aceito pela API.
export function validateCharacterId(value) {
  const val = parseInt(value, 10);

  if (!val || val < 1 || val > 826) {
    return null;
  }

  return val;
}
