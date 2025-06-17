const usuarios = {
    "funcionario": {senha: "123", tipo: "funcionario"},
    "gerente": {senha: "456", tipo: "gerente"},
    "admin": {senha: "admin", tipo: "admin"}
};

let recursos = [
    {nome: "Câmera de Segurança", quantidade: 10, tipo: "Dispositivo"},
    {nome: "Batmóvel", quantidade: 2, tipo: "Veículo"}
];

let usuarioAtual = null;

function login() {
    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const erro = document.getElementById('login-erro');
    if (usuarios[usuario] && usuarios[usuario].senha === senha) {
        usuarioAtual = {nome: usuario, tipo: usuarios[usuario].tipo};
        mostrarDashboard();
    } else {
        erro.textContent = "Usuário ou senha inválidos";
    }
}

function logout() {
    usuarioAtual = null;
    document.getElementById('dashboard-box').style.display = 'none';
    document.getElementById('login-box').style.display = 'block';
    document.getElementById('usuario').value = "";
    document.getElementById('senha').value = "";
    document.getElementById('login-erro').textContent = "";
}

function mostrarDashboard() {
    document.getElementById('dashboard-box').style.display = 'block';
    document.getElementById('login-box').style.display = 'none';
    document.getElementById('nome-usuario').textContent = usuarioAtual.nome;
    document.getElementById('tipo-usuario').textContent = usuarioAtual.tipo;
    atualizarListaRecursos();
    if (usuarioAtual.tipo === "admin") {
        document.getElementById('admin-section').style.display = 'block';
        atualizarListaRecursosAdmin();
    } else {
        document.getElementById('admin-section').style.display = 'none';
    }

    if (usuarioAtual.tipo === "gerente") {
        const qtd = Object.values(usuarios).filter(u => u.tipo === "funcionario").length;
        document.getElementById('qtd-funcionarios').style.display = 'block';
        document.getElementById('num-funcionarios').textContent = qtd;
    } else {
        document.getElementById('qtd-funcionarios').style.display = 'none';
    }
}

function atualizarListaRecursos() {
    const ul = document.getElementById('lista-recursos');
    ul.innerHTML = "";
    recursos.forEach(r => {
        const li = document.createElement('li');
        li.textContent = `${r.nome} - ${r.quantidade} (${r.tipo})`;
        ul.appendChild(li);
    });
}

function atualizarListaRecursosAdmin() {
    const ul = document.getElementById('lista-recursos-admin');
    ul.innerHTML = "";
    recursos.forEach((r, idx) => {
        const li = document.createElement('li');
        li.className = "item-recurso-admin";
        const divInfo = document.createElement('div');
        divInfo.textContent = `${r.nome} - ${r.quantidade} (${r.tipo})`;
        li.appendChild(divInfo);
        const divBtns = document.createElement('div');
        divBtns.className = "botoes-admin";
        const btnAtualizar = document.createElement('button');
        btnAtualizar.textContent = "Atualizar";
        btnAtualizar.classList.add("laranja-bg");
        btnAtualizar.onclick = () => atualizarRecursoPrompt(idx);
        const btnRemover = document.createElement('button');
        btnRemover.textContent = "Remover";
        btnRemover.classList.add("laranja-bg");
        btnRemover.onclick = () => removerRecurso(idx);
        divBtns.appendChild(btnAtualizar);
        divBtns.appendChild(btnRemover);
        li.appendChild(divBtns);
        ul.appendChild(li);
    });
}

function adicionarRecurso(event) {
    event.preventDefault();
    const nome = document.getElementById('nome-recurso').value.trim();
    const quantidade = parseInt(document.getElementById('quantidade-recurso').value);
    const tipo = document.getElementById('tipo-recurso').value.trim();
    if (nome && quantidade && tipo) {
        recursos.push({nome, quantidade, tipo});
        atualizarListaRecursos();
        atualizarListaRecursosAdmin();
        document.getElementById('form-recursos').reset();
    }
}

function removerRecurso(idx) {
    recursos.splice(idx, 1);
    atualizarListaRecursos();
    atualizarListaRecursosAdmin();
}

function atualizarRecursoPrompt(idx) {
    const recurso = recursos[idx];
    const nome = prompt("Novo nome:", recurso.nome) || recurso.nome;
    const quantidade = parseInt(prompt("Nova quantidade:", recurso.quantidade)) || recurso.quantidade;
    const tipo = prompt("Novo tipo:", recurso.tipo) || recurso.tipo;
    recursos[idx] = {nome, quantidade, tipo};
    atualizarListaRecursos();
    atualizarListaRecursosAdmin();
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('senha').addEventListener('keyup', function(e) {
        if (e.key === "Enter") {
            login();
        }
    });
    document.getElementById('usuario').addEventListener('keyup', function(e) {
        if (e.key === "Enter") {
            login();
        }
    });
});