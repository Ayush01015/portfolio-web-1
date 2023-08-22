const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function circleMouseFollower(){
    window.addEventListener("mousemove",(details)=>{
        // console.log("x=",details.clientX,"y=",details.clientY);
        document.querySelector("#mini-circle").style.transform = `translate(${details.clientX}px,${details.clientY}px)`
    })
}

circleMouseFollower();