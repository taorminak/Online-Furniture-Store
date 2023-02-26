window.onload=function(){
l=document.querySelector(".furniture__body");
    if(l){const e=document.querySelector(".furniture__items"),
    t=document.querySelectorAll(".furniture__column"),n=l.dataset.speed;let i=0,s=0;
    function o(){let r=0;t.forEach(e=>{r+=e.offsetWidth});const a=r-l.offsetWidth,c=Math.floor(s-i);i+=c*n;let d=a/200*i;
    e.style.cssText=`transform: translate3d(${-d}px,0,0);`,Math.abs(c)>0?requestAnimationFrame(o):l.classList.remove("_init")}
    l.addEventListener("mousemove",
    (function(e){const t=l.offsetWidth,n=e.pageX-t/2;s=n/t*350,
    l.classList.contains("_init")||(requestAnimationFrame(o),l.classList.add("_init"))}))}
    };
