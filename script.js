const navLinks = $(".nav-bar .nav-link");
const footerLinks = $(".nav-bar-footer .nav-link-footer");

navLinks.each(function (index) {
  $(this).mouseenter(function () {
    footerLinks.removeClass("hovered");
    footerLinks.eq(index).addClass("hovered");
  });

  $(this).mouseleave(function () {
    footerLinks.eq(index).removeClass("hovered");
  });
});

const $newsBoxes = $(".news-box");

$newsBoxes.each(function () {
  const $box = $(this);
  const $toggleBtn = $box.find(".toggle");

  $toggleBtn.on("click", function () {
    const isOpen = $box.hasClass("open");

    if (isOpen) {
      $box.removeClass("open").addClass("closed");
      $toggleBtn.text("►");
      $box.find(".news-content").hide();
    } else {
      $box.removeClass("closed").addClass("open");
      $toggleBtn.text("↓");
      $box.find(".news-content").show();
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

const $textInput = $("#textInput");
const $colorInput = $("#colorInput");
const $bgInput = $("#bgColorInput");
const $sampleText = $("#sampleText");
const $content = $(".process-text-inner");
const originalText = $content.html();

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

$(document).on("click", function (event) {
  if (
    !$(event.target).closest($pop).length &&
    !$(event.target).closest($editBtn).length
  ) {
    $pop.css("display", "none");
  }
});

$colorInput.on("input", function () {
  $sampleText.css("color", $colorInput.val());
});

$bgInput.on("input", function () {
  $sampleText.css("background-color", $bgInput.val());
});

$boldChk.on("change", function () {
  $sampleText.css("font-weight", $boldChk.prop("checked") ? "bold" : "normal");
});

$italicChk.on("change", function () {
  $sampleText.css(
    "font-style",
    $italicChk.prop("checked") ? "italic" : "normal"
  );
});

$underlineChk.on("change", function () {
  $sampleText.css(
    "text-decoration",
    $underlineChk.prop("checked") ? "underline" : "none"
  );
});

$("#btnHighlight").click(function () {
  let pattern = $("#textInput").val();
  if (!pattern) return;

  let flags = "gi";
  let regex;

  try {
    regex = new RegExp(pattern, flags);
  } catch (e) {
    return;
  }

  let color = $("#colorInput").val();
  let bgColor = $("#bgColorInput").val();
  let bold = $("#boldChk").is(":checked") ? "font-weight:bold;" : "";
  let italic = $("#italicChk").is(":checked") ? "font-style:italic;" : "";
  let underline = $("#underlineChk").is(":checked")
    ? "text-decoration:underline;"
    : "";

  let style = `style="color:${color}; background:${bgColor}; ${bold} ${italic} ${underline}"`;

  let textContent = $content.text();

  let newHtml = textContent.replace(regex, (match) => {
    return `<span class="hl" ${style}>${match}</span>`;
  });

  $content.html(newHtml);
});

$("#btnReset").click(function () {
  $content.html(originalText);
});

$btnDelete.click(function () {
  let pattern = $("#textInput").val();
  if (!pattern) return;

  let flags = "gi";
  let regex;

  try {
    regex = new RegExp(pattern, flags);
  } catch (e) {
    alert("Regex không hợp lệ!");
    return;
  }
  let currentHtml = $content.html();
  let newHtml = currentHtml.replace(regex, "");

  $content.html(newHtml);
});

$(".AddNew-button").click(function () {
  let selected = $("#animalSelect").val();
  let parts = selected.split(",");
  let icon = parts[0];
  let name = parts[1];

  let $item = $("<div class='animal-item'></div>").text(icon + " " + name);
  $(".animals-grid").append($item);
});
