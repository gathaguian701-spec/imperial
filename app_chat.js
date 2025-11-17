// app_chat.js
import { auth, db, storage } from './firebase.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const topbar = document.querySelector('#topbar');
const appChat = document.getElementById('appChat');
const convoList = document.getElementById('convoList');
const messagesWindow = document.getElementById('messagesWindow');
const messageInput = document.getElementById('messageInput');
const sendMsgBtn = document.getElementById('sendMsgBtn');
const attachBtn = document.getElementById('attachBtn');
const fileUpload = document.getElementById('fileUpload');
const btnCreateGroup = document.getElementById('btnCreateGroup');
const typingIndicator = document.getElementById('typingIndicator');

let currentConvo = null;
let msgsUnsub = null;
let typingTimeout = null;

onAuthStateChanged(auth, user => {
  if(!user){ window.location.href='index.html'; return; }
  topbar.classList.remove('hidden'); appChat.classList.remove('hidden');
  subscribeConversations();
});

document.getElementById('btnSignOut2')?.addEventListener('click', async (e)=>{ e.preventDefault(); await signOut(auth); window.location.href='index.html'; });

function subscribeConversations(){
  const q = query(collection(db,'conversations'), where('members','array-contains', auth.currentUser.uid), orderBy('lastUpdated','desc'));
  onSnapshot(q, snap => {
    convoList.innerHTML = '';
    snap.forEach(d => {
      const data = d.data(); const id = d.id;
      const item = document.createElement('div'); item.className='convo-item';
      item.innerHTML = `<div class="avatar">${(data.title||'G').slice(0,1)}</div><div style="flex:1"><div style="font-weight:800">${data.title||'Group'}</div><div class="muted small">${data.lastMessage||''}</div></div>`;
      item.onclick = ()=> openConversation(id, data);
      convoList.appendChild(item);
    });
  });
}

async function openConversation(id, data){
  currentConvo = { id, ...data };
  if(msgsUnsub) msgsUnsub();
  const q = query(collection(db,'conversations',id,'messages'), orderBy('ts'));
  msgsUnsub = onSnapshot(q, snap => {
    messagesWindow.innerHTML='';
    snap.forEach(ms => {
      const m = ms.data();
      const wrapper = document.createElement('div');
      wrapper.className = (m.sender === auth.currentUser.uid) ? 'text-right' : 'text-left';
      const inner = document.createElement('div');
      inner.className = 'bubble';
      inner.style.display='inline-block';
      inner.style.padding='8px';
      inner.style.borderRadius='8px';
      inner.style.background = (m.sender === auth.currentUser.uid) ? 'linear-gradient(90deg,#00b4ff,#66d8ff)' : 'rgba(255,255,255,0.03)';
      inner.innerText = m.text || (m.mediaURL ? '[media]' : '');
      wrapper.appendChild(inner);
      if(m.mediaURL){ const a = document.createElement('a'); a.href = m.mediaURL; a.target='_blank'; a.innerText=' [open]'; wrapper.appendChild(a); }
      messagesWindow.appendChild(wrapper);
    });
    messagesWindow.scrollTop = messagesWindow.scrollHeight;
  });
}

attachBtn.addEventListener('click', ()=> fileUpload.click());

sendMsgBtn.addEventListener('click', async ()=>{
  if(!currentConvo) return alert('Select or create a conversation first');
  const txt = messageInput.value.trim();
  const file = fileUpload.files[0];
  if(file){
    const path = `media/${currentConvo.id}/${Date.now()}_${file.name}`;
    const ref = sRef(storage, path);
    await uploadBytes(ref, file);
    const url = await getDownloadURL(ref);
    await addDoc(collection(db,'conversations',currentConvo.id,'messages'), { sender: auth.currentUser.uid, mediaURL: url, type: file.type.startsWith('image') ? 'image' : 'file', ts: serverTimestamp(), seenBy:[] });
    await updateDoc(doc(db,'conversations',currentConvo.id), { lastMessage:'[media]', lastUpdated: serverTimestamp() });
    fileUpload.value='';
  }
  if(txt){
    await addDoc(collection(db,'conversations',currentConvo.id,'messages'), { sender: auth.currentUser.uid, text: txt, type:'text', ts: serverTimestamp(), seenBy:[] });
    await updateDoc(doc(db,'conversations',currentConvo.id), { lastMessage: txt, lastUpdated: serverTimestamp() });
    messageInput.value='';
  }
});

btnCreateGroup.addEventListener('click', async ()=>{
  const title = prompt('Group name');
  if(!title) return;
  // create with the creator as only member initially; they can add others later with UID invites
  const cRef = await addDoc(collection(db,'conversations'), { title, members: [auth.currentUser.uid], createdAt: serverTimestamp(), createdBy: auth.currentUser.uid, lastUpdated: serverTimestamp(), lastMessage: '' });
  openConversation(cRef.id, { title, members: [auth.currentUser.uid] });
});
