let mapInstance = null;
let currentMarkers = [];
let userLocationLayer = null;

// Configure Leaflet default icons to avoid CDN asset 404s
if (typeof L !== "undefined" && L.Icon && L.Icon.Default) {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
  });
}

// Initialize Leaflet map instance
function initLeafletMap(defaultLat = 31.2530, defaultLng = 75.7037, defaultZoom = 13) {
  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  // Guarantee explicit height
  if (!mapElement.style.height && mapElement.clientHeight === 0) {
    mapElement.style.height = "420px";
  }

  if (mapInstance !== null) {
    mapInstance.invalidateSize();
    return;
  }

  // Bind to div#map
  mapInstance = L.map("map", {
    scrollWheelZoom: true,
    zoomControl: true
  }).setView([defaultLat, defaultLng], defaultZoom);

  // High-reliability CartoDB Voyager map tiles with OpenStreetMap fallback
  L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
    maxZoom: 19,
    subdomains: "abcd",
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
  }).addTo(mapInstance);

  // Invalidate size once DOM settles to guarantee full tile rendering without grey boxes
  setTimeout(() => {
    if (mapInstance) {
      mapInstance.invalidateSize();
    }
  }, 250);

  // Handle browser window resize
  window.addEventListener("resize", () => {
    if (mapInstance) {
      mapInstance.invalidateSize();
    }
  });
}

// Clear old markers and redraw with filtered data
function updateMapMarkers(resourceList) {
  if (!mapInstance) return;

  // Remove existing pins from canvas
  currentMarkers.forEach(marker => mapInstance.removeLayer(marker));
  currentMarkers = [];

  if (!resourceList || !Array.isArray(resourceList)) return;

  // Plot each active item
  resourceList.forEach(item => {
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lng);
    if (isNaN(lat) || isNaN(lng)) return;

    const badgeColor = item.status === "Available" ? "success" : item.status === "Limited" ? "warning text-dark" : "danger";

    const popupHtml = `
      <div style="min-width: 190px;">
        <h6 class="mb-1 fw-bold text-dark">${item.name}</h6>
        <span class="badge bg-secondary mb-1">${item.category}</span>
        <span class="badge bg-${badgeColor} mb-1">${item.status}</span>
        <hr class="my-1">
        <small class="d-block mb-1"><strong>Verification:</strong> ${item.isVerified ? "✓ Verified" : "⏳ Pending"}</small>
        <small class="d-block mb-2"><strong>Helpline:</strong> <a href="tel:${item.contact}" class="fw-bold">${item.contact}</a></small>
        <a href="https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}" target="_blank" class="btn btn-primary btn-sm w-100 text-white" style="font-size: 0.78rem;">
          🧭 Directions (Google Maps)
        </a>
      </div>
    `;

    const marker = L.marker([lat, lng])
      .addTo(mapInstance)
      .bindPopup(popupHtml);

    currentMarkers.push(marker);
  });
}

// Pan and zoom to specific coordinates clicked from card view
function panToLocation(lat, lng) {
  if (!mapInstance) return;

  const targetLat = parseFloat(lat);
  const targetLng = parseFloat(lng);
  if (isNaN(targetLat) || isNaN(targetLng)) return;

  // Smooth scroll directly to the map container so user sees the location
  const mapContainer = document.getElementById("map");
  if (mapContainer) {
    mapContainer.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  mapInstance.setView([targetLat, targetLng], 16, {
    animate: true,
    pan: { duration: 0.8 }
  });

  // Automatically trigger the popup matching these coordinates
  setTimeout(() => {
    currentMarkers.forEach(marker => {
      const pos = marker.getLatLng();
      if (Math.abs(pos.lat - targetLat) < 0.0005 && Math.abs(pos.lng - targetLng) < 0.0005) {
        marker.openPopup();
      }
    });
  }, 400);
}

// GPS location detection via HTML5 Geolocation API with UI feedback
function locateUserOnMap() {
  const geoBtn = document.getElementById("locateMeBtn");
  const originalHtml = geoBtn ? geoBtn.innerHTML : "📍 My Location";

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  if (geoBtn) {
    geoBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span> Locating...';
    geoBtn.disabled = true;
  }

  const restoreBtn = () => {
    if (geoBtn) {
      geoBtn.innerHTML = originalHtml;
      geoBtn.disabled = false;
    }
  };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      restoreBtn();
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      const mapContainer = document.getElementById("map");
      if (mapContainer) {
        mapContainer.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      mapInstance.setView([userLat, userLng], 15, { animate: true });

      // Remove previous user location marker if any
      if (userLocationLayer) {
        mapInstance.removeLayer(userLocationLayer);
      }

      userLocationLayer = L.circleMarker([userLat, userLng], {
        radius: 9,
        fillColor: "#0d6efd",
        color: "#ffffff",
        weight: 3,
        opacity: 1,
        fillOpacity: 0.95
      }).addTo(mapInstance)
        .bindPopup("<div class='text-center p-1'><strong>📍 Your Current Location</strong><br><small class='text-muted'>Detected via GPS</small></div>")
        .openPopup();
    },
    (err) => {
      restoreBtn();
      alert("Could not detect GPS location (" + err.message + "). Centering on city relief hub.");
      mapInstance.setView([31.2530, 75.7037], 13, { animate: true });
      const mapContainer = document.getElementById("map");
      if (mapContainer) {
        mapContainer.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    },
    { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
  );
}
