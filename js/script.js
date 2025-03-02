document.addEventListener('DOMContentLoaded', init);
//背景作成
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
let numStars = 500;

function init() {
  resizeCanvas();
  createStars_back();
  animate();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createStars_back() {
  stars = [];
  for(let i = 0; i < numStars; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      alpha: Math.random(),
      delta: Math.random() * 0.02,
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach((star) => {
    star.alpha += star.delta;
    if(star.alpha <= 0 || star.alpha >= 1) star.delta *= -1;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fill();
  });
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  createStars_back();
});

init();

//背景追従
const starfield = document.getElementById('starfield');

document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth) * 20;
  const y = (e.clientY / window.innerHeight) * 20;
  starfield.style.transform = `translate(-${x}px, -${y}px)`;
});

const fadeInElements = document.querySelectorAll('.fade-in');

function handleScroll() {
  fadeInElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      element.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);


//ボタン光る
const buttons = document.querySelectorAll(".more-btn, .buy-btn:not(.no-hover), .carousel-button");
buttons.forEach((button)=>{
  button.addEventListener("mousemove", (e) => {
    const rect = button.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / button.clientWidth) * 100;
    let y = ((e.clientY - rect.top) / button.clientHeight) * 100;

    button.style.background = `radial-gradient(circle closest-corner 
      at ${x}% ${y}%,
      var(--ripple-color), var(--bg-color))`;
  });

  button.addEventListener("mouseleave", () => {
      button.style.removeProperty("background");
  });
});

//星型マウスカーソル
var cursor = document.getElementById('cursor'); 
    // 前回のマウス位置を記録するための変数
    var lastX = null, lastY = null;
    
    // マウス移動でカーソル要素を追従させ、星のトレイルを生成する
    document.addEventListener('mousemove', function (e) {
      // カーソル要素を現在のマウス位置に移動
      cursor.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
      
      // 前回位置があれば移動方向を計算
      if (lastX !== null && lastY !== null) {
        var dx = e.clientX - lastX;
        var dy = e.clientY - lastY;
        // マウスが実際に動いている場合のみ星を生成
        if (Math.abs(dx) >= 3 || Math.abs(dy) >= 3) {
          createStars(e.clientX, e.clientY, dx, dy);
        }
      }
      lastX = e.clientX;
      lastY = e.clientY;
    });
    document.addEventListener("mouseleave", () => {
      cursor.classList.add("hidden");
    });

    document.addEventListener("mouseenter", () => {
        cursor.classList.remove("hidden");
    });
    
    // 複数の星を生成する関数
    function createStars(x, y, dx, dy) {
      var numStars = 3; // 生成する星の数（調整可能）
      for (var i = 0; i < numStars; i++) {
        createStar(x, y, dx, dy);
      }
    }
    
    // 星を生成して body に追加、アニメーション後に削除する関数
    function createStar(x, y, dx, dy) {
      const star = document.createElement('div');
      star.className = 'cursor-star';
      star.textContent = '★';
      star.style.left = x + 'px';
      star.style.top = y + 'px';
      
      // マウス移動の方向の逆方向に星を飛ばす
      var angle = Math.atan2(dy, dx) + Math.PI;
      // ±30°のばらつきを付与
      var variation = (Math.random() - 0.5) * (Math.PI /1.5);
      angle += variation;
      // 40px～50pxのランダムな距離
      var distance = Math.random() * 30 + 40;
      var offsetX = Math.cos(angle) * distance;
      var offsetY = Math.sin(angle) * distance;
      
      // CSS変数として移動オフセットをセット
      star.style.setProperty('--offset-x', offsetX + 'px');
      star.style.setProperty('--offset-y', offsetY + 'px');
      
      document.body.appendChild(star);
      
      // アニメーション完了後に削除
      setTimeout(() => {
        star.remove();
      }, 2000);
    }
    // カーソルここまで
    
    // リンクやフォーム要素にホバー時のクラス追加／削除
    var links = document.querySelectorAll('a, input, button, select, textarea,label');
    links.forEach(function(link) {
      link.addEventListener('mouseover', function () {
        cursor.classList.add('cursor--hover');
      });
      link.addEventListener('mouseout', function () {
        cursor.classList.remove('cursor--hover');
      });
    });

    function createSparklingStars() {
      const stars = document.querySelectorAll('.shooting-star');
      stars.forEach(star => {
        const baseTop = 0; // 基準となるtop位置
        const baseRight = 0; // 基準となるright位置

        let toprandom, rightrandom;

        if (Math.random() < 0.5) {
          // topが画面外になるように調整
          toprandom = Math.random() * -100 -10;
          rightrandom = Math.random() * (window.innerWidth + 100);
        } else {
          // rightが画面外になるように調整
          toprandom = Math.random() * (window.innerHeight + 100);
          rightrandom = Math.random() * -100 -10;
        }

        // どちらかが必ず負の値になるように調整
        if (toprandom >= 0 && rightrandom >= 0) {
          if (Math.random() < 0.5) {
            toprandom = -toprandom;
          } else {
            rightrandom = -rightrandom;
          }
        }

        const topOffset = baseTop + toprandom;
        const rightOffset = baseRight + rightrandom;

        star.style.top = `${topOffset}px`;
        star.style.right = `${rightOffset}px`;

        const animationDelay = Math.random() * 690 + 10; // 5msから800msのランダムな遅延
        star.style.animationDelay = `${animationDelay}ms`;
      });
    }
    
    createSparklingStars();
    setInterval(createSparklingStars, 5000); // 5秒ごとに位置を更新


    //問い合わせボタン
    document.addEventListener("DOMContentLoaded", () => {
      const button = document.querySelector(".contact-btn");
  
      button.addEventListener("mouseenter", () => {
          createMainStar(button);
      });
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector(".contact-btn");

    button.addEventListener("mouseenter", () => {
        createMainStar(button);
    });
});


