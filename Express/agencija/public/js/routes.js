function reserve(routeId) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Најави се за да резервираш!");

    localStorage.setItem("redirectAfterLogin", `/routes?reserve=${routeId}`);

    window.location.href = "/login";
    return;
  }
  window.location.href = `/user?route=${routeId}`;
}
