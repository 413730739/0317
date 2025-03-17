let x;
let y;
let segments = 20; // 增加分段數量以使線條更加平滑
let segmentLengths = []; // 儲存每條線的長度
let amplitudes = []; // 儲存每條線的擺動幅度

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container'); // 將 canvas 放入指定的 div 中
  colorMode(HSB, 360, 100, 100, 1); // 設置顏色模式為 HSB，並啟用透明度
  x = width / 2;
  y = height;
  
  // 為每條線生成隨機的長度和擺動幅度
  for (let j = 0; j < 50; j++) {
    segmentLengths[j] = random(150, 450) / segments; // 每段的長度，總長度介於80到100之間
    amplitudes[j] = random(20, 50); // 每條線的擺動幅度介於20到45之間
  }
}

function draw() {
  clear(); // 清除畫布，保持背景透明
  // 設定線條粗細
  strokeWeight(50); // 增加線條粗細
  noFill(); // 不填充
  
  // 繪製多條線
  for (let j = 0; j < 50; j++) { // 產生50條線
    let offsetX = j * (width / 40); // 每條線的初始 x 座標間隔畫布寬度的1/40
    let amplitude = amplitudes[j]; // 使用預先生成的擺動幅度
    let segmentLength = segmentLengths[j]; // 使用預先生成的長度
    
    // 設置每條線的顏色，色相隨 j 變化，飽和度和亮度固定，透明度設置為0.5
    stroke((j * 14) % 360, 80, 90, 0.5); // 使用 HSB 顏色模式，色相值隨 j 變化，飽和度和亮度固定，透明度設置為0.5
    
    beginShape();
    let baseX = offsetX;
    for (let i = 0; i <= segments; i++) {
      let xOffset = sin(frameCount * 0.05 + i * 0.5 + j) * amplitude / 7; // 每段的 x 座標偏移量
      let x = baseX + xOffset;
      let y = height - i * segmentLength;
      vertex(x, y);
      baseX = x; // 更新 baseX 以確保線條連續
    }
    endShape();
  }
}
