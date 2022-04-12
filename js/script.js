(function readyJS(win,doc){

    if(document.querySelectorAll(".deletar")){
        for(let i=0; i < document.querySelectorAll('.deletar').length; i++){
            document.querySelectorAll('.deletar')[i].addEventListener('click', function(){
                if(confirm("Deseja deletar?")){
                    return true;
                }else{
                    event.preventDefault();
                }
            })
        };
    }

})(window.document);