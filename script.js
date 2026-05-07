// Dragon Ball Characters Data
const characters = [
    {
        name: "Goku",
        description: "The main protagonist, a Saiyan warrior with incredible strength and heart.",
        image: "https://i.pinimg.com/originals/8a/e6/e1/8ae6e1c0e1e4c0b0b0b0b0b0b0b0b0b0.png",
        power: 9000,
        race: "Saiyan",
        transformations: ["Super Saiyan", "Super Saiyan Blue", "Ultra Instinct"]
    },
    {
        name: "Vegeta",
        description: "The Prince of all Saiyans, Goku's rival who becomes an ally.",
        image: "https://i.pinimg.com/originals/f7/e1/e1/f7e1e1e1e1e1e1e1e1e1e1e1e1e1e1e1.png",
        power: 8800,
        race: "Saiyan",
        transformations: ["Super Saiyan", "Super Saiyan Blue", "Ultra Ego"]
    },
    {
        name: "Piccolo",
        description: "A Namekian warrior and one of Goku's closest friends.",
        image: "https://i.pinimg.com/originals/5a/5a/5a/5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a5a.png",
        power: 7000,
        race: "Namekian",
        transformations: ["Giant Form", "Fusion"]
    },
    {
        name: "Frieza",
        description: "The tyrannical emperor of the universe and Goku's first major enemy.",
        image: "https://i.pinimg.com/originals/1a/1a/1a/1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a.png",
        power: 9000,
        race: "Frieza Race",
        transformations: ["Second Form", "Third Form", "Final Form", "Golden Frieza"]
    },
    {
        name: "Krillin",
        description: "Goku's best friend and a martial artist who fights alongside him.",
        image: "https://i.pinimg.com/originals/3b/3b/3b/3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b3b.png",
        power: 5000,
        race: "Human",
        transformations: []
    },
    {
        name: "Gohan",
        description: "Goku's son, a hybrid Saiyan with immense hidden potential.",
        image: "https://i.pinimg.com/originals/2c/2c/2c/2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c2c.png",
        power: 8500,
        race: "Saiyan-Human Hybrid",
        transformations: ["Super Saiyan", "Super Saiyan 2", "Ultimate"]
    },
    {
        name: "Trunks",
        description: "Vegeta's son from the future, a skilled swordsman.",
        image: "https://i.pinimg.com/originals/4d/4d/4d/4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d4d.png",
        power: 7500,
        race: "Saiyan-Human Hybrid",
        transformations: ["Super Saiyan", "Super Saiyan Blue"]
    },
    {
        name: "Buu",
        description: "A pink magical being of pure destruction with regenerative powers.",
        image: "https://i.pinimg.com/originals/6e/6e/6e/6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e6e.png",
        power: 9500,
        race: "Majin",
        transformations: ["Evil Buu", "Super Buu", "Kid Buu"]
    },
    {
        name: "Cell",
        description: "A bio-engineered android who absorbs stronger beings to achieve perfection.",
        image: "https://i.pinimg.com/originals/7f/7f/7f/7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f.png",
        power: 9000,
        race: "Android",
        transformations: ["Semi-Perfect Form", "Perfect Form"]
    }
];

const itemsPerPage = 8;
let currentPage = 1;
let filteredCharacters = characters;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayCharacters();
    setupPagination();
    setupSearchFunctionality();
});

// Display characters
function displayCharacters() {
    const container = document.getElementById('characterContainer');
    container.innerHTML = '';

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedCharacters = filteredCharacters.slice(start, end);

    paginatedCharacters.forEach(character => {
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
            <div class="card h-100 cursor-pointer character-card" data-character="${character.name}">
                <img src="${character.image}" class="card-img-top" alt="${character.name}" onerror="this.src='https://via.placeholder.com/250x350?text=${character.name}'">
                <div class="card-body">
                    <h5 class="card-title">${character.name}</h5>
                    <p class="card-text">${character.description}</p>
                    <button class="btn btn-sm btn-info" onclick="openCharacterModal('${character.name}')">View Details</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Setup pagination
function setupPagination() {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(filteredCharacters.length / itemsPerPage);

    if (totalPages <= 1) return;

    // Previous button
    const prevBtn = document.createElement('li');
    prevBtn.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevBtn.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">Previous</a>`;
    pagination.appendChild(prevBtn);

    // Page buttons
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('li');
        btn.className = `page-item ${i === currentPage ? 'active' : ''}`;
        btn.innerHTML = `<a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>`;
        pagination.appendChild(btn);
    }

    // Next button
    const nextBtn = document.createElement('li');
    nextBtn.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextBtn.innerHTML = `<a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">Next</a>`;
    pagination.appendChild(nextBtn);
}

// Change page
function changePage(page) {
    currentPage = page;
    displayCharacters();
    setupPagination();
}

// Setup search functionality
function setupSearchFunctionality() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');

    searchButton.addEventListener('click', performSearch);
    clearButton.addEventListener('click', clearSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });
}

// Perform search
function performSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (searchTerm === '') {
        filteredCharacters = characters;
    } else {
        filteredCharacters = characters.filter(character =>
            character.name.toLowerCase().includes(searchTerm)
        );
    }

    currentPage = 1;
    displayCharacters();
    setupPagination();
}

// Clear search
function clearSearch() {
    document.getElementById('searchInput').value = '';
    filteredCharacters = characters;
    currentPage = 1;
    displayCharacters();
    setupPagination();
}

// Open character modal
function openCharacterModal(characterName) {
    const character = characters.find(c => c.name === characterName);
    if (!character) return;

    document.getElementById('characterImage').src = character.image;
    document.getElementById('characterImage').onerror = function() {
        this.src = `https://via.placeholder.com/250x350?text=${character.name}`;
    };
    document.getElementById('characterName').textContent = character.name;
    document.getElementById('characterDescription').textContent = character.description;

    const detailsList = document.getElementById('characterDetails');
    detailsList.innerHTML = `
        <li class="list-group-item"><strong>Race:</strong> ${character.race}</li>
        <li class="list-group-item"><strong>Power Level:</strong> ${character.power.toLocaleString()}</li>
        <li class="list-group-item"><strong>Transformations:</strong> ${character.transformations.length > 0 ? character.transformations.join(', ') : 'None'}</li>
    `;

    const modal = new bootstrap.Modal(document.getElementById('characterModal'));
    modal.show();
}