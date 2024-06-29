document.addEventListener('DOMContentLoaded', () => {
  const coin = document.querySelector('.coin');
  const balanceEl = document.getElementById('balance');
  const progressBarInner = document.querySelector('.progress-bar-inner');
  const levelEl = document.getElementById('level');
  let balance = 0;
  let level = 1;
  let progress = 0;

  coin.addEventListener('click', () => {
    balance += 1;
    progress += 10;
    if (progress >= 100) {
      progress = 0;
      level += 1;
    }

    balanceEl.textContent = `Баланс: ${balance}`;
    progressBarInner.style.width = `${progress}%`;
    levelEl.textContent = `Уровень: ${level}`;

    // Анимация клика
    const clickAnimation = document.createElement('div');
    clickAnimation.classList.add('click-animation');
    clickAnimation.textContent = '+1';
    clickAnimation.style.left = `${event.clientX}px`;
    clickAnimation.style.top = `${event.clientY}px`;
    document.body.appendChild(clickAnimation);

    setTimeout(() => {
      clickAnimation.remove();
    }, 500);
  });
});
