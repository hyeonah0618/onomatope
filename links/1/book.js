const pages = [
    d3.select("#page1"),
    d3.select("#page2"),
    d3.select("#page3"),
    d3.select("#page4"),
    d3.select("#page5"),
    d3.select("#page6"),
    d3.select("#page7"),
    d3.select("#reflect7"),
    d3.select("#reflect6"),
    d3.select("#reflect5"),
    d3.select("#reflect4"),
    d3.select("#reflect3"),
    d3.select("#reflect2"),
    d3.select("#reflect1")
];

const audioFiles = [     "../audio/1/book_kr.mp3",     "../audio/1/book_en.mp3",     "../audio/1/book_jp.mp3" ];

const textOptions = [
    { text: "팔락팔락", font: "CHOGOONCHICKENSCRATCHV3", class: "korean" },
    { text: "flip", font: "Playwrite HR", class: "english" },
    { text: "パラパラ", font: "Klee One", class: "japanese" }
];

let currentImageIndex = 0;
let startX = 0;
const step = 50; // 이미지 변경 단계의 거리
let isDraggingEnabled = true;
let isPlayingAudio = false; // 오디오 재생 상태

const drag = d3.drag()
    .on("start", dragStarted)
    .on("drag", dragged)
    .on("end", dragEnded);

pages.forEach(page => page.call(drag));

function dragStarted(event) {
    if (!isDraggingEnabled) return;
    startX = event.x;
    pages[currentImageIndex].raise().attr("stroke", "black");
}

function dragged(event) {
    if (!isDraggingEnabled) return;
    const x = event.x;
    const dx = x - startX;

    // 드래그된 위치에 따라 이미지 변경
    if (dx < -step) {
        updateImage('left');
        startX = x; // 현재 x 좌표를 startX로 설정하여 다음 단계로 넘어감
    } else if (dx > step) {
        updateImage('right');
        startX = x; // 현재 x 좌표를 startX로 설정하여 다음 단계로 넘어감
    }
}

function dragEnded(event) {
    if (!isDraggingEnabled) return;
    pages[currentImageIndex].attr("stroke", null);
}

function updateImage(direction) {
    const currentPage = pages[currentImageIndex];
    let newIndex = currentImageIndex;

    if (direction === 'left') {
        newIndex = currentImageIndex + 1;
        if (newIndex >= pages.length) {
            newIndex = 0; // 마지막 페이지에서 첫 페이지로 돌아가기
        }
    } else if (direction === 'right') {
        newIndex = currentImageIndex - 1;
        if (newIndex < 0) {
            newIndex = pages.length - 1; // 첫 페이지에서 마지막 페이지로 돌아가기
        }
    }

    if (newIndex !== currentImageIndex) {
        currentPage.classed("hidden", true);
        currentImageIndex = newIndex;
        const newPage = pages[currentImageIndex];
        newPage.classed("hidden", false);
        adjustPosition(newPage);

        // 6.svg 또는 reflect2.svg일 때 오디오와 텍스트 재생
        if ((currentImageIndex === 5 || currentImageIndex === 12) && !isPlayingAudio) {
            playRandomAudio();
        }
    }
}

function adjustPosition(page) {
    const container = document.querySelector('#page-container');
    const containerHeight = container.getBoundingClientRect().height;
    const imgHeight = page.node().getBoundingClientRect().height;
    const topOffset = (containerHeight - imgHeight) / 2; // 중앙에 맞추기 위해 상단 오프셋 계산
    page.style.top = `${topOffset}px`;
}

function playRandomAudio() {
    const audioPlayer = document.getElementById("audio-player");
    const randomIndex = Math.floor(Math.random() * audioFiles.length);
    audioPlayer.src = audioFiles[randomIndex];
    isPlayingAudio = true;
    audioPlayer.play();
    showRandomText(); // 오디오 재생 시 텍스트 표시

    // 오디오가 끝날 때까지 기다림
    audioPlayer.onended = () => {
        isPlayingAudio = false;
    };
}

function showRandomText() {
    const randomTextOption = textOptions[Math.floor(Math.random() * textOptions.length)];
    const textElement = document.createElement("div");
    textElement.className = `text ${randomTextOption.class}`;
    textElement.style.fontFamily = randomTextOption.font;
    textElement.style.fontSize = '60px'; // 텍스트 크기 설정
    textElement.innerText = randomTextOption.text;

    // 랜덤한 위치 지정
    const maxWidth = window.innerWidth - 200; // 텍스트가 화면을 벗어나지 않도록
    const maxHeight = window.innerHeight - 200; // 텍스트가 화면을 벗어나지 않도록
    const randomX = Math.random() * maxWidth;
    const randomY = Math.random() * maxHeight;
    textElement.style.left = `${randomX}px`;
    textElement.style.top = `${randomY}px`;
    textElement.style.position = 'absolute'; // 포지션 설정

    document.body.appendChild(textElement);

    // 텍스트 페이드인 효과
    requestAnimationFrame(() => {
        textElement.style.opacity = 1;
    });

    // 2초 후 텍스트 제거
    setTimeout(() => {
        textElement.style.opacity = 0;
        setTimeout(() => {
            document.body.removeChild(textElement);
        }, 1000);
    }, 2000);
}

function resetToFirstPage() {
    currentImageIndex = 0;
    pages.forEach((page, index) => {
        page.classed("hidden", index !== currentImageIndex);
        adjustPosition(page);
    });
    isDraggingEnabled = true; // 드래그 활성화
    d3.select("#page1").on("click", null); // 첫 번째 페이지 클릭 이벤트 핸들러 제거
}

// 초기 위치 조정
pages.forEach(page => adjustPosition(page));

// 첫 번째 페이지 클릭 시 드래그 활성화 및 이벤트 재등록
d3.select("#page1").on("click", () => {
    if (!isDraggingEnabled) {
        isDraggingEnabled = true;
        pages.forEach(page => page.call(drag));
    }
});
