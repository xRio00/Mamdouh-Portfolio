function sendEmail(recommendation) {
  emailjs.send("service_4unvfpy", "template_po2sinh", {
      message: recommendation
  }, "HO6msnHmhZNJhJKHK")
  .then(
      function(response) {
          console.log("Email sent successfully!", response);
      },
      function(error) {
          console.error("Email sending failed:", error);
      }
  );
}

function addRecommendation() {
  let recommendation = document.getElementById("new_recommendation").value.trim();
    
    if (recommendation !== "") {
        console.log("New recommendation added");

        // Show success popup (optional)
        showPopup(true);

        // Create recommendation card
        let element = document.createElement("div");
        element.setAttribute("class", "recommendation-card");
        element.innerHTML = `<p class="recommendation-text">&#8220;${recommendation}&#8221;</p>`;

        // Append to the carousel track
        let track = document.getElementById("carousel-track");
        track.appendChild(element);

        // Save to LocalStorage
        saveRecommendation(recommendation);

        // Send Email
        sendEmail(recommendation);

        // Reset input field
        document.getElementById("new_recommendation").value = "";
    }
}

function saveRecommendation(message) {
  let recommendations = JSON.parse(localStorage.getItem("recommendations")) || [];
  recommendations.push(message);
  localStorage.setItem("recommendations", JSON.stringify(recommendations));
}

// Define loadRecommendations() first
function loadRecommendations() {
  console.log("Loading recommendations...");
  let recommendations = JSON.parse(localStorage.getItem("recommendations")) || [];
  let track = document.getElementById("carousel-track");

  if (!track) {
      console.error("Error: 'carousel-track' not found.");
      return;
  }

  recommendations.forEach((message) => {
      let element = document.createElement("div");
      element.setAttribute("class", "recommendation-card");
      element.innerHTML = `<p class="recommendation-text">&#8220;${message}&#8221;</p>`;
      track.appendChild(element);
  });
}

// Load saved recommendations when the page loads
document.addEventListener("DOMContentLoaded", function () {
  let recommendations = JSON.parse(localStorage.getItem("recommendations")) || [];
  let track = document.getElementById("carousel-track");

  recommendations.forEach((message) => {
      let element = document.createElement("div");
      element.setAttribute("class", "recommendation-card");
      element.innerHTML = `<p class="recommendation-text">&#8220;${message}&#8221;</p>`;
      track.appendChild(element);
  });

  loadRecommendations();
  let nextButton = document.getElementById("next-btn");
    let prevButton = document.getElementById("prev-btn");

    if (nextButton && prevButton) {
        nextButton.addEventListener("click", nextSlide);
        prevButton.addEventListener("click", prevSlide);
    } else {
        console.error("Error: Next or Previous button not found.");
    }
});

  
function showPopup(bool) {
  if (bool) {
    document.getElementById("popup").style.visibility = "visible";
  } else {
    document.getElementById("popup").style.visibility = "hidden";
  }
}

function toggleMenu() {
  let menu = document.getElementById("nav-links"); // The navigation menu
  let menuToggle = document.getElementById("menu-toggle"); // The menu button

  menu.classList.toggle("active"); // Toggle menu visibility

  // Change menu icon based on the menu state
  if (menu.classList.contains("active")) {
    menuToggle.innerHTML = "&#10006;"; // Change to 'X' (close)
  } else {
    menuToggle.innerHTML = "&#9776;"; // Change back to ☰ (menu)
  }
}


let track = document.getElementById("carousel-track");
if (!track) {
    console.error("Error: 'carousel-track' not found.");
} else {
    let slides = document.querySelectorAll(".recommendation-card");
}

function nextSlide() {
  if (!track || track.children.length <= 1) return;
  let slideWidth = track.firstElementChild.offsetWidth;
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(-${slideWidth}px)`;

  setTimeout(() => {
      track.appendChild(track.firstElementChild);
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
  }, 500);
}

function prevSlide() {
  if (!track || track.children.length <= 1) return;
  let slideWidth = track.firstElementChild.offsetWidth;
  track.style.transition = "none";
  track.insertBefore(track.lastElementChild, track.firstElementChild);
  track.style.transform = `translateX(-${slideWidth}px)`;

  setTimeout(() => {
      track.style.transition = "transform 0.5s ease-in-out";
      track.style.transform = "translateX(0)";
  }, 50);
}


setInterval(nextSlide, 5000);
