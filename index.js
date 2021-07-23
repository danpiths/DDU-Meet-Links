// VARIABLE DECLARATION
const siteTitle = document.querySelector(".site-title");
const linkCollectorForm = document.getElementById("link-collector");
const formSubmitted = JSON.parse(localStorage.getItem("formSubmitted"));
const links = JSON.parse(localStorage.getItem("links"));
const currentDate = new Date();
const currentDayNum = currentDate.getDay();

// FUNCTIONS
const collectDataFromLinkCollector = (event) => {
  event.preventDefault();
  const linkFormData = new FormData(event.target);
  const name = linkFormData.get("name");
  const mondayLink = linkFormData.get("mondayLink");
  const tuesdayLink = linkFormData.get("tuesdayLink");
  const wednesdayLink = linkFormData.get("wednesdayLink");
  const thursdayLink = linkFormData.get("thursdayLink");
  const fridayLink = linkFormData.get("fridayLink");
  const mainLink = linkFormData.get("mainLink");
  localStorage.setItem("formSubmitted", JSON.stringify(true));
  const links = {
    name: name,
    mondayLink: mondayLink,
    tuesdayLink: tuesdayLink,
    wednesdayLink: wednesdayLink,
    thursdayLink: thursdayLink,
    fridayLink: fridayLink,
    mainLink: mainLink,
  };
  localStorage.setItem("links", JSON.stringify(links));
};

const generateMeetButtons = (htmlDiv, numToDay) => {
  const mainLink = links.mainLink;
  if (0 < currentDayNum < 6) {
    const dayName = numToDay[currentDayNum][0];
    const dayLink = numToDay[currentDayNum][1];
    htmlDiv.innerHTML = `
        <p class="display-text">Here are your links for ${dayName}</p>
        <a class="link lab-link" href="${dayLink}">${dayName} Lab</a>
        <a class="link main-link" href="${mainLink}">Main Lecture</a>
        <button class="btn clear-btn">Clear Everything (Double Click)</button>
      `;
  } else if (currentDayNum == 6) {
    htmlDiv.innerHTML = `
        <p class="display-text">You have NO Lab today</p>
        <a class="link main-link" href="${mainLink}">Main Lecture</a>
        <button class="btn clear-btn">Clear Everything (Double Click)</button>
      `;
  } else if (currentDayNum == 0) {
    siteTitle.textContent = "It's a holiday today, enjoy bitch!";
    htmlDiv.innerHTML = `
        <button class="btn clear-btn">Clear Everything (Double Click)</button>
      `;
  }
};

const clearEverything = () => {
  localStorage.clear();
  location.reload();
};

// PROGRAMS STARTS
if (formSubmitted) {
  const numToDay = {
    0: null,
    1: ["Monday", links.mondayLink],
    2: ["Tuesday", links.tuesdayLink],
    3: ["Wednesday", links.wednesdayLink],
    4: ["Thursday", links.thursdayLink],
    5: ["Friday", links.fridayLink],
    6: null,
  };
  console.log("submitted");
  linkCollectorForm.style.display = "none";
  siteTitle.classList.add("submitted-title");
  siteTitle.textContent = `Hello ${links.name}`;
  const htmlDiv = document.createElement("div");
  document.body.appendChild(htmlDiv);
  htmlDiv.classList.add("link-container");
  generateMeetButtons(htmlDiv, numToDay);
  const clearBtn = document.querySelector(".clear-btn");
  clearBtn.addEventListener("dblclick", clearEverything);
} else {
  console.log("hi");
  linkCollectorForm.addEventListener("submit", (event) => {
    collectDataFromLinkCollector(event);
    location.reload();
  });
}
