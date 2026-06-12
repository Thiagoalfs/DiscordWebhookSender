import { IMGBB_API_KEY } from './config.js';

function setupUploader(iconSelector, fileInputId, textInputId) {
    const icon = document.querySelector(iconSelector);
    const fileInput = document.getElementById(fileInputId);
    const textInput = document.getElementById(textInputId);

    if (!icon || !fileInput || !textInput) return;

    icon.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (IMGBB_API_KEY === "YOUR_IMGBB_API_KEY" || !IMGBB_API_KEY) {
            alert("Por favor, configure sua API Key no config.js");
            return;
        }

        // Feedback visual de carregamento
        icon.classList.remove('fa-upload');
        icon.classList.add('fa-spinner', 'fa-spin');
        const originalPlaceholder = textInput.value;
        textInput.value = "Enviando imagem...";

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (data.success) {
                textInput.value = data.data.url;
                textInput.dispatchEvent(new Event('input', { bubbles: true }));
            } else {
                alert(`Falha no upload: ${data.error.message}`);
                textInput.value = originalPlaceholder;
            }
        } catch (error) {
            console.error('Erro ao enviar imagem:', error);
            textInput.value = originalPlaceholder;
        } finally {
            icon.classList.remove('fa-spinner', 'fa-spin');
            icon.classList.add('fa-upload');
            fileInput.value = '';
        }
    });
    }

// Inicializa os uploaders
setupUploader('.image-upload-icon', 'image-file-input', 'embed-image');
setupUploader('.webhook-avatar-upload-icon', 'webhook-avatar-file-input', 'webhook-avatar');
setupUploader('.author-icon-upload-icon', 'author-icon-file-input', 'author-icon');
setupUploader('.footer-icon-upload-icon', 'footer-icon-file-input', 'footer-icon');
setupUploader('.thumbnail-upload-icon', 'thumbnail-file-input', 'embed-thumbnail');