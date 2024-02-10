const pass = document.getElementById("pass");
const plain = document.getElementById("plain");
const output = document.getElementById("output");

const importKey=async()=>{
  const data=(new TextEncoder()).encode(pass.value);
  return window.crypto.subtle.importKey("raw",data,"PBKDF2",false,["deriveKey"]);
};

const deriveKey=async()=>{
  const salt=window.crypto.getRandomValues(new Uint8Array(16));
  const algo={name:"PBKDF2",hash:"SHA-256",salt,iterations:100000};
  const base=await importKey();
  return window.crypto.subtle.deriveKey(algo,base,{name:"AES-GCM",length:256},false,["encrypt"]);
};

const encrypt=async()=>{
  if(pass.value==""||plain.files.length==0)return;
  const iv=window.crypto.getRandomValues(new Uint8Array(12));
  console.log(`iv:${iv}`);
  const algo={name:"AES-GCM",iv};
  const key=await deriveKey();
  const file=plain.files[0];
  const data=await (new Blob([iv,file])).arrayBuffer();
  const ab=await window.crypto.subtle.encrypt(algo,key,data);
  const dlFile=new File([iv,ab],file.name+"-e");
  console.log(new Uint8Array(await dlFile.arrayBuffer(),0,12));
  output.href=window.URL.createObjectURL(dlFile);
  console.log();
  output.textContent="download encrypted file";
};

pass.onchange=encrypt;
plain.onchange=encrypt;
