const pass = document.getElementById("pass");
const plain = document.getElementById("plain");
const output = document.getElementById("output");

const deriveKey=()=>{
}

const encrypt=()=>{
  const iv=window.crypto.getRandomValues(new Uint8Array(12));
  const algo={name:"AES-GCM",iv};
  const key=deriveKey();
  const file=plain.files[0];
  const data=file.arrayBuffer();
  window.crypto.subtle.encrypt(algo,key,data).then(ab=>{
    output.href=window.URL.createObjectURL(new File([iv,ab],file.name+"-e"));
  });
}

pass.onchange=encrypt;
plain.onchange=encrypt;
