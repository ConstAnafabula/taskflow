// ============================================================
// task.js
// Simple vanilla JavaScript for the checklist on the Task Details page.
// No frameworks, no fetch/APIs — just DOM manipulation.
// ============================================================

// Grab the main elements we need to work with.
// These class names all come straight from task.html.
const checklistList = document.querySelector(".checklist-items");
const addForm = document.querySelector(".checklist-add-form");
const addInput = document.querySelector(".checklist-add-input");
const countLabel = document.querySelector(".side-card-count");
const progressFill = document.querySelector(".checklist-progress-fill");

// ------------------------------------------------------------
// 1. Toggling a checklist item as complete/incomplete
// ------------------------------------------------------------
// We listen for clicks on the whole list (event delegation) instead of
// adding a listener to every single checkbox. That way new items we add
// later still work without extra code.
checklistList.addEventListener("click", function (event) {
  // Only react if the thing that was clicked is a checkbox.
  if (event.target.classList.contains("checklist-item-checkbox")) {
    // Find the closest parent <li class="checklist-item"> and toggle its class.
    const item = event.target.closest(".checklist-item");
    item.classList.toggle("checklist-item--completed");

    // Whenever completion changes, the counter/progress bar need updating.
    updateProgress();
  }
});

// ------------------------------------------------------------
// 2. Edit button
// ------------------------------------------------------------
checklistList.addEventListener("click", function (event) {
  // The edit button is the plain ".checklist-item-btn" (not the danger one).
  const editBtn = event.target.closest(".checklist-item-btn");
  const isDeleteBtn = event.target.closest(".checklist-item-btn--danger");

  if (editBtn && !isDeleteBtn) {
    const item = editBtn.closest(".checklist-item");
    const titleEl = item.querySelector(".checklist-item-title");

    // Ask the user for new text, pre-filled with the current title.
    const newTitle = prompt("Edit checklist item:", titleEl.textContent);

    // Only update if they typed something and didn't cancel.
    if (newTitle !== null && newTitle.trim() !== "") {
      titleEl.textContent = newTitle.trim();
    }
  }
});

// ------------------------------------------------------------
// 3. Delete button
// ------------------------------------------------------------
checklistList.addEventListener("click", function (event) {
  const deleteBtn = event.target.closest(".checklist-item-btn--danger");

  if (deleteBtn) {
    const confirmed = confirm("Delete this checklist item?");
    if (confirmed) {
      const item = deleteBtn.closest(".checklist-item");
      item.remove();

      // Removing an item changes the total count too.
      updateProgress();
    }
  }
});

// ------------------------------------------------------------
// 4. Add new checklist item
// ------------------------------------------------------------
addForm.addEventListener("submit", function (event) {
  // Stop the form from reloading the page.
  event.preventDefault();

  const title = addInput.value.trim();

  // Don't add empty items.
  if (title === "") {
    return;
  }

  // Build the new <li> using the same structure/classes as the existing items,
  // so the edit/delete/checkbox listeners above work on it automatically.
  const newItem = document.createElement("li");
  newItem.className = "checklist-item";
  newItem.innerHTML = `
    <input type="checkbox" class="checklist-item-checkbox" aria-label="Toggle checklist item" />
    <span class="checklist-item-title"></span>
    <div class="checklist-item-actions">
      <button type="button" class="checklist-item-btn" aria-label="Edit item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 20l1-4.2L15.6 5.2a1.5 1.5 0 0 1 2.1 0l1.1 1.1a1.5 1.5 0 0 1 0 2.1L8.2 19l-4.2 1Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" /></svg>
      </button>
      <button type="button" class="checklist-item-btn checklist-item-btn--danger" aria-label="Delete item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 7h14M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m2 0-.7 12.1a2 2 0 0 1-2 1.9H8.7a2 2 0 0 1-2-1.9L6 7" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </button>
    </div>
  `;

  // Set the title using textContent (safer than putting user text into innerHTML).
  newItem.querySelector(".checklist-item-title").textContent = title;

  // Add it to the bottom of the list.
  checklistList.appendChild(newItem);

  // Clear the input so it's ready for the next item.
  addInput.value = "";

  // A new (unchecked) item changes the total count.
  updateProgress();
});

// ------------------------------------------------------------
// 5. Update the "completed/total" counter and the progress bar
// ------------------------------------------------------------
function updateProgress() {
  // Grab all the checklist items currently on the page.
  const allItems = checklistList.querySelectorAll(".checklist-item");
  const completedItems = checklistList.querySelectorAll(".checklist-item--completed");

  const total = allItems.length;
  const completed = completedItems.length;

  // Update the "3/7" style label.
  countLabel.textContent = completed + "/" + total;

  // Work out the percentage for the progress bar (avoid dividing by zero).
  let percent = 0;
  if (total > 0) {
    percent = Math.round((completed / total) * 100);
  }
  progressFill.style.width = percent + "%";
}

// ------------------------------------------------------------
// Run once on page load so the counter/progress bar match
// whatever checklist items are already in the HTML.
// ------------------------------------------------------------
updateProgress();