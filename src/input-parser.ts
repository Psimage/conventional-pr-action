export const parseJsonList = (jsonList: string): string[] => {
  const list = JSON.parse(jsonList)
  if (!Array.isArray(list)) {
    throw new Error(`Input "${jsonList}" is not a JSON list`)
  }

  return list
}
