export async function fetchApi(value) {
  const response = await fetch(`https://rickandmortyapi.com/api/character/${value}`);
  const data = await response.json();

  if (!response.ok) throw new Error(data.error || "Personagem nao encontrado.");

  return data;
}
