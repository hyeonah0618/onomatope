// GSAP 초기화
gsap.registerPlugin(ScrollTrigger);
// ... existing code ...
function openCenteredWindow(url) {
    const width = 800;
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
const scrollSpeed = 0.3; // 스크롤 속도를 느리게 

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
    let currentFrame = Math.round(progress * (totalFrames - 1) * 25) % totalFrames;
    
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

document.querySelectorAll('.bubble').forEach(bubble => {
    // 원래 텍스트를 저장
    const originalText = bubble.textContent;
    
    bubble.addEventListener('click', function() {
        this.classList.toggle('clicked');
        
        // clicked 클래스가 있으면 새로운 텍스트로, 없으면 원래 텍스트로
        if (this.classList.contains('clicked')) {
            const newText = this.dataset.clickedText || '완료!'; // 데이터 속성이 없을 경우 기본값
            this.textContent = newText;
        } else {
            this.textContent = originalText;
        }
    });
});
// 개별 요소 애니메이션

gsap.to("#running-container", {
    x: 1000,
    scrollTrigger: {
        trigger: ".scene1",
        start: "top top",
        end: "+=4000",
        scrub: 3,
        markers: true,
        onUpdate: function(self) {
            const bubble = document.getElementById('running-bubble');
            if (!bubble.classList.contains('wobble-animation')) {
                bubble.classList.add('wobble-animation');
            }
        }
    }
});


// running-person만의 점프 애니메이션
gsap.to("#running-person", {
    y: -20, // 위로 20px 점프
    duration: 0.3, // 애니메이션 속도
    repeat: -1, // 무한 반복
    yoyo: true, // 부드러운 위아래 움직임
    ease: "power1.inOut"
});

// diving-person의 transform-origin 설정 및 숨쉬기 애니메이션
gsap.set("#diving-person", {
    transformOrigin: "bottom center" // 변환 기준점을 하단 중앙으로 설정
});
gsap.to("#diving-person", {
    scale: 1.03, 
    duration: 1.5, // 한번 커졌다 작아지는데 걸리는 시간
    repeat: -1, // 무한 반복
    yoyo: true, // 부드럽게 원래 크기로 돌아옴
    ease: "power1.inOut" // 부드러운 움직임
});

gsap.to("#swimming-container", {
        x: 2000,
        scrollTrigger: {
            trigger: ".scene2",
            start: "top top",
            end: "+=4000",
            scrub: 3,
            ease: "power1.inOut",
            markers: {
                startColor: "purple",
                endColor: "fuchsia",
                fontSize: "1rem"
            }
 } }  
);

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

// arrow-person"의 transform-origin 설정 및 숨쉬기 애니메이션
gsap.set("#arrow-person", {
    transformOrigin: "bottom center" // 변환 기준점을 하단 중앙으로 설정
});
gsap.to("#arrow-person", {
    scale: 1.03, 
    duration: 1, // 한번 커졌다 작아지는데 걸리는 시간
    repeat: -1, // 무한 반복
    yoyo: true, // 부드럽게 원래 크기로 돌아옴
    ease: "power1.inOut" // 부드러운 움직임
});
// 짐볼 애니메이션 수정
gsap.to("#gymball_p", {
    scrollTrigger: {
        trigger: ".scene-slides2", // 트리거 요소 변경
        start: "top top",
        end: "+=3000", // 스크롤 거리 명시적 지정
        scrub: 3, // 부드러운 애니메이션을 위해 값 조정
    },
    x: 500
});

gsap.to("#gymball_y", {
    scrollTrigger: {
        trigger: ".scene-slides2",
        start: "top top",
        end: "+=3000",
        scrub: 2,
    },
    x: 600
});

gsap.to("#gymball_g", {
    scrollTrigger: {
        trigger: ".scene-slides2",
        start: "top top",
        end: "+=3000",
        scrub: 1,
    },
    x: 250
});

// gym-person"의 transform-origin 설정 및 숨쉬기 애니메이션
gsap.set("#gym-person", {
    transformOrigin: "bottom center" // 변환 기준점을 하단 중앙으로 설정
});
gsap.to("#gym-person", {
    scale: 1.03, 
    duration: 1.8, // 한번 커졌다 작아지는데 걸리는 시간
    repeat: -1, // 무한 반복
    yoyo: true, // 부드럽게 원래 크기로 돌아옴
    ease: "power1.inOut" // 부드러운 움직임
});
// 좌우 떨림 애니메이션 추가
gsap.to("#gym-person", {
    x: 2, // 좌우로 2픽셀만 움직임
    duration: 0.1, // 매우 빠른 속도로
    repeat: -1,
    yoyo: true,
    ease: "none" // 선형 움직임으로 떨림 효과 생성
});

// water-person"의 transform-origin 설정 및 숨쉬기 애니메이션
gsap.set("#water-person", {
    transformOrigin: "bottom center" // 변환 기준점을 하단 중앙으로 설정
});
// 타임라인을 생성하여 여러 애니메이션을 연속적으로 실행
const breathingTimeline = gsap.timeline({
    repeat: -1
});

breathingTimeline
    .to("#water-person", {
        scale: 1.02,
        duration: 1,
        ease: "power1.inOut"
    })
    .to("#water-person", {
        scale: 1,
        duration: 1.2,
        ease: "power1.inOut"
    });

    gsap.to("#gym_dumbbell", {
        y: 500,
        opacity: 1,
        duration: 1.5,
        ease: "bounce.out",
        scrollTrigger: {
            trigger: "#gym_dumbbell",
            start: "left+=100 center",
            end: "+=3000",
            scrub: true,
            markers: {
                startColor: "purple",
                endColor: "pink",
                fontSize: "0.8rem",
                indent: 20
            }
        }
    });

    const confettiContainer = document.querySelector('#confetti-container');
    const confettiAnimation = lottie.loadAnimation({
      container: confettiContainer,
      renderer: 'svg',
      loop: true,
      autoplay: false,
      path: 'lottie/confetti.json'
    });
    
    const nextPage = document.querySelector('#next-page');
    nextPage.addEventListener('mouseenter', () => {
      confettiAnimation.play();
    });
    
    nextPage.addEventListener('mouseleave', () => {
      confettiAnimation.stop();
    });


