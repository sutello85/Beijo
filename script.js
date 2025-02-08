document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("loveForm");
    
    form.addEventListener("input", atualizarPrevisualizacao);
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        criarPagamento();
    });

    function atualizarPrevisualizacao() {
        document.getElementById("preview-names").textContent = document.getElementById("names").value;
        document.getElementById("preview-message").textContent = document.getElementById("romanticMessage").value;

        let photos = document.getElementById("photos").files;
        let slider = document.getElementById("photo-slider");
        slider.innerHTML = "";
        for (let i = 0; i < photos.length; i++) {
            let img = document.createElement("img");
            img.src = URL.createObjectURL(photos[i]);
            slider.appendChild(img);
        }

        let youtubeURL = document.getElementById("youtubeLink").value;
        let match = youtubeURL.match(/(?:youtu\.be\/|youtube\.com\/watch\?v=)([^&]+)/);
        if (match) {
            document.getElementById("preview-video").src = `https://www.youtube.com/embed/${match[1]}`;
            document.getElementById("preview-video").style.display = "block";
        }
    }

    function criarPagamento() {
        let formData = new FormData(form);
        
        fetch("criar_pagamento.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                document.getElementById("qrCodePix").src = "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=" + encodeURIComponent(data.qr_code);
                document.getElementById("qrCodePix").style.display = "block";
                verificarPagamento(data.payment_id);
            } else {
                alert("Erro ao gerar pagamento!");
            }
        });
    }

    function verificarPagamento(payment_id) {
        setInterval(() => {
            fetch(`verificar_pagamento.php?id=${payment_id}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === "paid") {
                    window.location.href = `https://primeirobeijo.com/${document.getElementById("names").value.replace(/\s+/g, '-').toLowerCase()}`;
                }
            });
        }, 5000);
    }
});