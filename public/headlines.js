let hightlightscontainer = document.querySelector(
  ".highlightscrollingscontainer"
);

let adsarray = [
  {
    image: "/images/highlights/ad1.jpg",
    link: "/categorypage?category=Furniture",
  },
  {
    image: "/images/highlights/ad2.jpg",
    link: "/categorypage?category=Fitness%20and%20Gym",
  },
  {
    image: "/images/highlights/ad3.jpg",
    link: "/categorypage?category=Furniture",
  },
  {
    image: "/images/highlights/ad4.jpg",
    link: "/subcategory?subcategory=Laptop",
  },
];
// create ads
function makeads(value) {
  let ads = document.createElement("a");
  ads.href = adsarray[value].link;
  ads.classList.add("headingcards");
  ads.style.backgroundImage = "url(" + adsarray[value].image + ")";
  hightlightscontainer.appendChild(ads);
}
//
makeads(adsarray.length - 2);
makeads(adsarray.length - 1);
//
for (let i = 0; i < adsarray.length; i++) {
  makeads(i);
}
makeads(0);
makeads(1);
makeads(2);
//
//
//
//
let highlightcards = document.querySelectorAll(".headingcards");
let arraylength = adsarray.length;
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
        -(highlightsscrollvalue * (((window.innerWidth - 20) * 9) / 16 + 10)) +
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
              (((window.innerWidth - 20) * 9) / 16 + 10)
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
        highlightsscrollvalue * (((window.innerWidth - 20) * 9) / 16 + 10) +
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
            highlightsscrollvalue * (((window.innerWidth - 20) * 9) / 16 + 10) +
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
    if (i == highlightsscrollvalue + 2) {
      item.style.aspectRatio = "16/9";
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
