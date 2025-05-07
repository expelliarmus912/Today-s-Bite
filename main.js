const restaurants = [
  { name: '델브리또', type: '양식', img: '델브리또.jpg' },
  { name: '어니언스치킨', type: '양식', img: '어니언스치킨.jpg' },
  { name: '짬뽕공장', type: '중식', img: '짬뽕공장.jpg' },
  { name: '류헤이', type: '일식', img: '류헤이.jpg' },
  { name: '진미식당', type: '한식', img: '진미식당.jpg' },
  { name: '끄티식당', type: '일식', img: '끄티식당.jpg' },
  { name: '창평돼지국밥', type: '한식', img: '창평돼지국밥.jpg' },
  { name: '하동돈가스', type: '일식', img: '하동돈가스.jpg' },
  { name: '경아네집밥', type: '한식', img: '경아네집밥.jpg' },
  { name: '반천촌국수', type: '한식', img: '반천촌국수.jpg' },
  { name: '개척돈가스', type: '일식', img: '개척돈가스.jpg' },
  { name: '밀밭수제비', type: '한식', img: '밀밭수제비.jpg' },
  { name: '남매컵밥', type: '한식', img: '남매컵밥.jpg' },
  { name: '스시하루', type: '일식', img: '스시하루.jpg' }
];
const startScreen = document.getElementById('startScreen');
const resultScreen = document.getElementById('resultScreen');
let recentPicks = [];

function getUniqueRecommendation() {
  let pick;
  let attempts = 0;
  do {
    pick = restaurants[Math.floor(Math.random() * restaurants.length)];
    attempts++;
  } while (recentPicks.includes(pick.name) && attempts < 10);
  recentPicks.push(pick.name);
  if (recentPicks.length > 3) recentPicks.shift();
  return pick;
}

function updateContent(pick) {
  document.getElementById('foodName').textContent = pick.name;
  document.getElementById('foodType').textContent = pick.type;
  document.getElementById('foodImage').src = pick.img;
}

function showRecommendation() {
  const pick = getUniqueRecommendation();
  updateContent(pick);
  if (resultScreen.style.display === 'flex') {
    resultScreen.classList.remove('fade-in');
    void resultScreen.offsetWidth;
    resultScreen.classList.add('fade-in');
  } else {
    startScreen.style.display = 'none';
    resultScreen.style.display = 'flex';
    resultScreen.classList.add('fade-in');
  }
}

function shareResult() {
  html2canvas(resultScreen).then(canvas => {
    canvas.toBlob(blob => {
      const file = new File([blob], '추천식당.png', { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: '오늘 뭐 먹지?', text: '오늘 여기 어때요?' });
      } else {
        alert('이 브라우저에서는 이미지 공유를 지원하지 않습니다.');
      }
    });
  });
}