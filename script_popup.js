setInterval(() => {
  const x = window.screenX;
  const y = window.screenY;

  // 親ウィンドウが存在するなら、位置情報を送る
  if (window.opener) {
    window.opener.postMessage({ x, y }, "*");
  }
}, 100);