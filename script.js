const pass = document.getElementById("pass");
const plain = document.getElementById("plain");
const output = document.getElementById("output");

const importKey=()=>{
  const data=(new TextEncoder()).encode(pass.value);
  return window.crypto.subtle.importKey("raw",data,"PBKDF2",false,["deriveKey"]);
}

const deriveKey=()=>{
  const salt=window.crypto.getRandomValues(new Uint8Array(16));
  const algo={name:"PBKDF2",hash:"SHA-256",salt,iterations:100000};
  const base=importKey();
  return window.crypto.subtle.deriveKey(algo,base,{name:"AES-GCM",length:256},false,["encrypt"]);
}

const encrypt=()=>{
  const iv=window.crypto.getRandomValues(new Uint8Array(12));
  const algo={name:"AES-GCM",iv};
  const key=deriveKey();
  const file=plain.files[0];
  const data=file.arrayBuffer();
  window.crypto.subtle.encrypt(algo,key,data).then(ab=>{
    output.href=window.URL.createObjectURL(new File([iv,ab],file.name+"-e"));
    output.textContent="download encrypted file";
  });
}

pass.onchange=encrypt;
plain.onchange=encrypt;
