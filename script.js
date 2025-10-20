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

//Drag And Drop
const aside = document.querySelector(".sidebar");
let draggingBox = null;
let ghost = null;
let swapTarget = null;
let offsetY = 0;

aside.addEventListener("mousedown", (e) => {
  const dragIcon = e.target.closest(".drag");
  if (!dragIcon) return;

  const box = dragIcon.closest(".news-box");

  draggingBox = box;

  ghost = box.cloneNode(true);
  ghost.classList.add("ghost");
  document.body.appendChild(ghost);

  const rect = box.getBoundingClientRect();
  offsetY = e.pageY - rect.top;

  ghost.style.width = rect.width + "px";
  ghost.style.height = rect.height + "px";
  ghost.style.left = rect.left + "px";
  ghost.style.top = rect.top + "px";

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

function onMouseMove(e) {
  ghost.style.top = e.pageY - offsetY + "px";

  const boxes = [...aside.querySelectorAll(".news-box")];
  let current = boxes.find((b) => {
    const r = b.getBoundingClientRect();
    return e.pageY > r.top && e.pageY < r.bottom && b !== draggingBox;
  });

  if (swapTarget && current !== swapTarget) {
    swapTarget.classList.remove("swap-target");
  }
  if (current) {
    current.classList.add("swap-target");
  }
  swapTarget = current || null;
}

function onMouseUp() {
  if (swapTarget) {
    const parent = draggingBox.parentElement;
    const next = draggingBox.nextElementSibling;

    if (swapTarget === next) {
      parent.insertBefore(swapTarget, draggingBox);
    } else {
      parent.insertBefore(draggingBox, swapTarget);
    }
    swapTarget.classList.remove("swap-target");
  }

  ghost.remove();
  ghost = null;
  draggingBox = null;
  swapTarget = null;

  document.removeEventListener("mousemove", onMouseMove);
  document.removeEventListener("mouseup", onMouseUp);
}

const textInput = document.getElementById("textInput");
const colorInput = document.getElementById("colorInput");
const bgcolorInput = document.getElementById("bgColorInput");
const sampleText = document.getElementById("sampleText");
const btnHighlight = document.getElementById("btnHighlight");
const btnDelete = document.getElementById("btnDelete");

const pop = document.getElementById("popup");
// const editBtn = document.querySelector(".edit-sampleText");
const boldChk = document.getElementById("boldChk");
const italicChk = document.getElementById("italicChk");
const underlineChk = document.getElementById("underlineChk");
// const bgColorInput = document.getElementById("bgColor");

function popup() {
  const pop = document.getElementById("popup");
  if (pop.style.display === "none" || pop.style.display === "") {
    pop.style.display = "block";
  } else {
    pop.style.display = "none";
  }
}

colorInput.addEventListener("input", () => {
  sampleText.style.color = colorInput.value;
});

boldChk.addEventListener("change", function () {
  sampleText.style.fontWeight = boldChk.checked ? "bold" : "normal";
});

italicChk.addEventListener("change", function () {
  sampleText.style.fontStyle = italicChk.checked ? "italic" : "normal";
});
underlineChk.addEventListener("change", function () {
  sampleText.style.textDecoration = underlineChk.checked ? "underline" : "none";
});
