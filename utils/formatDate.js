export function formatDate(date) {
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  let today = new Date(date)

  return (
    today.toLocaleDateString('en-US', options) +
    ' at ' +
    today.toLocaleTimeString('en-US')
  )
}
