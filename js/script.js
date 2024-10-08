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
    <div onclick="loadAllPet('${category.category}')" class="flex justify-center rounded-full bg-gradient-to-r from-purple-400 to-pink-300 hover:from-pink-300 hover:to-purple-300 transition-colors ease-in-out items-center font-extrabold gap-2 border-2 px-10 hover: py-3 cursor-pointer">

    <img class="w-9"  src="${category.category_icon}"/>
    <span>${category.category}</span>
    </div>
    `;

    categoryContainer.appendChild(div);
  });
};

loadCategories();

// Handle spinner
const handleSpinner = isLoading => {
  const spinner = document.getElementById('spinner');
  if (isLoading) {
    spinner.style.display = 'flex';
  } else {
    spinner.style.display = 'none';
  }
};

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

// Load all pets
const loadAllPet = async (category = '') => {
  handleSpinner(true);

  setTimeout(async () => {
    const response = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pets`
    );
    const data = await response.json();

    handleSpinner(false);

    const filterPets = category
      ? data.pets.filter(pet => pet.category === category)
      : data.pets;

    displayAllPets(filterPets);
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
            <div class="card bg-base-100 shadow-xl h-[420px]">
              <figure class="">
                <img class=" w-full p-3 h-full object-cover" src=${pet.image}/>
              </figure>
              <div class="p-3">
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
                <div class="divider"></div>
                <div class="card-actions flex justify-between">
                  <button class="add-button px-4 border-2 rounded-lg py-1 font-bold hover:bg-gradient-to-l hover:from-[#0E7A81] hover:to-purple-600 transition-all duration-600  hover:text-white">
                    <i class="fa-regular fa-thumbs-up text-base "></i>
                  </button>
                  <button class="px-4 font-bold border-2 rounded-lg py-1 adopt-button text-[#0E7A81] text-base hover:bg-gradient-to-l hover:from-[#0E7A81] hover:to-purple-600 transition-all duration-600 hover:text-white">Adopt</button>
                  <button onclick="my_modal_1.showModal()" class="details-button font-bold px-4 py-1 rounded-lg text-[#0E7A81] border-2  text-base hover:bg-gradient-to-l hover:from-[#0E7A81] hover:to-purple-600 transition-all duration-600  hover:text-white">Details</button>
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
            <button class="btn bg-[#0E7A81] text-white hover:bg-[#0E7A86] text-lg font-bold w-full">Cancel</button>
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
