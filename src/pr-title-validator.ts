const conventionalTitleRegex = /^(?<type>[\w]+)(?:\((?<scope>[\w-]+)\))?(?<breaking>!)?:[ \t]+(?<message>.+)$/

export function validateTitle(title: string, allowedTypes: string[]): void {
  const type = conventionalTitleRegex.exec(title)?.groups?.type
  if (type === undefined) {
    throw new Error(`Bad PR title "${title}": does not match conventional format`)
  }

  if (allowedTypes.length === 0) {
    return // no allowed types means all types are allowed
  }

  if (!allowedTypes.includes(type)) {
    throw new Error(`Bad PR title "${title}": actual type "${type}" is not one of the allowed types: [${allowedTypes.join(', ')}]`)
  }
}
