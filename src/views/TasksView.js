/* ==========================================================================
   TaskFlow Pro — Tasks View Component (List & Kanban Views)
   ========================================================================== */
import { state } from '../state.js';
import { TaskCard } from '../components/TaskCard.js';
import { showToast } from '../components/Toast.js';
import { confirmAction } from '../components/ConfirmDialog.js';

export class TasksView {
  constructor(container) {
    this.container = container;
    this.currentSubView = localStorage.getItem('tf_subview') || 'kanban'; // 'kanban' or 'list'
    this.activeMenuId = null; // Track open task action dropdowns
  }

  render() {
    const categories = state.data.categories;
    const filters = state.data.filters;

    this.container.innerHTML = `
      <div class="view-wrapper">
        <!-- Filters & Switcher Toolbar -->
        <div class="toolbar">
          <div class="toolbar-left">
            <!-- Search Inside View -->
            <div class="toolbar-search">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="view-search-input" placeholder="Filter current tasks..." value="${filters.search || ''}">
            </div>

            <!-- Priority Filter -->
            <select class="filter-select" id="filter-priority" aria-label="Filter by Priority">
              <option value="all" ${filters.priority === 'all' ? 'selected' : ''}>All Priorities</option>
              <option value="high" ${filters.priority === 'high' ? 'selected' : ''}>High Priority</option>
              <option value="medium" ${filters.priority === 'medium' ? 'selected' : ''}>Medium Priority</option>
              <option value="low" ${filters.priority === 'low' ? 'selected' : ''}>Low Priority</option>
            </select>

            <!-- Status Filter -->
            <select class="filter-select" id="filter-status" aria-label="Filter by Status">
              <option value="all" ${filters.status === 'all' ? 'selected' : ''}>All Statuses</option>
              <option value="pending" ${filters.status === 'pending' ? 'selected' : ''}>Pending</option>
              <option value="progress" ${filters.status === 'progress' ? 'selected' : ''}>In Progress</option>
              <option value="review" ${filters.status === 'review' ? 'selected' : ''}>Under Review</option>
              <option value="completed" ${filters.status === 'completed' ? 'selected' : ''}>Completed</option>
            </select>

            <!-- Category Filter -->
            <select class="filter-select" id="filter-category" aria-label="Filter by Category" style="text-transform: capitalize;">
              <option value="all">All Categories</option>
              ${categories.map(c => `
                <option value="${c}" ${filters.category === c ? 'selected' : ''}>${c}</option>
              `).join('')}
            </select>

            <!-- Sort Option -->
            <select class="filter-select" id="filter-sort" aria-label="Sort options">
              <option value="date-asc" ${filters.sortBy === 'date-asc' ? 'selected' : ''}>Due Date (Oldest)</option>
              <option value="date-desc" ${filters.sortBy === 'date-desc' ? 'selected' : ''}>Due Date (Newest)</option>
              <option value="priority-high" ${filters.sortBy === 'priority-high' ? 'selected' : ''}>Priority (High → Low)</option>
              <option value="priority-low" ${filters.sortBy === 'priority-low' ? 'selected' : ''}>Priority (Low → High)</option>
              <option value="alpha-asc" ${filters.sortBy === 'alpha-asc' ? 'selected' : ''}>Alphabetical (A → Z)</option>
            </select>

            <button class="btn-secondary" id="btn-clear-filters" style="padding: 6px 12px; font-size: 12px; border-radius: 8px;">
              Reset
            </button>
          </div>

          <div class="toolbar-right">
            <!-- Kanban vs List Switcher -->
            <div class="view-toggle">
              <button class="toggle-btn ${this.currentSubView === 'kanban' ? 'active' : ''}" id="toggle-kanban" title="Kanban Board View">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
              </button>
              <button class="toggle-btn ${this.currentSubView === 'list' ? 'active' : ''}" id="toggle-list" title="Detailed List View">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Render Target Grid -->
        <div id="tasks-viewport"></div>
      </div>
    `;

    this.bindEvents();
    this.renderViewport();
  }

  renderViewport() {
    const viewport = document.getElementById('tasks-viewport');
    if (!viewport) return;

    const tasks = state.getFilteredTasks();

    viewport.innerHTML = this.currentSubView === 'kanban' 
      ? this.renderKanbanBoard(tasks) 
      : this.renderListView(tasks);

    if (this.currentSubView === 'kanban') {
      this.bindDragEvents();
    }
  }

  renderKanbanBoard(tasks) {
    const statuses = [
      { id: 'pending', label: 'Pending', color: 'var(--text-muted)' },
      { id: 'progress', label: 'In Progress', color: 'var(--accent-purple)' },
      { id: 'review', label: 'Under Review', color: 'var(--accent-orange)' },
      { id: 'completed', label: 'Completed', color: 'var(--accent-emerald)' }
    ];

    return `
      <div class="kanban-container">
        ${statuses.map(col => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return `
            <div class="kanban-column" data-status="${col.id}">
              <div class="column-header">
                <div class="column-title">
                  <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${col.color};"></span>
                  <span>${col.label}</span>
                </div>
                <span class="column-count">${colTasks.length}</span>
              </div>
              <div class="column-cards">
                ${colTasks.length > 0 ? colTasks.map(t => TaskCard.renderKanban(t)).join('') : `
                  <div style="font-size: 11px; color: var(--text-muted); text-align: center; padding: 24px 0; border: 1px dashed var(--border-color); border-radius: 8px;">
                    Column empty
                  </div>
                `}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  renderListView(tasks) {
    if (tasks.length === 0) {
      return this.renderEmptyState();
    }

    return `
      <div class="list-container">
        ${tasks.map(t => TaskCard.renderListRow(t)).join('')}
      </div>
    `;
  }

  renderEmptyState() {
    return `
      <div class="empty-state">
        <svg class="empty-illustration" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        <h3 class="empty-title">No tasks found</h3>
        <p class="empty-desc">We couldn't find any tasks matching your filters. Try clearing search keywords or resetting dropdown selectors.</p>
        <button class="btn-primary" id="btn-empty-clear">Clear Filters</button>
      </div>
    `;
  }

  bindEvents() {
    const viewport = document.getElementById('tasks-viewport');

    // Handles view filters updates
    document.getElementById('view-search-input').addEventListener('input', (e) => {
      state.setFilter('search', e.target.value);
    });

    document.getElementById('filter-priority').addEventListener('change', (e) => {
      state.setFilter('priority', e.target.value);
    });

    document.getElementById('filter-status').addEventListener('change', (e) => {
      state.setFilter('status', e.target.value);
    });

    document.getElementById('filter-category').addEventListener('change', (e) => {
      state.setFilter('category', e.target.value);
    });

    document.getElementById('filter-sort').addEventListener('change', (e) => {
      state.setFilter('sortBy', e.target.value);
    });

    document.getElementById('btn-clear-filters').addEventListener('click', () => {
      state.clearFilters();
      showToast('Filters cleared', 'success');
    });

    const emptyClear = document.getElementById('btn-empty-clear');
    if (emptyClear) {
      emptyClear.addEventListener('click', () => {
        state.clearFilters();
      });
    }

    // Toggle board styles
    document.getElementById('toggle-kanban').addEventListener('click', () => {
      this.currentSubView = 'kanban';
      localStorage.setItem('tf_subview', 'kanban');
      this.render();
    });

    document.getElementById('toggle-list').addEventListener('click', () => {
      this.currentSubView = 'list';
      localStorage.setItem('tf_subview', 'list');
      this.render();
    });

    // Checkbox toggling inside list row
    if (viewport) {
      viewport.addEventListener('click', (e) => {
        const checkbox = e.target.closest('.task-row-checkbox');
        if (checkbox) {
          const taskId = checkbox.dataset.id;
          const task = state.data.tasks.find(t => t.id === taskId);
          if (task) {
            const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
            state.updateTask(taskId, { status: nextStatus });
            showToast(`Task status set to ${nextStatus}`, 'success');
          }
        }
      });
    }

    // Action menus actions binding
    this.bindCardActions();
  }

  // Handle Drag and Drop events
  bindDragEvents() {
    const cards = this.container.querySelectorAll('.task-card');
    const columns = this.container.querySelectorAll('.kanban-column');

    cards.forEach(card => {
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', card.dataset.id);
        card.style.opacity = '0.5';
      });

      card.addEventListener('dragend', () => {
        card.style.opacity = '1';
      });
    });

    columns.forEach(col => {
      col.addEventListener('dragover', (e) => {
        e.preventDefault();
        col.classList.add('drag-over');
      });

      col.addEventListener('dragleave', () => {
        col.classList.remove('drag-over');
      });

      col.addEventListener('drop', (e) => {
        e.preventDefault();
        col.classList.remove('drag-over');
        
        const taskId = e.dataTransfer.getData('text/plain');
        const newStatus = col.dataset.status;
        
        const task = state.data.tasks.find(t => t.id === taskId);
        if (task && task.status !== newStatus) {
          state.updateTask(taskId, { status: newStatus });
          showToast(`Task moved to ${newStatus}`, 'success');
        }
      });
    });
  }

  // Setup contextual dropdown card menus
  bindCardActions() {
    // Open action dropdown
    this.container.addEventListener('click', (e) => {
      const menuBtn = e.target.closest('.btn-card-menu');
      if (menuBtn) {
        e.stopPropagation();
        this.closeAllMenus();
        
        const taskId = menuBtn.dataset.id;
        this.openCardMenu(menuBtn, taskId);
      } else {
        this.closeAllMenus();
      }
    });

    // Handle document click to close menu
    document.addEventListener('click', () => this.closeAllMenus());
  }

  openCardMenu(button, taskId) {
    const parent = button.parentElement;
    
    const menu = document.createElement('div');
    menu.className = 'dropdown-menu';
    menu.id = `dropdown-${taskId}`;
    menu.innerHTML = `
      <button class="dropdown-item edit" data-id="${taskId}">Edit Task</button>
      <button class="dropdown-item dropdown-status-trigger" data-status="pending" data-id="${taskId}">Move to Pending</button>
      <button class="dropdown-item dropdown-status-trigger" data-status="progress" data-id="${taskId}">Move to Progress</button>
      <button class="dropdown-item dropdown-status-trigger" data-status="review" data-id="${taskId}">Move to Review</button>
      <button class="dropdown-item dropdown-status-trigger" data-status="completed" data-id="${taskId}">Move to Completed</button>
      <button class="dropdown-item delete" data-id="${taskId}">Delete Task</button>
    `;

    parent.appendChild(menu);
    this.activeMenuId = taskId;

    // Bind dropdown click options
    menu.addEventListener('click', async (e) => {
      e.stopPropagation();
      const target = e.target;
      const tid = target.dataset.id;

      if (target.classList.contains('edit')) {
        this.closeAllMenus();
        window.dispatchEvent(new CustomEvent('open-task-modal', { detail: { taskId: tid } }));
      } else if (target.classList.contains('dropdown-status-trigger')) {
        const nextStatus = target.dataset.status;
        state.updateTask(tid, { status: nextStatus });
        this.closeAllMenus();
        showToast(`Task moved to ${nextStatus}`, 'success');
      } else if (target.classList.contains('delete')) {
        this.closeAllMenus();
        
        const confirmed = await confirmAction(
          'Delete Task',
          'Are you sure you want to delete this task? This action is permanent and cannot be undone.',
          'Delete'
        );

        if (confirmed) {
          state.deleteTask(tid);
          showToast('Task deleted successfully', 'error');
        }
      }
    });
  }

  closeAllMenus() {
    const menus = this.container.querySelectorAll('.dropdown-menu');
    menus.forEach(m => m.remove());
    this.activeMenuId = null;
  }
}
