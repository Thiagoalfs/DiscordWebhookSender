var embedColor = document.getElementById("embed-color").value;
document.getElementById("embed-color-left").style.backgroundColor = embedColor;

marked.setOptions({
    gfm: true,
    breaks: true,
});

function renderMarkdown(text) {
    if (!text) return "";
    return marked.parse(text);
}

document.getElementById("webhook-form").addEventListener("submit", async function (event) {
    var webhookLink = document.getElementById("webhook-link").value;
    var messageContent = document.getElementById("message-content").value;
    var statusDiv = document.getElementById("status-div");
    var embedTitle = document.getElementById("embed-title").value;
    var embedDescription = document.getElementById("embed-description").value;
    var embedColor = document.getElementById("embed-color").value;
    var embedImage = document.getElementById("embed-image").value;
    event.preventDefault();

    var payload = {};

    if (messageContent) {
        payload.content = messageContent;
    }

    if (embedTitle || embedDescription) {
        const decimalColor = parseInt(embedColor.substring(1), 16);
    
        const embed = {
            title: embedTitle || undefined,
            description: embedDescription || undefined,
            color: isNaN(decimalColor) ? undefined : decimalColor,
            image: {
                url: embedImage || undefined
            },
        };
        payload.embeds = [embed];
    }

    statusDiv.innerText = "Sending message...";

    try{
        const response = await fetch(webhookLink, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if(response.ok || response.status === 204){
            statusDiv.innerText = "Message sent successfully!";
        }

        else {
            statusDiv.innerText = `Erro ao enviar: Status ${response.status}`;
        }
    }
    catch(error){
        statusDiv.innerText = "Error: " + error.message;
        console.error("Error sending message:", error);
    }
});


document.getElementById("webhook-form").addEventListener("input", function (event){
    event.preventDefault();
    var webhookLink = document.getElementById("webhook-link").value;
    var messageContent = document.getElementById("message-content").value;
    var statusDiv = document.getElementById("status-div");
    var embedTitle = document.getElementById("embed-title").value;
    var embedDescription = document.getElementById("embed-description").value;
    var embedColor = document.getElementById("embed-color").value;
    var embedImage = document.getElementById("embed-image").value;

    var embedColorBarLeft = document.getElementById("embed-color-left")

    if (/^#[0-9A-Fa-f]{6}$/.test(embedColor)) {
        embedColorBarLeft.style.backgroundColor = embedColor;
    }
    
    document.getElementById("webhookContent").innerHTML = renderMarkdown(messageContent || "Webhook Content");
    document.getElementById("embedDescriptionText").innerHTML = renderMarkdown(embedDescription || "Embed Description");
    document.getElementById("embedTitleText").innerText = embedTitle || "Embed Title";

});

document.getElementById("embed-checkbox").addEventListener("input", function (event){
    var embedCheckbox = document.getElementById("embed-checkbox");
    var embedFields = document.getElementById("embed-fields");
    var embedMessage = document.getElementById("embed-message");

    if(embedCheckbox.checked){
        embedFields.classList.remove("disabled")
        embedMessage.classList.remove("disabled")
    }
    else{
        embedFields.classList.add("disabled")
        embedMessage.classList.add("disabled")
    }
});
    


