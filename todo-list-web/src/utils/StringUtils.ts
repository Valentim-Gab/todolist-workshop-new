export function checkOnlyAlphanumericDots(str: string): boolean {
  const regex = /^[A-Za-z0-9.]*$/

  return regex.test(str)
}

export function limitNumTextChars(
  text: string,
  limitNum: number,
  suffix = '...'
) {
  return text.length > limitNum ? `${text.slice(0, limitNum)}${suffix}` : text
}
