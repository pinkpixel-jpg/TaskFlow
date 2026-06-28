(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))e(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const r of i.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&e(r)}).observe(document,{childList:!0,subtree:!0});function s(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(a){if(a.ep)return;a.ep=!0;const i=s(a);fetch(a.href,i)}})();class Y{constructor(){this.listeners=[],this.load()}load(){const t=["design","development","marketing","personal","work"],s=[{id:"task-1",title:"Design high-fidelity SaaS dashboard mockup",description:"Establish the core layout, typography rules, glassmorphic visual system, and dark/light color palettes.",priority:"high",status:"completed",category:"design",dueDate:this.getRelativeDate(-1),tags:["UI/UX","Figma","Aesthetics"],subtasks:[{id:"sub-1-1",title:"Draft layouts in Figma",completed:!0},{id:"sub-1-2",title:"Define semantic palettes",completed:!0},{id:"sub-1-3",title:"Create interactive animations",completed:!0}],createdAt:new Date(Date.now()-2592e5).toISOString()},{id:"task-2",title:"Implement state manager and routing",description:"Build central reactive state in src/state.js and simple modular router in src/main.js to swap dynamic views.",priority:"high",status:"progress",category:"development",dueDate:this.getRelativeDate(0),tags:["JS","Architecture","CleanCode"],subtasks:[{id:"sub-2-1",title:"Setup state schema with local storage sync",completed:!0},{id:"sub-2-2",title:"Create event dispatcher for DOM updates",completed:!0},{id:"sub-2-3",title:"Bind router and navigation triggers",completed:!1}],createdAt:new Date(Date.now()-1728e5).toISOString()},{id:"task-3",title:"Review analytics and SVG chart rendering",description:"Verify dynamic calculation of coordinate arrays for spline lines, bars, and priority distribution donuts.",priority:"medium",status:"review",category:"development",dueDate:this.getRelativeDate(1),tags:["SVG","Charts","DataVis"],subtasks:[{id:"sub-3-1",title:"Double check donut sector arcs calculation",completed:!0},{id:"sub-3-2",title:"Add hover tooltip lines to area chart",completed:!1}],createdAt:new Date(Date.now()-864e5).toISOString()},{id:"task-4",title:"Prepare TaskFlow product copy and SEO",description:"Craft headlines, meta descriptions, and clean outline templates to ensure highest search ranking index.",priority:"low",status:"pending",category:"marketing",dueDate:this.getRelativeDate(3),tags:["SEO","Copy","Growth"],subtasks:[{id:"sub-4-1",title:"Write features list page",completed:!1},{id:"sub-4-2",title:"Optimize loading meta tags",completed:!1}],createdAt:new Date().toISOString()},{id:"task-5",title:"Conduct responsiveness and compatibility tests",description:"Verify page layout scaling on iOS/Android viewports and check transition smoothness across multiple browsers.",priority:"high",status:"pending",category:"work",dueDate:this.getRelativeDate(-2),tags:["Testing","CSS Grid","Mobile"],subtasks:[{id:"sub-5-1",title:"Inspect layout at 375px",completed:!1},{id:"sub-5-2",title:"Test keyboard focus on input forms",completed:!1}],createdAt:new Date().toISOString()}];this.data={user:JSON.parse(localStorage.getItem("tf_user"))||{name:"Rashmi Rahangdale",role:"Lead SaaS Architect"},tasks:JSON.parse(localStorage.getItem("tf_tasks"))||s,categories:JSON.parse(localStorage.getItem("tf_categories"))||t,activeView:localStorage.getItem("tf_view")||"dashboard",theme:localStorage.getItem("tf_theme")||"dark",filters:{search:"",priority:"all",status:"all",category:"all",sortBy:"date-asc",date:""}}}save(){localStorage.setItem("tf_user",JSON.stringify(this.data.user)),localStorage.setItem("tf_tasks",JSON.stringify(this.data.tasks)),localStorage.setItem("tf_categories",JSON.stringify(this.data.categories)),localStorage.setItem("tf_view",this.data.activeView),localStorage.setItem("tf_theme",this.data.theme)}dispatch(){this.save(),window.dispatchEvent(new CustomEvent("state-updated"))}getRelativeDate(t){const s=new Date;return s.setDate(s.getDate()+t),s.toISOString().split("T")[0]}addTask(t){const s={id:`task-${Date.now()}`,createdAt:new Date().toISOString(),...t};return this.data.tasks.push(s),this.dispatch(),s}updateTask(t,s){this.data.tasks=this.data.tasks.map(e=>e.id===t?{...e,...s}:e),this.dispatch()}deleteTask(t){this.data.tasks=this.data.tasks.filter(s=>s.id!==t),this.dispatch()}toggleSubtask(t,s){this.data.tasks=this.data.tasks.map(e=>{if(e.id===t){const a=e.subtasks.map(i=>i.id===s?{...i,completed:!i.completed}:i);return{...e,subtasks:a}}return e}),this.dispatch()}updateUser(t,s){this.data.user={name:t,role:s},this.dispatch()}addCategory(t){const s=t.toLowerCase().trim();s&&!this.data.categories.includes(s)&&(this.data.categories.push(s),this.dispatch())}removeCategory(t){this.data.categories=this.data.categories.filter(s=>s!==t),this.data.tasks=this.data.tasks.map(s=>s.category===t?{...s,category:"work"}:s),this.dispatch()}setView(t){this.data.activeView=t,this.dispatch()}setTheme(t){this.data.theme=t,document.documentElement.setAttribute("data-theme",t),this.dispatch()}toggleTheme(){const t=this.data.theme==="dark"?"light":"dark";this.setTheme(t)}setFilter(t,s){this.data.filters[t]=s,this.dispatch()}clearFilters(){this.data.filters={search:"",priority:"all",status:"all",category:"all",sortBy:"date-asc",date:""},this.dispatch()}resetState(){localStorage.removeItem("tf_user"),localStorage.removeItem("tf_tasks"),localStorage.removeItem("tf_categories"),localStorage.removeItem("tf_view"),localStorage.removeItem("tf_theme"),this.load(),this.dispatch()}getFilteredTasks(){let t=[...this.data.tasks];const{search:s,priority:e,status:a,category:i,date:r,sortBy:n}=this.data.filters;if(s.trim()){const l=s.toLowerCase();t=t.filter(d=>d.title.toLowerCase().includes(l)||d.description.toLowerCase().includes(l)||d.tags.some(c=>c.toLowerCase().includes(l)))}return e!=="all"&&(t=t.filter(l=>l.priority===e)),a!=="all"&&(t=t.filter(l=>l.status===a)),i!=="all"&&(t=t.filter(l=>l.category===i)),r&&(t=t.filter(l=>l.dueDate===r)),t.sort((l,d)=>{if(n==="date-asc")return new Date(l.dueDate)-new Date(d.dueDate);if(n==="date-desc")return new Date(d.dueDate)-new Date(l.dueDate);if(n==="priority-high"){const c={high:3,medium:2,low:1};return c[d.priority]-c[l.priority]}else if(n==="priority-low"){const c={high:3,medium:2,low:1};return c[l.priority]-c[d.priority]}else{if(n==="alpha-asc")return l.title.localeCompare(d.title);if(n==="alpha-desc")return d.title.localeCompare(l.title)}return 0}),t}}const u=new Y;document.documentElement.setAttribute("data-theme",u.data.theme);class G{constructor(t){this.container=document.getElementById(t),this.container&&(window.addEventListener("state-updated",()=>this.updateActiveState()),this.render(),this.bindEvents())}render(){const t=u.data.user,s=t.name.split(" ").map(e=>e[0]).join("");this.container.innerHTML=`
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
        <div class="user-avatar" id="sidebar-user-avatar">${s}</div>
        <div class="user-info">
          <span class="user-name" id="sidebar-user-name">${t.name}</span>
          <span class="user-role" id="sidebar-user-role">${t.role}</span>
        </div>
      </div>
    `,this.updateActiveState()}bindEvents(){this.container.addEventListener("click",t=>{const s=t.target.closest(".nav-item");if(s){const e=s.dataset.view;u.setView(e),this.container.classList.remove("mobile-open")}})}updateActiveState(){const t=u.data.activeView;this.container.querySelectorAll(".nav-item").forEach(n=>{n.dataset.view===t?n.classList.add("active"):n.classList.remove("active")});const e=u.data.user,a=document.getElementById("sidebar-user-avatar"),i=document.getElementById("sidebar-user-name"),r=document.getElementById("sidebar-user-role");a&&(a.textContent=e.name.split(" ").map(n=>n[0]).join("")),i&&(i.textContent=e.name),r&&(r.textContent=e.role)}}class W{constructor(t){this.container=document.getElementById(t),this.container&&(window.addEventListener("state-updated",()=>this.updateHeader()),this.render(),this.bindEvents())}render(){const t=u.data.activeView,s=u.data.filters.search||"",e=u.data.theme==="dark"?this.getSunIcon():this.getMoonIcon();this.container.innerHTML=`
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
          ${t}
        </h2>
      </div>

      <!-- Center / Search Bar -->
      <div class="header-search" id="header-search-bar">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="global-search-input" placeholder="Search tasks, descriptions, tags..." value="${s}" autocomplete="off">
      </div>

      <!-- Right Header Actions -->
      <div class="header-actions">
        <!-- Light/Dark Theme Switcher -->
        <button class="btn-icon" id="theme-toggler" title="Toggle Theme" aria-label="Toggle Light/Dark Theme">
          ${e}
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
    `,this.toggleSearchBarVisibility(t)}bindEvents(){this.container.addEventListener("click",t=>{if(t.target.closest("#theme-toggler")&&u.toggleTheme(),t.target.closest("#btn-create-task")&&window.dispatchEvent(new CustomEvent("open-task-modal")),t.target.closest("#hamburger-toggle")){const s=document.getElementById("sidebar");s&&s.classList.toggle("mobile-open")}}),this.container.addEventListener("input",t=>{t.target.id==="global-search-input"&&u.setFilter("search",t.target.value)})}updateHeader(){const t=document.getElementById("header-title"),s=document.getElementById("global-search-input"),e=document.getElementById("theme-toggler"),a=u.data.activeView;t&&(t.textContent=a),s&&u.data.filters.search!==s.value&&(s.value=u.data.filters.search||""),e&&(e.innerHTML=u.data.theme==="dark"?this.getSunIcon():this.getMoonIcon()),this.toggleSearchBarVisibility(a)}toggleSearchBarVisibility(t){const s=document.getElementById("header-search-bar");s&&(t==="dashboard"||t==="tasks"?s.classList.remove("hidden"):s.classList.add("hidden"))}getSunIcon(){return`
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
    `}getMoonIcon(){return`
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
      </svg>
    `}}const w=(h,t="success")=>{const s=document.getElementById("toast-container");if(!s)return;const e=document.createElement("div");e.className=`toast toast-${t}`;let a="";t==="success"?a=`
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `:t==="warning"?a=`
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.02" y2="16"></line>
      </svg>
    `:a=`
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="15" y1="9" x2="9" y2="15"></line>
        <line x1="9" y1="9" x2="15" y2="15"></line>
      </svg>
    `,e.innerHTML=`
    <div class="toast-icon">${a}</div>
    <div class="toast-message">${h}</div>
  `,s.appendChild(e),setTimeout(()=>{e.style.opacity="0",e.style.transform="translateY(10px) scale(0.9)",e.style.transition="all 0.2s ease-out",setTimeout(()=>{e.remove()},200)},3e3)};class _{constructor(t){this.container=document.getElementById(t),this.container&&(this.editingTaskId=null,this.subtasksList=[],this.bindGlobalEvents())}bindGlobalEvents(){window.addEventListener("open-task-modal",t=>{var a,i;const s=((a=t.detail)==null?void 0:a.taskId)||null,e=((i=t.detail)==null?void 0:i.date)||null;this.open(s,e)})}open(t=null,s=null){this.editingTaskId=t,this.container.classList.add("active");let e=null;this.editingTaskId?(e=u.data.tasks.find(f=>f.id===this.editingTaskId),this.subtasksList=e?JSON.parse(JSON.stringify(e.subtasks)):[]):this.subtasksList=[];const a=u.data.categories,i=new Date().toISOString().split("T")[0],r=e?e.title:"",n=e?e.description:"",l=e?e.priority:"medium",d=e?e.status:"pending",c=e?e.category:"work",g=e?e.dueDate:s||i,y=e?e.tags.join(", "):"";this.container.innerHTML=`
      <div class="modal-box">
        <div class="modal-header">
          <h3 class="modal-title">${this.editingTaskId?"Edit Task Detail":"Create New Task"}</h3>
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
              <input type="text" class="form-input" id="modal-task-title" placeholder="e.g. Design authentication pages" value="${r}" required autocomplete="off">
            </div>

            <!-- Description -->
            <div class="form-group">
              <label class="form-label" for="modal-task-desc">Description</label>
              <textarea class="form-input" id="modal-task-desc" placeholder="Provide notes, specifications, or reference details..." style="min-height: 80px; resize: vertical;">${n}</textarea>
            </div>

            <!-- Priority, Status & Category grid -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px;">
              <div class="form-group">
                <label class="form-label" for="modal-task-priority">Priority</label>
                <select class="form-input" id="modal-task-priority">
                  <option value="low" ${l==="low"?"selected":""}>Low</option>
                  <option value="medium" ${l==="medium"?"selected":""}>Medium</option>
                  <option value="high" ${l==="high"?"selected":""}>High</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="modal-task-status">Status</label>
                <select class="form-input" id="modal-task-status">
                  <option value="pending" ${d==="pending"?"selected":""}>Pending</option>
                  <option value="progress" ${d==="progress"?"selected":""}>In Progress</option>
                  <option value="review" ${d==="review"?"selected":""}>Review</option>
                  <option value="completed" ${d==="completed"?"selected":""}>Completed</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label" for="modal-task-category">Category</label>
                <select class="form-input" id="modal-task-category" style="text-transform: capitalize;">
                  ${a.map(f=>`
                    <option value="${f}" ${c===f?"selected":""}>${f}</option>
                  `).join("")}
                </select>
              </div>
            </div>

            <!-- Due Date & Tags Row -->
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="modal-task-date">Due Date</label>
                <input type="date" class="form-input" id="modal-task-date" value="${g}" required>
              </div>

              <div class="form-group">
                <label class="form-label" for="modal-task-tags">Tags (comma-separated)</label>
                <input type="text" class="form-input" id="modal-task-tags" placeholder="e.g. core, layout, refactor" value="${y}">
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
            <button type="submit" class="btn-primary">${this.editingTaskId?"Save Task Updates":"Add New Task"}</button>
          </div>
        </form>
      </div>
    `,this.renderSubtasksList(),this.bindEvents();const m=document.getElementById("modal-task-title");m&&m.focus()}renderSubtasksList(){const t=document.getElementById("modal-subtasks-container");if(t){if(this.subtasksList.length===0){t.innerHTML=`
        <span style="font-size: 12px; color: var(--text-muted); font-style: italic;">No subtasks configured yet. Click "+ Add Item" to append.</span>
      `;return}t.innerHTML=this.subtasksList.map((s,e)=>`
      <div class="subtask-form-row" data-index="${e}">
        <button type="button" class="task-row-checkbox ${s.completed?"checked":""}" data-idx="${e}" aria-label="Toggle subtask completion">
          ${s.completed?`
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          `:""}
        </button>
        <input type="text" class="form-input subtask-title-input" data-idx="${e}" placeholder="e.g. Code CSS templates" value="${s.title}" required style="padding: 6px 10px;">
        <button type="button" class="btn-icon-danger btn-remove-subtask" data-idx="${e}" aria-label="Delete subtask">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join("")}}bindEvents(){const t=document.getElementById("modal-close-btn"),s=document.getElementById("modal-cancel-btn"),e=document.getElementById("task-modal-form"),a=document.getElementById("modal-btn-add-subtask"),i=document.getElementById("modal-subtasks-container"),r=()=>{this.close()};t.addEventListener("click",r),s.addEventListener("click",r),this.container.addEventListener("click",n=>{n.target===this.container&&this.close()}),e.addEventListener("submit",n=>{n.preventDefault();const l=document.getElementById("modal-task-title").value.trim(),d=document.getElementById("modal-task-desc").value.trim(),c=document.getElementById("modal-task-priority").value,g=document.getElementById("modal-task-status").value,y=document.getElementById("modal-task-category").value,m=document.getElementById("modal-task-date").value,x=document.getElementById("modal-task-tags").value.split(",").map($=>$.trim()).filter($=>$.length>0);this.container.querySelectorAll(".subtask-title-input").forEach($=>{const L=parseInt($.dataset.idx);this.subtasksList[L].title=$.value.trim()});const E={title:l,description:d,priority:c,status:g,category:y,dueDate:m,tags:x,subtasks:this.subtasksList};this.editingTaskId?(u.updateTask(this.editingTaskId,E),w("Task updated successfully!","success")):(u.addTask(E),w("New task created!","success")),this.close()}),a.addEventListener("click",()=>{this.container.querySelectorAll(".subtask-title-input").forEach(l=>{const d=parseInt(l.dataset.idx);this.subtasksList[d].title=l.value.trim()}),this.subtasksList.push({id:`sub-${Date.now()}-${this.subtasksList.length}`,title:"",completed:!1}),this.renderSubtasksList()}),i&&i.addEventListener("click",n=>{const l=n.target.closest(".task-row-checkbox");if(l){const c=parseInt(l.dataset.idx);this.subtasksList[c].completed=!this.subtasksList[c].completed,this.renderSubtasksList();return}const d=n.target.closest(".btn-remove-subtask");if(d){const c=parseInt(d.dataset.idx);this.subtasksList.splice(c,1),this.renderSubtasksList()}})}close(){this.container.classList.remove("active"),setTimeout(()=>{this.container.innerHTML="",this.editingTaskId=null,this.subtasksList=[]},200)}}class j{static renderKanban(t){const s=`badge-priority-${t.priority}`,e=t.subtasks.length,a=t.subtasks.filter(c=>c.completed).length,i=e>0?a/e*100:0,r=t.status!=="completed"&&new Date(t.dueDate)<new Date(new Date().toDateString()),n=r?"task-date-warning":"task-date-normal",l=r?"var(--accent-red)":"var(--text-muted)",d=t.tags.map(c=>`<span class="tag-pill">${c}</span>`).join("");return`
      <div class="task-card" draggable="true" data-id="${t.id}">
        <div class="task-card-header">
          <span class="category-chip">${t.category}</span>
          <div class="task-card-actions">
            <button class="btn-card-menu" data-id="${t.id}" aria-label="Open Actions Menu">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </button>
          </div>
        </div>

        <h4 class="task-card-title">${t.title}</h4>
        <p class="task-card-desc">${t.description||"No description provided."}</p>

        <!-- Subtask Progress (if any exist) -->
        ${e>0?`
          <div class="task-subtasks-wrapper">
            <div class="subtasks-label">
              <span>Subtasks</span>
              <span>${a}/${e}</span>
            </div>
            <div class="progress-bar-bg">
              <div class="progress-bar-fill" style="width: ${i}%;"></div>
            </div>
          </div>
        `:""}

        <div class="task-card-footer">
          <!-- Left tags and priority -->
          <div style="display: flex; flex-direction: column; gap: 8px;">
            <div class="task-card-tags">${d}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="badge ${s}">${t.priority}</span>
            </div>
          </div>
          
          <!-- Right due date -->
          <div class="task-card-meta">
            <svg viewBox="0 0 24 24" fill="none" stroke="${l}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span class="${n}">${this.formatDate(t.dueDate)}</span>
          </div>
        </div>
      </div>
    `}static renderListRow(t){const s=t.status==="completed",e=s?"checked":"",a=s?"completed":"",i=`badge-priority-${t.priority}`,r=`badge-status-${t.status}`,n=t.subtasks.length,l=t.subtasks.filter(y=>y.completed).length,c=t.status!=="completed"&&new Date(t.dueDate)<new Date(new Date().toDateString())?"task-date-warning":"task-date-normal",g=t.tags.map(y=>`<span class="tag-pill">${y}</span>`).join("");return`
      <div class="task-list-row" data-id="${t.id}">
        <!-- Checkbox -->
        <div>
          <button class="task-row-checkbox ${e}" data-id="${t.id}" aria-label="Mark completed">
            ${s?`
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            `:""}
          </button>
        </div>

        <!-- Title / Description -->
        <div class="task-row-title-area">
          <span class="task-row-title ${a}">${t.title}</span>
          <span class="task-row-desc">${t.description||"No description"}</span>
        </div>

        <!-- Tags -->
        <div class="task-row-tags">
          <span class="category-chip" style="margin-right: 4px;">${t.category}</span>
          ${g}
        </div>

        <!-- Priority -->
        <div>
          <span class="badge ${i}">${t.priority}</span>
        </div>

        <!-- Status -->
        <div>
          <span class="badge ${r}">${t.status}</span>
        </div>

        <!-- Due Date -->
        <div class="task-row-dates">
          <span class="${c}">${this.formatDate(t.dueDate)}</span>
        </div>

        <!-- Subtasks Progress -->
        <div class="task-row-progress-text">
          ${n>0?`${l}/${n} Subtasks`:"—"}
        </div>

        <!-- Actions Trigger -->
        <div class="task-row-actions">
          <button class="btn-card-menu" data-id="${t.id}" aria-label="Open Actions Menu">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>
    `}static formatDate(t){if(!t)return"No Date";const s=t.split("-"),e=new Date(s[0],s[1]-1,s[2]),a=new Date;a.setHours(0,0,0,0);const i=new Date(a);i.setDate(i.getDate()-1);const r=new Date(a);r.setDate(r.getDate()+1);const n=e.getTime();return n===a.getTime()?"Today":n===i.getTime()?"Yesterday":n===r.getTime()?"Tomorrow":e.toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}}class N{constructor(t){this.container=t}render(){const t=u.data.tasks,s=u.data.user,e=t.length,a=t.filter(o=>o.status==="pending").length,i=t.filter(o=>o.status==="completed").length,r=t.filter(o=>o.status==="progress").length,n=t.filter(o=>o.status==="review").length,l=new Date().toDateString(),d=t.filter(o=>o.status!=="completed"&&o.dueDate&&new Date(o.dueDate)<new Date(l)).length;t.filter(o=>o.status!=="completed").length;const c=i*10,g=r*5,y=n*8,m=e>0?(c+g+y)/(e*10):0,f=Math.min(100,Math.round(m*100)),x=55,C=2*Math.PI*x,E=C-f/100*C,$=[...t].filter(o=>o.status!=="completed").sort((o,v)=>new Date(v.createdAt)-new Date(o.createdAt)).slice(0,4),L=[...t].filter(o=>o.status!=="completed"&&o.dueDate).sort((o,v)=>new Date(o.dueDate)-new Date(v.dueDate)).slice(0,4),V=["Your focus determines your reality. Make today count.","The only way to do great work is to love what you do.","Focus on being productive instead of busy.","Efficiency is doing things right; effectiveness is doing the right things.","Productivity is never an accident. It is always the result of a commitment to excellence."],M=V[Math.floor(new Date().getDate()%V.length)],A=this.getWeeklyCompletionStats(t),O=Math.max(...A.map(o=>o.count),2),B=500,T=120,I=30,b=20,k=A.map((o,v)=>{const S=I+v*(B-2*I)/6,P=T-b-o.count/O*(T-2*b);return{x:S,y:P,day:o.day,count:o.count}});let D="",p="";if(k.length>0){D=`M ${k[0].x} ${k[0].y}`;for(let o=1;o<k.length;o++){const v=k[o-1],S=k[o],P=v.x+(S.x-v.x)/2,F=v.y,H=v.x+(S.x-v.x)/2,z=S.y;D+=` C ${P} ${F}, ${H} ${z}, ${S.x} ${S.y}`}p=`${D} L ${k[k.length-1].x} ${T-b} L ${k[0].x} ${T-b} Z`}this.container.innerHTML=`
      <div class="view-wrapper">
        <!-- Hero Welcomer -->
        <section class="hero-section">
          <div class="hero-welcome">
            <span class="motivation-tag">Daily Motivation</span>
            <h1>Good day, ${s.name.split(" ")[0]}</h1>
            <p>"${M}"</p>
          </div>
          <div class="hero-stats-quick" style="text-align: right; display: flex; flex-direction: column; gap: 4px;">
            <span style="font-size: 12px; color: var(--text-secondary); font-weight: 500;">Current Local Time</span>
            <span style="font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--primary);">
              ${new Date().toLocaleDateString("en-US",{weekday:"long",month:"short",day:"numeric"})}
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
            <span class="stat-value">${e}</span>
            <span class="stat-subtitle">Tasks in workspace</span>
          </div>
          
          <div class="stat-card stat-pending">
            <div class="stat-header">
              <span class="stat-title">Pending</span>
              <div class="stat-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
            </div>
            <span class="stat-value">${a}</span>
            <span class="stat-subtitle">Waiting for start</span>
          </div>

          <div class="stat-card stat-completed">
            <div class="stat-header">
              <span class="stat-title">Completed</span>
              <div class="stat-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
            </div>
            <span class="stat-value">${i}</span>
            <span class="stat-subtitle">Tasks resolved</span>
          </div>

          <div class="stat-card stat-overdue">
            <div class="stat-header">
              <span class="stat-title">Overdue</span>
              <div class="stat-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></svg>
              </div>
            </div>
            <span class="stat-value" style="color: ${d>0?"var(--accent-red)":"inherit"}">${d}</span>
            <span class="stat-subtitle">Past due date</span>
          </div>

          <div class="stat-card stat-score">
            <div class="stat-header">
              <span class="stat-title">Score</span>
              <div class="stat-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              </div>
            </div>
            <span class="stat-value">${f}%</span>
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
                  ${p?`<path class="sparkline-fill" d="${p}"></path>`:""}
                  <!-- Sparkline Line -->
                  ${D?`<path class="sparkline-path" d="${D}"></path>`:""}
                  
                  <!-- Data Dots -->
                  ${k.map(o=>`
                    <circle class="sparkline-dot" cx="${o.x}" cy="${o.y}" r="4">
                      <title>${o.count} Tasks completed on ${o.day}</title>
                    </circle>
                  `).join("")}
                </svg>
                
                <!-- Chart Labels -->
                <div class="chart-labels">
                  ${A.map(o=>`<span class="chart-label">${o.day}</span>`).join("")}
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
                ${$.length>0?$.map(o=>j.renderListRow(o)).join(""):this.getEmptyStateHtml()}
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
                  <circle class="progress-ring-circle-bg" cx="70" cy="70" r="${x}"></circle>
                  <!-- Foreground circle representing score -->
                  <circle class="progress-ring-circle-val" cx="70" cy="70" r="${x}"
                          stroke-dasharray="${C}" stroke-dashoffset="${E}"></circle>
                </svg>
                <div class="progress-ring-text">
                  <span class="progress-ring-score">${f}%</span>
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
                ${L.length>0?L.map(o=>this.renderDeadlineItem(o)).join(""):`
                  <div style="font-size: 12px; color: var(--text-muted); text-align: center; padding: 20px 0;">
                    No upcoming deadlines! Let's celebrate.
                  </div>
                `}
              </div>
            </div>
          </div>
        </section>
      </div>
    `,this.bindEvents()}bindEvents(){const t=document.getElementById("dashboard-recent-tasks");t&&t.addEventListener("click",async e=>{const a=e.target.closest(".task-row-checkbox");if(a){const i=a.dataset.id,r=u.data.tasks.find(n=>n.id===i);if(r){const n=r.status==="completed"?"pending":"completed";u.updateTask(i,{status:n}),w(`Task marked as ${n}!`,"success")}}});const s=document.getElementById("view-all-tasks-link");s&&s.addEventListener("click",e=>{e.preventDefault(),u.setView("tasks")})}getWeeklyCompletionStats(t){const s=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],e=[];for(let a=6;a>=0;a--){const i=new Date;i.setDate(i.getDate()-a);const r=s[i.getDay()],n=i.toISOString().split("T")[0],l=t.filter(d=>d.status==="completed"&&d.dueDate===n).length;e.push({day:r,count:l})}return e}renderDeadlineItem(t){const e=new Date(t.dueDate)<new Date(new Date().toDateString())?"task-date-warning":"task-date-normal",a=j.formatDate(t.dueDate);return`
      <div class="task-item-compact" style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding: 10px 0;">
        <div style="display: flex; flex-direction: column; overflow: hidden; max-width: 70%;">
          <span style="font-size: 13px; font-weight: 600; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${t.title}</span>
          <span style="font-size: 10px; color: var(--text-muted); text-transform: uppercase;">${t.category}</span>
        </div>
        <span class="${e}" style="font-size: 12px; font-weight: 500;">${a}</span>
      </div>
    `}getEmptyStateHtml(){return`
      <div style="padding: 30px; text-align: center; color: var(--text-muted); font-size: 13px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;">
        <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5" style="color: var(--text-muted);"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <span>No active tasks in progress! Ready to add some work?</span>
      </div>
    `}}const R=(h,t,s="Confirm")=>new Promise(e=>{const a=document.getElementById("confirm-container");if(!a){e(!1);return}a.innerHTML=`
      <div class="confirm-box">
        <h3 class="confirm-title">${h}</h3>
        <p class="confirm-message">${t}</p>
        <div class="confirm-buttons">
          <button class="btn-secondary" id="confirm-btn-cancel">Cancel</button>
          <button class="btn-danger" id="confirm-btn-ok">${s}</button>
        </div>
      </div>
    `,a.classList.add("active");const i=document.getElementById("confirm-btn-cancel"),r=document.getElementById("confirm-btn-ok");i&&i.focus();const n=g=>{g.stopPropagation(),c(),e(!1)},l=g=>{g.stopPropagation(),c(),e(!0)},d=g=>{g.target===a&&(c(),e(!1))},c=()=>{a.classList.remove("active"),i.removeEventListener("click",n),r.removeEventListener("click",l),a.removeEventListener("click",d),setTimeout(()=>{a.innerHTML=""},300)};i.addEventListener("click",n),r.addEventListener("click",l),a.addEventListener("click",d)});class q{constructor(t){this.container=t,this.currentSubView=localStorage.getItem("tf_subview")||"kanban",this.activeMenuId=null}render(){const t=u.data.categories,s=u.data.filters;this.container.innerHTML=`
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
              <input type="text" id="view-search-input" placeholder="Filter current tasks..." value="${s.search||""}">
            </div>

            <!-- Priority Filter -->
            <select class="filter-select" id="filter-priority" aria-label="Filter by Priority">
              <option value="all" ${s.priority==="all"?"selected":""}>All Priorities</option>
              <option value="high" ${s.priority==="high"?"selected":""}>High Priority</option>
              <option value="medium" ${s.priority==="medium"?"selected":""}>Medium Priority</option>
              <option value="low" ${s.priority==="low"?"selected":""}>Low Priority</option>
            </select>

            <!-- Status Filter -->
            <select class="filter-select" id="filter-status" aria-label="Filter by Status">
              <option value="all" ${s.status==="all"?"selected":""}>All Statuses</option>
              <option value="pending" ${s.status==="pending"?"selected":""}>Pending</option>
              <option value="progress" ${s.status==="progress"?"selected":""}>In Progress</option>
              <option value="review" ${s.status==="review"?"selected":""}>Under Review</option>
              <option value="completed" ${s.status==="completed"?"selected":""}>Completed</option>
            </select>

            <!-- Category Filter -->
            <select class="filter-select" id="filter-category" aria-label="Filter by Category" style="text-transform: capitalize;">
              <option value="all">All Categories</option>
              ${t.map(e=>`
                <option value="${e}" ${s.category===e?"selected":""}>${e}</option>
              `).join("")}
            </select>

            <!-- Sort Option -->
            <select class="filter-select" id="filter-sort" aria-label="Sort options">
              <option value="date-asc" ${s.sortBy==="date-asc"?"selected":""}>Due Date (Oldest)</option>
              <option value="date-desc" ${s.sortBy==="date-desc"?"selected":""}>Due Date (Newest)</option>
              <option value="priority-high" ${s.sortBy==="priority-high"?"selected":""}>Priority (High → Low)</option>
              <option value="priority-low" ${s.sortBy==="priority-low"?"selected":""}>Priority (Low → High)</option>
              <option value="alpha-asc" ${s.sortBy==="alpha-asc"?"selected":""}>Alphabetical (A → Z)</option>
            </select>

            <button class="btn-secondary" id="btn-clear-filters" style="padding: 6px 12px; font-size: 12px; border-radius: 8px;">
              Reset
            </button>
          </div>

          <div class="toolbar-right">
            <!-- Kanban vs List Switcher -->
            <div class="view-toggle">
              <button class="toggle-btn ${this.currentSubView==="kanban"?"active":""}" id="toggle-kanban" title="Kanban Board View">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"></rect><rect x="14" y="3" width="7" height="5"></rect><rect x="14" y="12" width="7" height="9"></rect><rect x="3" y="16" width="7" height="5"></rect></svg>
              </button>
              <button class="toggle-btn ${this.currentSubView==="list"?"active":""}" id="toggle-list" title="Detailed List View">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Render Target Grid -->
        <div id="tasks-viewport"></div>
      </div>
    `,this.bindEvents(),this.renderViewport()}renderViewport(){const t=document.getElementById("tasks-viewport");if(!t)return;const s=u.getFilteredTasks();t.innerHTML=this.currentSubView==="kanban"?this.renderKanbanBoard(s):this.renderListView(s),this.currentSubView==="kanban"&&this.bindDragEvents()}renderKanbanBoard(t){return`
      <div class="kanban-container">
        ${[{id:"pending",label:"Pending",color:"var(--text-muted)"},{id:"progress",label:"In Progress",color:"var(--accent-purple)"},{id:"review",label:"Under Review",color:"var(--accent-orange)"},{id:"completed",label:"Completed",color:"var(--accent-emerald)"}].map(e=>{const a=t.filter(i=>i.status===e.id);return`
            <div class="kanban-column" data-status="${e.id}">
              <div class="column-header">
                <div class="column-title">
                  <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${e.color};"></span>
                  <span>${e.label}</span>
                </div>
                <span class="column-count">${a.length}</span>
              </div>
              <div class="column-cards">
                ${a.length>0?a.map(i=>j.renderKanban(i)).join(""):`
                  <div style="font-size: 11px; color: var(--text-muted); text-align: center; padding: 24px 0; border: 1px dashed var(--border-color); border-radius: 8px;">
                    Column empty
                  </div>
                `}
              </div>
            </div>
          `}).join("")}
      </div>
    `}renderListView(t){return t.length===0?this.renderEmptyState():`
      <div class="list-container">
        ${t.map(s=>j.renderListRow(s)).join("")}
      </div>
    `}renderEmptyState(){return`
      <div class="empty-state">
        <svg class="empty-illustration" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
        <h3 class="empty-title">No tasks found</h3>
        <p class="empty-desc">We couldn't find any tasks matching your filters. Try clearing search keywords or resetting dropdown selectors.</p>
        <button class="btn-primary" id="btn-empty-clear">Clear Filters</button>
      </div>
    `}bindEvents(){const t=document.getElementById("tasks-viewport");document.getElementById("view-search-input").addEventListener("input",e=>{u.setFilter("search",e.target.value)}),document.getElementById("filter-priority").addEventListener("change",e=>{u.setFilter("priority",e.target.value)}),document.getElementById("filter-status").addEventListener("change",e=>{u.setFilter("status",e.target.value)}),document.getElementById("filter-category").addEventListener("change",e=>{u.setFilter("category",e.target.value)}),document.getElementById("filter-sort").addEventListener("change",e=>{u.setFilter("sortBy",e.target.value)}),document.getElementById("btn-clear-filters").addEventListener("click",()=>{u.clearFilters(),w("Filters cleared","success")});const s=document.getElementById("btn-empty-clear");s&&s.addEventListener("click",()=>{u.clearFilters()}),document.getElementById("toggle-kanban").addEventListener("click",()=>{this.currentSubView="kanban",localStorage.setItem("tf_subview","kanban"),this.render()}),document.getElementById("toggle-list").addEventListener("click",()=>{this.currentSubView="list",localStorage.setItem("tf_subview","list"),this.render()}),t&&t.addEventListener("click",e=>{const a=e.target.closest(".task-row-checkbox");if(a){const i=a.dataset.id,r=u.data.tasks.find(n=>n.id===i);if(r){const n=r.status==="completed"?"pending":"completed";u.updateTask(i,{status:n}),w(`Task status set to ${n}`,"success")}}}),this.bindCardActions()}bindDragEvents(){const t=this.container.querySelectorAll(".task-card"),s=this.container.querySelectorAll(".kanban-column");t.forEach(e=>{e.addEventListener("dragstart",a=>{a.dataTransfer.setData("text/plain",e.dataset.id),e.style.opacity="0.5"}),e.addEventListener("dragend",()=>{e.style.opacity="1"})}),s.forEach(e=>{e.addEventListener("dragover",a=>{a.preventDefault(),e.classList.add("drag-over")}),e.addEventListener("dragleave",()=>{e.classList.remove("drag-over")}),e.addEventListener("drop",a=>{a.preventDefault(),e.classList.remove("drag-over");const i=a.dataTransfer.getData("text/plain"),r=e.dataset.status,n=u.data.tasks.find(l=>l.id===i);n&&n.status!==r&&(u.updateTask(i,{status:r}),w(`Task moved to ${r}`,"success"))})})}bindCardActions(){this.container.addEventListener("click",t=>{const s=t.target.closest(".btn-card-menu");if(s){t.stopPropagation(),this.closeAllMenus();const e=s.dataset.id;this.openCardMenu(s,e)}else this.closeAllMenus()}),document.addEventListener("click",()=>this.closeAllMenus())}openCardMenu(t,s){const e=t.parentElement,a=document.createElement("div");a.className="dropdown-menu",a.id=`dropdown-${s}`,a.innerHTML=`
      <button class="dropdown-item edit" data-id="${s}">Edit Task</button>
      <button class="dropdown-item dropdown-status-trigger" data-status="pending" data-id="${s}">Move to Pending</button>
      <button class="dropdown-item dropdown-status-trigger" data-status="progress" data-id="${s}">Move to Progress</button>
      <button class="dropdown-item dropdown-status-trigger" data-status="review" data-id="${s}">Move to Review</button>
      <button class="dropdown-item dropdown-status-trigger" data-status="completed" data-id="${s}">Move to Completed</button>
      <button class="dropdown-item delete" data-id="${s}">Delete Task</button>
    `,e.appendChild(a),this.activeMenuId=s,a.addEventListener("click",async i=>{i.stopPropagation();const r=i.target,n=r.dataset.id;if(r.classList.contains("edit"))this.closeAllMenus(),window.dispatchEvent(new CustomEvent("open-task-modal",{detail:{taskId:n}}));else if(r.classList.contains("dropdown-status-trigger")){const l=r.dataset.status;u.updateTask(n,{status:l}),this.closeAllMenus(),w(`Task moved to ${l}`,"success")}else r.classList.contains("delete")&&(this.closeAllMenus(),await R("Delete Task","Are you sure you want to delete this task? This action is permanent and cannot be undone.","Delete")&&(u.deleteTask(n),w("Task deleted successfully","error")))})}closeAllMenus(){this.container.querySelectorAll(".dropdown-menu").forEach(s=>s.remove()),this.activeMenuId=null}}class J{constructor(t){this.container=t}render(){const t=u.data.tasks,s=u.data.categories,e=t.length,a=t.filter(p=>p.status==="completed").length;t.filter(p=>p.status==="progress").length,t.filter(p=>p.status==="pending").length,t.filter(p=>p.status==="review").length;const i=e>0?Math.round(a/e*100):0,r=t.filter(p=>p.priority==="high").length,n=t.filter(p=>p.priority==="medium").length,l=t.filter(p=>p.priority==="low").length,d=251.3,c=e>0?r/e:0,g=e>0?n/e:0,y=e>0?l/e:0,m=d-c*d,f=d-g*d,x=d-y*d,C=-90,E=C+c*360,$=E+g*360,L=s.map(p=>{const o=t.filter(v=>v.category===p).length;return{category:p,count:o}}),V=Math.max(...L.map(p=>p.count),1),M=this.getWeeklyCreationStats(t),A=Math.max(...M.map(p=>p.count),2),O=500,B=120,T=30,I=20,b=M.map((p,o)=>{const v=T+o*(O-2*T)/6,S=B-I-p.count/A*(B-2*I);return{x:v,y:S,day:p.day,count:p.count}});let k="",D="";if(b.length>0){k=`M ${b[0].x} ${b[0].y}`;for(let p=1;p<b.length;p++){const o=b[p-1],v=b[p],S=o.x+(v.x-o.x)/2,P=o.y,F=o.x+(v.x-o.x)/2,H=v.y;k+=` C ${S} ${P}, ${F} ${H}, ${v.x} ${v.y}`}D=`${k} L ${b[b.length-1].x} ${B-I} L ${b[0].x} ${B-I} Z`}this.container.innerHTML=`
      <div class="view-wrapper">
        <section class="analytics-grid">
          
          <!-- Stat 1: Overall Completion Rate -->
          <div class="analytics-widget" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 240px; text-align: center; position: relative;">
            <div style="position: absolute; top: 20px; left: 20px;">
              <h3 class="widget-title" style="font-size: 14px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Completion Rate</h3>
            </div>
            
            <div class="progress-ring-container" style="margin-top: 15px;">
              <svg class="progress-ring-svg" style="width: 120px; height: 120px;">
                <defs>
                  <linearGradient id="rate-gradient" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stop-color="var(--accent-emerald)" />
                    <stop offset="100%" stop-color="var(--primary)" />
                  </linearGradient>
                </defs>
                <circle class="progress-ring-circle-bg" cx="60" cy="60" r="45" stroke-width="8"></circle>
                <circle class="progress-ring-circle-val" cx="60" cy="60" r="45" stroke-width="8"
                        style="stroke: url(#rate-gradient); stroke-dasharray: 282.7; stroke-dashoffset: ${282.7-i/100*282.7};"></circle>
              </svg>
              <div class="progress-ring-text">
                <span class="progress-ring-score" style="font-size: 22px;">${i}%</span>
                <span style="font-size: 9px; color: var(--text-muted); font-weight: 600; text-transform: uppercase;">Finished</span>
              </div>
            </div>
          </div>

          <!-- Stat 2: Priority Distribution (Donut Chart) -->
          <div class="analytics-widget" style="min-height: 240px;">
            <h3 class="widget-title" style="font-size: 14px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 12px;">Priority Distribution</h3>
            
            <div class="donut-chart-container">
              <svg width="120" height="120" viewBox="0 0 100 100" style="overflow: visible;">
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--border-color)" stroke-width="12"></circle>
                
                ${e>0?`
                  <!-- High Priority Arc -->
                  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent-red)" stroke-width="12"
                          stroke-dasharray="${d}" stroke-dashoffset="${m}"
                          style="transform-origin: 50px 50px; transform: rotate(${C}deg); stroke-linecap: round;"></circle>
                  
                  <!-- Medium Priority Arc -->
                  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent-orange)" stroke-width="12"
                          stroke-dasharray="${d}" stroke-dashoffset="${f}"
                          style="transform-origin: 50px 50px; transform: rotate(${E}deg); stroke-linecap: round;"></circle>
                          
                  <!-- Low Priority Arc -->
                  <circle cx="50" cy="50" r="40" fill="none" stroke="var(--accent-emerald)" stroke-width="12"
                          stroke-dasharray="${d}" stroke-dashoffset="${x}"
                          style="transform-origin: 50px 50px; transform: rotate(${$}deg); stroke-linecap: round;"></circle>
                `:""}
              </svg>

              <div class="donut-labels">
                <div class="donut-label-item">
                  <span class="donut-color-dot" style="background: var(--accent-red);"></span>
                  <span>High: <strong>${r}</strong> (${e>0?Math.round(c*100):0}%)</span>
                </div>
                <div class="donut-label-item">
                  <span class="donut-color-dot" style="background: var(--accent-orange);"></span>
                  <span>Medium: <strong>${n}</strong> (${e>0?Math.round(g*100):0}%)</span>
                </div>
                <div class="donut-label-item">
                  <span class="donut-color-dot" style="background: var(--accent-emerald);"></span>
                  <span>Low: <strong>${l}</strong> (${e>0?Math.round(y*100):0}%)</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Weekly Creation line graph -->
          <div class="analytics-widget full-width">
            <div class="widget-title-area">
              <h3 class="widget-title" style="font-size: 14px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase;">Weekly Tasks Volume</h3>
              <span style="font-size: 11px; color: var(--text-muted);">Number of tasks created daily</span>
            </div>
            
            <div class="chart-container" style="margin-top: 15px;">
              <svg class="chart-svg" viewBox="0 0 500 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="creation-gradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stop-color="var(--accent-purple)" />
                    <stop offset="100%" stop-color="var(--primary)" />
                  </linearGradient>
                  <linearGradient id="creation-bg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="var(--accent-purple)" stop-opacity="0.2" />
                    <stop offset="100%" stop-color="var(--accent-purple)" stop-opacity="0" />
                  </linearGradient>
                </defs>
                
                <line class="chart-grid-line" x1="30" y1="20" x2="470" y2="20"></line>
                <line class="chart-grid-line" x1="30" y1="60" x2="470" y2="60"></line>
                <line class="chart-grid-line" x1="30" y1="100" x2="470" y2="100"></line>
                
                ${D?`<path class="sparkline-fill" d="${D}" style="fill: url(#creation-bg);"></path>`:""}
                ${k?`<path class="sparkline-path" d="${k}" style="stroke: url(#creation-gradient);"></path>`:""}
                
                ${b.map(p=>`
                  <circle class="sparkline-dot" cx="${p.x}" cy="${p.y}" r="4" style="fill: var(--accent-purple);">
                    <title>${p.count} Tasks created on ${p.day}</title>
                  </circle>
                `).join("")}
              </svg>
              
              <div class="chart-labels">
                ${M.map(p=>`<span class="chart-label">${p.day}</span>`).join("")}
              </div>
            </div>
          </div>

          <!-- Category Breakdown Bar Chart -->
          <div class="analytics-widget full-width">
            <h3 class="widget-title" style="font-size: 14px; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 20px;">Category Breakdown</h3>
            
            <div class="bar-chart-container">
              ${L.map(p=>{const o=Math.max(10,Math.round(p.count/V*100));return`
                  <div class="bar-row">
                    <div class="bar-row-info">
                      <span style="text-transform: capitalize; font-weight: 600;">${p.category}</span>
                      <span style="color: var(--text-secondary);">${p.count} tasks</span>
                    </div>
                    <div class="bar-track">
                      <div class="bar-fill" style="width: ${p.count>0?o:0}%; background: linear-gradient(90deg, var(--primary), var(--accent-purple));"></div>
                    </div>
                  </div>
                `}).join("")}
            </div>
          </div>
          
        </section>
      </div>
    `}getWeeklyCreationStats(t){const s=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],e=[];for(let a=6;a>=0;a--){const i=new Date;i.setDate(i.getDate()-a);const r=s[i.getDay()],n=i.toISOString().split("T")[0],l=t.filter(d=>d.createdAt?d.createdAt.split("T")[0]===n:!1).length;e.push({day:r,count:l})}return e}}class U{constructor(t){this.container=t;const s=new Date;this.currentYear=s.getFullYear(),this.currentMonth=s.getMonth()}render(){const t=["January","February","March","April","May","June","July","August","September","October","November","December"],s=u.data.tasks,e=new Date(this.currentYear,this.currentMonth,1).getDay(),a=new Date(this.currentYear,this.currentMonth+1,0).getDate(),i=new Date(this.currentYear,this.currentMonth,0).getDate(),r=new Date().toISOString().split("T")[0],n=[];for(let c=e-1;c>=0;c--){const g=this.currentMonth===0?this.currentYear-1:this.currentYear,y=this.currentMonth===0?11:this.currentMonth-1,m=i-c;n.push({day:m,month:y,year:g,isCurrentMonth:!1,dateStr:`${g}-${String(y+1).padStart(2,"0")}-${String(m).padStart(2,"0")}`})}for(let c=1;c<=a;c++)n.push({day:c,month:this.currentMonth,year:this.currentYear,isCurrentMonth:!0,dateStr:`${this.currentYear}-${String(this.currentMonth+1).padStart(2,"0")}-${String(c).padStart(2,"0")}`});const l=42-n.length;for(let c=1;c<=l;c++){const g=this.currentMonth===11?this.currentYear+1:this.currentYear,y=this.currentMonth===11?0:this.currentMonth+1;n.push({day:c,month:y,year:g,isCurrentMonth:!1,dateStr:`${g}-${String(y+1).padStart(2,"0")}-${String(c).padStart(2,"0")}`})}const d=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];this.container.innerHTML=`
      <div class="view-wrapper">
        <div class="calendar-widget">
          <!-- Calendar Nav -->
          <div class="calendar-header">
            <h3 class="calendar-nav-title" id="cal-month-title">
              ${t[this.currentMonth]} ${this.currentYear}
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
            ${d.map(c=>`<div class="calendar-day-header">${c}</div>`).join("")}
            ${n.map(c=>{const g=s.filter(m=>m.dueDate===c.dateStr);return`
                <div class="${["calendar-cell",c.isCurrentMonth?"":"other-month",c.dateStr===r?"today":""].filter(Boolean).join(" ")}" data-date="${c.dateStr}">
                  <span class="calendar-cell-num">${c.day}</span>
                  <div style="display: flex; flex-direction: column; gap: 3px; overflow: hidden; width: 100%;">
                    ${g.map(m=>{let f="var(--primary-light)",x="var(--primary)";return m.status==="completed"?(f="var(--accent-emerald-light)",x="var(--accent-emerald)"):m.priority==="high"?(f="var(--accent-red-light)",x="var(--accent-red)"):m.priority==="medium"&&(f="var(--accent-orange-light)",x="var(--accent-orange)"),`
                        <div class="calendar-task-marker" title="${m.title}" 
                             style="background: ${f}; color: ${x}; border-left: 2px solid ${x}; text-decoration: ${m.status==="completed"?"line-through":"none"};">
                          ${m.title}
                        </div>
                      `}).join("")}
                  </div>
                </div>
              `}).join("")}
          </div>
        </div>
      </div>
    `,this.bindEvents()}bindEvents(){document.getElementById("cal-prev-btn").addEventListener("click",()=>{this.currentMonth--,this.currentMonth<0&&(this.currentMonth=11,this.currentYear--),this.render()}),document.getElementById("cal-next-btn").addEventListener("click",()=>{this.currentMonth++,this.currentMonth>11&&(this.currentMonth=0,this.currentYear++),this.render()}),document.getElementById("cal-today-btn").addEventListener("click",()=>{const s=new Date;this.currentYear=s.getFullYear(),this.currentMonth=s.getMonth(),this.render()});const t=this.container.querySelector(".calendar-grid");t&&t.addEventListener("click",s=>{const e=s.target.closest(".calendar-cell");if(e){const a=e.dataset.date;window.dispatchEvent(new CustomEvent("open-task-modal",{detail:{date:a}}))}})}}class K{constructor(t){this.container=t}render(){const t=u.data.user,s=u.data.categories;this.container.innerHTML=`
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
                  <input type="text" class="form-input" id="settings-name" value="${t.name}" required>
                </div>
                <div class="form-group">
                  <label class="form-label" for="settings-role">Professional Signature / Role</label>
                  <input type="text" class="form-input" id="settings-role" value="${t.role}" required>
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
              ${s.map(e=>`
                <div class="category-tag-interactive" style="text-transform: capitalize;">
                  <span>${e}</span>
                  <button class="btn-remove-category" data-cat="${e}" title="Remove Category">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              `).join("")}
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
    `,this.bindEvents()}bindEvents(){const t=document.getElementById("settings-profile-form");t&&t.addEventListener("submit",i=>{i.preventDefault();const r=document.getElementById("settings-name").value.trim(),n=document.getElementById("settings-role").value.trim();r&&n&&(u.updateUser(r,n),w("Profile configuration saved","success"))});const s=document.getElementById("btn-add-category");s&&s.addEventListener("click",()=>{const i=document.getElementById("new-category-input"),r=i.value.trim();r?(u.addCategory(r),i.value="",this.render(),w(`Category "${r}" added!`,"success")):w("Please type a category name first","warning")});const e=document.getElementById("settings-cat-list");e&&e.addEventListener("click",async i=>{const r=i.target.closest(".btn-remove-category");if(r){const n=r.dataset.cat;if(n==="work"){w('The "work" category is a default system setting and cannot be deleted.',"warning");return}await R("Delete Category",`Are you sure you want to delete the category "${n}"? Tasks currently in this category will be reassigned to the default "work" category.`,"Delete")&&(u.removeCategory(n),this.render(),w(`Category "${n}" deleted`,"error"))}});const a=document.getElementById("btn-reset-system");a&&a.addEventListener("click",async()=>{await R("Factory Reset TaskFlow Pro","This will purge all your custom tasks, categories, and profile customization back to the original demo values. Are you sure you want to continue?","Purge Data")&&(u.resetState(),w("System data reset successfully","success"),this.render())})}}document.addEventListener("DOMContentLoaded",()=>{new G("sidebar"),new W("main-header"),new _("modal-container");const h=document.getElementById("content-container");let t=null,s=null;function e(){const a=u.data.activeView;if(a===s&&t&&a==="tasks"&&typeof t.renderViewport=="function"){t.renderViewport();return}switch(h.innerHTML="",a){case"dashboard":t=new N(h);break;case"tasks":t=new q(h);break;case"analytics":t=new J(h);break;case"calendar":t=new U(h);break;case"settings":t=new K(h);break;default:t=new N(h)}t.render(),s=a}e(),window.addEventListener("state-updated",()=>{e()})});
