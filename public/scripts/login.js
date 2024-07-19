document.querySelector("#login").addEventListener("click", async () => {
  try {
    const data = {
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
    };
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let response = await fetch("/api/auth/login", opts);
    response = await response.json();
    if (response.success) {
      Swal.fire({
        title: response.message,
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        confirmButtonColor: "#F9A8D4",
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return location.replace("/newsample.html");
    }
    return Swal.fire({
      title: response.message,
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#F9A8D4",
    });
  } catch (error) {
    return Swal.fire({
      title: error.message.toUpperCase(),
      icon: "error",
      timer: 5000,
      timerProgressBar: true,
      confirmButtonColor: "#F9A8D4",
    });
  }
});
