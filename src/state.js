/* ==========================================================================
   TaskFlow Pro — Reactive Global State Manager
   ========================================================================== */

class AppState {
  constructor() {
    this.listeners = [];
    this.load();
  }

  // Load from localStorage or seed initial mock data
  load() {
    const defaultCategories = ['design', 'development', 'marketing', 'personal', 'work'];
    
    // Seed initial mock tasks to demonstrate premium layouts
    const mockTasks = [
      {
        id: 'task-1',
        title: 'Design high-fidelity SaaS dashboard mockup',
        description: 'Establish the core layout, typography rules, glassmorphic visual system, and dark/light color palettes.',
        priority: 'high',
        status: 'completed',
        category: 'design',
        dueDate: this.getRelativeDate(-1),
        tags: ['UI/UX', 'Figma', 'Aesthetics'],
        subtasks: [
          { id: 'sub-1-1', title: 'Draft layouts in Figma', completed: true },
          { id: 'sub-1-2', title: 'Define semantic palettes', completed: true },
          { id: 'sub-1-3', title: 'Create interactive animations', completed: true }
        ],
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'task-2',
        title: 'Implement state manager and routing',
        description: 'Build central reactive state in src/state.js and simple modular router in src/main.js to swap dynamic views.',
        priority: 'high',
        status: 'progress',
        category: 'development',
        dueDate: this.getRelativeDate(0),
        tags: ['JS', 'Architecture', 'CleanCode'],
        subtasks: [
          { id: 'sub-2-1', title: 'Setup state schema with local storage sync', completed: true },
          { id: 'sub-2-2', title: 'Create event dispatcher for DOM updates', completed: true },
          { id: 'sub-2-3', title: 'Bind router and navigation triggers', completed: false }
        ],
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'task-3',
        title: 'Review analytics and SVG chart rendering',
        description: 'Verify dynamic calculation of coordinate arrays for spline lines, bars, and priority distribution donuts.',
        priority: 'medium',
        status: 'review',
        category: 'development',
        dueDate: this.getRelativeDate(1),
        tags: ['SVG', 'Charts', 'DataVis'],
        subtasks: [
          { id: 'sub-3-1', title: 'Double check donut sector arcs calculation', completed: true },
          { id: 'sub-3-2', title: 'Add hover tooltip lines to area chart', completed: false }
        ],
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'task-4',
        title: 'Prepare TaskFlow product copy and SEO',
        description: 'Craft headlines, meta descriptions, and clean outline templates to ensure highest search ranking index.',
        priority: 'low',
        status: 'pending',
        category: 'marketing',
        dueDate: this.getRelativeDate(3),
        tags: ['SEO', 'Copy', 'Growth'],
        subtasks: [
          { id: 'sub-4-1', title: 'Write features list page', completed: false },
          { id: 'sub-4-2', title: 'Optimize loading meta tags', completed: false }
        ],
        createdAt: new Date().toISOString()
      },
      {
        id: 'task-5',
        title: 'Conduct responsiveness and compatibility tests',
        description: 'Verify page layout scaling on iOS/Android viewports and check transition smoothness across multiple browsers.',
        priority: 'high',
        status: 'pending',
        category: 'work',
        dueDate: this.getRelativeDate(-2), // Overdue task representation
        tags: ['Testing', 'CSS Grid', 'Mobile'],
        subtasks: [
          { id: 'sub-5-1', title: 'Inspect layout at 375px', completed: false },
          { id: 'sub-5-2', title: 'Test keyboard focus on input forms', completed: false }
        ],
        createdAt: new Date().toISOString()
      }
    ];

    this.data = {
      user: JSON.parse(localStorage.getItem('tf_user')) || {
        name: 'Rashmi Rahangdale',
        role: 'Lead SaaS Architect'
      },
      tasks: JSON.parse(localStorage.getItem('tf_tasks')) || mockTasks,
      categories: JSON.parse(localStorage.getItem('tf_categories')) || defaultCategories,
      activeView: localStorage.getItem('tf_view') || 'dashboard',
      theme: localStorage.getItem('tf_theme') || 'dark',
      filters: {
        search: '',
        priority: 'all',
        status: 'all',
        category: 'all',
        sortBy: 'date-asc',
        date: ''
      }
    };
  }

  // Save current structure to localStorage
  save() {
    localStorage.setItem('tf_user', JSON.stringify(this.data.user));
    localStorage.setItem('tf_tasks', JSON.stringify(this.data.tasks));
    localStorage.setItem('tf_categories', JSON.stringify(this.data.categories));
    localStorage.setItem('tf_view', this.data.activeView);
    localStorage.setItem('tf_theme', this.data.theme);
  }

  // Publish state updates to all bound listeners/subscribers
  dispatch() {
    this.save();
    window.dispatchEvent(new CustomEvent('state-updated'));
  }

  /* --- Helper: Relative Date --- */
  getRelativeDate(offsetDays) {
    const d = new Date();
    d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  }

  /* --- Tasks Actions --- */
  addTask(task) {
    const newTask = {
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...task
    };
    this.data.tasks.push(newTask);
    this.dispatch();
    return newTask;
  }

  updateTask(taskId, updatedFields) {
    this.data.tasks = this.data.tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, ...updatedFields };
      }
      return t;
    });
    this.dispatch();
  }

  deleteTask(taskId) {
    this.data.tasks = this.data.tasks.filter(t => t.id !== taskId);
    this.dispatch();
  }

  toggleSubtask(taskId, subtaskId) {
    this.data.tasks = this.data.tasks.map(t => {
      if (t.id === taskId) {
        const updatedSubtasks = t.subtasks.map(sub => {
          if (sub.id === subtaskId) {
            return { ...sub, completed: !sub.completed };
          }
          return sub;
        });
        return { ...t, subtasks: updatedSubtasks };
      }
      return t;
    });
    this.dispatch();
  }

  /* --- User & Category Preferences --- */
  updateUser(name, role) {
    this.data.user = { name, role };
    this.dispatch();
  }

  addCategory(category) {
    const normalized = category.toLowerCase().trim();
    if (normalized && !this.data.categories.includes(normalized)) {
      this.data.categories.push(normalized);
      this.dispatch();
    }
  }

  removeCategory(category) {
    this.data.categories = this.data.categories.filter(c => c !== category);
    // Move tasks in deleted category to 'work' or default category
    this.data.tasks = this.data.tasks.map(t => {
      if (t.category === category) {
        return { ...t, category: 'work' };
      }
      return t;
    });
    this.dispatch();
  }

  /* --- Routing & Toggles --- */
  setView(viewName) {
    this.data.activeView = viewName;
    this.dispatch();
  }

  setTheme(themeName) {
    this.data.theme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);
    this.dispatch();
  }

  toggleTheme() {
    const nextTheme = this.data.theme === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  /* --- Filters Handling --- */
  setFilter(filterKey, value) {
    this.data.filters[filterKey] = value;
    this.dispatch();
  }

  clearFilters() {
    this.data.filters = {
      search: '',
      priority: 'all',
      status: 'all',
      category: 'all',
      sortBy: 'date-asc',
      date: ''
    };
    this.dispatch();
  }

  /* --- Resets --- */
  resetState() {
    localStorage.removeItem('tf_user');
    localStorage.removeItem('tf_tasks');
    localStorage.removeItem('tf_categories');
    localStorage.removeItem('tf_view');
    localStorage.removeItem('tf_theme');
    this.load();
    this.dispatch();
  }

  /* --- Computed Selectors --- */
  getFilteredTasks() {
    let filtered = [...this.data.tasks];
    const { search, priority, status, category, date, sortBy } = this.data.filters;

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.description.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Priority filter
    if (priority !== 'all') {
      filtered = filtered.filter(t => t.priority === priority);
    }

    // Status filter
    if (status !== 'all') {
      filtered = filtered.filter(t => t.status === status);
    }

    // Category filter
    if (category !== 'all') {
      filtered = filtered.filter(t => t.category === category);
    }

    // Date filter
    if (date) {
      filtered = filtered.filter(t => t.dueDate === date);
    }

    // Sorting
    filtered.sort((a, b) => {
      if (sortBy === 'date-asc') {
        return new Date(a.dueDate) - new Date(b.dueDate);
      } else if (sortBy === 'date-desc') {
        return new Date(b.dueDate) - new Date(a.dueDate);
      } else if (sortBy === 'priority-high') {
        const priorities = { high: 3, medium: 2, low: 1 };
        return priorities[b.priority] - priorities[a.priority];
      } else if (sortBy === 'priority-low') {
        const priorities = { high: 3, medium: 2, low: 1 };
        return priorities[a.priority] - priorities[b.priority];
      } else if (sortBy === 'alpha-asc') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'alpha-desc') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    return filtered;
  }
}

export const state = new AppState();
// Apply theme configuration on boot
document.documentElement.setAttribute('data-theme', state.data.theme);
