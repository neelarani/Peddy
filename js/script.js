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

const displayAllPets = pets => {
  const displayPets = document.getElementById('display-pets');
  displayPets.innerHTML = '';
  if (pets.length === 0) {
    const div = document.createElement('div');
    div.innerHTML = `
        <div class="text-center flex flex-col justify-center items-center w-[800px] ">
        <img src="/images/error.webp"/>
        <h3 class="text-xl md:text-4xl font-extrabold">No Information Available</h3>
        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
    `;
    displayPets.appendChild(div);
    return;
  }
  pets.forEach(pet => {
    const div = document.createElement('div');
    div.innerHTML = `
            <div class="card bg-base-100 w-80  shadow-xl h-[400px]  object-cover">
              <figure class="p-4">
                <img src=${pet.image} />
              </figure>
              <div class="card-body">
                <h2 class="card-title">${pet.breed}</h2>
                <p><i class="fa-regular fa-calendar-days p-2"></i>
                ${pet.date_of_birth}</p>
                <p><i class="fa-solid fa-mercury"></i>
                  Gender: ${pet.gender}
                </p>
                <p><i class="fa-solid fa-dollar-sign"></i>
                Price: ${pet.price}
                </p>
                <div class="card-actions flex justify-between">
                  <button class="btn ">
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
};

loadAllPet();
