
//funçoes para fazer o botao de adicionar ao carrinho funcionar
let addProduto = (event) =>{
    let addCarrinho = event.target
    console.log(addCarrinho) //debug
    let produto = addCarrinho.parentElement.parentElement //seleciona a div inteira que contém os elementos do produto
    console.log(produto) //debug

    let nomeProduto = produto.getElementsByClassName('titulo-img')[0].innerText
    console.log(nomeProduto) //debug

    let preçoProduto = produto.getElementsByClassName('preço-item')[0].innerText
    console.log(preçoProduto) //debug

    let imgProduto = produto.getElementsByClassName('img-novos')[0].src
    console.log(imgProduto) //debug

    addConteudoNoCarrinho(nomeProduto, preçoProduto, imgProduto)

    atualizaPreço()

}

let addConteudoNoCarrinho = (nomeProduto, preçoProduto, imgProduto) =>{
    let addItemNoCarrinho = document.createElement('div')
    addItemNoCarrinho.classList.add('carrinho-div')
    let itemCarrinho = document.getElementsByClassName('itens-carrinho')
    
    //checa duplicados
    let nomeItemCarrinho = document.getElementsByClassName('titulo-item')
    for(let i = 0 ; i < nomeItemCarrinho.length ; i++){
        if (nomeItemCarrinho[i].innerText == nomeProduto){
            alert('item ja no carrinho')
            return
        }
    }

    let conteudoItemCarrinho = `
            <div class="carrinho-item coluna-carrinho">
                <img src="${imgProduto}" class="img-item" width="100" height="100">
                <span class="titulo-item">${nomeProduto}</span>
            </div>
            <span class="carrinho-preço coluna-carrinho">${preçoProduto}</span>
            <div class="carrinho-quantidade coluna-carrinho">
                <input class="qtd-input-item" type="number" value="1">
                <button class="btn-item btn-remove" role="button">remover</button>
            </div>
    `
    addItemNoCarrinho.innerHTML = conteudoItemCarrinho
    itemCarrinho[0].append(addItemNoCarrinho) //preciso do [0] para acessar o elemento da DOM
    
    //event listeners dos itens adicionados após o load da pagina
    addItemNoCarrinho.getElementsByClassName('btn-remove')[0].addEventListener('click', removeItemDoCarrinho)
    addItemNoCarrinho.getElementsByClassName('qtd-input-item')[0].addEventListener('change', mudaQtd)
}

let btnAddCarrinho = document.getElementsByClassName('btn-add-carrinho')
for(let i = 0 ; i < btnAddCarrinho.length ; i++){
    let addCarrinho = btnAddCarrinho[i]
    addCarrinho.addEventListener('click', addProduto)
}



//funçao para remover os itens do carrinho
let removeItemDoCarrinho = (event) => {
    //console.log(event.target) //debug
    event.target.parentElement.parentElement.remove() //remove a div grandparent do targer inteira
    atualizaPreço()
}

let btnRemoveCarrinho = document.getElementsByClassName('btn-remove')
for(let i = 0 ; i < btnRemoveCarrinho.length ; i++){
    let btn = btnRemoveCarrinho[i]
    btn.addEventListener('click', removeItemDoCarrinho)
}



//funçao para atualizar o preço do carrinho em tempo real
let mudaQtd = (event) =>{  
    isNaN(event.target.value) || event.target.value <= 0 ? event.target.value = 0 : atualizaPreço()
 }

let btnQtd = document.getElementsByClassName('qtd-input-item')
for(let i = 0 ; i < btnQtd.length ; i++){
    let qtd = btnQtd[i]
    console.log(qtd)
    qtd.addEventListener('change', mudaQtd)
}



//botao de compra remove os itens do carrinho e dispara um alerta

let btnCompra = document.getElementsByClassName('btn-comprar')[0]
btnCompra.addEventListener('click', () =>{
    let totalCompra = document.getElementsByClassName('preço-total')[0].innerHTML
    alert(`compra concluida, Total: ${totalCompra}`)
    //loop que remove os itens do carrinho
    let itensNoCarrinho = document.getElementsByClassName('itens-carrinho')[0]
    console.log(itensNoCarrinho)
    while(itensNoCarrinho.hasChildNodes()){
        itensNoCarrinho.removeChild(itensNoCarrinho.firstChild)
    }
    atualizaPreço()
})


// let compraConcluida = () =>{
//     alert('compra concluida')
//     let itensNoCarrinho = document.getElementsByClassName('carrinho-div')[0]
//     while(itensNoCarrinho.hasChildNodes()){
//         itensNoCarrinho.removeChild(itensNoCarrinho.firstChild)
//     }
// }



//funçao que atualiza o preço final do carrinho
let atualizaPreço = () =>{
    let itensCarrinho = document.getElementsByClassName('itens-carrinho')[0] //queremos o elemento [0] pois o getElementsByClassName retorna um array HTMLelement contendo os elementos
    console.log(itensCarrinho) //debug
    let divCarrinho = itensCarrinho.getElementsByClassName('carrinho-div')
    console.log(divCarrinho) //array com 3 divs, carrinho-item, carrinho-preço, carrinho-quantidade

    let totFinal = 0
    //loop pelas colunas do carrinho
    for(let i = 0 ; i < divCarrinho.length ; i++){
        let conteudoCarrinho = divCarrinho[i]
        //console.log(conteudoCarrinho) //passa por cada div individualmente: carrinho-item, carrinho-preço, carrinho-quantidade
        let divPreço = conteudoCarrinho.getElementsByClassName('carrinho-preço')[0]
        let divQuantidade = conteudoCarrinho.getElementsByClassName('carrinho-quantidade')[0]
        let qtdInput = divQuantidade.getElementsByClassName('qtd-input-item')[0]
        console.log(divPreço) //debug
        console.log(qtdInput) //debug

        let qtdFinal = qtdInput.value
        console.log(qtdFinal) //debug
        let preçoProd = parseFloat(divPreço.innerText.replace('R$', ''))
        console.log(preçoProd) //debug
        let preçoFinal = qtdFinal * preçoProd
        console.log(preçoFinal) //debug
        
        totFinal += preçoFinal
    }
    let preçoCarrinho = document.getElementsByClassName('preço-total')[0].innerText = 'R$ ' + totFinal.toFixed(2)
    console.log(preçoCarrinho) //debug
}

//TODO: Criar funçao para adicionar produto