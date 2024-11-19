// GSAP 초기화
gsap.registerPlugin(ScrollTrigger);
// ... existing code ...
function openCenteredWindow(url) {
    const width = 600;
    const height = 600;
    
    // 화면 중앙 좌표 계산
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;
    
    // 팝업창 열기
    window.open(url, '_blank', 
        `width=${width},
         height=${height},
         left=${left},
         top=${top},
         menubar=no,
         toolbar=no,
         location=no,
         status=no,
         scrollbars=yes`
    );
}


// 첫 번째 가로 스크롤 (scene1-3)
gsap.to(".slides", {
    x: () => -(document.querySelector(".slides").scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
        trigger: ".scene-slides",
        start: "top top",
        end: () => `+=${document.querySelector(".slides").scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 3,
        invalidateOnRefresh: true,
        markers: true
    }
});

// 두 번째 가로 스크롤 (scene4-5)
gsap.to(".slides2", {
    x: () => -(document.querySelector(".slides2").scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
        trigger: ".scene-slides2",
        start: "top top",
        end: () => `+=${document.querySelector(".slides2").scrollWidth - window.innerWidth}`,
        pin: true,
        scrub: 3,
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
        scrub: 3
    }
});
gsap.fromTo("#bird", {
    x: 0
    },
    {
    x: -1000, y: 100,
    scrollTrigger: {
        trigger: ".scene1",
        start: "top top",
        end: "+=2000",
        scrub: 3
    }
});
ㅎ