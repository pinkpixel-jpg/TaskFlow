/* ==========================================================================
   TaskFlow Pro — Main Bootstrapper & View Router
   ========================================================================== */
import { state } from './state.js';
import { Sidebar } from './components/Sidebar.js';
import { Header } from './components/Header.js';
import { TaskModal } from './components/TaskModal.js';
import { DashboardView } from './views/DashboardView.js';
import { TasksView } from './views/TasksView.js';
import { AnalyticsView } from './views/AnalyticsView.js';
import { CalendarView } from './views/CalendarView.js';
import { SettingsView } from './views/SettingsView.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Layout Shell Components
  const sidebarInstance = new Sidebar('sidebar');
  const headerInstance = new Header('main-header');
  const modalInstance = new TaskModal('modal-container');

  const contentContainer = document.getElementById('content-container');

  let currentViewInstance = null;
  let currentViewName = null;

  // 2. View Router Engine
  function route() {
    const activeView = state.data.activeView;

    // Optimize: if the view has not changed, attempt partial updates
    if (activeView === currentViewName && currentViewInstance) {
      if (activeView === 'tasks' && typeof currentViewInstance.renderViewport === 'function') {
        currentViewInstance.renderViewport();
        return;
      }
      // For other pages, a full re-instantiation and draw is clean and fast
    }

    // Dynamic view swapping
    contentContainer.innerHTML = '';

    switch (activeView) {
      case 'dashboard':
        currentViewInstance = new DashboardView(contentContainer);
        break;
      case 'tasks':
        currentViewInstance = new TasksView(contentContainer);
        break;
      case 'analytics':
        currentViewInstance = new AnalyticsView(contentContainer);
        break;
      case 'calendar':
        currentViewInstance = new CalendarView(contentContainer);
        break;
      case 'settings':
        currentViewInstance = new SettingsView(contentContainer);
        break;
      default:
        currentViewInstance = new DashboardView(contentContainer);
    }

    currentViewInstance.render();
    currentViewName = activeView;
  }

  // 3. Initial Boot Render
  route();

  // 4. Listen to central reactive updates
  window.addEventListener('state-updated', () => {
    route();
  });
});
