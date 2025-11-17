// app_home.js
import { auth, db, storage } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const topbar = document.getElementById('topbar');
const app = document.getElementById('app');
const feed = document.getElementById('feed');
const btnCreatePost = document.getElementById('btnCreatePost');
const postText = document.getElementById('postText');
const postImage = document.getElementById('postImage');
const btnSignOut = document.getElementById('btnSignOut');

onAuthStateChanged(auth, user => {
  if(!user) { window.location.href = 'index.html'; return; }
  topbar.classList.remove('hidden'); app.classList.remove('hidden');
  subscribePosts();
});

btnSignOut && btnSignOut.addEventListener('click', async (e)=>{ e.preventDefault(); await signOut(auth); window.location.href='index.html'; });

btnCreatePost && btnCreatePost.addEventListener('click', async ()=>{
  const text = postText.value.trim();
  const file = postImage.files[0];
  if(!text && !file) return alert('Write something or attach an image');
  let mediaURL = '';
  if(file){
    const path = `posts/${auth.currentUser.uid}/${Date.now()}_${file.name}`;
    const ref = sRef(storage, path);
    await uploadBytes(ref, file);
    mediaURL = await getDownloadURL(ref);
  }
  await addDoc(collection(db,'posts'), { authorId: auth.currentUser.uid, text, mediaURL, createdAt:serverTimestamp() });
  postText.value=''; postImage.value='';
});

function subscribePosts(){
  const q = query(collection(db,'posts'), orderBy('createdAt','desc'));
  onSnapshot(q, snap => {
    feed.innerHTML = '';
    snap.forEach(s => {
      const p = s.data();
      const card = document.createElement('div');
      card.className='post';
      const html = `<div style="display:flex;gap:10px"><div class="avatar">${(p.authorId||'U').slice(0,1)}</div><div><div style="font-weight:800">${p.text||''}</div><div class="muted small">${p.createdAt ? new Date(p.createdAt.seconds*1000).toLocaleString() : ''}</div></div></div>`;
      card.innerHTML = html;
      if(p.mediaURL){ const img = document.createElement('img'); img.src=p.mediaURL; img.style.maxWidth='100%'; img.style.marginTop='8px'; card.appendChild(img); }
      feed.appendChild(card);
    });
  });
}
