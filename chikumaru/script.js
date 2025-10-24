window.addEventListener('load', function () {
    setTimeout(function () {
      // ローディング関連の処理があればここに記述
    }, 3000);
  });

//  ↓ドアグルグル↓
const imageList = [
    "sozai/SVG/SVG/0-60.svg",
    "sozai/SVG/SVG/20.svg",
    "sozai/SVG/SVG/40.svg",
  ];

  let index = 0;

  setInterval(() => {
    index = (index + 1) % imageList.length;
    document.getElementById("doorImage").src = imageList[index];
  }, 600);

//  ↓ゴールグルグル↓
const imageList2 = [
  "sozai/SVG/SVG/ゴールグルグル0-60.svg",
  "sozai/SVG/SVG/ゴールグルグル40.svg",
  "sozai/SVG/SVG/ゴールグルグル20.svg",
];

let index2 = 0;

setInterval(() => {
  index2 = (index2 + 1) % imageList2.length;
  document.getElementById("goal-guruguruImage2").src = imageList2[index2];
}, 600);


//  ↓クリックしたら赤枠↓
document.querySelector(".play-bottom").addEventListener("click", () => {
  document.querySelector(".debug-area").style.display = "block";
});


//  ↓ポップアップとゲームロジック↓
let triangleShown = false;
let popupWindow = null;

function openAndResize() {
  const width = 80;
  const height = 130;
  const left = 900;
  const top = 300;
  const option = `width=${width},height=${height},left=${left},top=${top},resizable=yes`;

  popupWindow = window.open("popup.html", "popupwindow", option);

  if (popupWindow) {
    popupWindow.focus();
  } else {
    alert("ポップアップがブロックされました。ブラウザの設定を確認してください。");
  }
}


window.addEventListener("message", (event) => {
  if (triangleShown) return;

  const { x, y } = event.data;

  // 当たり判定の座標
  if (x > 375 && x < 576 && y > 376 && y < 576) {
    document.querySelector(".triangle").style.display = "block";
    triangleShown = true;


    if (popupWindow && !popupWindow.closed) {
      popupWindow.close();

      const debugArea = document.querySelector(".debug-area");
      if (debugArea) {
        debugArea.style.display = "none";
      }

      const hitoWrapper = document.querySelector(".hito-wrapper");
      if (hitoWrapper) {
        hitoWrapper.classList.add("animate");
      }

      const hamaru = document.querySelector(".hamaru");
      if (hamaru) {
        hamaru.style.display = "block";
        setTimeout(() => {
          hamaru.classList.add("fadein");
        }, 50);
      }

      const guruguru = document.querySelector(".goal-guruguru");
      if (guruguru) {
        guruguru.style.opacity = 0;
        guruguru.style.display = "block";
        guruguru.style.transition = "opacity 1s ease";

        setTimeout(() => {
          guruguru.style.opacity = 1;

          // 表示開始から1秒後にリセット処理を実行
          setTimeout(() => {
            resetGame();
          }, 1000);

          setTimeout(() => {
            guruguru.style.opacity = 0;

            setTimeout(() => {
              guruguru.style.display = "none";
            }, 1000);
          }, 2500);
        }, 3000);
      }
    }
  }
});

// ポップアップウィンドウから親ウィンドウへ座標を送る処理
setInterval(() => {
  if (window.opener) {
    window.opener.postMessage({ x: window.screenX, y: window.screenY }, "*");
  }
}, 100);


// リセット関数
function resetGame() {
  // ゴール判定の旗をリセット
  triangleShown = false;

  // クリア時に表示した画像を非表示に
  const triangle = document.querySelector(".triangle");
  if (triangle) {
    triangle.style.display = "none";
  }

  // 「ヒト」のアニメーションクラスを削除して、元の位置に戻す準備
  const hitoWrapper = document.querySelector(".hito-wrapper");
  if (hitoWrapper) {
    hitoWrapper.classList.remove("animate");
  }

  // 「ハマる」のエフェクトを非表示＆クラス削除
  const hamaru = document.querySelector(".hamaru");
  if (hamaru) {
      hamaru.style.display = "none";
      hamaru.classList.remove("fadein");
  }

  console.log("ゲームがリセットされました。もう一度プレイできます。");
}