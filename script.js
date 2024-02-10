import {enc} from "https://suisenseinostudio.github.io/deriveKey/ed.js";

const pass = document.getElementById("pass");
const plain = document.getElementById("plain");
const output = document.getElementById("output");

const encrypt=async()=>{
  if(pass.value==""||plain.files.length==0)return;
  const file=plain.files[0];
  const ab=await enc(file,pass.value);
  dec(ab,pass.value);
  const dlFile=new File([iv,ab],file.name+"-e");
  output.href=window.URL.createObjectURL(dlFile);
  output.textContent="download encrypted file";
};

pass.onchange=encrypt;
plain.onchange=encrypt;
