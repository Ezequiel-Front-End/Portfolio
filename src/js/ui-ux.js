const btnNavigationUi = document.getElementById("btn-goBack");

btnNavigationUi.addEventListener("click", () => {
    const spinner = document.getElementById('spinner');

    spinner.classList.remove('hidden');

    setTimeout(() => {
        spinner.classList.add('hidden');
    }, 1000);
    
    setTimeout(() => {
        window.location.replace("/");
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

// Dados JSON simulados
const data = Array.from({ length: 18 }, (_, i) => ({
    id: i + 1,
    name: `Usuário ${i + 1}`,
    email: `usuario${i + 1}@gmail.com`,
    city: `<i class='bx bxs-show'></i>`
}));


const rowsPerPage = 3; // Número de linhas por página
let currentPage = 1;
let filteredData = data;

// Elementos DOM
const tableBody = document.getElementById("tableBody");
const pagination = document.getElementById("pagination");
const searchInput = document.getElementById("searchInput");


// Renderiza a tabela com base nos dados e na página atual
function renderTable(data) {
    tableBody.innerHTML = "";
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = Math.min(startIndex + rowsPerPage, data.length);
    const pageData = data.slice(startIndex, endIndex);

    if (pageData.length === 0) {
        showAlert();
    } else {
        
        pageData.forEach(item => {
            const row = `
                <tr>
                    <td>${item.id}</td>
                    <td>${item.name}</td>
                    <td>${item.email}</td>
                    <td>${item.city}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }
}

// Atualiza a navegação de paginação
function renderPagination(data) {
    pagination.innerHTML = "";
    const totalPages = Math.ceil(data.length / rowsPerPage);

    const previousButton = document.createElement("button");
    previousButton.textContent = "Anterior";
    previousButton.className = currentPage === 1 ? "disabled" : "";
    previousButton.disabled = currentPage === 1;
    previousButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable(data);
            renderPagination(data);
        }
    });

    const nextButton = document.createElement("button");
    nextButton.textContent = "Próximo";
    nextButton.className = currentPage === totalPages ? "disabled" : "";
    nextButton.disabled = currentPage === totalPages;
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable(data);
            renderPagination(data);
        }
    });

    pagination.appendChild(previousButton);
    pagination.appendChild(nextButton);
}

// Filtro dinâmico
searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    filteredData = data.filter(item =>
        item.name.toLowerCase().includes(query) ||
        item.email.toLowerCase().includes(query) ||
        item.city.toLowerCase().includes(query)
    );
    currentPage = 1; // Reset para a primeira página
    renderTable(filteredData);
    renderPagination(filteredData);
});

// Inicialização
renderTable(filteredData);
renderPagination(filteredData);


// Função para gerar confetes
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    const numberOfConfetti = 100;  // Quantidade de confetes

    for (let i = 0; i < numberOfConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        // Definindo a posição inicial dos confetes
        confetti.style.left = `${Math.random() * 100}vw`; 
        confetti.style.animationDuration = `${Math.random() * 2 + 3}s`;
        confetti.style.animationDelay = `${Math.random() * 2}s`; 

        confettiContainer.appendChild(confetti);
    }

    // Remover os confetes após 3 segundos
    setTimeout(() => {
        confettiContainer.innerHTML = ''; 
    }, 5000); 
}


window.onload = function() {
    createConfetti();
}