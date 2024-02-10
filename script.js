import {enc,dec} from "https://suisenseinostudio.github.io/deriveKey/ed.js";

const pass = document.getElementById("pass");
const plain = document.getElementById("plain");
const output = document.getElementById("output");

const encrypt=async()=>{
  if(pass.value==""||plain.files.length==0)return;
  const file=plain.files[0];
  const dlFile=await enc(file,pass.value);
  output.href=window.URL.createObjectURL(dlFile);
  output.textContent="download encrypted file";
};

pass.onchange=encrypt;
plain.onchange=encrypt;
