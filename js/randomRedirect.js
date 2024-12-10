// HTML 파일 목록
const htmlFiles = ['index.html', 'index2.html', 'index3.html', 'index4.html', 'index5.html'];

// 현재 파일과 중복되지 않도록 랜덤으로 선택
const currentFile = window.location.pathname.split('/').pop();
let nextFile;

// 중복되지 않는 랜덤 파일 선택
do {
    nextFile = htmlFiles[Math.floor(Math.random() * htmlFiles.length)];
} while (nextFile === currentFile);

// 랜덤 리디렉션 실행
if (nextFile !== currentFile) {
    const timestamp = new Date().getTime(); // 캐시 방지용 타임스탬프 추가
    window.location.href = `${nextFile}?t=${timestamp}`;
}
