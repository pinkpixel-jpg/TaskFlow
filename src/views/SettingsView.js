/* ==========================================================================
   TaskFlow Pro — Settings View Component
   ========================================================================== */
import { state } from '../state.js';
import { showToast } from '../components/Toast.js';
import { confirmAction } from '../components/ConfirmDialog.js';

export class SettingsView {
  constructor(container) {
    this.container = container;
  }

  render() {
    const user = state.data.user;
    const categories = state.data.categories;

    this.container.innerHTML = `
      <div class="view-wrapper">
        <div class="settings-container">
          
          <!-- Workspace Profile Config -->
          <div class="settings-card">
            <h3 class="settings-title">Workspace Profile</h3>
            <p class="settings-desc">Customize your workspace name and visual role signature.</p>
            
            <form id="settings-profile-form" style="display: flex; flex-direction: column; gap: 16px;">
              <div class="form-row">
                <div class="form-group">
                  <label class="form-label" for="settings-name">Full Name</label>
                  <input type="text" class="form-input" id="settings-name" value="${user.name}" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="settings-role">Professional Signature / Role</label>
                  <input type="text" class="form-input" id="settings-role" value="${user.role}" required>
                </div>
              </div>
              <div style="display: flex; justify-content: flex-end;">
                <button type="submit" class="btn-primary">Save Profile Changes</button>
              </div>
            </form>
          </div>

          <!-- Category Management -->
          <div class="settings-card">
            <h3 class="settings-title">Task Categories</h3>
            <p class="settings-desc">Create or remove workflow filters. Removing a category automatically resets associated tasks to the default category.</p>
            
            <!-- Active categories list -->
            <div class="settings-categories-list" id="settings-cat-list">
              ${categories.map(c => `
                <div class="category-tag-interactive" style="text-transform: capitalize;">
                  <span>${c}</span>
                  <button class="btn-remove-category" data-cat="${c}" title="Remove Category">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              `).join('')}
            </div>

            <!-- Create new category -->
            <div style="display: flex; gap: 12px; max-width: 400px; margin-top: 10px;">
              <input type="text" class="form-input" id="new-category-input" placeholder="e.g. Finance, Support..." style="flex: 1;">
              <button class="btn-secondary" id="btn-add-category">Add Category</button>
            </div>
          </div>

          <!-- Danger Zone Reset Settings -->
          <div class="settings-card" style="border-color: rgba(239, 68, 68, 0.2); background: rgba(239, 68, 68, 0.02);">
            <h3 class="settings-title" style="color: var(--accent-red);">System Reset Zone</h3>
            <p class="settings-desc">Clear local task cache data and restore default mock data configurations.</p>
            <div style="display: flex; justify-content: flex-start;">
              <button class="btn-danger" id="btn-reset-system">Reset Application Data</button>
            </div>
          </div>

        </div>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    // Submit user profile data
    const profileForm = document.getElementById('settings-profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('settings-name').value.trim();
        const role = document.getElementById('settings-role').value.trim();
        
        if (name && role) {
          state.updateUser(name, role);
          showToast('Profile configuration saved', 'success');
        }
      });
    }

    // Add category click
    const addCatBtn = document.getElementById('btn-add-category');
    if (addCatBtn) {
      addCatBtn.addEventListener('click', () => {
        const input = document.getElementById('new-category-input');
        const catValue = input.value.trim();
        
        if (catValue) {
          state.addCategory(catValue);
          input.value = '';
          this.render(); // Re-render settings list
          showToast(`Category "${catValue}" added!`, 'success');
        } else {
          showToast('Please type a category name first', 'warning');
        }
      });
    }

    // Remove category click delegation
    const catList = document.getElementById('settings-cat-list');
    if (catList) {
      catList.addEventListener('click', async (e) => {
        const removeBtn = e.target.closest('.btn-remove-category');
        if (removeBtn) {
          const category = removeBtn.dataset.cat;
          
          if (category === 'work') {
            showToast('The "work" category is a default system setting and cannot be deleted.', 'warning');
            return;
          }

          const confirmed = await confirmAction(
            'Delete Category',
            `Are you sure you want to delete the category "${category}"? Tasks currently in this category will be reassigned to the default "work" category.`,
            'Delete'
          );

          if (confirmed) {
            state.removeCategory(category);
            this.render();
            showToast(`Category "${category}" deleted`, 'error');
          }
        }
      });
    }

    // Reset system data click
    const resetBtn = document.getElementById('btn-reset-system');
    if (resetBtn) {
      resetBtn.addEventListener('click', async () => {
        const confirmed = await confirmAction(
          'Factory Reset TaskFlow Pro',
          'This will purge all your custom tasks, categories, and profile customization back to the original demo values. Are you sure you want to continue?',
          'Purge Data'
        );

        if (confirmed) {
          state.resetState();
          showToast('System data reset successfully', 'success');
          // Re-render settings to show seed profile values
          this.render();
        }
      });
    }
  }
}
