// GSAP 초기화
gsap.registerPlugin(ScrollTrigger);
const scrollSpeed = 0.5; // 스크롤 속도를 느리게 

ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
        return arguments.length
            ? (document.documentElement.scrollTop = value / scrollSpeed)
            : document.documentElement.scrollTop * scrollSpeed;
    },
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    }
});

const container = document.getElementsByClassName('container1')[0];
const wrapper = container.children[0];
console.clear();

// 설정
const totalFrames = 23; // 프레임 개수 (100부터 122까지, 총 23개)
const startFrame = 100; // 시작 프레임 번호
const framePath = "character/1/walk cycle"; // 프레임 파일 경로
const frameExtension = ".png"; // 파일 확장자
let lastScrollTop = 0; // 이전 스크롤 위치
let isScrolling; // 스크롤 멈춤 감지용 변수
let loopFrame = startFrame; // 루프 프레임을 관리할 변수

// 스크롤 이벤트
window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollTop / scrollHeight;

    // 스크롤 방향 확인 및 프레임 계산
    let frameDirection = scrollTop > lastScrollTop ? 1 : -1; // 스크롤 방향에 따라 1 또는 -1
    let currentFrame = Math.round(progress * (totalFrames - 1) * 10) % totalFrames;
    
    // 방향에 따라 프레임 순서 조정
    if (frameDirection === -1) {
        currentFrame = totalFrames - currentFrame - 1; // 역방향 프레임 계산
    }
    currentFrame = startFrame + currentFrame; // 100부터 시작

    // 이미지 업데이트
    const frameElement = document.getElementById("ch1");
    frameElement.src = `${framePath}${currentFrame}${frameExtension}`;

    // 방향에 따라 이미지 반전 처리
    frameElement.style.transform = frameDirection === 1 ? "scaleX(1)" : "scaleX(-1)";

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    // 스크롤 멈춤 감지
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        console.log("스크롤 멈춤: 현재 프레임 유지");
    }, 100); // 100ms 동안 스크롤이 없으면 정지
});

let scrollTween = gsap.to(wrapper, {
  x: () => -(wrapper.clientWidth - container.clientWidth),
  ease: "none",
  scrollTrigger: {
    trigger: container,
    start: 'top top',
    end: () => `${wrapper.clientWidth - container.clientWidth}`,
    scrub: true,
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
        end: "+=6200",
        pin: true,
        scrub: 1,
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


// 가로 스크롤 (Scene 2)
gsap.to(".scene2", {
  x: "-95%", // 다시 가로 스크롤
  ease: "none",
  scrollTrigger: {
      trigger: ".container2",
      start: "top top", 
      end: "bottom bottom",
      scrub: 1,
      pin: true, // 고정
      markers: true
  }
});

gsap.to(".scene3", {
    x: "-95%",
    ease: "none",
    scrollTrigger: {
        trigger: ".container3",
        start: "top top",
        end: "bottom bottom",
        pin: true,
        scrub: 1,
        anticipatePin: 1,
    }
});



// Parallax 효과
gsap.to("#cloud1", {
    x: "-500",
    ease: "none",
    scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "+=6000",
        scrub: 1.5
    }
});

gsap.to("#cloud2", {
    x: "-=1000",
    ease: "none",
    scrollTrigger: {
        trigger: ".container",
        start: "top top",
        end: "+=6000",
        scrub: 1
    }
});