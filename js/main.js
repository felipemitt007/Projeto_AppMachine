//Equivalente ao onload da nossa página. 
$(function(){
    
    //O fundo da página permanece claro. Não escurece como normalmente seria. 
    $("#modal01").modal({backdrop:false});
    
    //A janela modal abre, logo quando a página abrir. 
    $("#modal01").modal("show");
    
    //Fechar a janela automaticamente depois de 3 seg.
    setTimeout(function(){
        $("#modal01").modal("hide");
    },3000);
});