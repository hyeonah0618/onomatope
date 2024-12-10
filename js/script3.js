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
const scrollSpeed = 0.2; // 스크롤 속도를 느리게 

console.clear();
// Lottie 애니메이션 로드
const animation = lottie.loadAnimation({
    container: document.getElementById('lottie-animation'), // 애니메이션을 표시할 컨테이너
    renderer: 'svg', // SVG 렌더링 방식
    loop: true, // 반복 재생 여부
    autoplay: false, // 스크롤에 따라 제어할 것이므로 자동 재생 비활성화
    path: 'lottie/lottie1.json' // Lottie JSON 파일 경로
});

let lastScrollTop = 0; // 이전 스크롤 위치
let isScrolling; // 스크롤 중인지 확인하는 변수

// 스크롤 이벤트
window.addEventListener('scroll', () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // 방향에 따라 애니메이션 방향 설정
    if (currentScrollTop > lastScrollTop) {
        // 아래로 스크롤: 정방향 재생
        animation.setDirection(1);
        animation.play();
        document.getElementById('lottie-animation').style.transform = 'scaleX(1)'; // 원래 방향
    } else if (currentScrollTop < lastScrollTop) {
        // 위로 스크롤: 역방향 재생
        animation.setDirection(1);
        animation.play();
        document.getElementById('lottie-animation').style.transform = 'scaleX(-1)'; // 좌우 반전
    }

    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // 음수 방지

    // 스크롤이 멈추면 애니메이션 정지
    clearTimeout(isScrolling);
    isScrolling = setTimeout(() => {
        animation.pause(); // 스크롤 멈춤 시 애니메이션 정지
    }, 100); // 100ms 동안 스크롤이 없으면 정지
});

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
        onUpdate: function(self) {
            const bubble = document.getElementById('running-bubble');
            if (!bubble.classList.contains('wobble-animation')) {
                bubble.classList.add('wobble-animation');
            }
        }
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


