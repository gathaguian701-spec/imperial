// Page navigation
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

// Handle prayer requests
const prayerForm = document.getElementById('prayerForm');
const prayerList = document.getElementById('prayerList');
const prayers = JSON.parse(localStorage.getItem('prayers')) || [];

function renderPrayers() {
  prayerList.innerHTML = '';
  prayers.forEach(p => {
    const div = document.createElement('div');
    div.textContent = p;
    prayerList.appendChild(div);
  });
}

prayerForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = document.getElementById('prayerText').value.trim();
  if (text) {
    prayers.push(text);
    localStorage.setItem('prayers', JSON.stringify(prayers));
    document.getElementById('prayerText').value = '';
    renderPrayers();
  }
});

renderPrayers();

// Splash screen effect
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('splash-screen').style.display = 'none';
    showPage('home');
  }, 3000);
});
