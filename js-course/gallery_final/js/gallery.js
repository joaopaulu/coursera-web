const imageData = [
  { id: 10, alt: "Mountain landscape at sunrise" },
  { id: 20, alt: "Modern city skyline with skyscrapers" },
  { id: 30, alt: "Person walking on the beach at sunset" },
  { id: 40, alt: "Technology represented by electronic circuits" },
  { id: 50, alt: "Gourmet dish in a restaurant" },
  { id: 60, alt: "Lion resting in the African savanna" }
];

function loadImages() {
    const previewContainer = document.getElementById("previewContainer");
    previewContainer.innerHTML = "";

    for (let i = 0; i < imageData.length; i++) {
        const { id, alt } = imageData[i];
        const img = document.createElement("img");

        img.classList.add("preview");
        img.alt = alt;
        img.src = `https://picsum.photos/id/${id}/300/200`;
        img.dataset.full = `https://picsum.photos/id/${id}/1200/800`;
        img.tabIndex = 0;
        img.setAttribute("aria-label", alt);

        img.addEventListener("mouseover", () => upDate(img));
        img.addEventListener("mouseout", unDo);
        img.addEventListener("focus", () => upDate(img));
        img.addEventListener("blur", unDo);

        console.log(`Image ${id} loaded.`);

        previewContainer.appendChild(img);
    }
}

function upDate(img) {
    document.getElementById("image").style.backgroundImage = `url(${img.dataset.full})`;
    console.log(`Image updated: ${img.alt}`);
}

function unDo() {
    document.getElementById("image").style.backgroundImage = "";
    console.log("Image restored.");
}

function initGallery() {
    console.log("Page loaded. Initializing gallery...");
    loadImages();
}
