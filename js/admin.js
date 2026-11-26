/* ==========================================================================
   Community Emergency Resource Directory - Admin Portal Logic (admin.js)
   Course: CSE326 (Internet & Web Programming)
   ========================================================================== */

// Configured default PIN for admin authorization
const DEFAULT_PIN = "1234";

function getStoredPin() {
  return localStorage.getItem("adminSecurityPin") || DEFAULT_PIN;
}

// Check session authentication status
function checkAdminAuth() {
  const isAuthenticated = sessionStorage.getItem("adminAuthenticated") === "true";
  const pinOverlay = document.getElementById("pinOverlay");
  const adminContent = document.getElementById("adminContent");
  const logoutBtn = document.getElementById("logoutBtn");

  if (isAuthenticated) {
    if (pinOverlay) pinOverlay.classList.add("d-none");
    if (adminContent) adminContent.classList.remove("d-none");
    if (logoutBtn) logoutBtn.classList.remove("d-none");
    renderAdminTable();
  } else {
    if (pinOverlay) pinOverlay.classList.remove("d-none");
    if (adminContent) adminContent.classList.add("d-none");
    if (logoutBtn) logoutBtn.classList.add("d-none");
    const pinInput = document.getElementById("pinInput");
    if (pinInput) {
      pinInput.value = "";
      setTimeout(() => pinInput.focus(), 100);
    }
  }
}

// Lock / Logout portal
function lockPortal() {
  sessionStorage.removeItem("adminAuthenticated");
  showAlert("🔒 Admin session ended. Portal locked.", "info");
  checkAdminAuth();
}

// Display transient Bootstrap alert banner
function showAlert(message, type = "success") {
  const alertPlaceholder = document.getElementById("alertPlaceholder");
  if (!alertPlaceholder) return;

  alertPlaceholder.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show shadow-sm" role="alert">
      <span>${message}</span>
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()"></button>
    </div>
  `;

  // Auto-dismiss after 4 seconds
  setTimeout(() => {
    const activeAlert = alertPlaceholder.querySelector(".alert");
    if (activeAlert) activeAlert.remove();
  }, 4000);
}

// Export data to downloadable JSON file
function exportDataAsJSON() {
  const data = getResources();
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", "emergency_resources.json");
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showAlert("📥 Data exported successfully as <strong>emergency_resources.json</strong>", "info");
}

// Reset sample data to default initial state
function handleResetDemoData() {
  const confirmed = confirm("Are you sure you want to restore the default sample listings? Any custom additions will be reset.");
  if (!confirmed) return;
  resetToDefaultData();
  renderAdminTable();
  showAlert("🔄 Sample listings successfully restored to default.", "success");
}

// Document ready initialization
document.addEventListener("DOMContentLoaded", () => {
  // Check auth state immediately
  checkAdminAuth();

  // Setup PIN verification form submission
  const pinForm = document.getElementById("pinForm");
  if (pinForm) {
    pinForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const pinInput = document.getElementById("pinInput");
      const enteredPin = pinInput.value.trim();
      const correctPin = getStoredPin();
      const pinCard = document.querySelector(".pin-card");
      const pinError = document.getElementById("pinError");

      if (enteredPin === correctPin) {
        sessionStorage.setItem("adminAuthenticated", "true");
        pinError.classList.add("d-none");
        checkAdminAuth();
      } else {
        pinError.textContent = "❌ Incorrect Security PIN. Please try again.";
        pinError.classList.remove("d-none");

        // Trigger CSS keyframe shake animation
        if (pinCard) {
          pinCard.classList.remove("shake");
          void pinCard.offsetWidth; // Force DOM reflow to re-trigger
          pinCard.classList.add("shake");
        }
        pinInput.value = "";
        pinInput.focus();
      }
    });
  }

  // Setup Lock / Logout button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", lockPortal);
  }

  // Setup Export & Reset Data buttons
  const exportBtn = document.getElementById("exportJsonBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", exportDataAsJSON);
  }

  const resetBtn = document.getElementById("resetDataBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", handleResetDemoData);
  }

  // Setup form validation & submission for new listings
  const addForm = document.getElementById("addResourceForm");
  if (addForm) {
    addForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("resName");
      const categoryInput = document.getElementById("resCategory");
      const contactInput = document.getElementById("resContact");
      const latInput = document.getElementById("resLat");
      const lngInput = document.getElementById("resLng");
      const statusInput = document.getElementById("resStatus");

      let isValid = true;

      // 1. Validate Name
      const name = nameInput.value.trim();
      if (name.length < 3) {
        nameInput.classList.add("is-invalid");
        isValid = false;
      } else {
        nameInput.classList.remove("is-invalid");
        nameInput.classList.add("is-valid");
      }

      // 2. Validate Contact (Helpline 3-5 digits or standard phone 7-15 digits)
      const contact = contactInput.value.trim();
      const phoneRegex = /^[0-9+() -]{3,15}$/;
      if (!phoneRegex.test(contact)) {
        contactInput.classList.add("is-invalid");
        isValid = false;
      } else {
        contactInput.classList.remove("is-invalid");
        contactInput.classList.add("is-valid");
      }

      // 3. Validate Coordinates (Latitude: -90 to 90, Longitude: -180 to 180)
      const lat = parseFloat(latInput.value);
      const lng = parseFloat(lngInput.value);

      if (isNaN(lat) || lat < -90 || lat > 90) {
        latInput.classList.add("is-invalid");
        isValid = false;
      } else {
        latInput.classList.remove("is-invalid");
        latInput.classList.add("is-valid");
      }

      if (isNaN(lng) || lng < -180 || lng > 180) {
        lngInput.classList.add("is-invalid");
        isValid = false;
      } else {
        lngInput.classList.remove("is-invalid");
        lngInput.classList.add("is-valid");
      }

      if (!isValid) return;

      // Create new record object
      const newEntry = {
        id: Date.now(),
        name,
        category: categoryInput.value,
        contact,
        lat,
        lng,
        status: statusInput.value,
        isVerified: true
      };

      const currentResources = getResources();
      currentResources.push(newEntry);
      saveResources(currentResources);

      // Reset form and remove validation classes
      addForm.reset();
      [nameInput, contactInput, latInput, lngInput].forEach(el => {
        el.classList.remove("is-valid", "is-invalid");
      });

      renderAdminTable();
      showAlert(`✅ <strong>${newEntry.name}</strong> added to emergency directory successfully!`, "success");
    });
  }
});

// Render the administration data table
function renderAdminTable() {
  const tbody = document.getElementById("adminTableBody");
  const countBadge = document.getElementById("adminListingCount");
  if (!tbody) return;

  tbody.innerHTML = "";
  const resources = getResources();

  if (countBadge) {
    countBadge.textContent = `${resources.length} Listings`;
  }

  if (resources.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="4" class="text-center py-4 text-muted">
          No emergency resources found. Click "Reset Demo Data" above to restore defaults, or add one using the form on the left.
        </td>
      </tr>
    `;
    return;
  }

  resources.forEach(item => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>
        <div class="fw-bold text-dark">${item.name}</div>
        <small class="text-muted"><span class="badge bg-secondary">${item.category}</span> | 📞 ${item.contact} | 📍 (${item.lat.toFixed(4)}, ${item.lng.toFixed(4)})</small>
      </td>
      <td>
        <select class="form-select form-select-sm" onchange="updateResourceStatus(${item.id}, this.value)">
          <option value="Available" ${item.status === "Available" ? "selected" : ""}>🟢 Available</option>
          <option value="Limited" ${item.status === "Limited" ? "selected" : ""}>🟡 Limited</option>
          <option value="Full" ${item.status === "Full" ? "selected" : ""}>🔴 Full</option>
        </select>
      </td>
      <td>
        <button class="btn btn-sm w-100 ${item.isVerified ? 'btn-success' : 'btn-outline-warning'}" onclick="toggleResourceVerification(${item.id})">
          ${item.isVerified ? '✓ Verified' : '⏳ Verify'}
        </button>
      </td>
      <td>
        <button class="btn btn-sm btn-outline-danger w-100" onclick="deleteResourceItem(${item.id})">
          🗑️ Delete
        </button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

// Toggle verified badge status
function toggleResourceVerification(id) {
  const resources = getResources();
  const target = resources.find(r => r.id === id);
  if (target) {
    target.isVerified = !target.isVerified;
    saveResources(resources);
    renderAdminTable();
    showAlert(`Status updated: <strong>${target.name}</strong> marked as ${target.isVerified ? 'Verified' : 'Pending'}.`, "info");
  }
}

// Update availability dropdown value
function updateResourceStatus(id, newStatus) {
  const resources = getResources();
  const target = resources.find(r => r.id === id);
  if (target) {
    target.status = newStatus;
    saveResources(resources);
    showAlert(`Availability updated for <strong>${target.name}</strong>: ${newStatus}`, "info");
  }
}

// Delete item with user confirmation
function deleteResourceItem(id) {
  const resources = getResources();
  const target = resources.find(r => r.id === id);
  const targetName = target ? target.name : "this item";

  const confirmed = confirm(`Are you sure you want to delete "${targetName}" from emergency listings?`);
  if (!confirmed) return;

  const updated = resources.filter(r => r.id !== id);
  saveResources(updated);
  renderAdminTable();
  showAlert(`🗑️ Deleted <strong>${targetName}</strong> from listings.`, "warning");
}
