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
    var embedThumbnail = document.getElementById("embed-thumbnail").value;
    var inputEmbedImage = document.getElementById("embed-image").value;
    var authorName = document.getElementById("author-name").value;
    var authorIcon = document.getElementById("author-icon").value;
    var footerText = document.getElementById("footer-text").value;
    var footerIcon = document.getElementById("footer-icon").value;
    var includeTimestamp = document.getElementById("embed-timestamp").checked;
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

    // Lógica do Autor no Preview
    var embedAuthorContainer = document.querySelector(".embed-author");
    var previewAuthorName = document.getElementById("embedAuthorName");
    var previewAuthorIcon = document.querySelector(".embedAuthorImg");

    previewAuthorName.innerText = authorName;
    if (authorName.trim()) {
        previewAuthorName.classList.remove("disabled");
    } else {
        previewAuthorName.classList.add("disabled");
    }

    if (authorIcon.trim()) {
        previewAuthorIcon.src = authorIcon;
        previewAuthorIcon.classList.remove("disabled");
    } else {
        previewAuthorIcon.classList.add("disabled");
    }

    // Esconde o container do autor se ambos estiverem vazios
    if (authorName.trim() || authorIcon.trim()) {
        embedAuthorContainer.classList.remove("disabled");
    } else {
        embedAuthorContainer.classList.add("disabled");
    }

    // Lógica do Footer no Preview
    var embedFooterContainer = document.getElementById("embed-footer");
    var previewFooterText = document.getElementById("embedFooterText");
    var previewFooterIcon = document.getElementById("embedFooterIcon");
    var previewFooterSeparator = document.getElementById("embedFooterSeparator");
    var previewTimestamp = document.getElementById("embedTimestampText");

    previewFooterText.innerText = footerText;
    if (footerText.trim()) {
        previewFooterText.classList.remove("disabled");
    } else {
        previewFooterText.classList.add("disabled");
    }

    if (footerIcon.trim()) {
        previewFooterIcon.src = footerIcon;
        previewFooterIcon.classList.remove("disabled");
    } else {
        previewFooterIcon.classList.add("disabled");
    }

    if (includeTimestamp) {
        const now = new Date();
        previewTimestamp.innerText = `Hoje às ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        previewTimestamp.classList.remove("disabled");
        if (footerText.trim()) previewFooterSeparator.classList.remove("disabled");
        else previewFooterSeparator.classList.add("disabled");
    } else {
        previewTimestamp.classList.add("disabled");
        previewFooterSeparator.classList.add("disabled");
    }

    if (footerText.trim() || footerIcon.trim() || includeTimestamp) {
        embedFooterContainer.classList.remove("disabled");
    } else {
        embedFooterContainer.classList.add("disabled");
    }

    var embedMessage = document.getElementById("embed-message");
    var hasEmbedContent = embedTitle.trim() || embedDescription.trim() || inputEmbedImage.trim() || 
                          embedThumbnail.trim() || authorName.trim() || authorIcon.trim() || 
                          footerText.trim() || footerIcon.trim() || includeTimestamp;

    if (hasEmbedContent) {
        embedMessage.classList.remove("disabled");
    } else {
        embedMessage.classList.add("disabled");
    }

    var embedThumbnailPreviewElement = document.getElementById("embedThumbnail");
    if (embedThumbnail && embedThumbnail.trim() !== "") {
        embedThumbnailPreviewElement.src = embedThumbnail;
        embedThumbnailPreviewElement.classList.remove("disabled");
    } else {
        embedThumbnailPreviewElement.src = "";
        embedThumbnailPreviewElement.classList.add("disabled");
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


const colorInput = document.getElementById('embed-color');
const colorPicker = document.getElementById('color-picker');
const colorIcon = document.querySelector('.color-icon');

colorIcon.addEventListener('click', () => colorPicker.click());

colorPicker.addEventListener('input', (e) => {
    const newColor = e.target.value.toUpperCase();
    colorInput.value = newColor;
    colorInput.dispatchEvent(new Event('input', { bubbles: true }));
});