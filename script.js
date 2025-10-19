const newsBoxes = document.querySelectorAll(".news-box");

newsBoxes.forEach((box) => {
  const toggleBtn = box.querySelector(".toggle");

  toggleBtn.addEventListener("click", () => {
    const isOpen = box.classList.contains("open");

    if (isOpen) {
      box.classList.remove("open");
      box.classList.add("closed");
      toggleBtn.textContent = "►";
      const content = box.querySelector(".news-content");
      content.style.display = "none";
    } else {
      box.classList.remove("closed");
      box.classList.add("open");
      toggleBtn.textContent = "↓";
      const content = box.querySelector(".news-content");
      content.style.display = "block";
    }
  });
});
