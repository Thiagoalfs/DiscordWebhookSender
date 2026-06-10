document.getElementById("webhook-form").addEventListener("submit", async function (event) {
    var webhookLink = document.getElementById("webhook-link").value;
    var messageContent = document.getElementById("message-content").value;
    var webhookNameInput = document.getElementById("webhook-name").value;
    var webhookAvatarInput = document.getElementById("webhook-avatar").value; 
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

    if (webhookNameInput) {
        payload.username = webhookNameInput;
    }
    if (webhookAvatarInput && webhookAvatarInput.startsWith("http")) { 
        payload.avatar_url = webhookAvatarInput;
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