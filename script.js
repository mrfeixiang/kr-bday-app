// 한국어 생일 앱 JavaScript

let balloonScore = 0;
let candlesBlown = 0;
const totalCandles = 8;

// 앱 초기화
document.addEventListener('DOMContentLoaded', function() {
    // 깜짝 선물 버튼에 클릭 이벤트 추가
    document.getElementById('surpriseBtn').addEventListener('click', showSurprise);
});

// 깜짝 선물 버튼 기능
function showSurprise() {
    createConfetti();
    showBirthdayMessage();
    playHappyAnimation();
}

// 색종이 애니메이션 생성
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffeaa7', '#fab1a0', '#fd79a8'];
    
    // 기존 색종이 제거
    confettiContainer.innerHTML = '';
    
    // 50개의 색종이 조각 생성
    for (let i = 0; i < 50; i++) {
        const confettiPiece = document.createElement('div');
        confettiPiece.className = 'confetti-piece';
        confettiPiece.style.left = Math.random() * 100 + '%';
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confettiPiece.style.animationDelay = Math.random() * 3 + 's';
        confettiPiece.style.animationDuration = (Math.random() * 3 + 2) + 's';
        confettiContainer.appendChild(confettiPiece);
    }
    
    // 애니메이션 후 색종이 제거
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 5000);
}

// 생일 축하 메시지 표시
function showBirthdayMessage() {
    const messages = [
        "🎉 세상에서 가장 멋진 8살이야! 🎉",
        "🌟 너만큼 특별한 아이는 없어! 🌟",
        "🎂 소원을 빌고 촛불을 불어봐! 🎂",
        "🦄 오늘 모든 꿈이 이루어질 거야! 🦄",
        "🌈 너는 모든 사람에게 기쁨을 줘! 🌈"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // 팝업 메시지 생성
    const popup = document.createElement('div');
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 20px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        z-index: 1001;
        text-align: center;
        font-size: 1.5rem;
        color: #ff6b6b;
        border: 3px solid #4ecdc4;
        animation: popup 0.5s ease-out;
        font-weight: bold;
    `;
    
    popup.innerHTML = `
        <div>${randomMessage}</div>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 20px;
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            font-family: inherit;
            font-weight: bold;
        ">닫기</button>
    `;
    
    document.body.appendChild(popup);
    
    // 팝업 애니메이션 추가
    const style = document.createElement('style');
    style.textContent = `
        @keyframes popup {
            0% { transform: translate(-50%, -50%) scale(0); }
            100% { transform: translate(-50%, -50%) scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// 즐거운 애니메이션 재생
function playHappyAnimation() {
    const title = document.querySelector('.birthday-title');
    title.style.animation = 'none';
    setTimeout(() => {
        title.style.animation = 'bounce 0.5s ease-in-out 3';
    }, 10);
}

// 풍선 터뜨리기 게임
function popBalloon(balloon) {
    if (!balloon.classList.contains('popped')) {
        balloon.classList.add('popped');
        balloonScore++;
        document.getElementById('balloonScore').textContent = balloonScore;
        
        // 터지는 효과 (시각적 피드백)
        balloon.textContent = '💥';
        setTimeout(() => {
            balloon.textContent = '🎈';
        }, 500);
        
        // 모든 풍선이 터졌는지 확인
        if (balloonScore >= 5) {
            setTimeout(() => {
                alert('🎉 대단해! 모든 풍선을 터뜨렸어! 🎉');
                createConfetti();
            }, 500);
        }
    }
}

// 풍선 게임 리셋
function resetBalloons() {
    const balloons = document.querySelectorAll('.game-balloon');
    balloons.forEach(balloon => {
        balloon.classList.remove('popped');
        balloon.textContent = '🎈';
    });
    balloonScore = 0;
    document.getElementById('balloonScore').textContent = balloonScore;
}

// 촛불 끄기 게임
function blowCandle(candle) {
    if (!candle.classList.contains('blown')) {
        candle.classList.add('blown');
        candlesBlown++;
        
        // 시각적 피드백
        candle.textContent = '💨';
        setTimeout(() => {
            candle.textContent = '🕯️';
        }, 1000);
        
        // 메시지 업데이트
        const message = document.getElementById('candleMessage');
        if (candlesBlown < totalCandles) {
            message.textContent = `잘했어! ${candlesBlown}개 촛불을 껐어. ${totalCandles - candlesBlown}개 더 남았어!`;
        } else {
            message.textContent = '🎉 모든 촛불을 껐어! 소원을 빌어봐! 🎉';
            createConfetti();
            setTimeout(() => {
                alert('🎂 생일 축하해! 너의 소원이 이루어질 거야! 🎂');
            }, 1000);
        }
    }
}

// 촛불 게임 리셋
function resetCandles() {
    const candles = document.querySelectorAll('.candle');
    candles.forEach(candle => {
        candle.classList.remove('blown');
        candle.textContent = '🕯️';
    });
    candlesBlown = 0;
    document.getElementById('candleMessage').textContent = '촛불을 클릭해서 불어서 꺼보세요!';
}

// 생일 마법 효과 추가
function addBirthdayMagic() {
    // 랜덤 풍선 떠다니기
    setInterval(() => {
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach(balloon => {
            if (Math.random() > 0.7) {
                balloon.style.transform = `translateY(${Math.random() * 10 - 5}px)`;
            }
        });
    }, 2000);
    
    // 랜덤 반짝임
    setInterval(() => {
        if (Math.random() > 0.8) {
            createSparkle();
        }
    }, 3000);
}

// 반짝임 효과 생성
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.textContent = '✨';
    sparkle.style.cssText = `
        position: fixed;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 999;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
        animation: sparkle 2s ease-out forwards;
    `;
    
    document.body.appendChild(sparkle);
    
    // 반짝임 애니메이션 추가
    if (!document.querySelector('#sparkle-style')) {
        const style = document.createElement('style');
        style.id = 'sparkle-style';
        style.textContent = `
            @keyframes sparkle {
                0% { opacity: 0; transform: scale(0); }
                50% { opacity: 1; transform: scale(1); }
                100% { opacity: 0; transform: scale(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// 생일 마법 초기화
addBirthdayMagic();