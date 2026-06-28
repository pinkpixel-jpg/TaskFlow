/* ==========================================================================
   TaskFlow Pro — Task Creation & Editing Modal
   ========================================================================== */
import { state } from '../state.js';
import { showToast } from '../components/Toast.js';

export class TaskModal {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.editingTaskId = null;
    this.subtasksList = []; // Array of subtasks for the currently open modal

    this.bindGlobalEvents();
  }

  bindGlobalEvents() {
    // Listen for custom trigger to open modal (either fresh or editing)
    window.addEventListener('open-task-modal', (e) => {
      const taskId = e.detail?.taskId || null;
      const prefilledDate = e.detail?.date || null;
      this.open(taskId, prefilledDate);
    });
  }

  open(taskId = null, prefilledDate = null) {
    this.editingTaskId = taskId;
    this.container.classList.add('active');
    
    let task = null;
    if (this.editingTaskId) {
      task = state.data.tasks.find(t => t.id === this.editingTaskId);
      this.subtasksList = task ? JSON.parse(JSON.stringify(task.subtasks)) : [];
    } else {
      this.subtasksList = [];
    }

    const categories = state.data.categories;
    const today = new Date().toISOString().split('T')[0];
    
    // Set default field values
    const titleVal = task ? task.title : '';
    const descVal = task ? task.description : '';
    const priorityVal = task ? task.priority : 'medium';
    const statusVal = task ? task.status : 'pending';
    const categoryVal = task ? task.category : 'work';
    const dateVal = task ? task.dueDate : (prefilledDate || today);
    const tagsVal = task ? task.tags.join(', ') : '';

    this.container.innerHTML = `
      <div class="modal-box">
        <div class="modal-header">
          <h3 class="modal-title">${this.editingTaskId ? 'Edit Task Detail' : 'Create New Task'}</h3>
          <button class="modal-close" id="modal-close-btn" aria-label="Close modal">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <form id="task-modal-form">
          <div class="modal-body">
            
            <!-- Title -->
            <div class="form-group">
              <label class="form-label" for="modal-task-title">Task Title</label>
              <input type="text" class="form-input" id="modal-task-title" placeholder="e.g. Design authentication pages" value="${titleVal}" required autocomplete="off">
            </div>

            <!-- Description -->
            <div class="form-group">
              <label class="form-label" for="modal-task-desc">Description</label>
              <textarea class="form-input" id="modal-task-desc" placeholder="Provide notes, specifications, or reference details..." style="min-height: 80px; resize: vertical;">${descVal}</textarea>
            </div>

            <!-- Priority, Status & Category grid -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px;">
              <div class="form-group">
                <label class="form-label" for="modal-task-priority">Priority</label>
                <select class="form-input" id="modal-task-priority">
                  <option value="low" ${priorityVal === 'low' ? 'selected' : ''}>Low</option>
                  <option value="medium" ${priorityVal === 'medium' ? 'selected' : ''}>Medium</option>
                  <option value="high" ${priorityVal === 'high' ? 'selected' : ''}>High</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="modal-task-status">Status</label>
                <select class="form-input" id="modal-task-status">
                  <option value="pending" ${statusVal === 'pending' ? 'selected' : ''}>Pending</option>
                  <option value="progress" ${statusVal === 'progress' ? 'selected' : ''}>In Progress</option>
                  <option value="review" ${statusVal === 'review' ? 'selected' : ''}>Review</option>
                  <option value="completed" ${statusVal === 'completed' ? 'selected' : ''}>Completed</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="modal-task-category">Category</label>
                <select class="form-input" id="modal-task-category" style="text-transform: capitalize;">
                  ${categories.map(c => `
                    <option value="${c}" ${categoryVal === c ? 'selected' : ''}>${c}</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <!-- Due Date & Tags Row -->
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="modal-task-date">Due Date</label>
                <input type="date" class="form-input" id="modal-task-date" value="${dateVal}" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="modal-task-tags">Tags (comma-separated)</label>
                <input type="text" class="form-input" id="modal-task-tags" placeholder="e.g. core, layout, refactor" value="${tagsVal}">
              </div>
            </div>

            <!-- Dynamic Subtasks Builder -->
            <div class="form-group" style="margin-top: 10px;">
              <label class="form-label" style="display: flex; justify-content: space-between; align-items: center;">
                <span>Subtasks Progress Checklist</span>
                <button type="button" class="btn-secondary" id="modal-btn-add-subtask" style="padding: 4px 8px; font-size: 11px; border-radius: 6px;">
                  + Add Item
                </button>
              </label>
              
              <div class="subtasks-form-list" id="modal-subtasks-container">
                <!-- Subtasks input items will be injected here -->
              </div>
            </div>

          </div>

          <div class="modal-footer">
            <button type="button" class="btn-secondary" id="modal-cancel-btn">Cancel</button>
            <button type="submit" class="btn-primary">${this.editingTaskId ? 'Save Task Updates' : 'Add New Task'}</button>
          </div>
        </form>
      </div>
    `;

    this.renderSubtasksList();
    this.bindEvents();
    
    // Set focus on title input on load
    const titleInput = document.getElementById('modal-task-title');
    if (titleInput) titleInput.focus();
  }

  renderSubtasksList() {
    const container = document.getElementById('modal-subtasks-container');
    if (!container) return;

    if (this.subtasksList.length === 0) {
      container.innerHTML = `
        <span style="font-size: 12px; color: var(--text-muted); font-style: italic;">No subtasks configured yet. Click "+ Add Item" to append.</span>
      `;
      return;
    }

    container.innerHTML = this.subtasksList.map((sub, idx) => `
      <div class="subtask-form-row" data-index="${idx}">
        <button type="button" class="task-row-checkbox ${sub.completed ? 'checked' : ''}" data-idx="${idx}" aria-label="Toggle subtask completion">
          ${sub.completed ? `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          ` : ''}
        </button>
        <input type="text" class="form-input subtask-title-input" data-idx="${idx}" placeholder="e.g. Code CSS templates" value="${sub.title}" required style="padding: 6px 10px;">
        <button type="button" class="btn-icon-danger btn-remove-subtask" data-idx="${idx}" aria-label="Delete subtask">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join('');
  }

  bindEvents() {
    const closeBtn = document.getElementById('modal-close-btn');
    const cancelBtn = document.getElementById('modal-cancel-btn');
    const form = document.getElementById('task-modal-form');
    const addSubtaskBtn = document.getElementById('modal-btn-add-subtask');
    const subtaskContainer = document.getElementById('modal-subtasks-container');

    const handleClose = () => {
      this.close();
    };

    closeBtn.addEventListener('click', handleClose);
    cancelBtn.addEventListener('click', handleClose);

    // Overlay click dismisses
    this.container.addEventListener('click', (e) => {
      if (e.target === this.container) {
        this.close();
      }
    });

    // Form submit handlers
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const title = document.getElementById('modal-task-title').value.trim();
      const description = document.getElementById('modal-task-desc').value.trim();
      const priority = document.getElementById('modal-task-priority').value;
      const status = document.getElementById('modal-task-status').value;
      const category = document.getElementById('modal-task-category').value;
      const dueDate = document.getElementById('modal-task-date').value;
      const tagsStr = document.getElementById('modal-task-tags').value;

      // Extract tags list
      const tags = tagsStr.split(',')
        .map(t => t.trim())
        .filter(t => t.length > 0);

      // Extract subtasks texts
      const subtaskInputs = this.container.querySelectorAll('.subtask-title-input');
      subtaskInputs.forEach(input => {
        const idx = parseInt(input.dataset.idx);
        this.subtasksList[idx].title = input.value.trim();
      });

      const taskData = {
        title,
        description,
        priority,
        status,
        category,
        dueDate,
        tags,
        subtasks: this.subtasksList
      };

      if (this.editingTaskId) {
        state.updateTask(this.editingTaskId, taskData);
        showToast('Task updated successfully!', 'success');
      } else {
        state.addTask(taskData);
        showToast('New task created!', 'success');
      }

      this.close();
    });

    // Subtask Checklist interactions (Add / Remove / Toggle check)
    addSubtaskBtn.addEventListener('click', () => {
      // Sync active titles from inputs to memory first
      const subtaskInputs = this.container.querySelectorAll('.subtask-title-input');
      subtaskInputs.forEach(input => {
        const idx = parseInt(input.dataset.idx);
        this.subtasksList[idx].title = input.value.trim();
      });

      this.subtasksList.push({
        id: `sub-${Date.now()}-${this.subtasksList.length}`,
        title: '',
        completed: false
      });
      this.renderSubtasksList();
    });

    if (subtaskContainer) {
      // Click delegation for toggle check and remove item buttons
      subtaskContainer.addEventListener('click', (e) => {
        // Toggle subtask checkbox click
        const checkbox = e.target.closest('.task-row-checkbox');
        if (checkbox) {
          const idx = parseInt(checkbox.dataset.idx);
          this.subtasksList[idx].completed = !this.subtasksList[idx].completed;
          this.renderSubtasksList();
          return;
        }

        // Delete subtask click
        const removeBtn = e.target.closest('.btn-remove-subtask');
        if (removeBtn) {
          const idx = parseInt(removeBtn.dataset.idx);
          this.subtasksList.splice(idx, 1);
          this.renderSubtasksList();
        }
      });
    }
  }

  close() {
    this.container.classList.remove('active');
    setTimeout(() => {
      this.container.innerHTML = '';
      this.editingTaskId = null;
      this.subtasksList = [];
    }, 200);
  }
}
