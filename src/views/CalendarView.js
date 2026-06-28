/* ==========================================================================
   TaskFlow Pro — Calendar View Component
   ========================================================================== */
import { state } from '../state.js';

export class CalendarView {
  constructor(container) {
    this.container = container;
    
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth(); // 0-indexed (Jan = 0)
  }

  render() {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const tasks = state.data.tasks;
    
    // Calendar calculation details
    const firstDayIndex = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const totalDays = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(this.currentYear, this.currentMonth, 0).getDate();
    
    const todayStr = new Date().toISOString().split('T')[0];

    // Array of days to render
    const cells = [];

    // Previous month filler days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      const year = this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
      const month = this.currentMonth === 0 ? 11 : this.currentMonth - 1;
      const day = prevMonthDays - i;
      cells.push({
        day,
        month,
        year,
        isCurrentMonth: false,
        dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      });
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      cells.push({
        day: d,
        month: this.currentMonth,
        year: this.currentYear,
        isCurrentMonth: true,
        dateStr: `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      });
    }

    // Next month filler days to round to multiples of 7
    const remaining = 42 - cells.length;
    for (let d = 1; d <= remaining; d++) {
      const year = this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
      const month = this.currentMonth === 11 ? 0 : this.currentMonth + 1;
      cells.push({
        day: d,
        month,
        year,
        isCurrentMonth: false,
        dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      });
    }

    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    this.container.innerHTML = `
      <div class="view-wrapper">
        <div class="calendar-widget">
          <!-- Calendar Nav -->
          <div class="calendar-header">
            <h3 class="calendar-nav-title" id="cal-month-title">
              ${monthNames[this.currentMonth]} ${this.currentYear}
            </h3>
            
            <div class="calendar-nav-buttons">
              <button class="btn-icon" id="cal-prev-btn" title="Previous Month">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
              </button>
              <button class="btn-secondary" id="cal-today-btn" style="padding: 6px 12px; font-size: 12px; border-radius: 8px;">
                Today
              </button>
              <button class="btn-icon" id="cal-next-btn" title="Next Month">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
              </button>
            </div>
          </div>

          <!-- Calendar Grid Layout -->
          <div class="calendar-grid">
            ${dayHeaders.map(h => `<div class="calendar-day-header">${h}</div>`).join('')}
            ${cells.map(c => {
              const cellTasks = tasks.filter(t => t.dueDate === c.dateStr);
              const cellClass = [
                'calendar-cell',
                !c.isCurrentMonth ? 'other-month' : '',
                c.dateStr === todayStr ? 'today' : ''
              ].filter(Boolean).join(' ');

              return `
                <div class="${cellClass}" data-date="${c.dateStr}">
                  <span class="calendar-cell-num">${c.day}</span>
                  <div style="display: flex; flex-direction: column; gap: 3px; overflow: hidden; width: 100%;">
                    ${cellTasks.map(t => {
                      let markerBg = 'var(--primary-light)';
                      let markerColor = 'var(--primary)';
                      
                      if (t.status === 'completed') {
                        markerBg = 'var(--accent-emerald-light)';
                        markerColor = 'var(--accent-emerald)';
                      } else if (t.priority === 'high') {
                        markerBg = 'var(--accent-red-light)';
                        markerColor = 'var(--accent-red)';
                      } else if (t.priority === 'medium') {
                        markerBg = 'var(--accent-orange-light)';
                        markerColor = 'var(--accent-orange)';
                      }

                      return `
                        <div class="calendar-task-marker" title="${t.title}" 
                             style="background: ${markerBg}; color: ${markerColor}; border-left: 2px solid ${markerColor}; text-decoration: ${t.status === 'completed' ? 'line-through' : 'none'};">
                          ${t.title}
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Navigation actions
    document.getElementById('cal-prev-btn').addEventListener('click', () => {
      this.currentMonth--;
      if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear--;
      }
      this.render();
    });

    document.getElementById('cal-next-btn').addEventListener('click', () => {
      this.currentMonth++;
      if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear++;
      }
      this.render();
    });

    document.getElementById('cal-today-btn').addEventListener('click', () => {
      const today = new Date();
      this.currentYear = today.getFullYear();
      this.currentMonth = today.getMonth();
      this.render();
    });

    // Clicking on cell launches modal with preselected due date
    const grid = this.container.querySelector('.calendar-grid');
    if (grid) {
      grid.addEventListener('click', (e) => {
        const cell = e.target.closest('.calendar-cell');
        if (cell) {
          const selectedDate = cell.dataset.date;
          // Dispatch opening create task modal with pre-filled due date
          window.dispatchEvent(new CustomEvent('open-task-modal', { 
            detail: { date: selectedDate } 
          }));
        }
      });
    }
  }
}
