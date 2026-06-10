document.getElementById("webhook-link").addEventListener("input", function (event){
    var webhookLink = document.getElementById("webhook-link").value;
    var webhookNameElement = document.getElementById("webhookName");
    var webhookImageElement = document.querySelector("#webhookImage img");

    if (webhookLink && webhookLink.startsWith("https://discord.com/api/webhooks/")) {
        fetchWebhookInfo(webhookLink, webhookNameElement, webhookImageElement);

    } 
    else {

        webhookNameElement.innerText = "Webhook Name";
        if (webhookImageElement) {
            webhookImageElement.src = "https://cdn.discordapp.com/embed/avatars/0.png"; // Avatar padrão do Discord
        }
    }
});

async function fetchWebhookInfo(url, nameElement, imageElement) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Falha ao buscar informações do webhook: Status ${response.status}`);
        }

        const data = await response.json();

        nameElement.innerText = data.name || "Webhook Name";

        if (imageElement) {
            const avatarUrl = data.avatar ? `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png` : "https://cdn.discordapp.com/embed/avatars/0.png";
            
            imageElement.src = avatarUrl;

            document.getElementById("webhook-name").value = data.name || "";
            document.getElementById("webhook-avatar").value = avatarUrl;
        }
        
    } 
    catch (error) {
        console.error("Erro ao buscar informações do webhook:", error);
        nameElement.innerText = "Webhook Inválido/Erro";
        if (imageElement) {
            imageElement.src = "https://cdn.discordapp.com/embed/avatars/0.png";
        }
    }
};
