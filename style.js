const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function firstPageAnim(){
    let tl = gsap.timeline();

    tl.from("#nav a, #nav h3",{
        y:-10,
        opacity:0,
        duration:1.5,
        ease:Expo.easeInOut,
        
    }).to(".boundingElem",{
        y:0,
        ease:Expo.easeInOut,
        duration:2,
        stagger:0.2,
        delay:-1,
    }).from("#hero-footer",{
        y:-10,
        opacity:0,
        duration:1.2,
        ease:Expo.easeInOut,
        delay:-1,


    })
}

var timeout;
function skewCircleAnimation(){
    let defaultXscale = 1;
    let defaultYscale = 1;

    let xPrev = 0;
    let yPrev = 0;

    window.addEventListener("mousemove",(dets)=>{
        clearTimeout(timeout);
        /**
         * gsap.utils.clamp(range1,range2,value)
         * clamp method to limit the values of xscale and yscale between 0.8 and 1.2.
         */
        let xscale = gsap.utils.clamp(0.8,1.2,dets.clientX - xPrev);
        let yscale = gsap.utils.clamp(0.8,1.2,dets.clientY - yPrev);
        
        xPrev = dets.clientX;
        yPrev = dets.clientY;

        circleMouseFollower(xscale,yscale);

        timeout = setTimeout(()=>{
            document.querySelector("#mini-circle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${defaultXscale},${defaultYscale})`
        },100)
        
    })
}
function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove",(details)=>{
        // console.log("x=",details.clientX,"y=",details.clientY);
        document.querySelector("#mini-circle").style.transform = `translate(${details.clientX}px,${details.clientY}px) scale(${xscale},${yscale})`
    })
}


let diffRot = 0;
let rotate = 0;

document.querySelectorAll(".element")
.forEach((elem)=>{
    elem.addEventListener("mouseleave",(dets)=>{
        gsap.to(elem.querySelector("img"),{
            opacity:0,
            ease:Power3,
        })
        gsap.to(elem.querySelector("h1"),{
            x:-20,
        })
        gsap.to(document.querySelector("#mini-circle"),{
            height:"12px",
            width:"12px",
        })
        let miniCircle = document.querySelector("#mini-circle");
        miniCircle.innerHTML = "";
    })
    elem.addEventListener("mousemove",(dets)=>{
        var diff =(dets.clientY - elem.getBoundingClientRect().top);
        diffRot = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"),{
            opacity:1,
            ease:Power3,
            top:diff,
            left:dets.clientX,
            rotate:gsap.utils.clamp(-20,20,diffRot*0.5),
        })
        gsap.to(elem.querySelector("h1"),{
            x:20,
        })
        gsap.to(document.querySelector("#mini-circle"),{
            height:"45px",
            width:"45px",
        })
        let miniCircle = document.querySelector("#mini-circle");
        miniCircle.innerHTML = "view";
        miniCircle.style.display = "flex";
        miniCircle.style.alignItems = "center";
        miniCircle.style.justifyContent = "center";

    })
})

firstPageAnim();
skewCircleAnimation();