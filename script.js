document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos da Tela
    const btnEntrar = document.getElementById('btn-entrar');
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const tituloPrincipal = document.getElementById('titulo-principal');
    const chuvaConfetes = document.getElementById('chuva-confetes');

    // INTELIGÊNCIA MODO NOTURNO
    const horaAtual = new Date().getHours();
    const isNoite = horaAtual >= 18 || horaAtual < 6;
    if (isNoite) {
        document.body.classList.add('night-mode');
        introScreen.classList.add('night-mode');
    }

    // VERIFICAÇÃO DO DIA 11 (Muda o Título e solta confetes)
    function verificarMesversario() {
        const hoje = new Date();
        if (hoje.getDate() === 11) {
            tituloPrincipal.innerHTML = "🎉 Feliz nosso Dia 11! 🎉";
            tituloPrincipal.style.color = "#ff69b4";
            chuvaConfetes.classList.remove('invisivel');
            iniciarChuvaDeCoracoes();
        }
    }

    function iniciarChuvaDeCoracoes() {
        setInterval(() => {
            const confete = document.createElement('div');
            confete.classList.add('confete-caindo');
            confete.innerText = Math.random() > 0.5 ? '💖' : '✨';
            confete.style.left = Math.random() * 100 + 'vw';
            confete.style.animationDuration = (Math.random() * 3 + 2) + 's';
            chuvaConfetes.appendChild(confete);
            setTimeout(() => confete.remove(), 5000); 
        }, 300);
    }

    // CLIQUE DE ENTRADA E MÚSICA (AGORA COM MP3)
    btnEntrar.addEventListener('click', () => {
        introScreen.classList.add('zoom-out');
        
        // Toca a música em MP3 sem nenhum anúncio!
        const musica = document.getElementById('musica-fundo');
        musica.volume = 0.6; // Começa com 60% do volume para não assustar
        musica.play();
        
        setTimeout(() => {
            introScreen.style.display = 'none';
            mainContent.classList.remove('hidden');
            iniciarDigitacao();
            verificarMesversario(); 
        }, 1200);
    });

    // BOTÃO SORTEIO DE ELOGIOS (Com memória para não repetir)
    const motivos = [
        "Amo o seu sorriso lindo.", "Amo como você me faz sentir único.", 
        "Amo a sua voz me dando bom dia.", "Amo a sua risada gostosa.",
        "Amo o jeito que você me olha.", "Amo a sua inteligência.",
        "Amo me perder no seu abraço.", "Amo planejar o futuro com você.",
        "Amo a mulher forte que você é.", "Amo o seu cheirinho.",
        "Amo quando você me faz cafuné.", "Amo ser o seu namorado.",
        "Amo os seus beijos.", "Amo como a gente se entende no olhar.",
        "Amo saber que você é minha parceira pra tudo."
    ];
    const btnMotivos = document.getElementById('btn-motivos');
    const motivoTexto = document.getElementById('motivo-texto');
    let motivosEmbaralhados = motivos.sort(() => Math.random() - 0.5);
    let indiceAtual = 0;

    btnMotivos.addEventListener('click', () => {
        motivoTexto.style.opacity = 0;
        setTimeout(() => {
            motivoTexto.innerText = motivosEmbaralhados[indiceAtual];
            motivoTexto.style.opacity = 1;
            indiceAtual++;
            if (indiceAtual >= motivosEmbaralhados.length) {
                motivosEmbaralhados = motivos.sort(() => Math.random() - 0.5);
                indiceAtual = 0;
            }
        }, 300);
    });

    // =======================================================
    // A MÁGICA DA CÁPSULA DO TEMPO INFINITA E DINÂMICA
    // =======================================================
    const btnCapsula = document.getElementById('btn-capsula');
    const msgCapsula = document.getElementById('mensagem-capsula');

    // 👇 ESCREVA AQUI AS MENSAGENS PARA CADA ANO! 👇
    const textosCapsula = {
        2: "Feliz 2 Anos de Namoro, meu amor! Obrigado por ser a mulher mais incrível do mundo. Cada segundo com você é um presente. Agora tranque esta cápsula e volte aqui no nosso 3º ano! ❤️",
        3: "Uau, 3 Anos! Bodas de Cristal! Nosso amor só cresce e se fortalece. Obrigado por continuar sendo minha luz. Nos vemos no ano 4! ✨",
        4: "Feliz 4 Anos! Quatro anos de cumplicidade, risadas e muito amor. Você é o meu maior acerto. Mal posso esperar pelo ano 5! 💖",
        5: "5 Anos! Meia década ao seu lado! Você é a mulher da minha vida, e cada ano é melhor que o anterior. Que venham os próximos capítulos... 🥰"
    };

    function atualizarCapsula() {
        const hoje = new Date();
        let anosCompletos = hoje.getFullYear() - 2024;
        
        if (hoje < new Date(hoje.getFullYear(), 3, 11)) { 
            anosCompletos--; 
        }

        let metaAtual = Math.max(2, anosCompletos); 
        let isGuardada = localStorage.getItem('capsula_guardada_' + metaAtual) === 'true';

        if (anosCompletos >= 2 && !isGuardada) {
            btnCapsula.innerText = `🎁 Abrir Cápsula (${metaAtual} Anos)`;
            btnCapsula.style.background = "rgba(255, 105, 180, 0.4)";
            btnCapsula.style.border = "1px solid #ff69b4";
            
            btnCapsula.onclick = () => {
                let texto = textosCapsula[metaAtual] || `Feliz ${metaAtual} Anos, meu amor! Cada ano ao seu lado é mais mágico que o anterior. ❤️`;
                
                msgCapsula.innerHTML = `
                    <p style="margin-bottom: 15px;">${texto}</p>
                    <button id="btn-fechar-capsula" class="btn-romantico" style="width: 100%; font-size: 0.85rem; padding: 10px;">
                        🔐 Trancar e esperar os ${metaAtual + 1} Anos
                    </button>
                `;
                msgCapsula.classList.remove('hidden');

                document.getElementById('btn-fechar-capsula').onclick = () => {
                    localStorage.setItem('capsula_guardada_' + metaAtual, 'true'); 
                    msgCapsula.classList.add('hidden'); 
                    atualizarCapsula(); 
                };
            };
        } else {
            let proximoMarco = anosCompletos < 2 ? 2 : metaAtual + 1;
            let anoAbertura = 2024 + proximoMarco;
            
            btnCapsula.innerText = `🔒 Cápsula do Tempo (${proximoMarco} Anos)`;
            btnCapsula.style.background = "rgba(0,0,0,0.3)";
            btnCapsula.style.border = "1px solid rgba(255,255,255,0.2)";
            
            btnCapsula.onclick = () => {
                btnCapsula.classList.add('shake');
                btnCapsula.innerText = `🔒 Só abre em 11/04/${anoAbertura}!`;
                setTimeout(() => {
                    btnCapsula.classList.remove('shake');
                    btnCapsula.innerText = `🔒 Cápsula do Tempo (${proximoMarco} Anos)`;
                }, 2500);
            };
        }
    }
    atualizarCapsula(); 

    // LÓGICA DO CONTADOR GERAL
    const dataInicial = new Date(2024, 3, 11); 
    const contadorEl = document.getElementById('contador');

    function atualizarContadorTempo() {
        const agora = new Date();
        let anos = agora.getFullYear() - dataInicial.getFullYear();
        let meses = agora.getMonth() - dataInicial.getMonth();
        let dias = agora.getDate() - dataInicial.getDate();

        if (dias < 0) {
            meses--;
            const ultimoDiaMesAnterior = new Date(agora.getFullYear(), agora.getMonth(), 0).getDate();
            dias += ultimoDiaMesAnterior;
        }
        if (meses < 0) { anos--; meses += 12; }

        const diferenca = agora - dataInicial;
        const horas = Math.floor((diferenca / (1000 * 60 * 60)) % 24);
        const minutos = Math.floor((diferenca / (1000 * 60)) % 60);
        const segundos = Math.floor((diferenca / 1000) % 60);

        contadorEl.innerHTML = `
            <strong style="font-size:1.6rem; color:#fff;">${anos > 0 ? anos + ' Anos, ' : ''}${meses} Meses, ${dias} Dias</strong><br>
            <span style="font-size:0.9rem; opacity:0.8;">${horas} horas, ${minutos} min e ${segundos} seg</span>
        `;
    }
    setInterval(atualizarContadorTempo, 1000); 
    atualizarContadorTempo();

    // EFEITO MÁQUINA DE ESCREVER
    const texto = "Estou namorando a mulher mais perfeita que existe, Vitórya, desde 11/04/2024. Você é o motivo de cada sorriso meu. Eu te amo mais a cada dia que passa, meu amor eterno! ❤️";
    const textoEl = document.getElementById("texto-digitado");
    let i = 0;

    function iniciarDigitacao() {
        if (i < texto.length) {
            textoEl.innerHTML += texto.charAt(i);
            i++;
            setTimeout(iniciarDigitacao, 50);
        } else {
            document.getElementById("cursor").style.display = "none";
        }
    }

    // FUNDO ANIMADO
    const simbolosFlutuantes = isNoite ? ['✨', '🌟', '⭐'] : ['❤', 'Vitórya'];
    function criarFlutuante() {
        const el = document.createElement('div');
        el.classList.add('floating');
        el.textContent = simbolosFlutuantes[Math.floor(Math.random() * simbolosFlutuantes.length)];
        el.style.left = Math.random() * 90 + 'vw';
        el.style.fontSize = (Math.random() * 1.2 + 0.8) + 'rem';
        el.style.animationDuration = (Math.random() * 6 + 6) + 's'; 
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 12000);
    }
    setInterval(criarFlutuante, 1500); 
});

// PWA
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js');
}
