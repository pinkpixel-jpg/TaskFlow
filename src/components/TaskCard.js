/* ==========================================================================
   TaskFlow Pro — Task Card Component
   ========================================================================== */
import { state } from '../state.js';

export class TaskCard {
  // Render a task card specifically for the Kanban columns
  static renderKanban(task) {
    const priorityClass = `badge-priority-${task.priority}`;
    
    // Subtask calculations
    const totalSubtasks = task.subtasks.length;
    const completedSubtasks = task.subtasks.filter(s => s.completed).length;
    const progressPercent = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;
    
    // Date coloring
    const isOverdue = task.status !== 'completed' && new Date(task.dueDate) < new Date(new Date().toDateString());
    const dateClass = isOverdue ? 'task-date-warning' : 'task-date-normal';
    const dateIconColor = isOverdue ? 'var(--accent-red)' : 'var(--text-muted)';
    
    // Tags list
    const tagsHtml = task.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');

    return `
      <div class="task-card" draggable="true" data-id="${task.id}">
        <div class="task-card-header">
          <span class="category-chip">${task.category}</span>
          <div class="task-card-actions">
            <button class="btn-card-menu" data-id="${task.id}" aria-label="Open Actions Menu">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>

        <h4 class="task-card-title">${task.title}</h4>
        <p class="task-card-desc">${task.description || 'No description provided.'}</p>

        <!-- Subtask Progress (if any exist) -->
        ${totalSubtasks > 0 ? `
          <div class="task-subtasks-wrapper">
            <div class="subtasks-label">
              <span>Subtasks</span>
              <span>${completedSubtasks}/${totalSubtasks}</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
            </div>
          </div>
        ` : ''}

        <div class="task-card-footer">
          <!-- Left tags and priority -->
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div class="task-card-tags">${tagsHtml}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge ${priorityClass}">${task.priority}</span>
            </div>
          </div>
          
          <!-- Right due date -->
          <div class="task-card-meta">
            <svg viewBox="0 0 24 24" fill="none" stroke="${dateIconColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span class="${dateClass}">${this.formatDate(task.dueDate)}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Render a task as a row for the List view
  static renderListRow(task) {
    const isCompleted = task.status === 'completed';
    const checkClass = isCompleted ? 'checked' : '';
    const titleClass = isCompleted ? 'completed' : '';
    
    const priorityClass = `badge-priority-${task.priority}`;
    const statusClass = `badge-status-${task.status}`;
    
    const totalSubtasks = task.subtasks.length;
    const completedSubtasks = task.subtasks.filter(s => s.completed).length;
    
    const isOverdue = task.status !== 'completed' && new Date(task.dueDate) < new Date(new Date().toDateString());
    const dateClass = isOverdue ? 'task-date-warning' : 'task-date-normal';

    const tagsHtml = task.tags.map(t => `<span class="tag-pill">${t}</span>`).join('');

    return `
      <div class="task-list-row" data-id="${task.id}">
        <!-- Checkbox -->
        <div>
          <button class="task-row-checkbox ${checkClass}" data-id="${task.id}" aria-label="Mark completed">
            ${isCompleted ? `
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ` : ''}
          </button>
        </div>

        <!-- Title / Description -->
        <div class="task-row-title-area">
          <span class="task-row-title ${titleClass}">${task.title}</span>
          <span class="task-row-desc">${task.description || 'No description'}</span>
        </div>

        <!-- Tags -->
        <div class="task-row-tags">
          <span class="category-chip" style="margin-right: 4px;">${task.category}</span>
          ${tagsHtml}
        </div>

        <!-- Priority -->
        <div>
          <span class="badge ${priorityClass}">${task.priority}</span>
        </div>

        <!-- Status -->
        <div>
          <span class="badge ${statusClass}">${task.status}</span>
        </div>

        <!-- Due Date -->
        <div class="task-row-dates">
          <span class="${dateClass}">${this.formatDate(task.dueDate)}</span>
        </div>

        <!-- Subtasks Progress -->
        <div class="task-row-progress-text">
          ${totalSubtasks > 0 ? `${completedSubtasks}/${totalSubtasks} Subtasks` : '—'}
        </div>

        <!-- Actions Trigger -->
        <div class="task-row-actions">
          <button class="btn-card-menu" data-id="${task.id}" aria-label="Open Actions Menu">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  // Format YYYY-MM-DD to a more readable string like "Jun 28" or "Yesterday" / "Today"
  static formatDate(dateString) {
    if (!dateString) return 'No Date';
    
    const parts = dateString.split('-');
    const taskDate = new Date(parts[0], parts[1] - 1, parts[2]);
    const today = new Date();
    today.setHours(0,0,0,0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const taskTime = taskDate.getTime();
    
    if (taskTime === today.getTime()) {
      return 'Today';
    } else if (taskTime === yesterday.getTime()) {
      return 'Yesterday';
    } else if (taskTime === tomorrow.getTime()) {
      return 'Tomorrow';
    }
    
    // Default format "MMM DD"
    return taskDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}
