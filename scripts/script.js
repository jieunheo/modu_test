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
  isRunning = true;
  setTime(3600);
});
min.addEventListener("click", (e) => {
  isRunning = true;
  setTime(60);
});
sec.addEventListener("click", (e) => {
  isRunning = true;
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
  console.log(time);
  if (time === 0) return;

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
});

btnReset.addEventListener("click", () => {
  time = 0;
  clearInterval(timer);

  setTime();

  btnStop.style.display = "none";
  btnStart.style.display = "flex";
  btnStart.disabled = true;
  btnReset.disabled = true;
});

function endTimer() {
  alert("Finish");
  clearInterval(timer);

  btnStop.style.display = "none";
  btnStart.style.display = "flex";
  btnStart.disabled = true;
  btnReset.disabled = true;
}
