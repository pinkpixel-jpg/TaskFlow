/* ==========================================================================
   TaskFlow Pro — Sidebar Component
   ========================================================================== */
import { state } from '../state.js';

export class Sidebar {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    // Listen to state changes to update active states
    window.addEventListener('state-updated', () => this.updateActiveState());
    this.render();
    this.bindEvents();
  }

  render() {
    const user = state.data.user;
    const initialInitials = user.name.split(' ').map(n => n[0]).join('');

    this.container.innerHTML = `
      <!-- Brand Logo -->
      <div class="sidebar-logo">
        <div class="logo-icon">T</div>
        <span class="logo-text">TaskFlow Pro</span>
      </div>

      <!-- Navigation Links -->
      <nav class="sidebar-nav">
        <a class="nav-item" data-view="dashboard">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          Dashboard
        </a>
        <a class="nav-item" data-view="tasks">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 11 12 14 22 4"></polyline>
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
          </svg>
          Tasks
        </a>
        <a class="nav-item" data-view="analytics">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="20" x2="18" y2="10"></line>
            <line x1="12" y1="20" x2="12" y2="4"></line>
            <line x1="6" y1="20" x2="6" y2="14"></line>
          </svg>
          Analytics
        </a>
        <a class="nav-item" data-view="calendar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
          Calendar
        </a>
        <a class="nav-item" data-view="settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
          Settings
        </a>
      </nav>

      <!-- Sidebar User Profile Info -->
      <div class="sidebar-user">
        <div class="user-avatar" id="sidebar-user-avatar">${initialInitials}</div>
        <div class="user-info">
          <span class="user-name" id="sidebar-user-name">${user.name}</span>
          <span class="user-role" id="sidebar-user-role">${user.role}</span>
        </div>
      </div>
    `;
    this.updateActiveState();
  }

  bindEvents() {
    this.container.addEventListener('click', (e) => {
      const navItem = e.target.closest('.nav-item');
      if (navItem) {
        const view = navItem.dataset.view;
        state.setView(view);
        
        // Collapse mobile sidebar when navigating on mobile
        this.container.classList.remove('mobile-open');
      }
    });
  }

  updateActiveState() {
    const activeView = state.data.activeView;
    const items = this.container.querySelectorAll('.nav-item');
    items.forEach(item => {
      if (item.dataset.view === activeView) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update avatar and username if edited in settings
    const user = state.data.user;
    const initialsEl = document.getElementById('sidebar-user-avatar');
    const nameEl = document.getElementById('sidebar-user-name');
    const roleEl = document.getElementById('sidebar-user-role');
    
    if (initialsEl) initialsEl.textContent = user.name.split(' ').map(n => n[0]).join('');
    if (nameEl) nameEl.textContent = user.name;
    if (roleEl) roleEl.textContent = user.role;
  }
}
