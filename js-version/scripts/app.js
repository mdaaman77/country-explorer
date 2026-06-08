import { fetchCountries } from "./api.js";
import { setStatus, cancelStatus, renderCountries } from "./ui.js";
import { UI_CONFIG } from "./config.js";

const container = document.getElementById("countriesContainer");
const statusEl = document.getElementById("status");
const searchInput = document.getElementById("searchInput");

let state = {
  countries: [],
  filtered: [],
};

let debounceTimer = null;

const applySearch = (value) => {
  const query = value.trim().toLowerCase();

  if (!query) {
    state.filtered = state.countries;
  } else {
    state.filtered = state.countries.filter((c) =>
      c.name.common.toLowerCase().includes(query)
    );
  }

  renderCountries(container, state.filtered);
};

const handleSearch = (e) => {
  const value = e.target.value;

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(() => {
    applySearch(value);
  }, UI_CONFIG.SEARCH_DEBOUNCE_DELAY);
};

const bootstrap = async () => {
  try {
    setStatus(statusEl, "Loading...");

    const data = await fetchCountries();

    state.countries = data;
    state.filtered = data;

    cancelStatus(statusEl);
    renderCountries(container, state.filtered);
  } catch (err) {
    setStatus(statusEl, err.message || "Something went wrong");
  }
};

searchInput.addEventListener("input", handleSearch);

bootstrap();