export function getCoolUserData({ email, name }) {
  return (email.slice(2, 5) + name.slice(-4)).split(' ').join('-').toLowerCase()
}
