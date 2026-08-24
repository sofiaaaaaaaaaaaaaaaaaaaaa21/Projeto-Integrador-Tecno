// Menu Responsivo Mobile
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em algum link no mobile
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Simulador Interativo de Fade (Visual e Lógico)
const opacityRange = document.getElementById('opacityRange');
const volumeRange = document.getElementById('volumeRange');
const opacityVal = document.getElementById('opacityVal');
const volumeVal = document.getElementById('volumeVal');
const screenPreview = document.getElementById('screenPreview');
const previewText = document.getElementById('previewText');

const btnFadeIn = document.getElementById('btnFadeIn');
const btnFadeOut = document.getElementById('btnFadeOut');
const btnReset = document.getElementById('btnReset');

// Atualizar valores na tela baseados nos ranges
function updateDisplayValues() {
    opacityVal.textContent = opacityRange.value;
    volumeVal.textContent = volumeRange.value;
    
    // Aplicar fade visual na caixa preta
    screenPreview.style.opacity = opacityRange.value / 100;
    
    // Alterar cor do texto conforme o fundo escurece para legibilidade
    if (opacityRange.value < 20) {
        previewText.style.color = '#555';
    } else {
        previewText.style.color = '#fff';
    }
}

opacityRange.addEventListener('input', updateDisplayValues);
volumeRange.addEventListener('input', updateDisplayValues);

// Função de animação suave (Simulação de Fade In automatizada)
function animateFade(targetOpacity, targetVolume, duration = 1000) {
    let startOpacity = parseFloat(opacityRange.value);
    let startVolume = parseFloat(volumeRange.value);
    
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        let progress = timestamp - startTime;
        let factor = Math.min(progress / duration, 1);

        opacityRange.value = startOpacity + (targetOpacity - startOpacity) * factor;
        volumeRange.value = startVolume + (targetVolume - startVolume) * factor;
        
        updateDisplayValues();

        if (factor < 1) {
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}

// Eventos dos botões de simulação
btnFadeIn.addEventListener('click', () => {
    opacityRange.value = 0;
    volumeRange.value = 0;
    updateDisplayValues();
    animateFade(100, 100, 1500);
});

btnFadeOut.addEventListener('click', () => {
    opacityRange.value = 100;
    volumeRange.value = 100;
    updateDisplayValues();
    animateFade(0, 0, 1500);
});

btnReset.addEventListener('click', () => {
    opacityRange.value = 100;
    volumeRange.value = 100;
    updateDisplayValues();
});
