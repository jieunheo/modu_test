(() => {
  const hrs = document.getElementById("hrs");
  const min = document.getElementById("min");
  const sec = document.getElementById("sec");

  const btnStart = document.getElementById("btn-start");
  const btnStop = document.getElementById("btn-stop");
  const btnReset = document.getElementById("btn-reset");

  let isRunning = false;
  let timer = null;
  let time = 0;

  hrs.addEventListener("click", (e) => {
    if (isRunning) return;
    setTime(3600);
  });
  min.addEventListener("click", (e) => {
    if (isRunning) return;
    setTime(60);
  });
  sec.addEventListener("click", (e) => {
    if (isRunning) return;
    setTime(10);
  });

  function setTime(num) {
    btnStart.disabled = false;
    btnReset.disabled = false;

    if (num) {
      time += num; // 1시간
    }

    let h = Math.floor(time / 3600);
    let m = Math.floor((time - h * 3600) / 60);
    let s = Math.floor(time - h * 3600 - m * 60);
    console.log(h, m, s);

    hrs.innerText = h < 10 ? `0${h}` : h;
    min.innerText = m < 10 ? `0${m}` : m;
    sec.innerText = s < 10 ? `0${s}` : s;

    if (time === 0 && num === -1) endTimer();
  }

  btnStart.addEventListener("click", () => {
    if (time === 0) return;

    isRunning = true;

    btnStart.style.display = "none";
    btnStop.style.display = "flex";

    timer = setInterval(() => {
      setTime(-1);
    }, 1000);
  });

  btnStop.addEventListener("click", () => {
    btnStop.style.display = "none";
    btnStart.style.display = "flex";

    clearInterval(timer);
    isRunning = false;
  });

  btnReset.addEventListener("click", () => {
    time = 0;
    clearInterval(timer);

    setTime();
    resetBtn();
  });

  function endTimer() {
    clearInterval(timer);
    resetBtn();

    alert("Finish");
  }

  function resetBtn() {
    btnStop.style.display = "none";
    btnStart.style.display = "flex";
    btnStart.disabled = true;
    btnReset.disabled = true;

    isRunning = false;
  }
})();
