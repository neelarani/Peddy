const loadCategories = async () => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/categories`
  );
  const data = await response.json();
  displayCategories(data.categories);
};

// display category function
let activeCategory = null;

const displayCategories = categories => {
  const categoryContainer = document.getElementById('category-container');
  categories.forEach(category => {
    const div = document.createElement('div');
    div.innerHTML = `
    <div id="category-${category.category}" onclick="toggleActive('${category.category}')"class="flex justify-center rounded-2xl bg-green-50  transition-all duration-500 items-center font-extrabold gap-2 border-2 px-12 py-2 cursor-pointer">

    <img class="w-6" src="${category.category_icon}"/>
    <span>${category.category}</span>
    </div>
    `;
    categoryContainer.appendChild(div);
  });
};

// function to toggle active class for categories
const toggleActive = category => {
  if (activeCategory) {
    const previousCategory = document.getElementById(
      `category-${activeCategory}`
    );
    previousCategory.classList.remove(
      'bg-gradient-to-r',
      'from-[#0E7A81]',
      'to-purple-500',
      'hover:to-[#0E7A81]',
      'hover:from-purple-600',
      'text-white'
    );
  }

  // set new active color
  activeCategory = category;
  const currentCategory = document.getElementById(`category-${category}`);
  currentCategory.classList.add(
    'bg-gradient-to-r',
    'from-[#0E7A81]',
    'to-purple-500',
    'hover:to-[#0E7A81]',
    'hover:from-purple-600',
    'text-white'
  );
  loadAllPet(category);
};

loadCategories();

// sort price
const sortPrice = () => {
  const sortContainer = document
    .getElementById('sort-price')
    .addEventListener('click', () => {
      const displayPets = document.getElementById('display-pets');
      const petCards = [...displayPets.children];

      const sortedPets = petCards.sort((card1, card2) => {
        const price1 = parseFloat(
          card1
            .querySelector('.fa-dollar-sign')
            .nextSibling.nodeValue.trim()
            .replace('Price:', '') || 0
        );
        const price2 = parseFloat(
          card2
            .querySelector('.fa-dollar-sign')
            .nextSibling.nodeValue.trim()
            .replace('Price:', '') || 0
        );
        return price2 - price1;
      });
      displayPets.innerHTML = ``;
      sortedPets.forEach(petCard => displayPets.appendChild(petCard));
    });
};

sortPrice();

// Load all pets with sipnner delay
const loadAllPet = async category => {
  const spinner = document.getElementById('spinner');
  const displayPets = document.getElementById('display-pets');
  const selectPetContainer = document.getElementById('select-pet-container');
  spinner.innerHTML = `
      <i class=" fa-solid fa-spinner fa-spin text-4xl"></i>
  `;
  displayPets.innerHTML = '';

  selectPetContainer.classList.add('hidden');
  setTimeout(async () => {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pets`
    );
    const data = await response.json();

    let petsToDisplay = data.pets;

    if (category) {
      petsToDisplay = data.pets.filter(pet => pet.category === category);
    }
    spinner.innerHTML = '';

    displayAllPets(petsToDisplay);
    selectPetContainer.classList.remove('hidden');
  }, 2000);
};

// add pet function
const handleAddPet = pet => {
  const selectPet = document.getElementById('selected-pet');
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="rounded-lg border-2 p-2 h-full">
      <img class="object-cover" src=${pet.image}/>
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
        <div class="text-center flex flex-col justify-center items-center w-11/12 h-auto">
        <img src="/images/error.webp"/>
        <h3 class="text-xl md:text-3xl font-extrabold">No Information Available</h3>
        <p>Show another pet, we don't have this pet.</p>
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
            <div class="card bg-base-100 shadow-xl h-[420px]">
              <figure class="">
                <img class=" w-full p-3 h-full object-cover" src=${pet.image}/>
              </figure>
              <div class="p-3">
              <h2 class="font-extrabold text-xl">${petName}</h2>
                <p class="flex">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
            </svg>

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
                <div class="divider"></div>
                <div class="card-actions flex justify-between">
                  <button class="add-button px-2 md:px-4 border-2 rounded-lg  py-1 font-bold hover:bg-gradient-to-l hover:from-[#0E7A81] hover:to-purple-600 transition-all duration-600  hover:text-white">
                    <i class="fa-regular fa-thumbs-up text-sm md:text-base text-[#0E7A81]"></i>
                  </button>
                  <button class="px-2 md:px-4 font-bold border-2 rounded-lg py-1 adopt-button text-[#0E7A81] text-sm md:text-base hover:bg-gradient-to-l hover:from-[#0E7A81] hover:to-purple-600 transition-all duration-600 hover:text-white">Adopt</button>
                  <button onclick="my_modal_1.showModal()" class="details-button font-bold px-2 md:px-4 py-1 rounded-lg text-[#0E7A81] border-2 text-sm md:text-base hover:bg-gradient-to-l hover:from-[#0E7A81] hover:to-purple-600 transition-all duration-600  hover:text-white">Details</button>
                </div>
              </div>
            </div>
  `;

    // Add event listeners for each details button
    const modalContainer = document.getElementById('modal-container');
    const detailsButton = div.querySelector('.details-button');

    detailsButton.addEventListener('click', () => {
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
            <button class="btn bg-gradient-to-r from-[#0E7A81] to-purple-500 hover:from-[#0E7A81] hover:to-purple-600  text-white text-lg font-bold w-full">Cancel</button>
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

    displayPets.appendChild(div);
  });

  const addButton = document.querySelectorAll('.add-button');
  addButton.forEach((addButton, index) => {
    addButton.addEventListener('click', () => handleAddPet(pets[index]));
  });

  // Adopt button event listener
  const adoptButton = document.querySelectorAll('.adopt-button');
  adoptButton.forEach(button => {
    button.addEventListener('click', () => {
      // modal container
      const modalContainer = document.createElement('div');
      modalContainer.style.cssText = `
      position: fixed; 
      top: 0; 
      left: 0; 
      width: 100%; 
      height: 100%; 
      background-color: rgba(0, 0, 0, 0.5); 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      z-index: 1000;
    `;

      // modal content
      const modalContent = document.createElement('div');
      modalContent.style.cssText = `
      width: 300px; 
      height: 300px; 
      background-color: #fff; 
      color: #000; 
      display: flex; 
      flex-direction: column; 
      align-items: center; 
      justify-content: center; 
      border-radius: 10px; 
      box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
    `;
      modalContent.innerHTML = `
      <div class="space-y-3 flex flex-col justify-center items-center">
      <h2 class="font-extrabold text-xl">Congratulations!</h2>
      <p class="text-sm font-medium">Addoption Process is Start For your Pet</p>
      <p id="counter" class="text-2xl font-bold">3</p>
      </div>
    `;

      modalContainer.appendChild(modalContent);
      document.body.appendChild(modalContainer);

      let count = 3;
      const counterDisplay = document.getElementById('counter');
      const interval = setInterval(() => {
        count--;
        counterDisplay.innerText = count;
        if (count === 0) {
          clearInterval(interval);
          modalContainer.remove();
        }
      }, 1000);
    });
  });
};

loadAllPet();
