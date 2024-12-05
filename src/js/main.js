AOS.init({ offset: 300, duration: 1400 });

const header = document.querySelector("header");


window.addEventListener("scroll", () => { header.classList.toggle("sticky", window.scrollY > 10); });

const menu = document.getElementById("menu-icon");
const navlist = document.querySelector(".navlist");

menu.onclick = () => { menu.classList.toggle('bx-x'); navlist.classList.toggle('active'); };

window.onscroll = () => { menu.classList.remove('bx-x'); navlist.classList.remove('active'); };

const btnToogle = document.querySelector(".ui-switch");
const html = document.querySelector("html");

btnToogle.addEventListener("change", () => {
    html.classList.toggle("dark-mode");
});

const btnNavigationUi = document.querySelector(".btn-navigation-ui");

btnNavigationUi.addEventListener("click", () => {
    const spinner = document.getElementById('spinner');

    spinner.classList.remove('hidden');

    setTimeout(() => {
        spinner.classList.add('hidden');
    }, 1000);
    
    setTimeout(() => {
        window.location.replace("../src/views/page-ui-ux-design.html");
    }, 1010);

});

const closeAlert = () => {
    const alertBox = document.getElementById('alert');
    alertBox.classList.remove('show');
}

function showAlert() {
    const alertBox = document.getElementById('alert');
    alertBox.classList.add('show');

    setTimeout(() => closeAlert(), 5000);
}

let textArea = document.querySelector("textarea");
let legendErros = document.querySelectorAll(".error");
let inputs = document.querySelectorAll("input");
let isMyFormValidate = true;

const nomeValidate = (nome) => {
    let typeNome = nome.target ? nome.target.value : nome;

    if (typeNome === '') {
        inputs[1].style.boxShadow = '0 0 5px 2px red';
        legendErros[0].style.display = "block";
        return false;
    } else {
        inputs[1].style.boxShadow = '';
        legendErros[0].style.display = "none";
        return true;
    }
};

const emailValidate = (email) => {
    let typeEmail = email.target ? email.target.value : email;
    let typeRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

    if (typeRegex.test(typeEmail)) {
        inputs[2].style.boxShadow = '';
        legendErros[1].style.display = "none";
        return true;
    } else {
        inputs[2].style.boxShadow = '0 0 5px 2px red';
        legendErros[1].style.display = "block";
        return false;
    }
};

const mensagemValidate = (mensagem) => {
    let typeMensagem = mensagem.target ? mensagem.target.value : mensagem;

    if (typeMensagem === '') {
        textArea.style.boxShadow = '0 0 5px 2px red';
        legendErros[2].style.display = "block";
        return false;
    } else {
        textArea.style.boxShadow = '';
        legendErros[2].style.display = "none";
        return true;
    }
};

const myForm = document.getElementById("myForm");

myForm.addEventListener('submit', (form) => {
    let nome = myForm.nome.value.trim();
    let email = myForm.email.value.trim();
    let mensagem = myForm.mensagem.value.trim();

    isMyFormValidate = true;

    if (!nomeValidate(nome)) isMyFormValidate = false;
    if (!emailValidate(email)) isMyFormValidate = false;
    if (!mensagemValidate(mensagem)) isMyFormValidate = false;

    if (isMyFormValidate) {

        let obj = {
            nome: nome,
            email: email,
            mensagem: mensagem
        };

        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.add('hidden');
        }, 2000);

        setTimeout(() => {
            showAlert();
            myForm.reset();

        }, 1500);
        
    } else {
        console.error("Erro: O formulário contém campos inválidos.");
    }

    form.preventDefault();
});

myForm.nome.addEventListener('input', nomeValidate);
myForm.email.addEventListener('input', emailValidate);
myForm.mensagem.addEventListener('input', mensagemValidate);

const playPauseBtn = document.getElementById('playPauseBtn');
const audio = document.getElementById('audio');
const currentTimeElem = document.getElementById('currentTime');
const durationElem = document.getElementById('duration');
const progressBar = document.getElementById('progressBar');
const playIcon = document.getElementById('playIcon');
const pauseIcon = document.getElementById('pauseIcon');

// Função para formatar o tempo no formato mm:ss
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}

// Atualiza o progresso da música e os tempos
audio.addEventListener('timeupdate', () => {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  currentTimeElem.textContent = formatTime(currentTime);
  durationElem.textContent = formatTime(duration);

  const progress = (currentTime / duration) * 100;
  progressBar.value = progress;
});

// Controla o botão play/pause
playPauseBtn.addEventListener('click', () => {
  if (audio.paused) {
    audio.play();
    playIcon.style.display = 'none'; // Esconde o ícone de play
    pauseIcon.style.display = 'inline-block'; // Exibe o ícone de pause
  } else {
    audio.pause();
    playIcon.style.display = 'inline-block'; // Exibe o ícone de play
    pauseIcon.style.display = 'none'; // Esconde o ícone de pause
  }
});

// Atualiza o tempo da música quando o usuário mexe na barra de progresso
progressBar.addEventListener('input', () => {
  const progress = progressBar.value;
  const newTime = (audio.duration * progress) / 100;
  audio.currentTime = newTime;
});
