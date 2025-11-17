// auth.js
import { auth, db, storage } from './firebase.js';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { setDoc, doc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { ref as sRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const intro = document.getElementById('intro');
const authMain = document.getElementById('authMain');
const btnSignIn = document.getElementById('btnSignIn');
const btnGoogle = document.getElementById('btnGoogle');
const btnOpenRegister = document.getElementById('btnOpenRegister');
const registerModal = document.getElementById('registerModal');
const btnCancelRegister = document.getElementById('btnCancelRegister');
const btnCreateAccount = document.getElementById('btnCreateAccount');
const signinMsg = document.getElementById('signinMsg');
const regMsg = document.getElementById('regMsg');

// show intro then auth
document.addEventListener('DOMContentLoaded', ()=>{
  setTimeout(()=>{ intro.style.display='none'; authMain.classList.remove('hidden'); }, 5200);
});

// Sign in email
btnSignIn.addEventListener('click', async ()=>{
  const email = document.getElementById('email').value.trim();
  const pw = document.getElementById('password').value;
  if(!email || !pw){ signinMsg.innerText = 'Enter email and password'; return; }
  signinMsg.innerText = 'Signing in...';
  try{
    await signInWithEmailAndPassword(auth, email, pw);
    // redirect handled by onAuthStateChanged
  }catch(err){ signinMsg.innerText = err.message; console.error(err); }
});

// Google
btnGoogle.addEventListener('click', async ()=>{
  const provider = new GoogleAuthProvider();
  try{ await signInWithPopup(auth, provider); }catch(err){ signinMsg.innerText = err.message; console.error(err); }
});

// Registration modal
btnOpenRegister.addEventListener('click', ()=> { registerModal.classList.remove('hidden'); });
btnCancelRegister.addEventListener('click', ()=> { registerModal.classList.add('hidden'); });

// Create account
btnCreateAccount.addEventListener('click', async ()=>{
  const fullName = document.getElementById('regFullName').value.trim();
  const username = document.getElementById('regUsername').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const church = document.getElementById('regChurch').value.trim();
  const district = document.getElementById('regDistrict').value.trim();
  const p1 = document.getElementById('regPassword').value;
  const p2 = document.getElementById('regPassword2').value;
  if(!fullName||!username||!email||!phone||!p1){ regMsg.innerText = 'Please complete required fields'; return; }
  if(p1 !== p2){ regMsg.innerText = 'Passwords mismatch'; return; }
  regMsg.innerText = 'Creating account...';
  try{
    const cred = await createUserWithEmailAndPassword(auth, email, p1);
    const uid = cred.user.uid;
    let photoURL = '';
    const file = document.getElementById('regPhoto').files[0];
    if(file){
      const ref = sRef(storage, `profiles/${uid}/${file.name}`);
      await uploadBytes(ref, file);
      photoURL = await getDownloadURL(ref);
    }
    await setDoc(doc(db,'users',uid), { fullName, username, email, phone, church, district, photoURL, createdAt:serverTimestamp(), lastSeen:serverTimestamp(), online:true });
    regMsg.innerText = 'Account created. Redirecting...';
  }catch(err){ regMsg.innerText = err.message; console.error(err); }
});

// Auth state observer -> redirect to home
onAuthStateChanged(auth, user => {
  if(user){
    // Go to home
    window.location.href = 'home.html';
  } else {
    // stay on login
  }
});
