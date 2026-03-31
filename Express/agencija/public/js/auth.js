async function handleAuthError(res) {
  if (res.status === 401) {
    alert("Најави се за да продолжиш");

    localStorage.setItem("redirectAfterLogin", window.location.pathname);
    window.location.href = "/login";
    return true;
  }

  if (res.status === 403) {
    alert("Само админ може да ја изврши оваа акција");
    return true;
  }

  return false;
}
function requireAuth() {
  if (!localStorage.getItem("token")) {
    window.location.href = "/login";
    return false;
  }
  return true;
}
