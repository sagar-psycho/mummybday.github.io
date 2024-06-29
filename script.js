document.addEventListener("DOMContentLoaded", function() {
    const userInput = document.getElementById("user-input");
    const chatHistory = document.getElementById("chat-history");
    const speechButton = document.getElementById("speech-button");
    const searchButton = document.getElementById("search-button");
    const clearHistoryHistoryButton = document.getElementById("clear-history-history");
    const searchHistoryContainer = document.getElementById("search-history");
    const deletePop = document.getElementById("delete-pop");

    function appendMessage(message, sender) {
        const messageElement = document.createElement("div");
        messageElement.textContent = message;
        messageElement.classList.add("message", sender);
        chatHistory.appendChild(messageElement);
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    function processInput(input) {
        if (input.toLowerCase().startsWith("open")) {
            const command = input.toLowerCase().replace("open", "").trim();
            switch (command) {
                case "google":
                    window.open("https://www.google.com", "_blank");
                    return "Opening Google...";
                case "whatsapp":
                    window.open("https://web.whatsapp.com", "_blank");
                    return "Opening WhatsApp...";
                case "instagram":
                    window.open("https://www.instagram.com", "_blank");
                    return "Opening Instagram...";
                case "youtube":
                    window.open("https://www.youtube.com", "_blank");
                    return "Opening YouTube...";
                case "github":
                    window.open("https://github.com", "_blank");
                    return "Opening GitHub...";
                case "about sagar":
                    window.open("https://sagar-psycho.github.io/portfolio.responsive/", "_blank");
                    return "Opening about SAGAR...";
                default:
                    window.open(`https://www.google.com/search?q=${encodeURIComponent(input)}`, "_blank");
                    return "Searching on Google...";
            }
        } else {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(input)}`, "_blank");
            return "Searching on Google...";
        }
    }

    speechButton.addEventListener("click", function() {
        appendMessage("SAGAR ai is activated...", "bot");

        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = function(event) {
            const speechResult = event.results[0][0].transcript;
            appendMessage(speechResult, "user");
            const response = processInput(speechResult);
            appendMessage(response, "bot");
            addToSearchHistory(speechResult);
        };
    });

    searchButton.addEventListener("click", function() {
        const inputText = userInput.value.trim();
        if (inputText !== "") {
            appendMessage(inputText, "user");
            const response = processInput(inputText);
            appendMessage(response, "bot");
            addToSearchHistory(inputText);
            userInput.value = "";
        }
    });

    userInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            const inputText = userInput.value.trim();
            if (inputText !== "") {
                appendMessage(inputText, "user");
                const response = processInput(inputText);
                appendMessage(response, "bot");
                addToSearchHistory(inputText);
                userInput.value = "";
            }
        }
    });

    clearHistoryHistoryButton.addEventListener("click", function() {
        deletePop.style.display = "block";
    });

    document.querySelector(".cancel-btn").addEventListener("click", function() {
        deletePop.style.display = "none";
    });

    document.querySelector(".yes-btn").addEventListener("click", function() {
        clearChatHistory();
        clearSearchHistory();
        deletePop.style.display = "none";
    });

    function addToSearchHistory(query) {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item";
        listItem.textContent = query;
        searchHistoryContainer.appendChild(listItem);
        saveSearchHistory();
    }

    function saveSearchHistory() {
        const historyItems = [];
        searchHistoryContainer.querySelectorAll("li").forEach(item => {
            historyItems.push(item.textContent);
        });
        localStorage.setItem("searchHistory", JSON.stringify(historyItems));
    }

    function loadSearchHistory() {
        const storedHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
        storedHistory.forEach(item => addToSearchHistory(item));
    }

    function clearSearchHistory() {
        localStorage.removeItem("searchHistory");
        searchHistoryContainer.innerHTML = "";
    }

    function clearChatHistory() {
        localStorage.removeItem("chatHistory");
        chatHistory.innerHTML = "";
    }

    function saveChatHistory() {
        const chatItems = [];
        chatHistory.querySelectorAll(".message").forEach(item => {
            chatItems.push({
                text: item.textContent,
                sender: item.classList.contains("user") ? "user" : "bot"
            });
        });
        localStorage.setItem("chatHistory", JSON.stringify(chatItems));
    }

    function loadChatHistory() {
        const storedChatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
        storedChatHistory.forEach(item => {
            appendMessage(item.text, item.sender);
        });
    }

    loadSearchHistory();
    loadChatHistory();
});

window.onload = function() {
    var changingText = document.getElementById("changingText");
    var texts = ["Welcome to Sagar ai"];
    var index = 0;
    var letterIndex = 0;

    function typeText() {
        if (letterIndex < texts[index].length) {
            changingText.textContent += texts[index].charAt(letterIndex);
            letterIndex++;
            setTimeout(typeText, 150);
        }
    }
    typeText(); 
};
