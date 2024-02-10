import {enc,dec} from "https://suisenseinostudio.github.io/deriveKey/ed.js";
import {deriveKey} from "https://suisenseinostudio.github.io/deriveKey/derive-key.js";

const pass = document.getElementById("pass");
const plain = document.getElementById("plain");
const output = document.getElementById("output");

const encrypt=async()=>{
  if(pass.value==""||plain.files.length==0)return;
  const file=plain.files[0];
  const iv=window.crypto.getRandomValues(new Uint8Array(12));
  const algo={name:"AES-GCM",iv};
  const key=await deriveKey(pass.value);
  const data=await (new Blob([iv,file])).arrayBuffer();
  console.log(`enc(${JSON.stringify(algo)},key(${pass}),${new Uint8Array(data)})`);
  const ab=await window.crypto.subtle.encrypt(algo,key,data);
  console.log(`result:${new Uint8Array(ab)}`);
  const dlFile=new File([iv,ab],file.name+"-e");
  //const res=await dlFile.arrayBuffer();
  //const ab=res.slice(12,res.byteLength);
  //const iv=new Uint8Array(res,0,12);
  //const algo={name:"AES-GCM",iv};
  //const key=await deriveKey(pass.value);
  console.log(`dec(${JSON.stringify(algo)},key(${pass.value}),${new Uint8Array(ab)})`);
  const rtn=await crypto.subtle.decrypt(algo,key,ab);
  console.log(`result:${new Uint8Array(rtn)}`);
  output.href=window.URL.createObjectURL(dlFile);
  output.textContent="download encrypted file";
};

pass.onchange=encrypt;
plain.onchange=encrypt;
