impore {deriveKey} from "https://raw.githubusercontent.com/suisenseinostudio/deriveKey/main/derive-key.js";

const pass = document.getElementById("pass");
const plain = document.getElementById("plain");
const output = document.getElementById("output");

const encrypt=async()=>{
  if(pass.value==""||plain.files.length==0)return;
  const iv=window.crypto.getRandomValues(new Uint8Array(12));
  const algo={name:"AES-GCM",iv};
  const key=await deriveKey(pass.value);
  const file=plain.files[0];
  const data=await (new Blob([iv,file])).arrayBuffer();
  console.log(`enc(${algo},key(${pass.value}),${data})`);
  const ab=await window.crypto.subtle.encrypt(algo,key,data);
  console.log(`result:${new Uint8Array(ab)}`);
  const dlFile=new File([iv,ab],file.name+"-e");
  output.href=window.URL.createObjectURL(dlFile);
  output.textContent="download encrypted file";
};

pass.onchange=encrypt;
plain.onchange=encrypt;
