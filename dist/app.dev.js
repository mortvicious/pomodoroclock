"use strict";

;

(function () {
  var mainBtns = document.querySelectorAll(".main-button");
  var secondaryBtns = document.querySelectorAll(".sec-btn");
  var workDisplay = document.querySelector(".set-work-time-display");
  var breakDisplay = document.querySelector(".set-break-time-display");
  var display = document.querySelector(".display");
  var workTime = 1500;
  var breakTime = 300;
  var min;
  var tillBreak = 25;
  var tillWork = 5;
  var breakTimeout;
  var workTimeout;
  var countdown;

  (function () {
    mainBtns.forEach(function (button) {
      button.addEventListener("click", function () {
        if (button.classList.contains("start")) {
          workD();
        } else {
          stop();
          display.innerHTML = "00 : 00";
        }
      });
    });
  })();

  function breakD() {
    timer(breakTime);
    workTimeout = setInterval(function () {
      if (tillWork > 0) {
        tillWork--;

        if (tillWork === 0) {
          workD();
          tillWork = 5;
          clearInterval(workTimeout);
        }
      }
    }, 60000);
  }

  function workD() {
    timer(workTime);
    breakTimeout = setInterval(function () {
      if (tillBreak > 0) {
        tillBreak--;

        if (tillBreak === 0) {
          breakD();
          tillBreak = 25;
          clearInterval(breakTimeout);
        }
      }
    }, 60000);
  }

  function stop() {
    clearInterval(countdown);
    clearInterval(breakTimeout);
    clearInterval(workTimeout);
    display.innerHTML = "00 : 00";
  }

  ;

  (function () {
    secondaryBtns.forEach(function (button) {
      button.addEventListener("click", function () {
        if (button.classList.contains("work")) {
          if (button.classList.contains("up")) {
            if (workTime < 3600) {
              controller("work", "+");
            }
          } else {
            if (workTime > 1500) {
              controller("work", "-");
            }
          }
        }

        if (button.classList.contains("break")) {
          if (button.classList.contains("up")) {
            if (breakTime < 1500) {
              controller("break", "+");
            }
          } else {
            if (breakTime > 300) {
              controller("break", "-");
            }
          }
        }
      });
    });
  })();

  function timer(seconds) {
    var now = Date.now();
    var then = now + seconds * 1000;
    displayTimeLeft(seconds);
    countdown = setInterval(function () {
      var secondsLeft = Math.round((then - Date.now()) / 1000);

      if (secondsLeft <= 0) {
        clearInterval(countdown);
        return;
      }

      displayTimeLeft(secondsLeft);
    }, 1000);
  }

  function displayTimeLeft(seconds) {
    var minutes = Math.floor(seconds / 60);
    var remainderSeconds = seconds % 60;
    setDisplay(minutes, remainderSeconds);
  }

  function setDisplay(minutes, remainderSeconds) {
    display.innerHTML = "".concat(minutes, " :").concat(remainderSeconds < 10 ? ' 0' : ' ').concat(remainderSeconds);
  }

  function increaseWork() {
    workTime += 300;
    min = Math.floor(workTime / 60);
    sec = workTime % 60;
    workDisplay.innerHTML = "".concat(min, " : 00");
    tillBreak = min;
    tBdef = min;
  }

  function decreaseWork() {
    workTime -= 300;
    min = Math.floor(workTime / 60);
    sec = workTime % 60;
    workDisplay.innerHTML = "".concat(min, " : 00");
    tillBreak = min;
    tBdef = min;
  }

  function increaseBreak() {
    breakTime += 300;
    min = Math.floor(breakTime / 60);
    sec = breakTime % 60;
    breakDisplay.innerHTML = "".concat(min, " : 00");
    tillWork = min;
    tWdef = min;
  }

  function decreaseBreak() {
    breakTime -= 300;
    min = Math.floor(breakTime / 60);
    sec = breakTime % 60;
    breakDisplay.innerHTML = "".concat(min, " : 00");
    tillWork = min;
    tWdef = min;
  }

  function controller(switcher, controller) {
    if (switcher === "work") {
      if (controller === "+") {
        increaseWork();
      } else if (controller === "-") {
        decreaseWork();
      }
    } else if (switcher === "break") {
      if (controller === "+") {
        increaseBreak();
      } else if (controller === "-") {
        decreaseBreak();
      }
    }
  }
})();