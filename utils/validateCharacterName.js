export function validateCharacterName(value) {
  
    if(typeof value !== "string") {
        return null
    }

    if(value.trim() === '') {
        return null
    }

    return value.trim();
}