/*let carros = [
    'Palio',
    'Uno',
    'Corolla',
    'Ferrari'
];


let carros2 = [
    { nome: 'Fiat', modelo: 'Palio' },
    { nome: 'Fiat', modelo: 'Uno' },
    { nome: 'Toyota', modelo: 'Corolla' },
    { nome: 'Ferrari', modelo: 'Spider' }
]
*/

function trocaimagem(filename, nomeImagem) {
    document.querySelector('.imagem-acao--gif').setAttribute('src', '/assets/images/' + filename);
    document.querySelector('.imagem-acao--gif').setAttribute('alt', nomeImagem);

}

function trocamensagem(titulo, mensagem) {
    document.getElementById("statusCarro").innerHTML = carro.nome + titulo;
    document.getElementById("acaoCarro").innerHTML = mensagem;
}

function trocastatus(campo, mensagem) {
    document.getElementById(campo).innerHTML = mensagem;
}

let valorrotacao = 0;

function valoraceleracao(rotacao) {
    if (valorrotacao < 100 && rotacao > 0) {
        valorrotacao = valorrotacao + rotacao;
    } else if (valorrotacao >= 100 && rotacao > 0) {
        document.getElementById("statusCarro").innerHTML = carro.nome + " Forçando o Motor";
        document.getElementById("acaoCarro").innerHTML = "TA PEGANDO FOGO BIXO";
        trocaimagem('pegoufogo.gif', 'Imagem Carro Pegando Fogo');
    } else if (valorrotacao > 0 && rotacao < 0) {
        valorrotacao = valorrotacao + rotacao;
        if (valorrotacao < 0) {
            valorrotacao = 0;
        }
    }

    if (valorrotacao > 0) {
        trocastatus('acelerador', 'Acelerando');
        document.querySelector('#acelerador').classList.add('acionado')

    }
    console.log(valorrotacao);
    document.querySelector('#rotacoes').value = valorrotacao;
    document.querySelector('.progress-bar-aceleracao').style.setProperty('--progress', valorrotacao);


    switch (valorrotacao) {
        case 0:
            document.querySelector('#status-rotacao').innerHTML = "Sem Rotação";
            break;
        case 20:
            document.querySelector('#status-rotacao').innerHTML = "1500RPM - Reduza a Marcha ou Acelere";
            break;
        case 40:
            document.querySelector('#status-rotacao').innerHTML = "2500RPM - Passe a marcha";
            break;
        case 60:
            document.querySelector('#status-rotacao').innerHTML = "3500RPM - Rotação Muito Alta - Pare de Acelerar ou Suba a Marcha";
            break;
        case 80:
            document.querySelector('#status-rotacao').innerHTML = "4000RPM - PAREEEEE DE ACELERARRRRR DOIDOOOO";
            break;
        case 100:
            document.querySelector('#status-rotacao').innerHTML = "5000RPM - MEU DEUS DO CEU VEEEIII";
            break;
    }


};
valorpressao = 0;

function pressaoembreagem(pressao) {
    if (valorpressao < 100 && pressao > 0) {
        valorpressao = valorpressao + pressao;
    } else if (valorpressao > 0 && pressao < 0) {
        valorpressao = valorpressao + pressao;
        if (valorpressao < 0) {
            valorpressao = 0;
        }
    }
    if (valorpressao > 0) {
        trocastatus('embreagem', 'Pressionada');
        document.querySelector('#embreagem').classList.add('acionado')

    }
    console.log(valorpressao);
    document.querySelector('#pressaoembreagem').value = valorpressao;

    document.querySelector('.progress-bar-embreagem').style.setProperty('--progress', valorpressao);

};


// 

//
let carro = {
    nome: 'Carro',
    modelo: '-',
    peso: '-',
    partida: false,
    acelerar: false,
    freio: false,
    freiodemao: true,
    embreagem: false,

    ligar: function() {
        if (this.partida == true) {
            document.getElementById("statusCarro").innerHTML = carro.nome + " Ligando";
            trocamensagem(' Vishh', 'O Carro já estava ligado')

        } else if ((this.partida == false) && (this.embreagem == false)) {
            document.querySelector('#carro').classList.remove('acionado')
            trocamensagem(' O Motor Morreu', 'PISE NA EMBREAGEM ANTES DE DAR PARTIDA!')
            trocaimagem('morreu.gif', 'Imagem Carro Motor Morrendo');
            trocastatus('carro', 'Desligado');


        } else if (this.partida == false && (this.freio == false || this.freiodemao == false)) {
            document.querySelector('#carro').classList.add('acionado')
            trocamensagem(' Ligando', 'Ele faz: Vrummm vrummm')
            trocastatus('carro', 'Ligado');
            trocaimagem('ligando.gif', 'Ligando o Carro');
            this.partida = true;
            //console.log("Vrum Vrum");
        }


    },

    desligar: function() {
        document.querySelector('#carro').classList.remove('acionado')

        document.getElementById("statusCarro").innerHTML = carro.nome + " Desligando";
        document.getElementById("acaoCarro").innerHTML = "-";
        this.partida = false;
        trocaimagem('parado.jpg', 'Carro Parado');
        trocastatus('carro', 'Desligado');

    },

    pisaracelerador: function(rotacao) {
        document.querySelector('#acelerador').classList.add('acionado')
        trocastatus('acelerador', 'Acelerando');
        valoraceleracao(rotacao);
    },

    soltaracelerador: function(rotacao) {
        document.querySelector('#acelerador').classList.remove('acionado')
        trocastatus('acelerador', 'Livre');
        valoraceleracao(rotacao * -1);
    },

    acelerador: function() {
        if (this.partida == true && this.freio == false && this.freiodemao == false) {
            document.getElementById("statusCarro").innerHTML = carro.nome + " Acelerando";
            document.getElementById("acaoCarro").innerHTML = "Ele faz: hihihihihihihihi";
            console.log("hihihihihi");
            trocaimagem('carroandando.gif', 'Imagem Carro em Movimento');
        } else {
            document.getElementById("statusCarro").innerHTML = carro.nome + " Desligado";
            document.getElementById("acaoCarro").innerHTML = " Taco Taco e não pega";
            console.log(this.nome + " taco taco e não pega");
            trocaimagem('acelerando.gif', 'Imagem Acelerando o Carro');
        }
    },


    pisarfreio: function(rotacao) {
        document.querySelector('#freio').classList.add('acionado')
        this.freio = true;
        valoraceleracao(rotacao * -1);
        trocastatus('freio', 'Pressionado');
    },

    soltarfreio: function() {
        document.querySelector('#freio').classList.remove('acionado')
        this.freio = false;
        trocastatus('freio', 'Livre');
    },


    subirfreiodemao: function() {
        document.querySelector('#freiodemao').classList.add('acionado')
        this.freiodemao = true;
        trocastatus('freiodemao', 'Puxado');

        if (this.freio == false && this.partida == false) {
            document.getElementById("statusCarro").innerHTML = carro.nome + " Parado";
            document.getElementById("acaoCarro").innerHTML = "-";
            trocaimagem('parado.jpg', 'Imagem Carro Parado');
        };
    },

    descerfreiodemao: function() {
        document.querySelector('#freiodemao').classList.remove('acionado')
        this.freiodemao = false;
        trocastatus('freiodemao', 'Liberado');


        if (this.freio == false) {
            document.getElementById("statusCarro").innerHTML = carro.nome + " Em movimento";
            document.getElementById("acaoCarro").innerHTML = "Ele faz: Adeussssssss";
            trocaimagem('freiodemaosemfreio.gif', 'Imagem Carro em Movimento');
        }

    },

    pisarembreagem: function(pressao) {
        document.querySelector('#embreagem').classList.add('acionado')
        this.embreagem = true;
        trocastatus('embreagem', 'Pressionada');
        pressaoembreagem(pressao);

    },

    soltarembreagem: function(pressao) {
        document.querySelector('#embreagem').classList.remove('acionado')
        this.embreagem = false;
        trocastatus('embreagem', 'Livre');
        pressaoembreagem(pressao * -1);
    },

    /*
    freio: function() {
        document.getElementById("statusCarro").innerHTML = carro.nome + " Freando";
        document.getElementById("acaoCarro").innerHTML = "Ele faz: Pssssssssss";
        this.pisarfreio = true;
        trocaimagem('freando.gif', 'Freando o carro');
        trocastatus('freio', 'pisado');

    },
    */



};

//console.log(carro['nome'])

//console.log(carro.nome);


//carro.ligar();
//carro.acelerar();

carro.subirfreiodemao();

//onmouseup


progressbar = document.querySelector('.progress-bar');