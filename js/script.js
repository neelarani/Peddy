const loadCategories = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await response.json();
  displayCategories(data.categories);
};

const displayCategories = categories => {
  const categoryContainer = document.getElementById('category-container');
  categories.forEach(category => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div onclick="loadAllPet('${category.category}')" class="flex justify-center items-center font-extrabold gap-2 border-2 px-8 py-3 cursor-pointer">

    <img src="${category.category_icon}"/>
    <span>${category.category}</span>
    </div>
    `;
    categoryContainer.appendChild(div);
  });
};

loadCategories();

// loading all pets
const loadAllPet = async (category = '') => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pets`
  );
  const data = await response.json();
  const filterPets = category
    ? data.pets.filter(pet => pet.category === category)
    : data.pets;
  displayAllPets(filterPets);
};

const handleAddPet = pet => {
  const selectPet = document.getElementById('selected-pet');
  const div = document.createElement('div');
  div.innerHTML = `
    <div class=" rounded-lg border-2 p-2 m-3">
      <img src=${pet.image}/>
    </div>
  `;
  selectPet.appendChild(div);
};

const displayAllPets = pets => {
  const displayPets = document.getElementById('display-pets');
  displayPets.innerHTML = '';
  if (pets.length === 0) {
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="text-center flex flex-col justify-center items-center w-11/12">
        <img src="/images/error.webp"/>
        <h3 class="text-xl md:text-3xl font-extrabold">No Information Available</h3>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
    `;
    displayPets.appendChild(div);
    return;
  }
  pets.forEach(pet => {
    const div = document.createElement('div');
    const petName = pet.pet_name ? pet.pet_name : 'Not Published';
    const petBreed = pet.breed ? pet.breed : 'Not Available';
    const petBirthDay = pet.date_of_birth ? pet.date_of_birth : 'Not Available';
    const petGender = pet.gender ? pet.gender : 'Not Mentioned';
    const petPrice = pet.price ? pet.price : 'Not Available';

    div.innerHTML = `
            <div class="card bg-base-100 w-76 shadow-xl h-[400px]  object-cover">
              <figure class="p-4">
                <img src=${pet.image}/>
              </figure>
              <div class="card-body">
              <h2 class="font-extrabold text-xl">${petName}</h2>
                <p>
                  <i class="fa-solid fa-bowl-food"></i>
                  ${petBreed}
                </p>
                <p><i class="fa-regular fa-calendar-days "></i>
                ${petBirthDay}</p>
                <p><i class="fa-solid fa-mercury"></i>
                  Gender: ${petGender}
                </p>
                <p><i class="fa-solid fa-dollar-sign"></i>
                Price: ${petPrice}
                </p>
                <div class="card-actions flex justify-between">
                  <button class="btn add-button">
                    <i class="fa-regular fa-thumbs-up text-lg"></i>
                  </button>
                  <button class="btn text-[#0E7A81] text-lg">Adopt</button>
                  <button class="btn text-[#0E7A81] text-lg">Details</button>
                </div>
              </div>
            </div>

  `;
    displayPets.appendChild(div);
  });
  const addButton = document.querySelectorAll('.add-button');
  addButton.forEach((addButton, index) => {
    addButton.addEventListener('click', () => handleAddPet(pets[index]));
  });
};

loadAllPet();
