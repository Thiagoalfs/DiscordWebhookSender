import { IMGBB_API_KEY } from './config.js';

const imageFileInput = document.getElementById('image-file-input');
const imageUploadIcon = document.querySelector('.image-upload-icon');
const embedImageInput = document.getElementById('embed-image');

imageUploadIcon.addEventListener('click', () => {
    imageFileInput.click();
});

imageFileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    if (IMGBB_API_KEY === "YOUR_IMGBB_API_KEY" || !IMGBB_API_KEY) {
        alert("Por favor, substitua 'YOUR_IMGBB_API_KEY' no arquivo imageUploader.js pela sua chave de API real do imgbb.");
        return;
    }

    // Opcional: Mostrar um indicador de carregamento
    imageUploadIcon.classList.remove('fa-upload');
    imageUploadIcon.classList.add('fa-spinner', 'fa-spin');
    embedImageInput.value = "Enviando imagem..."; // Feedback visual

    const formData = new FormData();
    formData.append('image', file);

    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            const imageUrl = data.data.url;
            embedImageInput.value = imageUrl;
            // Dispara manualmente um evento de input para atualizar o preview em tempo real
            embedImageInput.dispatchEvent(new Event('input', { bubbles: true }));
        } else {
            alert(`Falha no upload da imagem: ${data.error.message}`);
            embedImageInput.value = ""; // Limpa o input em caso de falha
        }
    } catch (error) {
        console.error('Erro ao enviar imagem:', error);
        alert('Ocorreu um erro durante o upload da imagem.');
        embedImageInput.value = ""; // Limpa o input em caso de erro
    } finally {
        // Esconde o indicador de carregamento
        imageUploadIcon.classList.remove('fa-spinner', 'fa-spin');
        imageUploadIcon.classList.add('fa-upload');
        // Limpa o input de arquivo para que o mesmo arquivo possa ser selecionado novamente, se necessário
        imageFileInput.value = '';
    }
});