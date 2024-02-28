let highlightcards = document.querySelectorAll(".headingcards");
let hightlightscontainer = document.querySelector(
  ".highlightscrollingscontainer"
);
let arraylength = 4;
// add dotts
for (let i = 0; i < arraylength; i++) {
  let dotts = document.createElement("div");
  dotts.classList.add("dotts");
  document.querySelector(".dottscontainer").appendChild(dotts);
}
function changedottscolor(value) {
  if (value == arraylength) {
    value = 0;
  }
  if (value == -1) {
    value = arraylength - 1;
  }
  document.querySelectorAll(".dotts").forEach((item, i) => {
    if (value == i) {
      item.style.backgroundColor = " var(--theme)";
      item.style.height = "10px";
    } else {
      item.style.backgroundColor = "white";
      item.style.height = "6px";
    }
  });
}
//
let highlightscrolltimer;
let highlightsscrollvalue = 0;
function highlightsmove(dir) {
  clearInterval(highlightscrolltimer);
  sethighlightscrolltimer();
  // left move
  if (dir == "left") {
    highlightcards.forEach((item) => {
      item.style.transition = "0.4s";
    });
    hightlightscontainer.style.transition = "0.4s";
    highlightsscrollvalue -= 1;
    changedottscolor(highlightsscrollvalue);
    //
    if (window.innerWidth < 450) {
      hightlightscontainer.style.transform =
        "translateX(" +
        -(highlightsscrollvalue * (((window.innerWidth - 20) * 4) / 7 + 10)) +
        "px)";
    } else {
      hightlightscontainer.style.transform =
        "translateX(" + -(highlightsscrollvalue * 410) + "px)";
    }

    changestyleofhighlights();
    //
    if (highlightsscrollvalue == -1) {
      setTimeout(() => {
        highlightcards.forEach((item) => {
          item.style.transition = "none";
        });
        //
        hightlightscontainer.style.transition = "none";
        highlightsscrollvalue = arraylength - 1;
        //
        if (window.innerWidth < 450) {
          hightlightscontainer.style.transform =
            "translateX(" +
            -(
              highlightsscrollvalue *
              (((window.innerWidth - 20) * 4) / 7 + 10)
            ) +
            "px)";
        } else {
          hightlightscontainer.style.transform =
            "translateX(" + -(highlightsscrollvalue * 410) + "px)";
        }
        changestyleofhighlights();
      }, 400);
    }
  }
  // right move
  if (dir == "right") {
    highlightcards.forEach((item) => {
      item.style.transition = "0.4s";
    });
    hightlightscontainer.style.transition = "0.4s";
    highlightsscrollvalue += 1;
    changedottscolor(highlightsscrollvalue);
    if (window.innerWidth < 450) {
      hightlightscontainer.style.transform =
        "translateX(-" +
        highlightsscrollvalue * (((window.innerWidth - 20) * 4) / 7 + 10) +
        "px)";
    } else {
      hightlightscontainer.style.transform =
        "translateX(-" + highlightsscrollvalue * 410 + "px)";
    }
    changestyleofhighlights();
    if (highlightsscrollvalue == arraylength) {
      setTimeout(() => {
        highlightcards.forEach((item) => {
          item.style.transition = "none";
        });
        //
        hightlightscontainer.style.transition = "none";
        highlightsscrollvalue = 0;
        if (window.innerWidth < 450) {
          hightlightscontainer.style.transform =
            "translateX(-" +
            highlightsscrollvalue * (((window.innerWidth - 20) * 4) / 7 + 10) +
            "px)";
        } else {
          hightlightscontainer.style.transform =
            "translateX(-" + highlightsscrollvalue * 410 + "px)";
        }
        changestyleofhighlights();
      }, 400);
    }
  }
}
//
function changestyleofhighlights() {
  highlightcards.forEach((item, i) => {
    item.style.aspectRatio = "1";
    item.style.filter = "brightness(0.6)";
    if (i == highlightsscrollvalue + 2) {
      item.style.aspectRatio = "7/4";
      item.style.filter = "brightness(1)";
    }
  });
}
// auto move highlights
function sethighlightscrolltimer() {
  highlightscrolltimer = setInterval(() => {
    highlightsmove("right");
  }, 5000);
}
sethighlightscrolltimer();
