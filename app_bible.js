// app_bible.js
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { auth } from './firebase.js';

onAuthStateChanged(auth, user => {
  if(!user) { window.location.href='index.html'; return; }
  document.getElementById('topbar').classList.remove('hidden');
  document.getElementById('bibleApp').classList.remove('hidden');
  initBible();
});

async function initBible(){
  let data = {};
  try{
    const r = await fetch('/public/books.json');
    if(r.ok) data = await r.json();
    else {
      // fallback sample
      data = { "Genesis":[{"verse":"1","text":"In the beginning God created the heaven and the earth."}] };
    }
  }catch(e){ data = { "Genesis":[{"verse":"1","text":"In the beginning God created the heaven and the earth."}] }; }

  const bookSel = document.getElementById('bookSelect');
  bookSel.innerHTML = '';
  Object.keys(data).forEach(b => bookSel.appendChild(new Option(b,b)));
  bookSel.onchange = ()=> renderBible(bookSel.value, data);
  renderBible(Object.keys(data)[0], data);

  document.getElementById('bibleSearch').addEventListener('input', (e)=> {
    const q = e.target.value.trim().toLowerCase();
    if(!q) return renderBible(bookSel.value, data);
    const cont = document.getElementById('versesContainer'); cont.innerHTML='';
    for(const b in data){
      data[b].forEach(v => { if(v.text.toLowerCase().includes(q)) cont.appendChild(Object.assign(document.createElement('div'), { innerHTML:`<strong>${b} ${v.verse}</strong> — ${v.text}` })); });
    }
  });
}

function renderBible(book, data){
  const cont = document.getElementById('versesContainer'); cont.innerHTML='';
  (data[book] || []).forEach(v => cont.appendChild(Object.assign(document.createElement('div'), { innerHTML: `<strong>${v.verse}</strong> — ${v.text}` })));
}
