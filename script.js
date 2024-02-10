import {enc,dec} from "https://suisenseinostudio.github.io/deriveKey/ed.js";

const pass = document.getElementById("pass");
const plain = document.getElementById("plain");
const output = document.getElementById("output");

const encrypt=async()=>{
  if(pass.value==""||plain.files.length==0)return;
  const file=plain.files[0];
  const dlFile=await enc(file,pass.value);
  const res=await dlFile.arrayBuffer();
  const ab=res.slice(12,res.byteLength);
  const iv=new Uint8Array(res,0,12);
  const algo={name:"AES-GCM",iv};
  const key=await deriveKey(pass.value);
  console.log(`dec(${JSON.stringify(algo)},key(${pass.value}),${new Uint8Array(ab)})`);
  const rtn=await crypto.subtle.decrypt(algo,key,ab);
  console.log(`result:${new Uint8Array(rtn)}`);
  output.href=window.URL.createObjectURL(dlFile);
  output.textContent="download encrypted file";
};

pass.onchange=encrypt;
plain.onchange=encrypt;
