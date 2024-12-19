// This to Fetch horoscope data from db.json
async function fetchHoroscopeData() {
    try {
        const response = await fetch("http://localhost:3000/horoscopes"); // Assuming db.json is served from the same directory
        const data = await response.json();

        // After fetching, i have initialize the horoscopes and bind events
        initializeHoroscopes(data);
    } catch (error) {
        console.error("Error fetching horoscope data:", error);
    }
}

// I have Initialize horoscope list
function initializeHoroscopes(horoscopes) {
    const horoscopeList = document.getElementById("horoscopeList");
    horoscopeList.innerHTML = ""; // Clear the list

    horoscopes.forEach(horoscope => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <img src="${horoscope.img}" alt="${horoscope.name}" style="width: 50px; height: 50px; margin-right: 10px;">
            ${horoscope.name}
        `;
        listItem.onclick = () => showHoroscopeDetails(horoscope);
        horoscopeList.appendChild(listItem);
    });
}

// I have Shown the details of the selected horoscope
function showHoroscopeDetails(horoscope) {
    const detailsContent = document.getElementById("detailsContent");
    const commentsList = document.getElementById("commentsList");

    //I have Set the details content
    detailsContent.innerHTML = `
        <img src="${horoscope.img}" alt="${horoscope.name}" style="width: 474px; height: 654px; margin-bottom: 10px;">
        <p>${horoscope.details}</p>
    `;

    //I have Display the comments
    commentsList.innerHTML = ""; // Clear the previous comments
    horoscope.comments.forEach(comment => {
        const commentItem = document.createElement("li");
        commentItem.textContent = `${comment.user}: ${comment.text}`;
        commentsList.appendChild(commentItem);
    });

    // I have Set up the comment input
    document.getElementById("commentInput").value = ""; // Clear the input
    document.getElementById("commentButton").onclick = () => addComment(horoscope);
}

// I have added a comment to the selected horoscope
function addComment(horoscope) {
    const commentInput = document.getElementById("commentInput");
    const newCommentText = commentInput.value.trim();

    if (newCommentText) {
        // I have Created a new comment object
        const newComment = {
            user: "Anonymous",  // In a real app, you'd collect the user's name
            text: newCommentText
        };

        // Add the new comment to the horoscope's comments array
        horoscope.comments.push(newComment);

        // Update the displayed comments
        showHoroscopeDetails(horoscope);

        // Optionally, save the new comment back to db.json (simulated here)
        saveCommentsToDB();
    }
}

// Simulate saving the updated comments back to db.json (would require a backend for real implementation)
function saveCommentsToDB() {
    // In a real app, you'd make a POST request to the server to save the updated data
    console.log("Saving updated comments to db...");
}

// Initial load
window.onload = fetchHoroscopeData;

