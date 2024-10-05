const loadCategories = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await response.json();
  displayPets(data.categories);
};

const displayPets = pets => {
  const petContainer = document.getElementById('pet-container');
  pets.forEach(pet => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="flex justify-center items-center font-extrabold gap-2">
    <img src="${pet.category_icon}"/>
    <span>${pet.category}</span>
    </div>
    `;
    petContainer.appendChild(div);
  });
};

loadCategories();

const loadAllPet = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await response.json();
  console.log(data);
};

loadAllPet();
