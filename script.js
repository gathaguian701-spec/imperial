// Navigation logic
const buttons = document.querySelectorAll('.nav-btn');
const pages = document.querySelectorAll('.page');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active state from all buttons
    buttons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Hide all pages
    pages.forEach(page => page.classList.remove('active'));
    // Show selected page
    const pageId = btn.getAttribute('data-page');
    document.getElementById(pageId).classList.add('active');
  });
});

// Prayer posting logic
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
    document.querySelector('.nav-btn[data-page="home"]').click();
  }, 3000);
});
