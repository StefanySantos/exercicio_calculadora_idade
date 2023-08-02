//FUNÇÃO PRINCIPAL
function calcular(event) {
    event.preventDefault()
    console.log("ok")

    let usuario = receberValores();

    let idadeCalculada = receberIdade(usuario.ano);

    let faixaEtaria = receberFaixaEtaria(idadeCalculada);

    console.log(faixaEtaria);

    usuario = organizarDados(usuario, idadeCalculada, faixaEtaria);

    cadastrarUsuario(usuario);

    window.location.reload();

}


// 1. Pegar os valores
function receberValores() {
    let nome = document.getElementById("nome").value.trim();
    let dia = document.getElementById("dia-nascimento").value;
    let mes = document.getElementById("mes-nascimento").value;
    let ano = document.getElementById("ano-nascimento").value;

    let dadosUsuario = {
        nome,
        dia,
        mes,
        ano

    }

    //console.log(dadosUsuario)

    return dadosUsuario;
}


// 2. Calcular a Idade
//    a. Com base no ano
//    b. Com mês (EXTRA)
//    c. Com dia (EXTRA)
function receberIdade(ano) {
    let dataAtual = new Date();
    let anoAtual = dataAtual.getFullYear(); //função que traz o ano atual
    console.log(anoAtual); // 2023

    let idade = anoAtual - ano

    //console.log(idade)

    return idade;
}


// OK 3. Gerar a faixa etária

//     Resultado            Faixa
//     0 à 12               Criança
//     13 à 17              Adolescente
//     18 à 65              Adulto
//     Acima de 65          Idoso
function receberFaixaEtaria(idade) {

    if (idade <= 12) {
        return "Criança"

    } else if (idade >= 13 && idade <= 17) {
        return "Adolescente"

    } else if (idade >= 18 && idade <= 65) {
        return "Adulto"

    } else {
        return "Idoso"
    }

}



// 4. Organizar o objeto pessoa para salvar na lista
function organizarDados(dadosUsuario, faixaEtaria, idade) {

    let dadosOrganizados = {
        ...dadosUsuario,
        idadeEtaria: idade,
        quantosAnos: faixaEtaria
    }

    return dadosOrganizados;
}



// 5. Cadastrar a pessoa na lista
function cadastrarUsuario(dadosUsuario) {
    let listaUsuarios = []

    // caso tenha lista de usuarios no localStorage, carrega isso para a variavel listaUsuarios
    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    //Adiciona lista de usuarios
    listaUsuarios.push(dadosUsuario);

    //Salva a listaUsuarios no localStorage 
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios));


}


// 6. Função para carregar as pessoas, carrega a lista do localStorage, chamar ao carregar a página
function carregarUsuarios() {
    let listaCarregada = []

    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }


    if (listaCarregada.length == 0) {
        //SE não tiver nenhum usuario cadastrado, mostrar mensagem.
        let tabela = document.getElementById("corpo-tabela")
        tabela.innerHTML = "Nenhum usuário cadastrado"
    } else {
        montarTabela(listaCarregada)
    }
    console.log(listaCarregada)
}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios())



// 7. Renderizar o conteúdo da tabela com as pessoas cadastradas - terminar
function montarTabela(listaUsuarios) {
    let tabela = document.getElementById("corpo-tabela")
    let template = ""

    // listaUsuarios.forEach(usuario=>{console.log("o usuário é: ", usuario)})
    listaUsuarios.forEach(usuario => {
        template += ` <tr>
        <td data-cell="nome">${usuario.nome}</td>
        <td data-cell="data de nascimento">${usuario.dia + '/' + usuario.mes + '/' + usuario.ano}</td>
        <td data-cell="idade">${usuario.quantosAnos}</td>
        <td data-cell="faixa etária">${usuario.idadeEtaria}</td> 
    </tr> `
    })

    tabela.innerHTML = template;
}


// 8. Botão para limpar os registros;
function deletarRegistros() {
    //Remove o item do local storage
    localStorage.removeItem("usuariosCadastrados")

    //Recarrega a página
    window.location.reload()
}
