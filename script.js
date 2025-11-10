// Page navigation with active button animation
function showPage(pageId, btn) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');

  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// Prayer request logic (anonymous)
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

// Splash screen delay
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('splash-screen').style.display = 'none';
    showPage('home', document.querySelector('.nav-btn'));
  }, 3000);
});
