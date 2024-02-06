const log = document.getElementById("log");
const pass = document.getElementById("pass");
const plain = document.getElementById("plain");
const output = document.getElementById("output");

const importKey=async()=>{
  log.append("importKey ");
  const data=(new TextEncoder()).encode(pass.value);
  return window.crypto.subtle.importKey("raw",data,"PBKDF2",false,["deriveKey"]);
};

const deriveKey=async()=>{
  log.append("deriveKey ");
  const salt=window.crypto.getRandomValues(new Uint8Array(16));
  const algo={name:"PBKDF2",hash:"SHA-256",salt,iterations:100000};
  const base=await importKey();
  log.append("imported ");
  return window.crypto.subtle.deriveKey(algo,base,{name:"AES-GCM",length:256},false,["encrypt"]);
};

const encrypt=async()=>{
  if(!(pass.value&&plain.files))return;
  log.append("encrypt ");
  const iv=window.crypto.getRandomValues(new Uint8Array(12));
  const algo={name:"AES-GCM",iv};
  const key=await deriveKey();
  log.append("derived ");
  const file=plain.files[0];
  const data=file.arrayBuffer();
  log.append("window.crypto.subtle.encrypt ");
  window.crypto.subtle.encrypt(algo,key,data).then(ab=>{
    log.append("encrypted ");
    output.href=window.URL.createObjectURL(new File([iv,ab],file.name+"-e"));
    output.textContent="download encrypted file";
    log.append("done ");
  });
};

pass.onchange=encrypt;
plain.onchange=encrypt;
