// nav shadow
window.onscroll = (e) => {
  if (window.scrollY <= 10) {
    document.querySelector("nav").style.boxShadow = "unset";
  } else {
    document.querySelector("nav").style.boxShadow = "0 2px 10px var(--theme20)";
  }
};
//
fetch("data.json")
  .then((res) => res.json())
  .then((res) => {
    let i = 0;
    for (const category in res) {
      let columns = document.createElement("div");
      columns.classList.add("columns");
      columns.style.transition = " 0.3s " + i * 0.1 + "s,border 0s 0s";
      let clickedOnce = false;
      let heading = document.createElement("a");
      heading.classList.add("heading");
      heading.href = "categorypage?category=" + category;
      heading.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z"
            fill="var(--headingsvg)"
          ></path>
        </g>
      </svg>
      ${category}
      `;
      heading.onclick = (e) => {
        handlemoblienavlist(heading, columns);
        if (window.innerWidth < 450) {
          if (clickedOnce) {
          } else {
            e.preventDefault();
            clickedOnce = true;
          }
        }
      };
      columns.appendChild(heading);
      //
      for (const subcat in res[category].subcat) {
        let list = document.createElement("a");
        list.href = "subcategory?subcategory=" + subcat;
        list.classList.add("list");
        list.innerHTML = subcat;
        columns.appendChild(list);
      }
      document.querySelector(".desksidebar").appendChild(columns);
      i++;
    }
  });
//
//
//
//
//
//
//
// handle mobile nav list
function handlemoblienavlist(heading, columns) {
  if (window.innerWidth < 450) {
    resetlist();
    columns.classList.add("activecolumn");
    heading.classList.add("activeheading");
    heading.querySelector("svg").classList.add("activesvg");
    columns.querySelectorAll(".list").forEach((item) => {
      item.classList.add("activelist");
    });
  }
}
//show menu
let menuflag = true;
function showmenu() {
  if (menuflag) {
    document.querySelector(".desksidebar").classList.add("activesidebar");
    document.querySelectorAll(".desksidebar .columns").forEach((item) => {
      item.classList.add("movingcolumns");
    });
    menuflag = false;
    //
    disableBackButton();
  } else {
    document.querySelector(".desksidebar").classList.remove("activesidebar");
    document.querySelectorAll(".desksidebar .columns").forEach((item) => {
      item.classList.remove("movingcolumns");
    });
    menuflag = true;
    //
    resetlist();
    //
    enableBackButton();
  }
}
// close menu with back button disable and enable back button
let originalState = history.state;
function disableBackButton() {
  history.pushState({ disabled: true }, null, window.location.href);
  window.onpopstate = function (event) {
    if (event.state && event.state.disabled) {
      history.replaceState(originalState, null, window.location.href);
      return;
    }
    history.go(1);
  };
}
function enableBackButton() {
  history.replaceState(originalState, null, window.location.href);
  window.onpopstate = null;
}
//
window.addEventListener("popstate", function () {
  if (typeof monthmenuflag === "undefined" || (!monthmenuflag && !menuflag)) {
    if (locationflag) {
      hidelocations();
    } else {
      menuflag = false
      showmenu();
    }
  } else if (monthmenuflag) {
    hidemonthmenu();
  } else {
    hidelocations();
  }
});

// reset list
function resetlist() {
  document.querySelectorAll(".desksidebar .columns").forEach((item) => {
    item.classList.remove("activecolumn");
    item.querySelectorAll(".list").forEach((item) => {
      item.classList.remove("activelist");
    });
    item.querySelectorAll(".heading").forEach((item) => {
      item.classList.remove("activeheading");
      item.querySelector("svg").classList.remove("activesvg");
    });
  });
}

// update cart
let cartadded = false;
let localproductarray = JSON.parse(localStorage.getItem("rbproducts")) || [];
let numberofcartproduct;
if (localproductarray) {
  numberofcartproduct = localproductarray.length;
} else {
  numberofcartproduct = 0;
}
//
function addtocart() {
  if (cartadded) {
    // to remove
    updateaddcartbutton(true);
    if (numberofcartproduct > 0) {
      numberofcartproduct--;
    }
    // localstorage
    updatelocalstorage(false);
    cartadded = false;
    shownotification("Removed from cart")
  } else {
    // to add
    updateaddcartbutton(false);
    numberofcartproduct++;
    // localstorage
    updatelocalstorage(true);
    cartadded = true;
    shownotification("Added to cart")
  }
  updatecartnavicon();
}
// update add cart button
function updateaddcartbutton(value) {
  if (value) {
    // to remove
    document.querySelector(".cartsvg").style.display = "block";
    document.querySelector(".deletesvg").style.display = "none";
    document.querySelector(".addtocart span").innerHTML = "Add to cart";
  } else {
    // to add
    document.querySelector(".cartsvg").style.display = "none";
    document.querySelector(".deletesvg").style.display = "block";
    document.querySelector(".addtocart span").innerHTML = "Remove from cart";
  }
}
//updatecart nav icon
function updatecartnavicon() {
  if (numberofcartproduct > 0) {
    document.querySelector(".cartcounter").style.display = "grid";
    document.querySelector(".cartcounter").innerHTML = numberofcartproduct;
  } else {
    document.querySelector(".cartcounter").style.display = "none";
  }
}
updatecartnavicon();

// location
//
//
//
// show locations
var locationflag = false;
function showlocations() {
  document.querySelector(".locationchoose").style.transition = "0.3s";
  document
    .querySelector(".locationchoose")
    .classList.add("activelocationchoose");
  // disable back button
  disableBackButton();
  locationflag = true;
}
// hide locations
function hidelocations() {
  document
    .querySelector(".locationchoose")
    .classList.remove("activelocationchoose");
  // enable back button
  enableBackButton();
  locationflag = false;
}
// select location from local storeage
let citylocation = JSON.parse(localStorage.getItem("rblocation")) || [];
if (citylocation) {
  document.querySelector(".locationchoose").style.transition = "0s";
  document.querySelectorAll(".locationchoose .locations").forEach((item) => {
    if (item.innerHTML == citylocation) {
      selectlocation(item);
      hidelocations();
    }
  });
}
function selectlocation(item) {
  document.querySelectorAll(".locationchoose .locations").forEach((item) => {
    item.classList.remove("activelocation");
  });
  item.classList.add("activelocation");
  document.querySelector(".locationcontainer span").innerHTML = item.innerHTML;
}
document.querySelectorAll(".locationchoose .locations").forEach((item) => {
  item.onclick = () => {
    selectlocation(item);
    localStorage.setItem("rblocation", JSON.stringify(item.innerHTML));
    hidelocations();
  };
});

// notificaton
function shownotification(value) {
  let notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerHTML = `
  <div>${value}</div>
  <button
    onclick="this.parentElement.classList.remove('activenotification');"
  >
    X
  </button>
  `;
  setTimeout(() => {
    notification.classList.add("activenotification");
  }, 100);
  document.body.appendChild(notification)
  setTimeout(()=>{
    notification.classList.remove("activenotification");
    setTimeout(()=>{
      notification.remove()
    },1000)
  },5000)
}
// shownotification("Please enter your name");
