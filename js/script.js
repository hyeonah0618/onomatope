gsap.registerPlugin(ScrollTrigger);

// 배경 스크롤을 조정
gsap.to("#container", {
    xPercent: -400, // 전체 가로 스크롤 (가로로 400% 이동)
    ease: "none",
    scrollTrigger: {
        trigger: "#container",
        pin: true, // 컨테이너를 고정하고 스크롤만 가로로 이동
        scrub: 1, // 스크롤 민감도 설정
        end: "+=5000", // 스크롤 거리 설정
    }
});

// 배경 레이어들에 패럴랙스 효과 적용
gsap.to("#background1", {
    xPercent: -20, // 배경1이 천천히 이동
    ease: "none",
    scrollTrigger: {
        trigger: "#container",
        scrub: 1,
    }
});

gsap.to("#background2", {
    xPercent: -20, // 배경2가 더 빠르게 이동
    ease: "none",
    scrollTrigger: {
        trigger: "#container",
        scrub: 1,
    }
});

gsap.to("#background3", {
    xPercent: -20, // 배경3이 가장 빠르게 이동
    ease: "none",
    scrollTrigger: {
        trigger: "#container",
        scrub: 1,
    }
});
