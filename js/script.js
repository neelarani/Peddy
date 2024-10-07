const loadCategories = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await response.json();
  displayCategories(data.categories);
};

// display category function
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

// display all pets
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
                  <button class="btn btn-sm add-button">
                    <i class="fa-regular fa-thumbs-up text-lg"></i>
                  </button>
                  <button class="btn btn-sm text-[#0E7A81] text-lg">Adopt</button>
                  <button id="" onclick="my_modal_1.showModal()" class="details-button btn text-[#0E7A81] btn-sm text-lg">Details</button>
                </div>
              </div>
            </div>

  `;
    displayPets.appendChild(div);

    // Add event listeners for each details button
    const detailsButtons = document.querySelectorAll('.details-button');

    detailsButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        const pet = pets[index];
        const modalContainer = document.getElementById('modal-container');
        modalContainer.innerHTML = `
        <dialog id="my_modal_1" class="modal">
          <div class="modal-box">
          <img class="w-full rounded-lg" src=${pet.image}/>
            <h2 class="font-extrabold text-xl">${
              pet.pet_name || 'Not Available'
            }</h2>
            <div class="grid grid-cols-2"> 
                <p>
                  <i class="fa-solid fa-bowl-food"></i>
                  ${pet.breed || 'Not Available'}
                </p>
                <p><i class="fa-regular fa-calendar-days "></i>
                ${pet.date_of_birth || 'Not Available'}</p>
                <p><i class="fa-solid fa-mercury"></i>
                  Gender: ${pet.gender || 'Not Mentioned'}
                </p>
                <p><i class="fa-solid fa-dollar-sign"></i>
                Price: ${pet.price || 'Not Available'}
                </p>
                <p><i class="fa-solid fa-mercury"></i>
                ${pet.vaccinated_status || 'Not Available'}
                </p>
                </div>
                <p class="mt-8 text-sm">
                <span class="font-extrabold ">Details Information</span> <br>
                ${pet.pet_details}</p>
            <div class="modal-action ">
            <form method="dialog" class="w-full">
            <button class="btn bg-[#0E7A81] text-white hover:bg-[#0E7A86] text-lg font-bold w-full">Cancle</button>
            </form>
          </div>
        </div>
    </dialog>
        `;
        const modal = document.getElementById('my_modal_1');
        if (modal) {
          modal.showModal();
        }
      });
    });
  });

  const addButton = document.querySelectorAll('.add-button');
  addButton.forEach((addButton, index) => {
    addButton.addEventListener('click', () => handleAddPet(pets[index]));
  });
};

loadAllPet();
