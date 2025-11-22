const form = document.querySelector("form"); // gets your form automatically

form.addEventListener("submit", function (e) {
  e.preventDefault(); // stop normal submit

  const formData = new FormData(form);

  fetch("https://formspree.io/f/mpwbbozq", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: formData
  })
  .then(response => {
    if (response.ok) {
      form.reset();
      alert("Message sent successfully!"); // SIMPLE POPUP
    } else {
      alert("Something went wrong. Please try again.");
    }
  })
  .catch(() => alert("Network error. Please try again."));
});