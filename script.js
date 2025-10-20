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

$(document).ready(function () {
  const $textInput = $("#textInput");
  const $colorInput = $("#colorInput");
  const $bgcolorInput = $("#bgColorInput");
  const $sampleText = $("#sampleText");
  const $processContent = $(".process-content");

  const $editBtn = $(".edit-sampleText");
  const $btnHighlight = $("#btnHighlight");
  const $btnDelete = $("#btnDelete");
  const $btnReset = $("#btnReset");

  const $pop = $("#popup");
  const $boldChk = $("#boldChk");
  const $italicChk = $("#italicChk");
  const $underlineChk = $("#underlineChk");

  function togglePopup() {
    $pop.toggle();
  }

  $editBtn.on("click", togglePopup);
  function togglePopup() {
    $pop.toggle();
  }

  $btnHighlight.on("click", togglePopup);
  $btnDelete.on("click", togglePopup);

  $colorInput.on("input", function () {
    $sampleText.css("color", $colorInput.val());
  });

  // Toggle bold style for sample text
  $boldChk.on("change", function () {
    $sampleText.css(
      "font-weight",
      $boldChk.prop("checked") ? "bold" : "normal"
    );
  });

  // Toggle italic style for sample text
  $italicChk.on("change", function () {
    $sampleText.css(
      "font-style",
      $italicChk.prop("checked") ? "italic" : "normal"
    );
  });

  // Toggle underline style for sample text
  $underlineChk.on("change", function () {
    $sampleText.css(
      "text-decoration",
      $underlineChk.prop("checked") ? "underline" : "none"
    );
  });
});
