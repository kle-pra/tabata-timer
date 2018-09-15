import "./style.css";

const counter = document.getElementById('counter');
const phase = document.getElementById('phase');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progress-bar');
let tabataTimerValue = 21;
let restTimerValue = 11;
let tabataOn = false;
let stage = 1;
let pause = false;

document.querySelector('.container')
  .addEventListener('click', toggleStartPause);

function initNewTabata() {
  notification('Go', `Round ${stage}. Go.`);
  progress.style.visibility = 'block';
  setInterval(() => {
    round();
    rest();
  }, 1000);
};


function toggleStartPause() {

  if (stage == 1 && !tabataOn) {
    tabataOn = true;
    initNewTabata();
  } else {
    pause = !pause;
    counter.innerHTML = "";
    if (pause) {
      notification('Pause. Press anywhere to continue.', 'Pausing tabata.');
    } else {
      notification('', 'Resuming tabata.');
    }
  }

}

function round() {
  if (tabataOn && !isTabataFinished() && !pause) {
    phase.innerHTML = 'Round ' + stage;
    if (tabataTimerValue > 0) {
      tabataTimerValue -= 1;
    }
    counter.innerHTML = tabataTimerValue;
    progressBar.style.width = `${Math.round(100 / 8) * stage}%`;
    progressBar.innerHTML = stage;
    if ([5, 4, 3, 2, 1].includes(tabataTimerValue)) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(tabataTimerValue));
    }
    if (tabataTimerValue === 0) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance('rest!'));
      restTimerValue = 10;
      tabataOn = false;
      counter.innerHTML = restTimerValue;

    }
  }
}

function rest() {
  if (!tabataOn && !pause && !isTabataFinished()) {
    phase.innerHTML = `Rest`;
    if (restTimerValue > 0) {
      restTimerValue -= 1;
    }
    counter.innerHTML = restTimerValue;
    if ([3, 2, 1].includes(restTimerValue)) {
      window.speechSynthesis.speak(new SpeechSynthesisUtterance(restTimerValue));
    }
    if (restTimerValue === 0) {
      tabataTimerValue = 20;
      stage += 1;
      phase.innerHTML = 'Round ' + stage;
      tabataOn = true;
      notification('', `Round ${stage}. Go.`);

    }
  }
}

function isTabataFinished() {
  return stage > 8;
}

function notification(text, voice) {
  phase.innerHTML = text;
  window.speechSynthesis.speak(new SpeechSynthesisUtterance(voice));
}
