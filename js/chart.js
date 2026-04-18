// Forecast Chart (vanilla canvas, no deps)
(function () {
  function drawForecastChart() {
    const canvas = document.getElementById('forecastChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.parentElement.offsetWidth || 400;
    const H = 180;
    canvas.width = W;
    canvas.height = H;

    const pad = { top: 20, right: 20, bottom: 30, left: 36 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;

    // Data — 30 day forecast
    const days = 30;
    const predicted = [];
    const withNudges = [];
    for (let i = 0; i < days; i++) {
      // Predicted drop-off (sigmoid decay)
      const t = i / (days - 1);
      predicted.push(0.9 - 0.55 * (1 / (1 + Math.exp(-8 * (t - 0.5)))) + (Math.random() - 0.5) * 0.03);
      // With AI nudges (stays higher)
      withNudges.push(0.88 - 0.2 * t + (Math.random() - 0.5) * 0.02);
    }

    function toX(i) { return pad.left + (i / (days - 1)) * chartW; }
    function toY(v) { return pad.top + (1 - v) * chartH; }

    // Grid lines
    ctx.strokeStyle = 'rgba(255,34,51,0.08)';
    ctx.lineWidth = 1;
    for (let g = 0; g <= 4; g++) {
      const y = pad.top + (g / 4) * chartH;
      ctx.beginPath();
      ctx.moveTo(pad.left, y);
      ctx.lineTo(pad.left + chartW, y);
      ctx.stroke();
      // Y labels
      ctx.fillStyle = 'rgba(90,53,69,0.8)';
      ctx.font = '9px Space Mono, monospace';
      ctx.fillText(Math.round((1 - g / 4) * 100) + '%', 2, y + 4);
    }

    // X axis labels
    ctx.fillStyle = 'rgba(90,53,69,0.8)';
    ctx.font = '9px Space Mono, monospace';
    ctx.fillText('Day 1', pad.left, H - 6);
    ctx.fillText('Day 15', pad.left + chartW / 2 - 12, H - 6);
    ctx.fillText('Day 30', pad.left + chartW - 28, H - 6);

    // Draw filled area for predicted
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(predicted[0]));
    for (let i = 1; i < days; i++) ctx.lineTo(toX(i), toY(predicted[i]));
    ctx.lineTo(toX(days - 1), pad.top + chartH);
    ctx.lineTo(toX(0), pad.top + chartH);
    ctx.closePath();
    const grad1 = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    grad1.addColorStop(0, 'rgba(255,34,51,0.2)');
    grad1.addColorStop(1, 'rgba(255,34,51,0)');
    ctx.fillStyle = grad1;
    ctx.fill();

    // Draw predicted line
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(predicted[0]));
    for (let i = 1; i < days; i++) ctx.lineTo(toX(i), toY(predicted[i]));
    ctx.strokeStyle = '#ff2233';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw nudge area
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(withNudges[0]));
    for (let i = 1; i < days; i++) ctx.lineTo(toX(i), toY(withNudges[i]));
    ctx.lineTo(toX(days - 1), pad.top + chartH);
    ctx.lineTo(toX(0), pad.top + chartH);
    ctx.closePath();
    const grad2 = ctx.createLinearGradient(0, pad.top, 0, pad.top + chartH);
    grad2.addColorStop(0, 'rgba(0,255,136,0.12)');
    grad2.addColorStop(1, 'rgba(0,255,136,0)');
    ctx.fillStyle = grad2;
    ctx.fill();

    // Draw nudge line
    ctx.beginPath();
    ctx.moveTo(toX(0), toY(withNudges[0]));
    for (let i = 1; i < days; i++) ctx.lineTo(toX(i), toY(withNudges[i]));
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 3]);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  window.addEventListener('load', () => {
    setTimeout(drawForecastChart, 200);
    window.addEventListener('resize', drawForecastChart);
  });
})();
