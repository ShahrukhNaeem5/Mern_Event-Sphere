document.addEventListener('DOMContentLoaded', function() {
    const daysElem = document.getElementById('days');
    const hoursElem = document.getElementById('hours');
    const minutesElem = document.getElementById('minutes');
    const secondsElem = document.getElementById('seconds');

    if (!daysElem || !hoursElem || !minutesElem || !secondsElem) {
      console.warn('One or more countdown elements not found.');
      return;
    }

    const targetTime = new Date();
    targetTime.setDate(targetTime.getDate() + 100);

    function updateCountdown() {
      const currentTime = new Date();
      const diff = targetTime - currentTime;

      if (diff <= 0) {
        daysElem.innerHTML = '00';
        hoursElem.innerHTML = '00';
        minutesElem.innerHTML = '00';
        secondsElem.innerHTML = '00';
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((diff % (1000 * 60)) / 1000);

      daysElem.innerHTML = d < 10 ? '0' + d : d;
      hoursElem.innerHTML = h < 10 ? '0' + h : h;
      minutesElem.innerHTML = m < 10 ? '0' + m : m;
      secondsElem.innerHTML = s < 10 ? '0' + s : s;
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  });