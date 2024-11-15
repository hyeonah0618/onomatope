// GSAP 초기화
gsap.registerPlugin(ScrollTrigger);

const container = document.getElementsByClassName('container1')[0];
const wrapper = container.children[0];
console.clear();

let scrollTween = gsap.to(wrapper, {
  x: () => -(wrapper.clientWidth - container.clientWidth),
  ease: "none",
  scrollTrigger: {
    trigger: container,
    start: 'top top',
    end: () => `${wrapper.clientWidth - container.clientWidth}`,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    invalidateOnRefresh: true
  }
});

gsap.to(".scene1", {
    x: "-95%",
    ease: "none",
    scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "+=6000",
        pin: true,
        scrub: 2,
        anticipatePin: 1,
        onUpdate: (self) => {
            // 스크롤 진행도에 따라 scene2 표시
            if (self.progress > 0.95) {
                gsap.to(".scene2", {
                    autoAlpha: 1,
                    duration: 0.5
                });
            } else {
                gsap.to(".scene2", {
                    autoAlpha: 0,
                    duration: 0.5
                });
            }
        }
    }
});

// Parallax 효과
gsap.to("#cloud1", {
    x: "-=2000",
    ease: "none",
    scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "+=6000",
        scrub: 1.5
    }
});

gsap.to("#cloud2", {
    x: "-=2500",
    ease: "none",
    scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "+=6000",
        scrub: 1
    }
});
