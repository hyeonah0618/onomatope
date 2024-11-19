// GSAP 초기화
gsap.registerPlugin(ScrollTrigger);

// 전체 슬라이드 애니메이션
gsap.to(".slides", {
    x: () => -(document.querySelector(".slides").scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
        trigger: ".scene-slides",
        start: "top top",
        end: () => `+=${document.querySelector(".slides").scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        markers: true
    }
});

// 개별 요소 애니메이션
gsap.to("#running-person", {
    x: 1000,
    scrollTrigger: {
        trigger: ".scene1",
        start: "top top",
        end: "+=4000",
        scrub: 1
    }
});

// 다른 요소들의 애니메이션도 필요에 따라 추가