(function () {
  var hour = document.querySelector(".hour");
  var minute = document.querySelector(".minute");
  var second = document.querySelector(".second");

  var startBtn = document.querySelector(".start");
  var pauseBtn = document.querySelector(".pause");
  var lapBtn = document.querySelector(".lap");
  var resetBtn = document.querySelector(".reset");

  var lapList = document.querySelector(".lap_list");

  var counterTimer = null;

  function allowTwoDigit(e) {
    e.target.value = e.target.value.slice(0, 2);
  }

  hour.addEventListener("input", allowTwoDigit);
  minute.addEventListener("input", allowTwoDigit);
  second.addEventListener("input", allowTwoDigit);

  startBtn.addEventListener("click", function () {
    if (hour.value == 0 && minute.value == 0 && second.value == 0) return;

    function startinterval() {
      startBtn.style.display = "none";
      pauseBtn.style.display = "initial";
      lapBtn.style.display = "initial";

      counterTimer = setInterval(() => {
        ticking();
      }, 1000);
    }

    startinterval();
  });

  pauseBtn.addEventListener("click", () => {
    stopInterval("pause");
  });

  resetBtn.addEventListener("click", () => {
    stopInterval();
    hour.value = "";
    minute.value = "";
    second.value = "";
    startBtn.innerHTML = "Start";
    lapList.innerHTML = "";
  });

  lapBtn.addEventListener("click", () => {
    var lapItem = document.createElement("li");
    lapItem.innerHTML = `${hour.value ? hour.value : "00"}:${
      minute.value ? minute.value : "00"
    }:${second.value}`;
    lapList.appendChild(lapItem);
  });

  function stopInterval(type) {
    startBtn.style.display = "initial";
    pauseBtn.style.display = "none";
    lapBtn.style.display = "none";
    if (type == "pause") {
      startBtn.innerHTML = "Resume";
    }
    clearInterval(counterTimer);
  }

  function ticking() {
    if (second.value > 60) {
      minute.value++;
      second.value = parseInt(second.value) % 60;
    }

    if (minute.value > 60) {
      hour.value++;
      minute.value = parseInt(second.value) % 60;
    }
    minute.value = minute.value > 60 ? 60 : minute.value;

    if (hour.value == 0 && minute.value == 0 && second.value == 0) {
      hour.value = "";
      minute.value = "";
      second.value = "";
      stopInterval();
    } else if (second.value != 0) {
      second.value = `${second.value <= 10 ? "0" : ""}${second.value - 1}`;
    } else if (minute.value != 0 && second.value == 0) {
      second.value = 59;
      minute.value = `${minute.value <= 10 ? "0" : ""}${minute.value - 1}`;
    } else if (hour.value != 0 && minute.value == 0) {
      minute.value = 60;
      hour.value = `${hour.value <= 10 ? "0" : ""}${hour.value - 1}`;
    }

    return;
  }
})();
