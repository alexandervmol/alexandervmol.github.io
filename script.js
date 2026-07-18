gsap.registerPlugin(ScrollTrigger);

// =====================================================
// LENIS
// =====================================================

const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2
});

function raf(time){
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// =====================================================
// HEADER
// =====================================================

const header = document.querySelector(".site-header");

let lastScroll = 0;

window.addEventListener("scroll",()=>{

    const current = window.pageYOffset;

    if(current > lastScroll && current > 120){

        header.style.transform="translateY(-100%)";

    }else{

        header.style.transform="translateY(0)";

    }

    lastScroll=current;

});

// =====================================================
// HERO
// =====================================================

gsap.from(".hero-label",{

    opacity:0,

    y:20,

    duration:1,

    delay:.2

});

gsap.from(".hero h1",{

    opacity:0,

    y:40,

    duration:1.4,

    delay:.4

});

gsap.from(".hero-description",{

    opacity:0,

    y:30,

    duration:1.2,

    delay:.8

});

// =====================================================
// WORKS
// =====================================================

gsap.utils.toArray(".art-piece").forEach(item=>{

    gsap.to(item,{

        opacity:1,

        y:0,

        duration:1,

        ease:"power2.out",

        scrollTrigger:{

            trigger:item,

            start:"top 90%"

        }

    });

});

// =====================================================
// LIGHTBOX
// =====================================================

const lightbox=document.querySelector("#lightbox");

const lightboxImg=document.querySelector("#lightbox-img");

const lightboxTitle=document.querySelector("#lightbox-title");

const lightboxDescription=document.querySelector("#lightbox-description");

const pieces=document.querySelectorAll(".art-piece");

let currentIndex=0;

pieces.forEach((piece,index)=>{

    piece.addEventListener("click",()=>{

        currentIndex=index;

        openLightbox();

    });

});

function openLightbox(){

    const piece=pieces[currentIndex];

    const img=piece.querySelector("img");

    lightboxImg.src=img.src;

    lightboxTitle.textContent=img.alt;

    lightboxDescription.innerHTML=piece.dataset.desc || "";

    lightbox.classList.add("active");

}

function closeLightbox(){

    lightbox.classList.remove("active");

}

document.querySelector(".close-btn").onclick=closeLightbox;

document.querySelector(".next").onclick=()=>{

    currentIndex++;

    if(currentIndex>=pieces.length){

        currentIndex=0;

    }

    openLightbox();

};

document.querySelector(".prev").onclick=()=>{

    currentIndex--;

    if(currentIndex<0){

        currentIndex=pieces.length-1;

    }

    openLightbox();

};

document.addEventListener("keydown",e=>{

    if(!lightbox.classList.contains("active")) return;

    if(e.key==="Escape"){

        closeLightbox();

    }

    if(e.key==="ArrowRight"){

        document.querySelector(".next").click();

    }

    if(e.key==="ArrowLeft"){

        document.querySelector(".prev").click();

    }

});

lightbox.addEventListener("click",e=>{

    if(e.target===lightbox){

        closeLightbox();

    }

});

gsap.utils.toArray(".art-piece img").forEach(image=>{

    gsap.from(image,{

        scale:1.08,

        duration:1.6,

        ease:"power2.out",

        scrollTrigger:{

            trigger:image,

            start:"top 90%"

        }

    });

});

