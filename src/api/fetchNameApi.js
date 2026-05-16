export async function fetchNameApi(value) {
  const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${value}`);
  const data = await response.json();

  if (!response.ok) throw new Error(data.error || "Personagem nao encontrado.");

  return data;
}
