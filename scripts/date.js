// Display the current year
const currentYear = document.querySelector("#currentyear");
currentYear.textContent = new Date().getFullYear();

// Display the last modified date
const lastModified = document.querySelector("#lastModified");
lastModified.textContent = `Last Modified: ${document.lastModified}`;