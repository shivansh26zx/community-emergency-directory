/* ==========================================================================
   Community Emergency Resource Directory - Public Portal Logic (app.js)
   Course: CSE326 (Internet & Web Programming)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // Initialize map and render all data items
  initLeafletMap();
  renderResources();
  updateStats();

  // Search and filter input listeners
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const statusFilter = document.getElementById("statusFilter");
  const resetBtn = document.getElementById("resetFiltersBtn");

  if (searchInput) searchInput.addEventListener("input", filterResources);
  if (categoryFilter) categoryFilter.addEventListener("change", filterResources);
  if (statusFilter) statusFilter.addEventListener("change", filterResources);

  // Reset filters handler
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (searchInput) searchInput.value = "";
      if (categoryFilter) categoryFilter.value = "All";
      if (statusFilter) statusFilter.value = "All";
      renderResources();
    });
  }

  // Geolocation trigger button
  const geoBtn = document.getElementById("locateMeBtn");
  if (geoBtn) {
    geoBtn.addEventListener("click", locateUserOnMap);
  }
});

// Update top statistics summary counters
function updateStats() {
  const allItems = getResources();

  const totalEl = document.getElementById("statTotal");
  const medicalEl = document.getElementById("statMedical");
  const sheltersEl = document.getElementById("statShelters");
  const otherEl = document.getElementById("statOther");

  if (!totalEl) return;

  const total = allItems.length;
  const medical = allItems.filter(item => item.category === "Medical").length;
  const shelters = allItems.filter(item => item.category === "Shelter").length;
  const other = allItems.filter(item => item.category === "Food & Water" || item.category === "Helpline").length;

  totalEl.textContent = total;
  if (medicalEl) medicalEl.textContent = medical;
  if (sheltersEl) sheltersEl.textContent = shelters;
  if (otherEl) otherEl.textContent = other;
}

// Render emergency listing cards dynamically
function renderResources(items = getResources()) {
  const container = document.getElementById("resourceContainer");
  const countBadge = document.getElementById("activeResultsCount");
  if (!container) return;

  container.innerHTML = "";

  // Update map markers simultaneously
  updateMapMarkers(items);

  // Update count indicator
  if (countBadge) {
    countBadge.textContent = `${items.length} ${items.length === 1 ? 'Resource' : 'Resources'} Listed`;
  }

  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="p-4 bg-white rounded shadow-sm">
          <span class="fs-1">🔍</span>
          <h5 class="fw-bold mt-2">No emergency resources found</h5>
          <p class="text-muted small mb-0">Try adjusting your keyword search or changing the filter dropdowns.</p>
        </div>
      </div>
    `;
    return;
  }

  items.forEach(res => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-lg-4 mb-3";

    const badgeClass = res.isVerified ? "badge-verified" : "badge-unverified";
    const badgeText = res.isVerified ? "✓ Verified" : "⏳ Pending";

    // Category icon mapper
    let categoryIcon = "🏢";
    if (res.category === "Medical") categoryIcon = "🏥";
    if (res.category === "Shelter") categoryIcon = "⛺";
    if (res.category === "Food & Water") categoryIcon = "🍲";
    if (res.category === "Helpline") categoryIcon = "📞";

    col.innerHTML = `
      <div class="card h-100 shadow-sm resource-card bg-white">
        <div class="card-body d-flex flex-column">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h6 class="card-title fw-bold text-dark mb-0">${res.name}</h6>
            <span class="badge ${badgeClass} text-uppercase" style="font-size: 0.7rem;">${badgeText}</span>
          </div>
          
          <div class="mb-2">
            <span class="badge bg-secondary">${categoryIcon} ${res.category}</span>
            <span class="badge bg-light text-dark border">Status: ${res.status}</span>
          </div>

          <p class="card-text text-muted small mb-3">
            <strong>📞 Contact:</strong> <a href="tel:${res.contact}" class="text-decoration-none fw-semibold text-danger">${res.contact}</a>
          </p>

          <div class="mt-auto">
            <button class="btn btn-outline-danger btn-sm w-100 fw-semibold" onclick="panToLocation(${res.lat}, ${res.lng})">
              📍 View on Map
            </button>
          </div>
        </div>
      </div>
    `;
    container.appendChild(col);
  });
}

// Multi-criteria filter function (Search + Category + Status)
function filterResources() {
  const searchInput = document.getElementById("searchInput");
  const categoryFilter = document.getElementById("categoryFilter");
  const statusFilter = document.getElementById("statusFilter");

  const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
  const selectedCategory = categoryFilter ? categoryFilter.value : "All";
  const selectedStatus = statusFilter ? statusFilter.value : "All";

  const allItems = getResources();

  const filtered = allItems.filter(item => {
    const matchesQuery = item.name.toLowerCase().includes(query) || 
                         item.category.toLowerCase().includes(query) ||
                         item.contact.includes(query);
    const matchesCategory = (selectedCategory === "All" || item.category === selectedCategory);
    const matchesStatus = (selectedStatus === "All" || item.status === selectedStatus);

    return matchesQuery && matchesCategory && matchesStatus;
  });

  renderResources(filtered);
}
