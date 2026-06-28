/* ==========================================================================
   TaskFlow Pro — Dashboard View Component
   ========================================================================== */
import { state } from '../state.js';
import { TaskCard } from '../components/TaskCard.js';
import { showToast } from '../components/Toast.js';

export class DashboardView {
  constructor(container) {
    this.container = container;
  }

  render() {
    const tasks = state.data.tasks;
    const user = state.data.user;
    
    // Core statistics
    const total = tasks.length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'progress').length;
    const review = tasks.filter(t => t.status === 'review').length;
    
    const todayStr = new Date().toDateString();
    const overdue = tasks.filter(t => t.status !== 'completed' && t.dueDate && new Date(t.dueDate) < new Date(todayStr)).length;
    
    // Calculate productivity score
    const activeTasks = tasks.filter(t => t.status !== 'completed').length;
    const completedWeight = completed * 10;
    const inProgressWeight = inProgress * 5;
    const reviewWeight = review * 8;
    const totalWeight = total > 0 ? (completedWeight + inProgressWeight + reviewWeight) / (total * 10) : 0;
    const productivityScore = Math.min(100, Math.round(totalWeight * 100));

    // Circle progress ring math (r = 55)
    const radius = 55;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (productivityScore / 100) * circumference;

    // Filter recent active tasks (up to 4)
    const recentTasks = [...tasks]
      .filter(t => t.status !== 'completed')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 4);

    // Filter upcoming deadlines (up to 4)
    const upcomingDeadlines = [...tasks]
      .filter(t => t.status !== 'completed' && t.dueDate)
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 4);

    // Dynamic quotes selection
    const quotes = [
      "Your focus determines your reality. Make today count.",
      "The only way to do great work is to love what you do.",
      "Focus on being productive instead of busy.",
      "Efficiency is doing things right; effectiveness is doing the right things.",
      "Productivity is never an accident. It is always the result of a commitment to excellence."
    ];
    const dailyQuote = quotes[Math.floor((new Date().getDate()) % quotes.length)];

    // Generate Weekly Completion SVG data coordinates
    const weeklyData = this.getWeeklyCompletionStats(tasks);
    const maxVal = Math.max(...weeklyData.map(d => d.count), 2);
    
    // Generate SVG Sparkline coords (500 width, 120 height)
    const width = 500;
    const height = 120;
    const paddingX = 30;
    const paddingY = 20;
    
    const chartPoints = weeklyData.map((d, i) => {
      const x = paddingX + (i * (width - 2 * paddingX) / 6);
      const y = height - paddingY - (d.count / maxVal) * (height - 2 * paddingY);
      return { x, y, day: d.day, count: d.count };
    });

    let sparklineD = '';
    let areaD = '';
    if (chartPoints.length > 0) {
      // Create SVG bezier curve (or straight line)
      sparklineD = `M ${chartPoints[0].x} ${chartPoints[0].y}`;
      for (let i = 1; i < chartPoints.length; i++) {
        // Simple smooth cubic curves
        const prev = chartPoints[i - 1];
        const curr = chartPoints[i];
        const cpX1 = prev.x + (curr.x - prev.x) / 2;
        const cpY1 = prev.y;
        const cpX2 = prev.x + (curr.x - prev.x) / 2;
        const cpY2 = curr.y;
        sparklineD += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${curr.x} ${curr.y}`;
      }
      
      // Bottom coordinates to close area
      areaD = `${sparklineD} L ${chartPoints[chartPoints.length - 1].x} ${height - paddingY} L ${chartPoints[0].x} ${height - paddingY} Z`;
    }

    this.container.innerHTML = `
      <div class="view-wrapper">
        <!-- Hero Welcomer -->
        <section class="hero-section">
          <div class="hero-welcome">
            <span class="motivation-tag">Daily Motivation</span>
            <h1>Good day, ${user.name.split(' ')[0]}</h1>
            <p>"${dailyQuote}"</p>
          </div>
          <div class="hero-stats-quick" style="text-align: right; display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 12px; color: var(--text-secondary); font-weight: 500;">Current Local Time</span>
            <span style="font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--primary);">
              ${new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
          </div>
        </section>

        <!-- Stats Grid -->
        <section class="stats-grid">
          <div class="stat-card stat-total">
            <div class="stat-header">
              <span class="stat-title">Total Tasks</span>
              <div class="stat-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="9"></line><line x1="9" y1="13" x2="15" y2="13"></line><line x1="9" y1="17" x2="15" y2="17"></line></svg>
              </div>
            </div>
            <span class="stat-value">${total}</span>
            <span class="stat-subtitle">Tasks in workspace</span>
          </div>
          
          <div class="stat-card stat-pending">
            <div class="stat-header">
              <span class="stat-title">Pending</span>
              <div class="stat-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
            </div>
            <span class="stat-value">${pending}</span>
            <span class="stat-subtitle">Waiting for start</span>
          </div>

          <div class="stat-card stat-completed">
            <div class="stat-header">
              <span class="stat-title">Completed</span>
              <div class="stat-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
            </div>
            <span class="stat-value">${completed}</span>
            <span class="stat-subtitle">Tasks resolved</span>
          </div>

          <div class="stat-card stat-overdue">
            <div class="stat-header">
              <span class="stat-title">Overdue</span>
              <div class="stat-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></svg>
              </div>
            </div>
            <span class="stat-value" style="color: ${overdue > 0 ? 'var(--accent-red)' : 'inherit'}">${overdue}</span>
            <span class="stat-subtitle">Past due date</span>
          </div>

          <div class="stat-card stat-score">
            <div class="stat-header">
              <span class="stat-title">Score</span>
              <div class="stat-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
            </div>
            <span class="stat-value">${productivityScore}%</span>
            <span class="stat-subtitle">Productivity grade</span>
          </div>
        </section>

        <!-- Dashboard Layout Grid Widgets -->
        <section class="dashboard-grid">
          <!-- Left side: Chart and Recent tasks -->
          <div style="display: flex; flex-direction: column; gap: 30px;">
            
            <!-- Weekly Productivity Chart -->
            <div class="widget-card">
              <div class="widget-title-area">
                <h3 class="widget-title">Weekly Productivity Trend</h3>
                <span style="font-size: 12px; color: var(--text-muted);">Completed tasks last 7 days</span>
              </div>
              <div class="chart-container">
                <svg class="chart-svg" viewBox="0 0 500 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chart-gradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stop-color="var(--primary)" />
                      <stop offset="100%" stop-color="var(--accent-purple)" />
                    </linearGradient>
                    <linearGradient id="chart-bg-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stop-color="var(--primary)" stop-opacity="0.2" />
                      <stop offset="100%" stop-color="var(--primary)" stop-opacity="0" />
                    </linearGradient>
                  </defs>
                  
                  <!-- Grid lines -->
                  <line class="chart-grid-line" x1="30" y1="20" x2="470" y2="20"></line>
                  <line class="chart-grid-line" x1="30" y1="60" x2="470" y2="60"></line>
                  <line class="chart-grid-line" x1="30" y1="100" x2="470" y2="100"></line>
                  
                  <!-- Fill Area -->
                  ${areaD ? `<path class="sparkline-fill" d="${areaD}"></path>` : ''}
                  <!-- Sparkline Line -->
                  ${sparklineD ? `<path class="sparkline-path" d="${sparklineD}"></path>` : ''}
                  
                  <!-- Data Dots -->
                  ${chartPoints.map(p => `
                    <circle class="sparkline-dot" cx="${p.x}" cy="${p.y}" r="4">
                      <title>${p.count} Tasks completed on ${p.day}</title>
                    </circle>
                  `).join('')}
                </svg>
                
                <!-- Chart Labels -->
                <div class="chart-labels">
                  ${weeklyData.map(d => `<span class="chart-label">${d.day}</span>`).join('')}
                </div>
              </div>
            </div>

            <!-- Recent Active Tasks -->
            <div class="widget-card">
              <div class="widget-title-area">
                <h3 class="widget-title">Recent Work In Progress</h3>
                <a href="#" id="view-all-tasks-link" style="font-size: 12px; color: var(--primary); text-decoration: none; font-weight: 600;">View All</a>
              </div>
              <div id="dashboard-recent-tasks">
                ${recentTasks.length > 0 ? recentTasks.map(t => TaskCard.renderListRow(t)).join('') : this.getEmptyStateHtml()}
              </div>
            </div>
          </div>

          <!-- Right side: Productivity score and upcoming deadlines -->
          <div style="display: flex; flex-direction: column; gap: 30px;">
            
            <!-- Circular Progress Ring -->
            <div class="widget-card" style="position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 260px;">
              <div class="widget-title-area" style="width: 100%; position: absolute; top: 24px; left: 24px;">
                <h3 class="widget-title">Workspace Pulse</h3>
              </div>
              
              <div class="progress-ring-container">
                <svg class="progress-ring-svg">
                  <defs>
                    <linearGradient id="ring-gradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stop-color="var(--primary)" />
                      <stop offset="100%" stop-color="var(--accent-purple)" />
                    </linearGradient>
                  </defs>
                  <!-- Background circle -->
                  <circle class="progress-ring-circle-bg" cx="70" cy="70" r="${radius}"></circle>
                  <!-- Foreground circle representing score -->
                  <circle class="progress-ring-circle-val" cx="70" cy="70" r="${radius}"
                          stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}"></circle>
                </svg>
                <div class="progress-ring-text">
                  <span class="progress-ring-score">${productivityScore}%</span>
                  <span class="progress-ring-label">Productive</span>
                </div>
              </div>
            </div>

            <!-- Upcoming Deadlines -->
            <div class="widget-card">
              <div class="widget-title-area">
                <h3 class="widget-title">Upcoming Deadlines</h3>
                <span style="font-size: 11px; font-weight: 600; color: var(--accent-red); background: var(--accent-red-light); padding: 2px 6px; border-radius: 8px;">Due soon</span>
              </div>
              <div class="deadlines-list" style="display: flex; flex-direction: column; gap: 8px;">
                ${upcomingDeadlines.length > 0 ? upcomingDeadlines.map(t => this.renderDeadlineItem(t)).join('') : `
                  <div style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 20px 0;">
                    No upcoming deadlines! Let's celebrate.
                  </div>
                `}
              </div>
            </div>
          </div>
        </section>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Task Complete Click handling inside recent tasks
    const recentTasksContainer = document.getElementById('dashboard-recent-tasks');
    if (recentTasksContainer) {
      recentTasksContainer.addEventListener('click', async (e) => {
        const checkbox = e.target.closest('.task-row-checkbox');
        if (checkbox) {
          const taskId = checkbox.dataset.id;
          const task = state.data.tasks.find(t => t.id === taskId);
          if (task) {
            const newStatus = task.status === 'completed' ? 'pending' : 'completed';
            state.updateTask(taskId, { status: newStatus });
            showToast(`Task marked as ${newStatus}!`, 'success');
          }
        }
      });
    }

    // "View All" tasks redirection click
    const viewAllLink = document.getElementById('view-all-tasks-link');
    if (viewAllLink) {
      viewAllLink.addEventListener('click', (e) => {
        e.preventDefault();
        state.setView('tasks');
      });
    }
  }

  // Calculate task completions by day for the last 7 days
  getWeeklyCompletionStats(tasks) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const results = [];
    
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = days[d.getDay()];
      const dateString = d.toISOString().split('T')[0];
      
      // Filter tasks completed on this specific day (or just due / created if completion date isn't saved)
      // Since we simulate completion date based on dueDate for mock data, or just check task.dueDate for ease:
      const count = tasks.filter(t => t.status === 'completed' && t.dueDate === dateString).length;
      results.push({ day: dayName, count });
    }
    
    return results;
  }

  // Format a compact deadline list item
  renderDeadlineItem(task) {
    const isOverdue = new Date(task.dueDate) < new Date(new Date().toDateString());
    const dateClass = isOverdue ? 'task-date-warning' : 'task-date-normal';
    const relativeTime = TaskCard.formatDate(task.dueDate);

    return `
      <div class="task-item-compact" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding: 10px 0;">
        <div style="display: flex; flex-direction: column; overflow: hidden; max-width: 70%;">
          <span style="font-size: 13px; font-weight: 600; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${task.title}</span>
          <span style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">${task.category}</span>
        </div>
        <span class="${dateClass}" style="font-size: 12px; font-weight: 500;">${relativeTime}</span>
      </div>
    `;
  }

  getEmptyStateHtml() {
    return `
      <div style="padding: 30px; text-align: center; color: var(--text-muted); font-size: 13px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--text-muted);"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <span>No active tasks in progress! Ready to add some work?</span>
      </div>
    `;
  }
}
