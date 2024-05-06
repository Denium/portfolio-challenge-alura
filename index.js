// Este código é apenas para caso você queira preencher automaticamente o placeholder
document.getElementById("nome").addEventListener("focus", function() {
  document.getElementById("nome").setAttribute("placeholder", "");
});

document.getElementById("nome").addEventListener("blur", function() {
  if (document.getElementById("nome").value === "") {
    document.getElementById("nome").setAttribute("placeholder", "Digite seu nome");
  }
});