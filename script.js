var embedColor = document.getElementById("embed-color").value;
document.getElementById("embed-color-left").style.backgroundColor = embedColor;

marked.setOptions({
    gfm: true,
    breaks: true,
});

function renderMarkdown(text) {
    if (!text) return "";
    return marked.parse(text).trim();
}


document.getElementById("webhook-form").addEventListener("input", function (event) {
    var inputWebhookLink = document.getElementById("webhook-link").value;
    var inputWebhookName = document.getElementById("webhook-name").value;
    var inputWebhookAvatar = document.getElementById("webhook-avatar").value;
    var messageContent = document.getElementById("message-content").value;
    var embedTitle = document.getElementById("embed-title").value;
    var embedDescription = document.getElementById("embed-description").value;
    var embedColor = document.getElementById("embed-color").value;
    var inputEmbedImage = document.getElementById("embed-image").value;
    var embedColorBarLeft = document.getElementById("embed-color-left");


    if (/^#[0-9A-Fa-f]{6}$/.test(embedColor)) {
        embedColorBarLeft.style.backgroundColor = embedColor;
    } else {
        embedColorBarLeft.style.backgroundColor = "#5865F2";
    }


    document.getElementById("webhookName").innerText = inputWebhookName || "Webhook Name";

    
    var previewWebhookImageElement = document.getElementById("webhookImage");
    if (previewWebhookImageElement) {
        previewWebhookImageElement.src = inputWebhookAvatar || "https://cdn.discordapp.com/embed/avatars/0.png";
    }


    document.getElementById("webhookContent").innerHTML = renderMarkdown(messageContent || "Webhook Content");
    document.getElementById("embedTitleText").innerText = embedTitle || "Embed Title";
    document.getElementById("embedDescriptionText").innerHTML = renderMarkdown(embedDescription || "Embed Description");

    var embedMessage = document.getElementById("embed-message");
    var hasEmbedContent = embedTitle.trim() || embedDescription.trim() || inputEmbedImage.trim();

    if (hasEmbedContent) {
        embedMessage.classList.remove("disabled");
    } else {
        embedMessage.classList.add("disabled");
    }

    var embedImagePreviewElement = document.getElementById("embedImage");
    if (inputEmbedImage && inputEmbedImage !== "") {
        embedImagePreviewElement.src = inputEmbedImage;
        embedImagePreviewElement.classList.remove("disabled");
    } else {
        embedImagePreviewElement.src = "";
        embedImagePreviewElement.classList.add("disabled");
    }
});

window.addEventListener('load', () => {
    document.getElementById("webhook-form").reset();
});