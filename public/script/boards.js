const createBoardBtn = document.getElementById("createBoard");
const boardNameText = document.getElementById("new-board-name");
const boardDescText = document.getElementById("new-board-desc");
const boardVisSelect = document.getElementById("new-board-visibility");
const boardsGrid = document.querySelector(".boards-grid");
const emptyState = document.querySelector(".boards-empty");

function validateNewBoard() {
  createBoardBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let selectVal;
    if (boardNameText.value.trim() === "") {
      boardNameText.focus();
      return alert("Board name must not be empty");
    }
    if (boardDescText.value.trim() === "") {
      boardDescText.focus();
      return alert("Board description must not be empty");
    }
    if (boardVisSelect.value.trim() === "") {
      boardVisSelect.focus();
      return alert("Please select visibility");
    }
    if (boardVisSelect.value.trim() === "Only me") {
      selectVal = "private";
    } else if (boardVisSelect.value.trim() === "Shared with team") {
      selectVal = "shared";
    } else {
      selectVal = "private";
    }
    const data = {
      name: boardNameText.value.trim(),
      desc: boardDescText.value.trim(),
      visibility: selectVal.trim(),
    };
    createBoard(data);
  });
}
async function getAllBoards() {
  const result = await getBoards();
  if (!result.success) {
    return alert(result.message);
  }
  displayBoards(result.data);
}
async function createBoard(data) {
  const result = await postBoard(data);
  if (!result.success) {
    return alert(result.message);
  }
  alert(result.message);
  return window.location.reload();
}
function displayBoards(boards) {
  const colors = ["blue", "green", "amber", "red", "purple"];
  handleEmptyState(boards)
  const board = boards
    .map((b, i) => {
      const randomIndex = Math.floor(Math.random() * colors.length);
      const updated = handleUpdatedHour(b)
      return `
      <a href="/boards/${b.id}" class="board-link">
        <article class="board-card board-card--${colors[randomIndex]}">
          <div class="board-card-top">
            <span class="board-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M16 18L22 12L16 6M8 6L2 12L8 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            <button type="button" class="board-menu" aria-label="Board options">⋯</button>
          </div>
          <h2 class="board-name">${b.name}</h2>
          <p class="board-desc">${b.description}</p>
          <span class="task-tag task-tag--${colors[randomIndex]} board-badge">${b.visibility.charAt(0).toUpperCase() + b.visibility.slice(1)}</span>
          <div class="board-stats">
            <span class="board-stat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M5 12.5L9.5 17L19 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" stroke-width="1.8"/>
              </svg>
              0 tasks
            </span>
            <span class="board-stat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <circle cx="9" cy="8" r="3" stroke="currentColor" stroke-width="1.8"/>
                <path d="M3.5 20c0-3 2.5-5.2 5.5-5.2s5.5 2.2 5.5 5.2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
              1 members
            </span>
          </div>
          <div class="board-footer">
            <div class="avatar-stack">
              <span class="avatar avatar--xs avatar--stacked">JC</span>
              <span class="avatar avatar--xs avatar--stacked">MP</span>
              <span class="avatar avatar--xs avatar--stacked">RK</span>
            </div>
            <span class="board-updated">Updated ${updated} ago</span>
          </div>
        </article>
      </a>
    `;
    })
    .join("");
  boardsGrid.innerHTML = board;
}
function handleUpdatedHour(boards) {
  const updateDate = new Date(boards.updated_at)
  const now = new Date

  const diffMs = now - updateDate
  const diffSecs = Math.floor(diffMs / (1000))
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffSecs < 60) {
    return `${diffSecs} second/s`
  } else if (diffMins < 60) {
    return `${diffMins} minute/s`
  } else if (diffHours < 23) {
    return `${diffHours} hour/s`
  } else {
    return `${diffDays} day/s`
  }
}
function handleEmptyState(boards) {
  if (boards.length === 0) {
    emptyState.style.display = "flex";
    return
  } else {
    emptyState.style.display = 'none'
  }
}
getAllBoards();
validateNewBoard();
