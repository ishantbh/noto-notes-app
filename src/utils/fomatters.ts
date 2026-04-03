export function formatDate(date: string) {
  const dateObj = new Date(date)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return dateObj.toLocaleDateString('en-US', options)
}

export function extractFirstName(name: string) {
  const firstName = name.split(' ')[0]

  return firstName
}
