<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Task Details · TaskFlow</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <!-- Hidden state-toggles (CSS-only interactivity, no JS required) -->
    <input type="checkbox" id="sidebar-toggle" class="toggle-input" aria-hidden="true" />

    <div class="app-shell">
      <label for="sidebar-toggle" class="sidebar-overlay" aria-hidden="true"></label>

      <!-- ============================= Sidebar ============================= -->
      <aside class="sidebar">
        <div class="sidebar-top">
          <a href="/" class="sidebar-brand">
            <span class="brand-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5L9.5 17L19 7" stroke="white" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </span>
            <span>TaskFlow</span>
          </a>
          <label for="sidebar-toggle" class="sidebar-close" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </label>
        </div>

        <nav class="sidebar-nav" aria-label="Main">
          <p class="nav-group-label">Workspace</p>
          <a href="/dashboard" class="nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="9" rx="1.5" stroke="currentColor" stroke-width="1.8" />
              <rect x="14" y="3" width="7" height="5" rx="1.5" stroke="currentColor" stroke-width="1.8" />
              <rect x="14" y="12" width="7" height="9" rx="1.5" stroke="currentColor" stroke-width="1.8" />
              <rect x="3" y="16" width="7" height="5" rx="1.5" stroke="currentColor" stroke-width="1.8" />
            </svg>
            <span>Dashboard</span>
          </a>
          <a href="/boards" class="nav-item is-active">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.8" />
              <path d="M3 9H21" stroke="currentColor" stroke-width="1.8" />
            </svg>
            <span>Boards</span>
          </a>
          <a href="#" class="nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
              <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.8" />
            </svg>
            <span>My Tasks</span>
            <span class="nav-badge">6</span>
          </a>
          <a href="#" class="nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.8" />
              <circle cx="17" cy="9" r="2.3" stroke="currentColor" stroke-width="1.8" />
              <path d="M3.5 20c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              <path d="M15.2 15c2.2.3 3.8 2.2 3.8 5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
            <span>Team</span>
          </a>

          <p class="nav-group-label">General</p>
          <a href="#" class="nav-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3.2" stroke="currentColor" stroke-width="1.8" />
              <path d="M12 3.5V6M12 18V20.5M20.5 12H18M6 12H3.5M17.7 6.3L16 8M8 16L6.3 17.7M17.7 17.7L16 16M8 8L6.3 6.3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
            <span>Settings</span>
          </a>
        </nav>

        <a href="index.html" class="sidebar-user">
          <span class="avatar avatar--md">JC</span>
          <span class="sidebar-user-info">
            <span class="sidebar-user-name">Jane Cooper</span>
            <span class="sidebar-user-role">Sign out</span>
          </span>
        </a>
      </aside>

      <!-- ============================= Main ============================= -->
      <div class="main">
        <header class="topbar">
          <label for="sidebar-toggle" class="hamburger-btn" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
          </label>

          <label class="search-field">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="1.8" />
              <path d="M20 20L16.5 16.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
            <input type="text" placeholder="Search tasks, boards, people…" aria-label="Search" />
          </label>

          <div class="topbar-actions">
            <button type="button" class="icon-btn" aria-label="Notifications">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none">
                <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 13 6 9Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              </svg>
              <span class="icon-btn-dot"></span>
            </button>

            <div class="dropdown">
              <input type="checkbox" id="profile-toggle" class="toggle-input" aria-hidden="true" />
              <label for="profile-toggle" class="avatar avatar--sm avatar--clickable" aria-hidden="true">JC</label>
              <div class="dropdown-panel profile-panel">
                <p class="dropdown-title">Jane Cooper</p>
                <p class="dropdown-subtitle">jane.cooper@example.com</p>
                <a href="#" class="dropdown-link">View profile</a>
                <a href="#" class="dropdown-link">Account settings</a>
                <a href="index.html" class="dropdown-link dropdown-link--danger">Sign out</a>
              </div>
            </div>
          </div>
        </header>

        <div class="page-content">
          <!-- Breadcrumb -->
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="/boards">Boards</a>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <a href="board.html">Personal</a>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M9 6L15 12L9 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span aria-current="page">Design Dashboard</span>
          </nav>

          <!-- Back link -->
          <a href="board.html" class="back-link">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M15 5L8 12L15 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            Back to Board
          </a>

          <!-- ================= Task header ================= -->
          <div class="task-header">
            <div class="task-header-main">
              <div class="task-title-row">
                <h1>Design Dashboard</h1>
                <span class="status-badge status-badge--in-progress">In Progress</span>
              </div>
              <p class="task-header-desc">
                Finish the responsive layout for the analytics dashboard, including chart empty states and the mobile breakpoint.
              </p>
              <div class="task-labels">
                <span class="task-tag task-tag--blue">UI</span>
                <span class="task-tag task-tag--blue">Frontend</span>
              </div>
            </div>

            <div class="task-header-actions">
              <button type="button" class="btn-secondary-sm">Edit Task</button>
              <div class="dropdown">
                <input type="checkbox" id="task-menu-toggle" class="toggle-input" aria-hidden="true" />
                <label for="task-menu-toggle" class="icon-btn" aria-label="More task options">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="5" cy="12" r="1.7" fill="currentColor" /><circle cx="12" cy="12" r="1.7" fill="currentColor" /><circle cx="19" cy="12" r="1.7" fill="currentColor" /></svg>
                </label>
                <div class="dropdown-panel task-menu-panel">
                  <a href="#" class="dropdown-link">Move to…</a>
                  <a href="#" class="dropdown-link">Duplicate</a>
                  <a href="#" class="dropdown-link dropdown-link--danger">Delete task</a>
                </div>
              </div>
            </div>
          </div>

          <!-- ================= Content grid ================= -->
          <div class="content-grid">
            <!-- ================= Left column ================= -->
            <div class="task-main-col">
              <!-- Task information -->
              <section class="side-card" aria-label="Task information">
                <p class="side-card-title">Task Information</p>
                <dl class="info-list">
                  <div class="info-row">
                    <dt>Status</dt>
                    <dd><span class="status-badge status-badge--in-progress">In Progress</span></dd>
                  </div>
                  <div class="info-row">
                    <dt>Priority</dt>
                    <dd><span class="priority-badge priority-badge--high">High Priority</span></dd>
                  </div>
                  <div class="info-row">
                    <dt>Due Date</dt>
                    <dd>Jul 31, 2026</dd>
                  </div>
                  <div class="info-row">
                    <dt>Assignee</dt>
                    <dd>
                      <span class="assignee-cell">
                        <span class="avatar avatar--xs">JC</span>
                        Jane Cooper
                      </span>
                    </dd>
                  </div>
                  <div class="info-row">
                    <dt>Created</dt>
                    <dd>Jul 20, 2026</dd>
                  </div>
                </dl>
              </section>

              <!-- Checklist (UI only — add/edit/delete/toggle behavior to be wired up separately) -->
              <section class="side-card checklist-card" aria-label="Checklist">
                <div class="side-card-header">
                  <p class="side-card-title">Checklist</p>
                  <span class="side-card-count">3/7</span>
                </div>

                <div class="checklist-progress-track" role="progressbar" aria-label="Checklist progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="43">
                  <span class="checklist-progress-fill" style="width: 43%;"></span>
                </div>

                <!-- Example populated state -->
                <ul class="checklist-items">
                  <li class="checklist-item checklist-item--completed">
                    <input type="checkbox" class="checklist-item-checkbox" checked aria-label="Toggle checklist item" />
                    <span class="checklist-item-title">Sketch wireframes for chart cards</span>
                    <div class="checklist-item-actions">
                      <button type="button" class="checklist-item-btn" aria-label="Edit item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 20l1-4.2L15.6 5.2a1.5 1.5 0 0 1 2.1 0l1.1 1.1a1.5 1.5 0 0 1 0 2.1L8.2 19l-4.2 1Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" /></svg>
                      </button>
                      <button type="button" class="checklist-item-btn checklist-item-btn--danger" aria-label="Delete item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-.7 12.1a2 2 0 0 1-2 1.9H8.7a2 2 0 0 1-2-1.9L6 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
                      </button>
                    </div>
                  </li>
                  <li class="checklist-item checklist-item--completed">
                    <input type="checkbox" class="checklist-item-checkbox" checked aria-label="Toggle checklist item" />
                    <span class="checklist-item-title">Build responsive grid layout</span>
                    <div class="checklist-item-actions">
                      <button type="button" class="checklist-item-btn" aria-label="Edit item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 20l1-4.2L15.6 5.2a1.5 1.5 0 0 1 2.1 0l1.1 1.1a1.5 1.5 0 0 1 0 2.1L8.2 19l-4.2 1Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" /></svg>
                      </button>
                      <button type="button" class="checklist-item-btn checklist-item-btn--danger" aria-label="Delete item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-.7 12.1a2 2 0 0 1-2 1.9H8.7a2 2 0 0 1-2-1.9L6 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
                      </button>
                    </div>
                  </li>
                  <li class="checklist-item checklist-item--completed">
                    <input type="checkbox" class="checklist-item-checkbox" checked aria-label="Toggle checklist item" />
                    <span class="checklist-item-title">Implement chart empty states</span>
                    <div class="checklist-item-actions">
                      <button type="button" class="checklist-item-btn" aria-label="Edit item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 20l1-4.2L15.6 5.2a1.5 1.5 0 0 1 2.1 0l1.1 1.1a1.5 1.5 0 0 1 0 2.1L8.2 19l-4.2 1Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" /></svg>
                      </button>
                      <button type="button" class="checklist-item-btn checklist-item-btn--danger" aria-label="Delete item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-.7 12.1a2 2 0 0 1-2 1.9H8.7a2 2 0 0 1-2-1.9L6 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
                      </button>
                    </div>
                  </li>
                  <li class="checklist-item">
                    <input type="checkbox" class="checklist-item-checkbox" aria-label="Toggle checklist item" />
                    <span class="checklist-item-title">Add loading skeletons</span>
                    <div class="checklist-item-actions">
                      <button type="button" class="checklist-item-btn" aria-label="Edit item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 20l1-4.2L15.6 5.2a1.5 1.5 0 0 1 2.1 0l1.1 1.1a1.5 1.5 0 0 1 0 2.1L8.2 19l-4.2 1Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" /></svg>
                      </button>
                      <button type="button" class="checklist-item-btn checklist-item-btn--danger" aria-label="Delete item">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-.7 12.1a2 2 0 0 1-2 1.9H8.7a2 2 0 0 1-2-1.9L6 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
                      </button>
                    </div>
                  </li>
                </ul>

                <!-- Empty state variant (shown instead of .checklist-items when a task has no checklist items) -->
                <!--
                <div class="empty-state">
                  <span class="empty-state-icon" aria-hidden="true">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" stroke-width="1.6" stroke-dasharray="3 3" /><path d="M8.5 12.5L10.7 14.7L15.5 9.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
                  </span>
                  <p class="empty-state-title">No checklist items yet</p>
                  <p class="empty-state-sub">Break this task down into smaller steps.</p>
                </div>
                -->

                <form class="checklist-add-form">
                  <input type="text" class="checklist-add-input" placeholder="Add a checklist item…" aria-label="New checklist item title" />
                  <button type="submit" class="btn-primary-sm">Add Item</button>
                </form>
              </section>

              <!-- Activity / Comments placeholder -->
              <section class="side-card" aria-label="Activity and comments">
                <p class="side-card-title">Activity &amp; Comments</p>
                <div class="empty-state empty-state--flush">
                  <span class="empty-state-icon" aria-hidden="true">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 5H20V16H8L4 19.5V5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" /></svg>
                  </span>
                  <p class="empty-state-title">Nothing here yet</p>
                  <p class="empty-state-sub">Activity history and comments for this task will show up here in a future update.</p>
                </div>
              </section>
            </div>

            <!-- ================= Right column ================= -->
            <aside class="task-side-col">
              <div class="side-card">
                <p class="side-card-title">Assigned To</p>
                <ul class="member-list">
                  <li class="member-row">
                    <span class="member-avatar-wrap">
                      <span class="avatar avatar--sm">JC</span>
                      <span class="online-dot" aria-hidden="true"></span>
                    </span>
                    <span class="member-info">
                      <span class="member-name">Jane Cooper</span>
                      <span class="role-badge role-badge--owner">Owner</span>
                    </span>
                  </li>
                </ul>
              </div>

              <div class="side-card">
                <p class="side-card-title">Task Details</p>
                <dl class="info-list">
                  <div class="info-row"><dt>Board</dt><dd>Personal</dd></div>
                  <div class="info-row"><dt>List</dt><dd>In Progress</dd></div>
                  <div class="info-row">
                    <dt>Task ID</dt>
                    <dd class="info-row-code"><code>TSK-1042</code></dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>

    <script src="script.js"></script>
  </body>
</html>