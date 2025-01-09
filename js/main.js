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

// 전체 가로 스크롤 설정
gsap.registerPlugin(ScrollTrigger);

// 가로 스크롤 설정
const sections = gsap.utils.toArray(".scene");
const totalWidth = sections.reduce((width, section) => width + section.offsetWidth, 0);

let mainScroll = gsap.to(".slides", {
    x: () => -(totalWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
        trigger: ".scene-slides",
        start: "top top",
        end: () => `+=${totalWidth}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1,
        invalidateOnRefresh: true,
    }
});



// ScrollTrigger 새로고침 시 업데이트
ScrollTrigger.refresh();

// 브라우저 리사이즈 시 업데이트
window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});

// 색상 배열 정의
const initialColors = ['#19AA4A', '#EC008C', '#DDE349','#0099D9']; // 초기 ??? 텍스트용
const bgColors = ['#19AA4A', '#EC008C', '#DDE349','#0099D9']; // 배경색용
const textColors = ['#19AA4A', '#EC008C', '#DDE349', '#0099D9','#ffffff']; // 텍스트용

// 페이지 로드 시 각 말풍선에 랜덤 색상 적용
document.querySelectorAll('.bubble').forEach(bubble => {
    const parentDiv = bubble.parentElement; // 부모 div 선택
    
    // 초기 ??? 텍스트 색상을 랜덤으로 설정
    const randomInitialColor = initialColors[Math.floor(Math.random() * initialColors.length)];
    bubble.style.color = randomInitialColor;
    
    // 부모 div에 클릭 이벤트 추가
    parentDiv.addEventListener('click', function() {
        const bubbleElement = this.querySelector('.bubble'); // 부모 div 내의 bubble 클래스를 가진 요소 선택
        
        if (!bubbleElement.classList.contains('clicked')) {
            // 배경색 선택 (흰색 제외)
            const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
            
            // 선택된 배경색을 제외한 나머지 색상들 중에서 텍스트 색상 선택
            let availableTextColors = textColors.filter(color => color !== randomBgColor);
            const randomTextColor = availableTextColors[Math.floor(Math.random() * availableTextColors.length)];
            
            const newText = bubbleElement.dataset.clickedText || '완료!';
            
            bubbleElement.classList.add('clicked');
            bubbleElement.textContent = newText;
            bubbleElement.style.backgroundColor = randomBgColor;
            bubbleElement.style.color = randomTextColor;
            bubbleElement.style.borderColor = randomBgColor;
            
            // 말풍선 꼬리 색상도 변경
            const afterStyle = document.createElement('style');
            afterStyle.textContent = `
                #${bubbleElement.id}.clicked:after {
                    border-color: ${randomBgColor} transparent;
                }
            `;
            document.head.appendChild(afterStyle);
        }
    });
});

// 개별 요소 애니메이션
gsap.to("#cloud1", {
    x: "-500",
    ease: "none",
    scrollTrigger: {
        trigger: "#cloud1",
        start: "left 70%",
        end: "+=6000",
        scrub: 3
    }
});

gsap.to("#cloud2", {
    x: "-=1000",
    ease: "none",
    scrollTrigger: {
        trigger: "#cloud2",
        start: "left 70%",
        end: "+=6000",
        scrub: 3
    }
});
gsap.to("#cloud3", {
    x: "-=1000",
    ease: "none",
    scrollTrigger: {
        trigger: "#cloud3",
        start: "left 70%",
        end: "+=6000",
        scrub: 3
    }
});

gsap.to("#bus-container", {
    x: 2200,
    scrollTrigger: {
        trigger: "#bus-container",
        start: "left 70%", // 씬4의 왼쪽 끝이 뷰포트의 왼쪽에 닿는 순간 시작
        end: "+=3000",
        scrub: 3,               // scrub 값을 true로 변경
        // markers: true,
        containerAnimation: mainScroll,
        horizontal: true
    }
});
gsap.fromTo("#sun2", {
    x: 0
    },
    {
    x: -1500, y: 200,
    scrollTrigger: {
        trigger: "#sun2",
        start: " right 5%",
        end: "+=2000",
        scrub: 3,
        markers: true,
            containerAnimation: mainScroll,
            horizontal: true
    }
});
gsap.to("#running-container", {
    x: 1200,
    scrollTrigger: {
        trigger: "#running-container",
        start: "left 70%", // 씬4의 왼쪽 끝이 뷰포트의 왼쪽에 닿는 순간 시작
        end: "+=3000",
        scrub: true,               // scrub 값을 true로 변경
        // markers: true,
        containerAnimation: mainScroll,
        horizontal: true
    }
});
gsap.to("#swimming-container", {
    x: 2500,
    scrollTrigger: {
        trigger: ".scene4",
        start: "left center",
        end: "right center",
        scrub: true,
        // markers: true,
        containerAnimation: mainScroll,
        horizontal: true
    }
});

gsap.to("#dog-container", {
    x: -200,
    scrollTrigger: {
        trigger: "#dog-container",
        start: "left 90%",
        end: "center center",
        scrub: 3,
        // markers: true,
        containerAnimation: mainScroll,
        horizontal: true
    }
});

gsap.to("#dog", {
    y: -20, // 위로 20px 점프
    duration: 0.4, // 애니메이션 속도
    repeat: -1, // 무한 반복
    yoyo: true, // 부드러운 위아래 움직임
    ease: "power2.out", // 더 탄력적인 이징
    yoyoEase: "power1.in" // 내려올 때는 더 빠르게
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

gsap.fromTo("#bird", {
    x: 0
    },
    {
    x: -1000, y: 100,
    scrollTrigger: {
        trigger: "#bird",
        start: " right right",
        end: "+=1000",
        scrub: 3,
        markers: true,
            containerAnimation: mainScroll,
            horizontal: true
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
    x: 500,
    scrollTrigger: {
        trigger: "#gymball_p",
        start: "right right",
        end: "+=1000",
        scrub: 3,
        containerAnimation: mainScroll,
        horizontal: true
    },
});
gsap.to("#gymball_y", {
    x: 3400,
    scrollTrigger: {
        trigger: "#gymball_y",
        start: "right right",
        end: "+=7300",
        scrub: 5,
        containerAnimation: mainScroll,
        horizontal: true
    },

});
gsap.to("#gymball_g", {
    x: 500,
    scrollTrigger: {
        trigger: "#gymball_g",
        start: "right right",
        end: "+=1000",
        scrub: 2,
        containerAnimation: mainScroll,
        horizontal: true
    },

});
gsap.to("#gym_dumbbell", {
    y: 500,
    opacity: 1,
    duration: 1.5,
    ease: "bounce.out",
    scrollTrigger: {
        trigger: "#gym_dumbbell",
        start: "center center",
        end: "right 60%",
        scrub: 3,
        containerAnimation: mainScroll,
        horizontal: true

    }
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
})
gsap.set("#boxing1", {
    transformOrigin: "bottom center" // 변환 기준점을 하단 중앙으로 설정
})
gsap.set("#boxing2", {
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
        scale: 1.01,
        duration: 1.2,
        ease: "power1.inOut"
    });




    gsap.to("#vacuum-container", {
        x: -1500,
        scrollTrigger: {
            trigger: "#vacuum-container",
            start: "left right",
            end: "+=4000",
            scrub: 3,
            // markers: true,
            containerAnimation: mainScroll,
            horizontal: true
        }
    });
    

    gsap.to("#caterpillar-container", {
        x: 900,
        scrollTrigger: {
            trigger: "#caterpillar-container",
            start: "right right",
            end: "+=4000",
            scrub: 3,
            markers: true,
            containerAnimation: mainScroll,
            horizontal: true
        }
    });

// 지그재그 움직임을 위한 타임라인 생성
const zigzagTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: "#caterpillar-container",
        start: "right right",
        end: "+=4000",
        scrub: 3,
        containerAnimation: mainScroll,
        horizontal: true
    }
});

zigzagTimeline
    .to("#caterpillar-container", {
        x: 20,
        y: 15,
    })
    .to("#caterpillar-container", {
        x: 40,
        y: -15,
    })
    .to("#caterpillar-container", {
        x: 60,
        y: 15,
    })
    .to("#caterpillar-container", {
        x: 80,
        y: -10,
    })
    .to("#caterpillar-container", {
        x: 90,
        y: 0,
        
    });

// 방문한 페이지를 저장할 Set 생성 (중복 방지)
let visitedPages = new Set();

// 카운터 초기화 및 업데이트 함수
function initializeCounter() {
    // 방문 기록 초기화
    visitedPages.clear();
    localStorage.removeItem('visitedPages');
    
    // 카운터 업데이트
    updateCounter();
}

// 카운터 업데이트 함수
function updateCounter() {
    document.getElementById('current').textContent = visitedPages.size;
    document.getElementById('total').textContent = '/23';
}

// 클릭 트래킹 함수
function trackClick() {
    // 현재 클릭한 링크의 URL을 Set에 추가
    const clickedUrl = event.currentTarget.getAttribute('onclick').match(/['"]([^'"]*)['"]/)[1];
    visitedPages.add(clickedUrl);
    
    // 카운터 업데이트
    updateCounter();
}

// 페이지 로드 시 초기화 실행
window.addEventListener('load', initializeCounter);
