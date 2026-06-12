import { IMGBB_API_KEY } from './config.js';

// Função para lidar com a lógica real de upload
async function handleFileUpload(file, textInput, icon) {
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
        // Reseta o valor do input de arquivo para permitir o upload do mesmo arquivo novamente
        const fileInput = icon.closest('.image-input-wrapper').querySelector('input[type="file"]');
        if (fileInput) fileInput.value = '';
    }
}

// Delegação de eventos para os ícones de upload (clique para abrir o input de arquivo)
document.addEventListener('click', (event) => {
    const icon = event.target.closest('.fa-upload');
    if (icon) {
        const imageInputWrapper = icon.closest('.image-input-wrapper');
        if (imageInputWrapper) {
            const fileInput = imageInputWrapper.querySelector('input[type="file"]');
            if (fileInput) {
                fileInput.click();
            }
        }
    }
});

// Delegação de eventos para as mudanças nos inputs de arquivo (quando um arquivo é selecionado)
document.addEventListener('change', (event) => {
    const fileInput = event.target.closest('input[type="file"]');
    if (fileInput) {
        const imageInputWrapper = fileInput.closest('.image-input-wrapper');
        if (imageInputWrapper) {
            const textInput = imageInputWrapper.querySelector('input[type="text"]');
            const icon = imageInputWrapper.querySelector('.fa-upload, .fa-spinner'); // Obtém o ícone para feedback visual
            if (textInput && icon) {
                handleFileUpload(fileInput.files[0], textInput, icon);
            }
        }
    }
});

// As chamadas setupUploader iniciais não são mais necessárias com a delegação de eventos.