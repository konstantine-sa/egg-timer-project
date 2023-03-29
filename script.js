//global variables
const weightRatio = calculateWeightRatio();
var yolkTypeRatio = 0;
var cookingTime = weightRatio + yolkTypeRatio;

const eggSize = document.querySelectorAll(".egg");
const yolkType = document.querySelectorAll(".yolk-type__item ");

function selectEggSize() {
  // looping through each egg
  eggSize.forEach((egg) => {
    // Adding click event listener to each egg
    egg.addEventListener("click", () => {
      // Removing the "selected" class from all eggs
      eggSize.forEach((egg) => {
        egg.classList.remove("egg--selected");
      });

      // Adding the "selected" class to the clicked egg
      egg.classList.add("egg--selected");

      //getting weight of the selected egg
      const weightRatio = calculateWeightRatio();
      console.log("Weight Ratio: " + weightRatio); //*******************************TO REMOVE AFTER DEBUGGING!*****************************
    });
  });
}

function selectYolkType() {
  yolkType.forEach((egg) => {
    egg.addEventListener("click", () => {
      yolkType.forEach((egg) => {
        egg.classList.remove("yolk-type__item--selected");
      });

      egg.classList.add("yolk-type__item--selected");

      yolkTypeRatio = parseFloat(egg.dataset.value);
      console.log("YolkType Ratio: " + yolkTypeRatio); //*******************************TO REMOVE AFTER DEBUGGING!*****************************
    });
  });
}

//getting weight of the selected egg
function calculateWeightRatio() {
  let weightRatio = 1.16667;
  const selectedEgg = document.querySelector(".egg--selected");

  if (selectedEgg.classList.contains("egg--size-s")) {
    weightRatio = 1;
  } else if (selectedEgg.classList.contains("egg--size-m")) {
    weightRatio = 1.16667;
  } else if (selectedEgg.classList.contains("egg--size-l")) {
    weightRatio = 1.33333;
  } else if (selectedEgg.classList.contains("egg--size-xl")) {
    weightRatio = 1.5;
  }

  return weightRatio;
}

selectEggSize();
selectYolkType();

//Timer module
const semicircles = document.querySelectorAll(".semicircle");
const timer = document.querySelector(".timer");

//input
const min = 0;
const sec = cookingTime;

const minutes = min * 60000;
const seconds = sec * 1000;
const setTime = minutes + seconds;
const startTime = Date.now();
const futureTime = startTime + setTime;

const timerLoop = setInterval(countDownTimer);
countDownTimer();

function countDownTimer() {
  const currentTime = Date.now();
  const remainingTime = futureTime - currentTime;
  const angle = (remainingTime / setTime) * 360;

  //Progress indicator
  if (angle > 180) {
    semicircles[2].style.display = "none";
    semicircles[0].style.transform = "rotate(180deg)";
    semicircles[1].style.transform = `rotate(${angle}deg)`;
  } else {
    semicircles[2].style.display = "block";
    semicircles[0].style.transform = `rotate(${angle}deg)`;
    semicircles[1].style.transform = `rotate(${angle}deg)`;
  }
  //Timer
  const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString(
    "en-US",
    { minimumIntegerDigits: 2, useGrouping: false }
  );
  const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  timer.innerHTML = `
  <div >${mins}</div>
  <div class="colon">:</div>
  <div>${secs}</div>
  `;
  timer.style.color = "#fff";

  //10-sec condition
  if (remainingTime <= 10000) {
    semicircles[0].style.backgroundColor = "red";
    semicircles[1].style.backgroundColor = "red";
    timer.style.color = "red";
  }
  //end
  if (remainingTime < 0) {
    clearInterval(timerLoop);
    semicircles[0].style.display = "none";
    semicircles[1].style.display = "none";
    semicircles[2].style.display = "none";

    timer.innerHTML = `
  <div >00</div>
  <div class="colon">:</div>
  <div>00</div>`;

    timer.style.color = "#bbac9a";
  }
}
