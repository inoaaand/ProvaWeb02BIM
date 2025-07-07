const cepInput = document.getElementById('cep');
const btnSalvar = document.getElementById('btnSalvar');
const btnExibir = document.getElementById('btnExibir');

cepInput.addEventListener('input', () => {
  const cep = cepInput.value.replace(/\D/g, '');
  if (cep.length === 8) {
    buscarEndereco(cep);
  }
});

function buscarEndereco(cep) {
  fetch(`https://viacep.com.br/ws/${cep}/json/`)
    .then(res => res.json())
    .then(data => {
      if (data.erro) {
        limparCamposEndereco();
        alert("CEP não encontrado.");
        return;
      }

      document.getElementById('logradouro').value = data.logradouro || '';
      document.getElementById('bairro').value = data.bairro || '';
      document.getElementById('cidade').value = data.localidade || '';
      document.getElementById('uf').value = data.uf || '';

    })
    .catch(() => {
      limparCamposEndereco();
      alert("Erro ao buscar o CEP.");
    });
}

function limparCamposEndereco() {
  const campos = ['logradouro', 'bairro', 'cidade', 'uf'];
  campos.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}


btnSalvar.addEventListener('click', () => {
  const novoEndereco = {
    nome: document.getElementById('nome').value.trim(),
    email: document.getElementById('email').value.trim(),
    cep: document.getElementById('cep').value.trim(),
    logradouro: document.getElementById('logradouro').value.trim(),
    numero: document.getElementById('numero').value.trim(),
    bairro: document.getElementById('bairro').value.trim(),
    cidade: document.getElementById('cidade').value.trim(),
    uf: document.getElementById('uf').value.trim(),
  };


  let listaEnderecos = JSON.parse(localStorage.getItem('listaEnderecos')) || [];
  listaEnderecos.push(novoEndereco);
  localStorage.setItem('listaEnderecos', JSON.stringify(listaEnderecos));

  alert('Aluno salvo');

  limparCamposTodos();
  const listaEnderecosS = JSON.parse(localStorage.getItem('listaEnderecos')) || [];
  const container = document.getElementById('lista');

  container.innerHTML = ''; 

  if (listaEnderecos.length === 0) {
    container.textContent = 'Nenhum aluno salvo.';
    return;
  }

  listaEnderecos.forEach(endereco => {
    const card = document.createElement('div');
    card.classList.add('card-endereco');

    card.innerHTML = `
      <div><strong>Nome:</strong> ${endereco.nome}</div>
      <div><strong>Email:</strong> ${endereco.email}</div>
      <div><strong>CEP:</strong> ${endereco.cep}</div>
      <div><strong>Logradouro:</strong> ${endereco.logradouro}</div>
      <div><strong>Numero:</strong> ${endereco.numero}</div>
      <div><strong>Bairro:</strong> ${endereco.bairro}</div>
      <div><strong>Cidade:</strong> ${endereco.cidade}</div>
      <div><strong>UF:</strong> ${endereco.uf}</div>
    `;
    container.appendChild(card);
});
});

btnBuscar.addEventListener('click', () => {
    
})

function limparCamposTodos() {
  const campos = ['nome', 'email', 'cep', 'logradouro', 'numero', 'bairro', 'cidade', 'uf'];
  campos.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
}
