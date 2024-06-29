// JavaScript код для Coin
let balance = 0;
let level = 1;
let pointsToNextLevel = 1000;
let developers = 0;
let telegramId = null;
let userId = null;

function vibrateOnClick() {
  if ("vibrate" in navigator) {
    window.navigator.vibrate(100);
  }
}

function incrementScore(x, y) {
  balance++;
  document.getElementById('balance').textContent = balance;
  showClickAnimation(x, y);
  checkLevelUp();
  updateProgressBar();
}

function showClickAnimation(x, y) {
  const clickText = document.createElement('div');
  clickText.textContent = '+1';
  clickText.className = 'click-animation';
  clickText.style.left = `${x - 18}px`;
  clickText.style.top = `${y - 50}px`;
  document.body.appendChild(clickText);
  setTimeout(() => {
    clickText.remove();
  }, 500);
}

function checkLevelUp() {
  if (developers >= pointsToNextLevel) {
    level++;
    pointsToNextLevel = Math.floor(pointsToNextLevel * 1.5);
    document.getElementById('level').textContent = 'Уровень: ' + level;
    updateProgressBar(true);
  }
}

function updateProgressBar(reset = false) {
  const progress = reset ? 0 : Math.min((developers / pointsToNextLevel) * 100, 100);
  document.getElementById('progress').style.width = progress + '%';
}

function handleTouchStart(event) {
  event.preventDefault();
  const coin = document.getElementById('coin');
  const rect = coin.getBoundingClientRect();
  const touches = event.touches;
  if (touches.length <= 2) {
    for (let i = 0; i < touches.length; i++) {
      const touch = touches[i];
      if (touch.clientX >= rect.left && touch.clientX <= rect.right && touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        coin.classList.add('active');
      }
    }
  }
}

function handleTouchEnd(event) {
  event.preventDefault();
  const coin = document.getElementById('coin');
  const rect = coin.getBoundingClientRect();
  const changedTouches = event.changedTouches;
  if (changedTouches.length <= 2) {
    for (let i = 0; i < changedTouches.length; i++) {
      const touch = changedTouches[i];
      if (touch.clientX >= rect.left && touch.clientX <= rect.right && touch.clientY >= rect.top && touch.clientY <= rect.bottom) {
        incrementScore(touch.clientX, touch.clientY);
        vibrateOnClick();
      }
    }
    coin.classList.remove('active');
  }
}

document.getElementById('coin').addEventListener('touchstart', handleTouchStart);
document.getElementById('coin').addEventListener('touchend', handleTouchEnd);

window.addEventListener('load', () => {
  fetchInitialData();
  fetchPlayerRanking();
});