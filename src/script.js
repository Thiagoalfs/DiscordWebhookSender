var embedCount = 1; // Começa com 1 porque há um embed inicial no HTML

marked.setOptions({
    gfm: true,
    breaks: true,
});

function renderMarkdown(text) {
    if (!text) return "";
    return marked.parse(text).trim();
}

function updatePreview() {
    var inputWebhookName = document.getElementById("webhook-name").value;
    var inputWebhookAvatar = document.getElementById("webhook-avatar").value;
    var messageContent = document.getElementById("message-content").value; 

    document.getElementById("webhookName").innerText = inputWebhookName || "Webhook Name";
    var previewWebhookImageElement = document.getElementById("webhookImage");
    if (previewWebhookImageElement) {
        previewWebhookImageElement.src = inputWebhookAvatar || "https://cdn.discordapp.com/embed/avatars/0.png";
    }
    document.getElementById("webhookContent").innerHTML = renderMarkdown(messageContent || "Webhook Content");

    const embedSections = document.querySelectorAll(".embed-settings-item");
    const previewContainer = document.getElementById("embeds-preview-container");
    if (!previewContainer) return;

    previewContainer.innerHTML = "";

    embedSections.forEach((section) => {
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

        if (!(title || description || image || thumbnail || authorName || authorIcon || footerText || footerIcon || includeTimestamp)) return;
        
        const embedDiv = document.createElement("div");
        embedDiv.className = "embed-message";
        
        const colorBar = document.createElement("div");
        colorBar.className = "color-left";
        colorBar.style.backgroundColor = /^#[0-9A-Fa-f]{6}$/.test(color) ? color : "#5865F2";
        embedDiv.appendChild(colorBar);

        if (authorName || authorIcon) {
            const author = document.createElement("div");
            author.className = "embed-author";
            if (authorIcon) author.innerHTML += `<img src="${authorIcon}" class="embedAuthorImg">`;
            if (authorName) author.innerHTML += `<span class="bold" style="color: white; font-size: 0.875rem;">${authorName}</span>`;
            embedDiv.appendChild(author);
        }

        if (title) embedDiv.innerHTML += `<div class="bold" style="color: white; font-size: 1rem; margin-bottom: 8px;">${title}</div>`;
        if (description) embedDiv.innerHTML += `<div style="font-size: 0.875rem; color: #dbdee1;">${renderMarkdown(description)}</div>`; 
        if (thumbnail) embedDiv.innerHTML += `<img src="${thumbnail}" class="embedThumbnail">`; 
        if (image) embedDiv.innerHTML += `<img src="${image}" class="embedImage">`; 

        if (footerText || footerIcon || includeTimestamp) {
            const footer = document.createElement("div");
            footer.className = "embed-footer";
            if (footerIcon) footer.innerHTML += `<img src="${footerIcon}" class="embedFooterIcon">`;
            let footerContent = footerText || "";
            if (includeTimestamp) {
                const now = new Date();
                const timeStr = `Hoje às ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
                footerContent += (footerContent ? " • " : "") + timeStr;
            }
            footer.innerHTML += `<span style="font-size: 0.75rem; color: #dbdee1;">${footerContent}</span>`;
            embedDiv.appendChild(footer);
        }
        previewContainer.appendChild(embedDiv);
    });
}

function updateEmbedLabels() { // Atualiza os rótulos "Embed 1", "Embed 2", etc.
    const items = document.querySelectorAll('.embed-settings-item');
    items.forEach((item, index) => {
        const label = item.querySelector('.dropdown-section .bold');
        if (label) label.innerText = `Embed ${index + 1}`; // Atualiza o texto do rótulo

        // Mostra o botão de remover apenas se houver mais de um embed
        const removeBtn = item.querySelector('.btn-remove');
        if (removeBtn) {
            removeBtn.style.display = items.length > 1 ? 'inline-block' : 'none';
        }
    });
}

function getEmbedTemplate() {
    return `
    <div class="section embed-settings-item">
        <div class="dropdown-section">
            <span class="bold">Embed</span>
            <button type="button" class="btn-remove">Remove Embed</button>
            <i class="fa-solid fa-angle-down section-arrow"></i>
        </div>
        <div class="fields">
            <label>Embed Title</label>
            <input class="embed-title" type="text" placeholder="Title" maxlength="256">
            <label>Embed Description</label>
            <textarea class="embed-description" rows="3" placeholder="Description" maxlength="4096"></textarea>
            <label>Embed Color</label>
            <div class="color-input-wrapper">
                <input class="embed-color" type="text" placeholder="HEX color code" value="#5865F2">
                <i class="fa-solid fa-palette color-icon"></i>
            </div>
            <label>Embed Image</label>
            <div class="image-input-wrapper">
                <input type="text" class="embed-image" pattern="https?://.+" placeholder="https://">
                <i class="fa-solid fa-upload image-upload-icon"></i>
                <input type="file" class="image-file-input" accept="image/*" style="display:none">
            </div>
            <div class="section mini-section">
                <div class="dropdown-section">Thumbnail <i class="fa-solid fa-angle-down section-arrow"></i></div>
                <div class="disabled fields">
                    <input type="text" class="embed-thumbnail" placeholder="https://">
                </div>
            </div>
            <div class="section mini-section">
                <div class="dropdown-section">Author <i class="fa-solid fa-angle-down section-arrow"></i></div>
                <div class="disabled fields">
                    <input type="text" class="author-name" placeholder="Author Name">
                    <input type="text" class="author-icon" placeholder="Author Icon URL">
                </div>
            </div>
            <div class="section mini-section">
                <div class="dropdown-section">Footer <i class="fa-solid fa-angle-down section-arrow"></i></div>
                <div class="disabled fields">
                    <input type="text" class="footer-text" placeholder="Footer Text">
                    <input type="text" class="footer-icon" placeholder="Footer Icon URL">
                    <div class="input-row"><label>Add Timestamp</label><input type="checkbox" class="embed-timestamp"></div>
                </div>
            </div>
        </div>
    </div>`;
}

function addEmbed() {
    const container = document.getElementById("embeds-form-container");
    if (document.querySelectorAll('.embed-settings-item').length >= 10) {
        alert("O Discord permite apenas 10 embeds por mensagem.");
        return;
    }
    container.insertAdjacentHTML('beforeend', getEmbedTemplate());
    updateEmbedLabels();
    updatePreview();
}

function removeEmbed(buttonElement) { // Função para remover um embed
    const embedToRemove = buttonElement.closest('.embed-settings-item');
    if (embedToRemove) {
        embedToRemove.remove();
        updateEmbedLabels();
        updatePreview();
    }
}

document.getElementById("webhook-form").addEventListener("input", updatePreview);
document.getElementById("add-embed").addEventListener("click", addEmbed);

// Delegação de eventos para os botões de remover embed
document.getElementById("embeds-form-container").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-remove")) {
        removeEmbed(event.target);
    }
});

// Delegação de eventos para os toggles de dropdown dentro das seções de embed
document.getElementById("embeds-form-container").addEventListener("click", (event) => {
    const dropdownSection = event.target.closest('.dropdown-section');
    if (dropdownSection && !event.target.classList.contains("btn-remove")) { // Evita alternar quando o botão de remover é clicado
        const fields = dropdownSection.nextElementSibling;
        const arrow = dropdownSection.querySelector('.section-arrow');
        if (fields && arrow) {
            const isCollapsed = fields.classList.toggle('disabled');
            // Adiciona a rotação da seta que estava no sections.js
            arrow.style.transform = isCollapsed ? "rotate(0deg)" : "rotate(180deg)";
            // Mantém a troca de ícones se desejar, ou pode remover as linhas abaixo
            arrow.classList.toggle('fa-angle-down');
            arrow.classList.toggle('fa-angle-up');
        }
    }
});

window.addEventListener('load', () => {
    document.getElementById("webhook-form").reset();
});

const colorPicker = document.getElementById('color-picker'); // Este é o input de cor oculto
// Delegação de eventos para os ícones de cor
document.getElementById("embeds-form-container").addEventListener('click', (event) => {
    if (event.target.classList.contains('color-icon')) {
        colorPicker.click();
    }
});

if (colorPicker) {
    colorPicker.addEventListener('input', (e) => {
        const newColor = e.target.value.toUpperCase();
        // Aplica a cor ao input de texto do embed atualmente focado ou ao último
        const activeColorInput = document.activeElement?.closest('.embed-settings-item')?.querySelector('.embed-color');
        if (activeColorInput) {
            activeColorInput.value = newColor;
            activeColorInput.dispatchEvent(new Event('input', { bubbles: true }));
        }
    });
}

window.addEventListener('resize', () => {
    window.scrollTo(0, 0);
    document.querySelectorAll('.left-container, .right-container').forEach(container => container.scrollTop = 0);
});

// Verifica se o arquivo config.js existe na pasta src para exibir ou ocultar os ícones de upload
fetch('./src/config.js')
    .then(response => {
        if (!response.ok) {
            document.querySelectorAll('.fa-upload').forEach(icon => icon.classList.add('disabled'));
        }
    })
    .catch(() => {
        document.querySelectorAll('.fa-upload').forEach(icon => icon.classList.add('disabled'));
    });

// Chamada inicial para atualizar os rótulos e o preview do primeiro embed
document.addEventListener('DOMContentLoaded', () => {
    updateEmbedLabels();
    updatePreview();
});