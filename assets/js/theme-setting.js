/*===================
    Theme Setting js
=======================*/
const themeBtnParent = document.querySelector(".theme-option");

const rtlBtn = document.querySelector("#rtl-btn");
const darkBtn = document.querySelector("#dark-btn");
const html = document.querySelector("html");
const rtlLink = document.querySelector("#rtl-link");
const darkLink = document.querySelector("#change-link");

themeBtnParent?.addEventListener("click", function (e) {
  e.preventDefault();
  const clicked = e.target.closest(".theme-setting-button")?.id;
  if (!clicked) return;
  if (clicked === "rtl-btn") {
    rtlBtn.id = "ltr-btn";
    html.setAttribute("dir", "rtl");
    rtlLink.href = "../assets/css/vendors/bootstrap.rtl.css";
    rtlBtn.classList.add("rtlBtnEl");
    localStorage.setItem(
      "rtlcss",
      "../assets/css/vendors/bootstrap.rtl.css"
    );
    localStorage.setItem("dir", "rtl");
    localStorage.setItem("rtlBtnId", "ltr-btn");
  }
  if (clicked === "ltr-btn") {
    rtlBtn.id = "rtl-btn";
    html.setAttribute("dir", "");
    rtlLink.href = "../assets/css/vendors/bootstrap.css";
    localStorage.setItem("rtlcss", "../assets/css/vendors/bootstrap.css");
    localStorage.setItem("dir", "ltr");
    localStorage.setItem("rtlBtnId", "rtl-btn");
  }
  if (clicked === "dark-btn") {
    darkBtn.id = "light-btn";
    html.className = "dark";
    darkLink.href = "../assets/css/dark.css";
    localStorage.setItem("body", "dark");
    localStorage.setItem("layoutcss", "../assets/css/dark.css");
    localStorage.setItem("darkId", "light-btn");
  }
  if (clicked === "light-btn") {
    darkBtn.id = "dark-btn";
    darkLink.href = "style.css";
    html.className = "light";
    localStorage.setItem("body", "light");
    localStorage.setItem("layoutcss", "style.css");
    localStorage.setItem("darkId", "dark-btn");
  }
});

// Rtl
rtlBtn.id = localStorage.getItem("rtlBtnId")?localStorage.getItem("rtlBtnId"): "rtl-btn";
html.setAttribute("dir", localStorage.getItem("dir"));
rtlLink.href = localStorage.getItem("rtlcss")?localStorage.getItem("rtlcss"): "bootstrap.css";

// Dark
darkBtn.id = localStorage.getItem("darkId")
  ? localStorage.getItem("darkId")
  : "dark-btn";
// darkBtn.innerHTML = localStorage.getItem("textContentDark") ? localStorage.getItem("textContentDark") : `<i data-feather="moon"></i> <span class="text-value">Dark</span>`;
html.className = localStorage.getItem("body");
if (darkLink) {
  darkLink.href = localStorage.getItem("layoutcss")
    ? localStorage.getItem("layoutcss")
    : "style.css";
}