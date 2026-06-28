/* ==========================================================================
   TaskFlow Pro — Analytics View Component
   ========================================================================== */
import { state } from '../state.js';

export class AnalyticsView {
  constructor(container) {
    this.container = container;
  }

  render() {
    const tasks = state.data.tasks;
    const categories = state.data.categories;

    // Calculations
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const progress = tasks.filter(t => t.status === 'progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const review = tasks.filter(t => t.status === 'review').length;
    
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    // Priority Distribution
    const high = tasks.filter(t => t.priority === 'high').length;
    const medium = tasks.filter(t => t.priority === 'medium').length;
    const low = tasks.filter(t => t.priority === 'low').length;

    // SVG Donut Chart math (r = 40)
    // Circumference = 2 * Math.PI * 40 = 251.3
    const cVal = 251.3;
    const highPct = total > 0 ? high / total : 0;
    const medPct = total > 0 ? medium / total : 0;
    const lowPct = total > 0 ? low / total : 0;

    const highOffset = cVal - (highPct * cVal);
    const medOffset = cVal - (medPct * cVal);
    const lowOffset = cVal - (lowPct * cVal);

    // Rotations in degrees
    const highDeg = -90; // Start at top
    const medDeg = highDeg + (highPct * 360);
    const lowDeg = medDeg + (medPct * 360);

    // Category Distribution details
    const categoryCounts = categories.map(cat => {
      const count = tasks.filter(t => t.category === cat).length;
      return { category: cat, count };
    });
    const maxCatVal = Math.max(...categoryCounts.map(c => c.count), 1);

    // Weekly creation stats (last 7 days)
    const creationData = this.getWeeklyCreationStats(tasks);
    const maxCreation = Math.max(...creationData.map(d => d.count), 2);
    
    // SVG Creation Sparkline coords (500 width, 120 height)
    const width = 500;
    const height = 120;
    const paddingX = 30;
    const paddingY = 20;

    const chartPoints = creationData.map((d, i) => {
      const x = paddingX + (i * (width - 2 * paddingX) / 6);
      const y = height - paddingY - (d.count / maxCreation) * (height - 2 * paddingY);
      return { x, y, day: d.day, count: d.count };
    });

    let sparklineD = '';
    let areaD = '';
    if (chartPoints.length > 0) {
      sparklineD = `M ${chartPoints[0].x} ${chartPoints[0].y}`;
      for (let i = 1; i < chartPoints.length; i++) {
        const prev = chartPoints[i - 1];
        const curr = chartPoints[i];
        const cpX1 = prev.x + (curr.x - prev.x) / 2;
        const cpY1 = prev.y;
        const cpX2 = prev.x + (curr.x - prev.x) / 2;
        const cpY2 = curr.y;
        sparklineD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
      }
      areaD = `${sparklineD} L ${chartPoints[chartPoints.length - 1].x} ${height - paddingY} L ${chartPoints[0].x} ${height - paddingY} Z`;
    }

    this.container.innerHTML = `
      <div class="view-wrapper">
        <section class="analytics-grid">
          
          <!-- Stat 1: Overall Completion Rate -->
          <div class="analytics-widget" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 240px; text-align: center; position: relative;">
            <div style="position: absolute; top: 20px; left: 20px;">
              <h3 class="widget-title" style="font-size: 14px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Completion Rate</h3>
            </div>
            
            <div class="progress-ring-container" style="margin-top: 15px;">
              <svg class="progress-ring-svg" style="width: 120px; height: 120px;">
                <defs>
                  <linearGradient id="rate-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="var(--accent-emerald)" />
                    <stop offset="100%" stop-color="var(--primary)" />
                  </linearGradient>
                </defs>
                <circle class="progress-ring-circle-bg" cx="60" cy="60" r="45" stroke-width="8"></circle>
                <circle class="progress-ring-circle-val" cx="60" cy="60" r="45" stroke-width="8"
                        style="stroke: url(#rate-gradient); stroke-dasharray: 282.7; stroke-dashoffset: ${282.7 - (completionRate / 100) * 282.7};"></circle>
              </svg>
              <div class="progress-ring-text">
                <span class="progress-ring-score" style="font-size: 22px;">${completionRate}%</span>
                <span style="font-size: 9px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Finished</span>
              </div>
            </div>
          </div>

          <!-- Stat 2: Priority Distribution (Donut Chart) -->
          <div class="analytics-widget" style="min-height: 240px;">
            <h3 class="widget-title" style="font-size: 14px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 12px;">Priority Distribution</h3>
            
            <div class="donut-chart-container">
              <svg width="120" height="120" viewBox="0 0 100 100" style="overflow: visible;">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-color)" stroke-width="12"></circle>
                
                ${total > 0 ? `
                  <!-- High Priority Arc -->
                  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent-red)" stroke-width="12"
                          stroke-dasharray="${cVal}" stroke-dashoffset="${highOffset}"
                          style="transform-origin: 50px 50px; transform: rotate(${highDeg}deg); stroke-linecap: round;"></circle>
                  
                  <!-- Medium Priority Arc -->
                  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent-orange)" stroke-width="12"
                          stroke-dasharray="${cVal}" stroke-dashoffset="${medOffset}"
                          style="transform-origin: 50px 50px; transform: rotate(${medDeg}deg); stroke-linecap: round;"></circle>
                          
                  <!-- Low Priority Arc -->
                  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent-emerald)" stroke-width="12"
                          stroke-dasharray="${cVal}" stroke-dashoffset="${lowOffset}"
                          style="transform-origin: 50px 50px; transform: rotate(${lowDeg}deg); stroke-linecap: round;"></circle>
                ` : ''}
              </svg>

              <div class="donut-labels">
                <div class="donut-label-item">
                  <span class="donut-color-dot" style="background: var(--accent-red);"></span>
                  <span>High: <strong>${high}</strong> (${total > 0 ? Math.round(highPct * 100) : 0}%)</span>
                </div>
                <div class="donut-label-item">
                  <span class="donut-color-dot" style="background: var(--accent-orange);"></span>
                  <span>Medium: <strong>${medium}</strong> (${total > 0 ? Math.round(medPct * 100) : 0}%)</span>
                </div>
                <div class="donut-label-item">
                  <span class="donut-color-dot" style="background: var(--accent-emerald);"></span>
                  <span>Low: <strong>${low}</strong> (${total > 0 ? Math.round(lowPct * 100) : 0}%)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Weekly Creation line graph -->
          <div class="analytics-widget full-width">
            <div class="widget-title-area">
              <h3 class="widget-title" style="font-size: 14px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Weekly Tasks Volume</h3>
              <span style="font-size: 11px; color: var(--text-muted);">Number of tasks created daily</span>
            </div>
            
            <div class="chart-container" style="margin-top: 15px;">
              <svg class="chart-svg" viewBox="0 0 500 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="creation-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="var(--accent-purple)" />
                    <stop offset="100%" stop-color="var(--primary)" />
                  </linearGradient>
                  <linearGradient id="creation-bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--accent-purple)" stop-opacity="0.2" />
                    <stop offset="100%" stop-color="var(--accent-purple)" stop-opacity="0" />
                  </linearGradient>
                </defs>
                
                <line class="chart-grid-line" x1="30" y1="20" x2="470" y2="20"></line>
                <line class="chart-grid-line" x1="30" y1="60" x2="470" y2="60"></line>
                <line class="chart-grid-line" x1="30" y1="100" x2="470" y2="100"></line>
                
                ${areaD ? `<path class="sparkline-fill" d="${areaD}" style="fill: url(#creation-bg);"></path>` : ''}
                ${sparklineD ? `<path class="sparkline-path" d="${sparklineD}" style="stroke: url(#creation-gradient);"></path>` : ''}
                
                ${chartPoints.map(p => `
                  <circle class="sparkline-dot" cx="${p.x}" cy="${p.y}" r="4" style="fill: var(--accent-purple);">
                    <title>${p.count} Tasks created on ${p.day}</title>
                  </circle>
                `).join('')}
              </svg>
              
              <div class="chart-labels">
                ${creationData.map(d => `<span class="chart-label">${d.day}</span>`).join('')}
              </div>
            </div>
          </div>

          <!-- Category Breakdown Bar Chart -->
          <div class="analytics-widget full-width">
            <h3 class="widget-title" style="font-size: 14px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 20px;">Category Breakdown</h3>
            
            <div class="bar-chart-container">
              ${categoryCounts.map(item => {
                const percent = Math.max(10, Math.round((item.count / maxCatVal) * 100));
                return `
                  <div class="bar-row">
                    <div class="bar-row-info">
                      <span style="text-transform: capitalize; font-weight: 600;">${item.category}</span>
                      <span style="color: var(--text-secondary);">${item.count} tasks</span>
                    </div>
                    <div class="bar-track">
                      <div class="bar-fill" style="width: ${item.count > 0 ? percent : 0}%; background: linear-gradient(90deg, var(--primary), var(--accent-purple));"></div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
          
        </section>
      </div>
    `;
  }

  // Calculate task creations by day for the last 7 days
  getWeeklyCreationStats(tasks) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const results = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = days[d.getDay()];
      const dateString = d.toISOString().split('T')[0];
      
      const count = tasks.filter(t => {
        if (!t.createdAt) return false;
        return t.createdAt.split('T')[0] === dateString;
      }).length;
      
      results.push({ day: dayName, count });
    }
    
    return results;
  }
}
