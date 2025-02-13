document.addEventListener("DOMContentLoaded", () => {
  let users = [];
  let currentPage = 1;
  const usersPerPage = 10;

  const userList = document.getElementById("user-list");
  const prevPageBtn = document.getElementById("prevPage");
  const nextPageBtn = document.getElementById("nextPage");
  const pageNumber = document.getElementById("pageNumber");
  const userModal = document.getElementById("userModal");
  const closeModalBtn = document.getElementById("closeModal");

  function displayUsers(page) {
    userList.innerHTML = "";
    const start = (page - 1) * usersPerPage;
    const end = start + usersPerPage;
    const paginatedUsers = users.slice(start, end);

    paginatedUsers.forEach((user) => {
      const userCard = document.createElement("div");
      userCard.classList.add(
        "bg-white",
        "rounded-lg",
        "shadow-lg",
        "p-4",
        "w-60",
        "text-center",
        "cursor-pointer",
        "hover:bg-gray-100"
      );
      userCard.innerHTML = `
              <img class="mx-auto rounded-full border-2 border-gray-300" src="${user.picture.medium}" alt="${user.name.first}">
              <h3 class="text-lg font-semibold mt-2">${user.name.first} ${user.name.last}</h3>
              <p class="text-gray-600">${user.email}</p>
          `;
      userCard.addEventListener("click", () => openUserModal(user));
      userList.appendChild(userCard);
    });

    pageNumber.textContent = `Page ${currentPage}`;
    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = end >= users.length;
  }

  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayUsers(currentPage);
    }
  });

  nextPageBtn.addEventListener("click", () => {
    if (currentPage * usersPerPage < users.length) {
      currentPage++;
      displayUsers(currentPage);
    }
  });

  function fetchUsers() {
    fetch("https://randomuser.me/api/?results=100")
      .then((response) => response.json())
      .then((data) => {
        users = data.results;
        displayUsers(currentPage);
      })
      .catch((error) => console.error("Error loading users:", error));
  }

  function openUserModal(user) {
    document.getElementById("modal-user-image").src = user.picture.large;
    document.getElementById(
      "modal-user-name"
    ).textContent = `${user.name.first} ${user.name.last}`;
    document.getElementById(
      "modal-user-email"
    ).textContent = `📧 Email: ${user.email}`;
    document.getElementById(
      "modal-user-phone"
    ).textContent = `📞 Phone: ${user.phone}`;
    document.getElementById(
      "modal-user-location"
    ).textContent = `📍 Location: ${user.location.city}, ${user.location.country}`;
    document.getElementById(
      "modal-user-age"
    ).textContent = `🎂 Age: ${user.dob.age} years`;
    userModal.classList.remove("hidden");
  }

  closeModalBtn.addEventListener("click", () => {
    userModal.classList.add("hidden");
  });

  fetchUsers();
});
