import {enc,dec} from "https://suisenseinostudio.github.io/deriveKey/ed.js";

const pass = document.getElementById("pass");
const plain = document.getElementById("plain");
const output = document.getElementById("output");

const encrypt=async()=>{
  if(pass.value==""||plain.files.length==0)return;
  output.textContent="";
  for(const file of plain.files){
    const dlFile=await enc(file,pass.value);
    const li=document.createElement("li");
    li.innerHTML=`<a href="${window.URL.createObjectURL(dlFile)}">${dlFile.name}</a>`;
    output.append(li);
  };
};

pass.onchange=encrypt;
plain.onchange=encrypt;
