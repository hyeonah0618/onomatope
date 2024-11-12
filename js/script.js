// js/script.js

gsap.registerPlugin(ScrollTrigger);

// 가로 스크롤 설정
const container = document.querySelector("#scene1");

// 전체 너비 계산
const totalWidth = container.scrollWidth - window.innerWidth;

gsap.to(container, {
  x: -totalWidth, // 가로 스크롤
  ease: "none",
  scrollTrigger: {
    trigger: container,
    start: "top top", // 스크롤 시작 지점
    end: `+=${container.scrollWidth}`, // 스크롤 끝 지점
    scrub: true,
    pin: true, // 스크롤 동안 고정
    anticipatePin: 1,
  },
});

// Parallax 효과 적용
gsap.to("#tree1", {
  x: "-=200", // 느리게 이동
  scrollTrigger: {
    trigger: container,
    start: "top top",
    end: `+=${container.scrollWidth}`,
    scrub: true,
  },
});

gsap.to("#cloud1", {
  x: "-=300", // 더 느리게 이동
  scrollTrigger: {
    trigger: container,
    start: "top top",
    end: `+=${container.scrollWidth}`,
    scrub: true,
  },
});

gsap.to("#tree2", {
  x: "-=150", // 두 번째 나무
  scrollTrigger: {
    trigger: container,
    start: "top top",
    end: `+=${container.scrollWidth}`,
    scrub: true,
  },
});

gsap.to("#cloud2", {
  x: "-=250", // 두 번째 구름
  scrollTrigger: {
    trigger: container,
    start: "top top",
    end: `+=${container.scrollWidth}`,
    scrub: true,
  },
});

gsap.to("#sun", {
  x: "-=100", // 태양도 느리게 이동
  scrollTrigger: {
    trigger: container,
    start: "top top",
    end: `+=${container.scrollWidth}`,
    scrub: true,
  },
});
