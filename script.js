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
const $aside = $(".sidebar");
let $draggingBox = null;
let $ghost = null;
let $swapTarget = null;
let offsetY = 0;

$aside.on("mousedown", ".drag", function (e) {
  const $dragIcon = $(this);
  const $box = $dragIcon.closest(".news-box");

  $draggingBox = $box;

  $ghost = $box.clone().addClass("ghost").appendTo("body");

  const rect = $box[0].getBoundingClientRect();
  offsetY = e.pageY - rect.top;

  $ghost.css({
    width: rect.width + "px",
    height: rect.height + "px",
    left: rect.left + "px",
    top: rect.top + "px",
  });

  $(document).on("mousemove", onMouseMove);
  $(document).on("mouseup", onMouseUp);
});

function onMouseMove(e) {
  $ghost.css("top", e.pageY - offsetY + "px");

  const $boxes = $(".news-box");
  let $current = null;

  $boxes.each(function () {
    const $b = $(this);
    const r = $b[0].getBoundingClientRect();

    if (e.pageY > r.top && e.pageY < r.bottom && $b[0] !== $draggingBox[0]) {
      $current = $b;
      return false; // break loop
    }
  });

  if ($swapTarget && $current[0] !== $swapTarget[0]) {
    $swapTarget.removeClass("swap-target");
  }

  if ($current) {
    $current.addClass("swap-target");
  }

  $swapTarget = $current || null;
}

function onMouseUp() {
  if ($swapTarget) {
    const $parent = $draggingBox.parent();
    const $next = $draggingBox.next();

    if ($swapTarget[0] === $next[0]) {
      $parent.prepend($swapTarget);
    } else {
      $parent.append($draggingBox);
    }

    $swapTarget.removeClass("swap-target");
  }

  $ghost.remove();
  $ghost = null;
  $draggingBox = null;
  $swapTarget = null;

  $(document).off("mousemove", onMouseMove);
  $(document).off("mouseup", onMouseUp);
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

  $boldChk.on("change", function () {
    $sampleText.css(
      "font-weight",
      $boldChk.prop("checked") ? "bold" : "normal"
    );
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
});
