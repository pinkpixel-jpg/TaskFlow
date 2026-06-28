/* ==========================================================================
   TaskFlow Pro — Header Component
   ========================================================================== */
import { state } from '../state.js';

export class Header {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    window.addEventListener('state-updated', () => this.updateHeader());
    this.render();
    this.bindEvents();
  }

  render() {
    const activeViewName = state.data.activeView;
    const searchVal = state.data.filters.search || '';
    const themeIcon = state.data.theme === 'dark' ? this.getSunIcon() : this.getMoonIcon();

    this.container.innerHTML = `
      <div style="display: flex; align-items: center;">
        <!-- Hamburger Menu for Mobile -->
        <button class="hamburger" id="hamburger-toggle" aria-label="Toggle Sidebar Menu">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        <!-- Section Title -->
        <h2 id="header-title" style="font-family: var(--font-display); font-size: 20px; font-weight: 700; text-transform: capitalize;">
          ${activeViewName}
        </h2>
      </div>

      <!-- Center / Search Bar -->
      <div class="header-search" id="header-search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="global-search-input" placeholder="Search tasks, descriptions, tags..." value="${searchVal}" autocomplete="off">
      </div>

      <!-- Right Header Actions -->
      <div class="header-actions">
        <!-- Light/Dark Theme Switcher -->
        <button class="btn-icon" id="theme-toggler" title="Toggle Theme" aria-label="Toggle Light/Dark Theme">
          ${themeIcon}
        </button>

        <!-- Create Task CTA -->
        <button class="btn-primary" id="btn-create-task" title="Add New Task">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          <span style="display: inline-block;">New Task</span>
        </button>
      </div>
    `;

    this.toggleSearchBarVisibility(activeViewName);
  }

  bindEvents() {
    this.container.addEventListener('click', (e) => {
      // Toggle theme
      if (e.target.closest('#theme-toggler')) {
        state.toggleTheme();
      }
      
      // Open Create Task Modal
      if (e.target.closest('#btn-create-task')) {
        window.dispatchEvent(new CustomEvent('open-task-modal'));
      }

      // Mobile Hamburger click
      if (e.target.closest('#hamburger-toggle')) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
          sidebar.classList.toggle('mobile-open');
        }
      }
    });

    // Handle typing on search
    this.container.addEventListener('input', (e) => {
      if (e.target.id === 'global-search-input') {
        state.setFilter('search', e.target.value);
      }
    });
  }

  updateHeader() {
    const titleEl = document.getElementById('header-title');
    const searchInput = document.getElementById('global-search-input');
    const themeToggler = document.getElementById('theme-toggler');
    const activeViewName = state.data.activeView;

    if (titleEl) {
      titleEl.textContent = activeViewName;
    }

    if (searchInput && state.data.filters.search !== searchInput.value) {
      searchInput.value = state.data.filters.search || '';
    }

    if (themeToggler) {
      themeToggler.innerHTML = state.data.theme === 'dark' ? this.getSunIcon() : this.getMoonIcon();
    }

    this.toggleSearchBarVisibility(activeViewName);
  }

  toggleSearchBarVisibility(view) {
    const searchBar = document.getElementById('header-search-bar');
    if (!searchBar) return;
    
    // Show search bar only on Dashboard and Tasks view, hide on settings/analytics/calendar
    if (view === 'dashboard' || view === 'tasks') {
      searchBar.classList.remove('hidden');
    } else {
      searchBar.classList.add('hidden');
    }
  }

  getSunIcon() {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
      </svg>
    `;
  }

  getMoonIcon() {
    return `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `;
  }
}
