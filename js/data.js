// Default emergency listings for first-time site load
const initialResources = [
  {
    id: 1,
    name: "Civil Hospital Trauma & Relief Wing",
    category: "Medical",
    contact: "0181-2223344",
    lat: 31.2530,
    lng: 75.7037,
    status: "Available",
    isVerified: true
  },
  {
    id: 2,
    name: "Govt High School Shelter Ground",
    category: "Shelter",
    contact: "9876543210",
    lat: 31.2580,
    lng: 75.7090,
    status: "Limited",
    isVerified: true
  },
  {
    id: 3,
    name: "Red Cross Emergency Food & Clean Water Camp",
    category: "Food & Water",
    contact: "1800-111-222",
    lat: 31.2490,
    lng: 75.6980,
    status: "Available",
    isVerified: false
  },
  {
    id: 4,
    name: "State Disaster Management Control Room",
    category: "Helpline",
    contact: "1070",
    lat: 31.2515,
    lng: 75.7010,
    status: "Available",
    isVerified: true
  }
];

// Initialize localStorage if keys do not already exist
function initializeData() {
  if (!localStorage.getItem("emergencyResources")) {
    localStorage.setItem("emergencyResources", JSON.stringify(initialResources));
  }
}

// Retrieve resources array from browser storage
function getResources() {
  initializeData();
  return JSON.parse(localStorage.getItem("emergencyResources"));
}

// Persist modified array back to localStorage
function saveResources(resourcesArray) {
  localStorage.setItem("emergencyResources", JSON.stringify(resourcesArray));
}

// Restore default initial data
function resetToDefaultData() {
  localStorage.setItem("emergencyResources", JSON.stringify(initialResources));
}
