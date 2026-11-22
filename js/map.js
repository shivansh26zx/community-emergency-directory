let mapInstance = null;
let currentMarkers = [];

// Initialize Leaflet map instance
function initLeafletMap(defaultLat = 31.2530, defaultLng = 75.7037, defaultZoom = 13) {
  if (mapInstance !== null) {
    return;
  }

  // Bind to div#map
  mapInstance = L.map("map").setView([defaultLat, defaultLng], defaultZoom);

  // Add OpenStreetMap tile provider
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(mapInstance);
}

// Clear old markers and redraw with filtered data
function updateMapMarkers(resourceList) {
  if (!mapInstance) return;

  // Remove existing pins from canvas
  currentMarkers.forEach(marker => mapInstance.removeLayer(marker));
  currentMarkers = [];

  // Plot each active item
  resourceList.forEach(item => {
    if (!item.lat || !item.lng) return;

    const popupHtml = `
      <div>
        <h6 class="mb-1 fw-bold">${item.name}</h6>
        <span class="badge bg-secondary mb-1">${item.category}</span><br>
        <small><strong>Status:</strong> ${item.status}</small><br>
        <small><strong>Helpline:</strong> <a href="tel:${item.contact}">${item.contact}</a></small>
      </div>
    `;

    const marker = L.marker([item.lat, item.lng])
      .addTo(mapInstance)
      .bindPopup(popupHtml);

    currentMarkers.push(marker);
  });
}

// Pan and zoom to specific coordinates clicked from card view
function panToLocation(lat, lng) {
  if (!mapInstance) return;

  mapInstance.setView([lat, lng], 16, {
    animate: true,
    pan: { duration: 0.8 }
  });

  // Automatically trigger the popup matching these coordinates
  currentMarkers.forEach(marker => {
    const pos = marker.getLatLng();
    if (Math.abs(pos.lat - lat) < 0.0001 && Math.abs(pos.lng - lng) < 0.0001) {
      marker.openPopup();
    }
  });

  // Smooth scroll up to the map window on small screens
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Optional GPS location detection via HTML5 Geolocation API
function locateUserOnMap() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      mapInstance.setView([userLat, userLng], 14);

      L.circleMarker([userLat, userLng], {
        radius: 8,
        fillColor: "#0d6efd",
        color: "#ffffff",
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85
      }).addTo(mapInstance).bindPopup("<b>Your Current Location</b>").openPopup();
    },
    (err) => {
      alert("Unable to fetch location: " + err.message);
    }
  );
}