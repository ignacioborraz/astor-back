document.querySelector("#create").addEventListener("click", async () => {
  try {
    const data = new FormData();
    data.append("section", document.querySelector("#section").value);
    data.append("title", document.querySelector("#title").value);
    data.append("color", document.querySelector("#color").value);
    data.append("date", document.querySelector("#date").value);
    const photosInput = document.querySelector("#photos");
    for (const file of photosInput.files) {
      data.append("photos", file);
    }
    data.append("main_photo", photosInput[photosInput.length - 1]);
    for (let [key, value] of data.entries()) {
      console.log(`${key}:`, value);
    }
    const opts = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    //let response = await fetch("/api/samples", opts);
    //response = await response.json();
    if (response.success) {
      Swal.fire({
        title: response.message,
        icon: "success",
        timer: 3000,
        timerProgressBar: true,
        confirmButtonColor: "#F9A8D4",
      });
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return location.replace("/");
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
