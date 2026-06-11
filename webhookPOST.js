document.getElementById("webhook-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    var webhookLink = document.getElementById("webhook-link").value;
    var messageContent = document.getElementById("message-content").value;
    var webhookNameInput = document.getElementById("webhook-name").value;
    var webhookAvatarInput = document.getElementById("webhook-avatar").value; // Corrigido: era #webhookImage (uma <img>), não tem .value
    var embedTitle = document.getElementById("embed-title").value;
    var embedDescription = document.getElementById("embed-description").value;
    var embedColor = document.getElementById("embed-color").value;
    var embedImage = document.getElementById("embed-image").value;
    var submitButton = document.getElementById("submit-button");

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
    if (embedTitle || embedDescription || embedImage) {
        const decimalColor = parseInt(embedColor.replace("#", ""), 16);

        const embed = {
            title: embedTitle || undefined,
            description: embedDescription || undefined,
            color: isNaN(decimalColor) ? undefined : decimalColor,
        };

        if (embedImage) {
            embed.image = { url: embedImage };
        }

        payload.embeds = [embed];
    }

    try {
        submitButton.innerHTML = "Enviando...";
        const response = await fetch(webhookLink, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        if (response.ok || response.status === 204) {
            submitButton.innerHTML = "Enviado!";
        } else {
            submitButton.innerHTML = `Erro: ${response.status}`;
        }

        setTimeout(() => {
            submitButton.innerHTML = "Enviar";
        }, 1000);
    } catch (error) {
        console.error("Error sending message:", error);
    }
});