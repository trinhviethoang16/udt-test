export function getValidArray<T>(array?: T[]): T[] {
    if (array === undefined) {
      return []
    }
    return checkValidArray(array) ? array : []
}

function checkValidArray(array: unknown[]): boolean {
  return array ? Array.isArray(array) && array.length > 0 : false
}