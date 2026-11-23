const info = window.CARD_INFO || {};
const setText = (id, value) => { const el=document.getElementById(id); if(value) el.textContent=value; };
setText("name", info.name || "Mohamed Momo");
setText("subtitle", info.subtitle || "مرحبا بك، يسعدني التواصل معك");
function showLink(id, href, label) {
  const el=document.getElementById(id);
  if(!href) return;
  el.href=href; el.hidden=false;
  if(label) el.setAttribute("aria-label",label);
}
const phone=(info.phone||"").replace(/[^\d+]/g,"");
const wa=(info.whatsapp||"").replace(/[^\d]/g,"");
showLink("call", phone ? `tel:${phone}` : "", "اتصال هاتفي");
showLink("whatsapp", wa ? `https://wa.me/${wa}` : "", "WhatsApp");
showLink("instagram", info.instagram, "Instagram");
showLink("facebook", info.facebook, "Facebook");
showLink("location", info.location, "موقعي");
if(phone){
  const save=document.getElementById("save-contact");
  save.hidden=false;
  save.href="#";
  save.addEventListener("click",e=>{
    e.preventDefault();
    const vcard=[
      "BEGIN:VCARD","VERSION:3.0",
      `FN:${(info.name||"Mohamed Momo").replace(/[,;]/g," ")}`,
      `TEL;TYPE=CELL:${phone}`,
      "END:VCARD"
    ].join("\r\n");
    const blob=new Blob([vcard],{type:"text/vcard;charset=utf-8"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a"); a.href=url; a.download="Mohamed-Momo.vcf"; a.click();
    URL.revokeObjectURL(url);
  });
}
