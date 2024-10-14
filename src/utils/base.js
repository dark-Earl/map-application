export function login () {
  let reqUri = location.pathname + location.hash
  let loginUrl = window.BASE_URL + 'login.html'
  if (reqUri !== '') {
    loginUrl = loginUrl + '#/?reqUri=' + encodeURIComponent(reqUri)
  }
  location.href = loginUrl
}
