const frm = document.querySelector("#formVeiculo");
const btnCalcular = document.querySelector("#btnCalcular");
const btnSalvar = document.querySelector("#btnSalvar");
const resp1 = document.querySelector("#Resp1");
const resp2 = document.querySelector("#Resp2");
const resp3 = document.querySelector("#Resp3");

let veiculoAtual = null; // para armazenar os dados após o cálculo

btnCalcular.addEventListener("click", () => {
  const modelo = frm.inModelo.value;
  const ano = Number(frm.inAno.value);
  const preco = Number(frm.inPreco.value);

  if (!modelo || !ano || !preco) {
    alert("Preencha todos os campos.");
    return;
  }

  const classificacao = classificarVeiculo(ano);
  const entrada = calcularEntrada(preco, classificacao);
  const parcela = (preco - entrada) / 10;

  resp1.innerText = `${modelo} - ${classificacao}`;
  resp2.innerText = `Entrada R$: ${entrada.toFixed(2)}`;
  resp3.innerText = `+10x de R$: ${parcela.toFixed(2)}`;

  veiculoAtual = {
    modelo,
    ano,
    preco,
    classificacao,
    entrada,
    parcela
  };
});


const classificarVeiculo = (ano) => {
  const anoAtual = new Date().getFullYear();
  if (ano === anoAtual) return "Novo";
  if (ano === anoAtual - 1 || ano === anoAtual - 2) return "Seminovo";
  return "Usado";
};

function calcularEntrada(valor, status) {
  return status === "Novo" ? valor * 0.5 : valor * 0.3;
}

btnSalvar.addEventListener("click", async () => {

    localStorage.setItem("veiculoAtual", JSON.stringify(veiculoAtual));
    console.log("Veículo salvo:", JSON.parse(localStorage.getItem("veiculoAtual")));

    alert("Veículo salvo com sucesso!");


    try {
      const response = await fetch("/salvar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(veiculoAtual)
      });

      const msg = await response.text();
      console.log(msg);
      alert(msg);
  } catch (err) {
      console.error("Erro ao salvar:", err);
  }
});

