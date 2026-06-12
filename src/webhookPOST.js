document.getElementById("webhook-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    var webhookLink = document.getElementById("webhook-link").value;
    var messageContent = document.getElementById("message-content").value;
    var webhookNameInput = document.getElementById("webhook-name").value;
    var webhookAvatarInput = document.getElementById("webhook-avatar").value; // Corrigido: era #webhookImage (uma <img>), não tem .value
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

    var embedSections = document.querySelectorAll(".embed-settings-item");
    var embeds = [];

    embedSections.forEach(section => {
        var title = section.querySelector(".embed-title").value;
        var description = section.querySelector(".embed-description").value;
        var color = section.querySelector(".embed-color").value;
        var thumbnail = section.querySelector(".embed-thumbnail").value;
        var image = section.querySelector(".embed-image").value;
        var authorName = section.querySelector(".author-name").value;
        var authorIcon = section.querySelector(".author-icon").value;
        var footerText = section.querySelector(".footer-text").value;
        var footerIcon = section.querySelector(".footer-icon").value;
        var includeTimestamp = section.querySelector(".embed-timestamp").checked;

        if (title || description || image || authorName || authorIcon || footerText || footerIcon || includeTimestamp) {
            const decimalColor = parseInt(color.replace("#", ""), 16);
            const embed = {
                title: title || undefined,
                description: description || undefined,
                color: isNaN(decimalColor) ? undefined : decimalColor,
            };
            if (thumbnail) embed.thumbnail = { url: thumbnail };
            if (image) embed.image = { url: image };
            if (authorName || authorIcon) {
                embed.author = { name: authorName || undefined, icon_url: authorIcon || undefined };
            }
            if (footerText || footerIcon) {
                embed.footer = { text: footerText || undefined, icon_url: footerIcon || undefined };
            }
            if (includeTimestamp) embed.timestamp = new Date().toISOString();
            embeds.push(embed);
        }
    });

    if (embeds.length > 0) {
        payload.embeds = embeds;
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