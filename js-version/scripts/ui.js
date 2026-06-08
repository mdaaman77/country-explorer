// Status helpers
export function setStatus(element, message) {
    element.textContent = message;
  }
  
  export function cancelStatus(element) {
    element.textContent = "";
  }
  
  // Create card
  export function createCountryCard(country) {
    const card = document.createElement("div");
    card.className = "card";
  
    card.innerHTML = `
      <img src="${country.flags.png}" alt="${country.name.common}" loading="lazy" />
      <div class="card-body">
        <h3 class="card-title">${country.name.common}</h3>
        <p class="card-meta">${country.region}</p>
        <p class="card-meta">👥 ${country.population.toLocaleString()}</p>
        <p class="card-meta">🏙 ${country.capital ? country.capital[0] : "N/A"}</p>
      </div>
    `;
  
    
    card.addEventListener("click", () => {
      showCountryDetails(country);
    });
  
    return card;
  }
  
  // Render list
  export function renderCountries(container, countries) {
    container.innerHTML = "";
  
    if (!countries.length) {
      container.innerHTML = `<p class="status-text">No Countries Found</p>`;
      return;
    }
  
    const fragment = document.createDocumentFragment();
  
    countries.forEach((country) => {
      const card = createCountryCard(country);
      fragment.appendChild(card);
    });
  
    container.appendChild(fragment);
  }
  
  
  export function showCountryDetails(country) {
    // remove existing modal
    const existing = document.getElementById("modal");
    if (existing) existing.remove();
  
    const modal = document.createElement("div");
    modal.id = "modal";
    modal.className = "modal";
  
    const languages = country.languages
      ? Object.values(country.languages).join(", ")
      : "N/A";
  
    const currencies = country.currencies
      ? Object.values(country.currencies)
          .map((c) => c.name)
          .join(", ")
      : "N/A";
  
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-btn">&times;</span>
        <img src="${country.flags.png}" alt="${country.name.common}" />
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital?.[0] || "N/A"}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Languages:</strong> ${languages}</p>
        <p><strong>Currencies:</strong> ${currencies}</p>
      </div>
    `;
  
    document.body.appendChild(modal);
  
    // close modal
    modal.querySelector(".close-btn").onclick = () => modal.remove();
  
    // click outside closes modal
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.remove();
    });
  }