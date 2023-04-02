//global variables
const eggSize = document.querySelectorAll(".egg");
const yolkType = document.querySelectorAll(".yolk-type__item ");
const lid = document.querySelector(".pan-lid");
const buttonPlay = document.querySelector(".play");
const buttonStop = document.querySelector(".stop");

let timeInSeconds = 0;
let weightRatio = 1.16667; // set the default weight ratio
let yolkTypeRatio = 360; // set the default yolkTypeRatio

timeInSecondsCalc();

function timeInSecondsCalc() {
  timeInSeconds = weightRatio * yolkTypeRatio;
}

console.log("Weight Ratio: " + weightRatio);

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
      weightRatio = calculateWeightRatio();
      // timeInSeconds = weightRatio * yolkTypeRatio; // update timeInSeconds based on weightRatio

      timeInSeconds = weightRatio * yolkTypeRatio;
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
      timeInSeconds = weightRatio * yolkTypeRatio;
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

let timerLoop;

buttonPlay.addEventListener("click", function start() {
  timeInSecondsCalc();

  if (
    document.querySelector(".semicircle").style.transform === "rotate(0deg)"
  ) {
    //Closing the lid
    lid.classList.add("pan-lid--closed");

    //Timer module
    const semicircles = document.querySelectorAll(".semicircle");
    const timer = document.querySelector(".timer");

    //input
    const min = Math.floor(timeInSeconds / 60);
    const sec = timeInSeconds % 60;

    const minutes = min * 60000;
    const seconds = sec * 1000;
    const setTime = minutes + seconds;
    const startTime = Date.now();
    const futureTime = startTime + setTime;

    timerLoop = setInterval(countDownTimer);
    countDownTimer();

    function countDownTimer() {
      const currentTime = Date.now();
      let remainingTime = futureTime - currentTime;
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
      const mins = Math.floor(
        (remainingTime / (1000 * 60)) % 60
      ).toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      });
      const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString(
        "en-US",
        {
          minimumIntegerDigits: 2,
          useGrouping: false,
        }
      );

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
      if ((remainingTime = 0)) {
        clearInterval(timerLoop);
        semicircles[0].style.display = "none";
        semicircles[1].style.display = "none";
        semicircles[2].style.display = "none";

        timer.innerHTML = `
          <div >00</div>
          <div class="colon">:</div>
          <div>00</div>
        `;
        buttonPlay.disabled = false;
        buttonStop.disabled = true;
      }
    }
  }
});

//Reseting timer and progress circle
function resetTimer() {
  clearInterval(timerLoop);
  timeInSecondsCalc();
  const semicircles = document.querySelectorAll(".semicircle");
  const timer = document.querySelector(".timer");

  // seting the semicircles to their default state
  semicircles[0].style.transform = "rotate(0deg)";
  semicircles[1].style.transform = "rotate(0deg)";
  semicircles[2].style.display = "block";

  // seting the timer to its default state
  timer.innerHTML = `
    <div>00</div>
    <div class="colon">:</div>
    <div>00</div>
  `;
  timer.style.color = "#bbac9a";
}

buttonStop.addEventListener("click", function stop() {
  resetTimer();
  //Opening the lid
  //Closing the lid
  lid.classList.remove("pan-lid--closed");
});
