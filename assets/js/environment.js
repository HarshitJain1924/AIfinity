let products = {
    data: [
        {
            productName: "The Complete Camtasia Course for Content Creators",
            category: "Intermediate",
            price: "35.00",
            timeinWeek: "3",
            image: "./assets/images/course-1.jpg",
            rating: "5.9",
            ratingCount: "7",
            lessons: "13",
            students: "18"
        },
        {
            productName: "Mastering Photoshop: From Beginner to Advanced",
            category: "Advanced",
            price: "49.99",
            timeinWeek: "5",
            image: "./assets/images/course-2.jpg",
            rating: "5.8",
            ratingCount: "10",
            lessons: "20",
            students: "25"
        },
        {
            productName: "Introduction to Data Science with Python",
            category: "Beginner",
            price: "29.99",
            timeinWeek: "4",
            image: "./assets/images/course-3.jpg",
            rating: "5.5",
            ratingCount: "6",
            lessons: "10",
            students: "15"
        },
        {
            productName: "JavaScript Essentials: From Basics to Advanced",
            category: "Intermediate",
            price: "39.99",
            timeinWeek: "6",
            image: "./assets/images/course-4.jpg",
            rating: "5.7",
            ratingCount: "8",
            lessons: "15",
            students: "20"
        },
        {
            productName: "Advanced React and Redux Development",
            category: "Advanced",
            price: "59.99",
            timeinWeek: "7",
            image: "./assets/images/course-5.jpg",
            rating: "5.8",
            ratingCount: "7",
            lessons: "25",
            students: "30"
        },
        {
            productName: "Python for Machine Learning and Artificial Intelligence",
            category: "Advanced",
            price: "69.99",
            timeinWeek: "8",
            image: "./assets/images/course-6.jpg",
            rating: "5.6",
            ratingCount: "9",
            lessons: "18",
            students: "22"
        },
        {
            productName: "HTML5 and CSS3: The Complete Web Development Course",
            category: "Beginner",
            price: "25.00",
            timeinWeek: "4",
            image: "./assets/images/course-7.jpg",
            rating: "5.5",
            ratingCount: "7",
            lessons: "12",
            students: "17"
        },
        {
            productName: "Angular 11: Complete Guide for Frontend Development",
            category: "Intermediate",
            price: "49.99",
            timeinWeek: "6",
            image: "./assets/images/course-8.jpg",
            rating: "5.7",
            ratingCount: "6",
            lessons: "20",
            students: "25"
        },
        {
            productName: "Machine Learning Fundamentals: A Practical Approach",
            category: "Beginner",
            price: "34.99",
            timeinWeek: "5",
            image: "./assets/images/course-9.jpg",
            rating: "5.4",
            ratingCount: "6",
            lessons: "10",
            students: "14"
        },
        {
            productName: "Advanced CSS Techniques for Modern Web Design",
            category: "Advanced",
            price: "39.99",
            timeinWeek: "6",
            image: "./assets/images/course-10.jpg",
            rating: "5.6",
            ratingCount: "8",
            lessons: "15",
            students: "20"
        },
        // Add more dummy product data here...
    ],
};


for (let i of products.data) {
    // Create Card
    let card = document.createElement("div");
    card.classList.add("course-card", "hide"); // Add the "hide" class here

    // Card banner
    let banner = document.createElement("figure");
    banner.classList.add("card-banner", "img-holder");
    banner.style.setProperty("--width", "370px");
    banner.style.setProperty("--height", "220px");

    let img = document.createElement("img");
    img.setAttribute("src", i.image);
    img.setAttribute("width", "370");
    img.setAttribute("height", "220");
    img.setAttribute("loading", "lazy");
    img.setAttribute("alt", i.productName);
    img.classList.add("img-cover");

    banner.appendChild(img);
    card.appendChild(banner);

    // Badge for duration
    let durationBadge = document.createElement("div");
    durationBadge.classList.add("abs-badge");
    let timeIcon = document.createElement("ion-icon");
    timeIcon.setAttribute("name", "time-outline");
    timeIcon.setAttribute("aria-hidden", "true");
    let timeSpan = document.createElement("span");
    timeSpan.classList.add("span");
    timeSpan.innerText = i.timeinWeek + " Weeks";
    durationBadge.appendChild(timeIcon);
    durationBadge.appendChild(timeSpan);
    card.appendChild(durationBadge);

    // Card content
    let content = document.createElement("div");
    content.classList.add("card-content");

    // Category badge
    let categoryBadge = document.createElement("span");
    categoryBadge.classList.add("badge");
    categoryBadge.innerText = i.category;
    content.appendChild(categoryBadge);

    // Title
    let title = document.createElement("h3");
    title.classList.add("h3");
    let titleLink = document.createElement("a");
    titleLink.setAttribute("href", "#");
    titleLink.classList.add("card-title");
    titleLink.innerText = i.productName;
    title.appendChild(titleLink);
    content.appendChild(title);

    // Wrapper for rating and rating text
    let wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");

    // Rating
    let ratingWrapper = document.createElement("div");
    ratingWrapper.classList.add("rating-wrapper");
    for (let j = 0; j < parseInt(i.rating); j++) {
        let starIcon = document.createElement("ion-icon");
        starIcon.setAttribute("name", "star");
        ratingWrapper.appendChild(starIcon);
    }
    wrapper.appendChild(ratingWrapper);

    // Rating text
    let ratingText = document.createElement("p");
    ratingText.classList.add("rating-text");
    ratingText.innerText = "(" + i.rating + " / " + i.ratingCount + " Rating)";
    wrapper.appendChild(ratingText);

    content.appendChild(wrapper);

    // Price
    let price = document.createElement("data");
    price.classList.add("price");
    price.setAttribute("value", i.price);
    price.innerText = "$" + i.price;
    content.appendChild(price);

    // Card meta list
    let metaList = document.createElement("ul");
    metaList.classList.add("card-meta-list");

    // Lessons
    let lessonsItem = document.createElement("li");
    lessonsItem.classList.add("card-meta-item");
    let lessonsIcon = document.createElement("ion-icon");
    lessonsIcon.setAttribute("name", "library-outline");
    lessonsIcon.setAttribute("aria-hidden", "true");
    let lessonsSpan = document.createElement("span");
    lessonsSpan.classList.add("span");
    lessonsSpan.innerText = i.lessons + " Lessons";
    lessonsItem.appendChild(lessonsIcon);
    lessonsItem.appendChild(lessonsSpan);
    metaList.appendChild(lessonsItem);

    // Students
    let studentsItem = document.createElement("li");
    studentsItem.classList.add("card-meta-item");
    let studentsIcon = document.createElement("ion-icon");
    studentsIcon.setAttribute("name", "people-outline");
    studentsIcon.setAttribute("aria-hidden", "true");
    let studentsSpan = document.createElement("span");
    studentsSpan.classList.add("span");
    studentsSpan.innerText = i.students + " Students";
    studentsItem.appendChild(studentsIcon);
    studentsItem.appendChild(studentsSpan);
    metaList.appendChild(studentsItem);

    content.appendChild(metaList);

    card.appendChild(content);
    document.getElementById("products").appendChild(card);

    // Add click event listener to the card
    card.addEventListener("click", () => {
        // Call function to open product details passing product ID
        openProductDetails(i.productId);
    });
}

// Parameter passed from button (Parameter same as category)
function filterProduct(value) {
    //Button class code
    let buttons = document.querySelectorAll(".button-value");
    buttons.forEach((button) => {
        //check if value equals innerText
        if (value.toUpperCase() == button.innerText.toUpperCase()) {
            button.classList.add("active");
        } else {
            button.classList.remove("active");
        }
    });

    //select all cards
    let elements = document.querySelectorAll(".course-card");
    //loop through all cards
    elements.forEach((element) => {
        //display all cards on 'all' button click
        if (value == "all") {
            element.classList.remove("hide");
        } else {
            //Check if element contains category class
            if (element.querySelector(".badge").innerText.toUpperCase() == value.toUpperCase()) {
                //display element based on category
                element.classList.remove("hide");
            } else {
                //hide other elements
                element.classList.add("hide");
            }
        }
    });
}

// Search button click
document.getElementById("search").addEventListener("click", () => {
    // initializations
    let searchInput = document.getElementById("search-input").value.toLowerCase();
    let elements = document.querySelectorAll(".card-title");
    let cards = document.querySelectorAll(".course-card");

    // loop through all elements
    elements.forEach((element, index) => {
        // check if text includes the search value
        if (element.innerText.toLowerCase().includes(searchInput)) {
            // display matching card
            cards[index].classList.remove("hide");
        } else {
            // hide others
            cards[index].classList.add("hide");
        }
    });
});


