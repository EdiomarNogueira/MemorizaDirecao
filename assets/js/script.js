function motorMorre() {
    document.getElementById("statusCarro").innerHTML = carro.nome + " Motor Morreu";
    document.getElementById("acaoCarro").innerHTML = "O Carro Precisa de Mais Aceleração Para Subir a Marcha";
    trocaimagem('morreu.gif', 'Imagem Pessoa Nervosa');
    document.querySelector('#carro').classList.remove('acionado');
    carro.partida = false;
};

function solteFreioDeMao() {
    document.getElementById("statusCarro").innerHTML = carro.nome + " Motor Morreu";
    document.getElementById("acaoCarro").innerHTML = "Solte o Freio de Mão!!!";
    trocaimagem('morreu.gif', 'Imagem Pessoa Nervosa');
    document.querySelector('#carro').classList.remove('acionado')
    carro.partida = false;

}

function trocaerrada() {
    document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha com 'Soluço'";
    document.getElementById("acaoCarro").innerHTML = "Precisa Reduzir a Aceração Para Diminuir a Marchar";
    trocaimagem('neutroacelerado.gif', 'Carro dando uma balançada');
}

function faltaEmbreagem() {
    document.getElementById("statusCarro").innerHTML = carro.nome + " Motor Morreu";
    document.getElementById("acaoCarro").innerHTML = "Precione a Embreagem Até o Final!!!";
    trocaimagem('morreu.gif', 'Imagem Pessoa Nervosa');
    document.querySelector('#carro').classList.remove('acionado');
    carro.partida = false;


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
        carro.acelerar = true;

    } else if (valorrotacao == 0) {
        trocastatus('acelerador', 'Livre');
        document.querySelector('#acelerador').classList.remove('acionado')
        carro.acelerar = false;

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
    } else if (valorpressao == 100 && pressao > 0) {
        valorpressao = valorpressao;
    }
    if (valorpressao > 0) {
        trocastatus('embreagem', 'Pressionada');
        document.querySelector('#embreagem').classList.add('acionado')

    } else if (valorpressao == 0) {
        document.querySelector('#embreagem').classList.remove('acionado');
    }
    console.log(valorpressao);
    document.querySelector('#pressaoembreagem').value = valorpressao;

    document.querySelector('.progress-bar-embreagem').style.setProperty('--progress', valorpressao);

};

function trocaimagem(filename, nomeImagem) {
    document.querySelector('.imagem-acao--gif').setAttribute('src', '/MemorizaDirecao/assets/images/' + filename);
    document.querySelector('.imagem-acao--gif').setAttribute('alt', nomeImagem);

}

function trocamensagem(titulo, mensagem) {
    document.getElementById("statusCarro").innerHTML = carro.nome + titulo;
    document.getElementById("acaoCarro").innerHTML = mensagem;
}

function trocastatus(campo, mensagem) {
    document.getElementById(campo).innerHTML = mensagem;
}

marchaatual = 0;
document.querySelector('#neutro').classList.add('acionado');

function mudamarcha(novamarcha) {
    if (valorpressao < 100) {
        faltaEmbreagem();
    } else {
        if (novamarcha == (marchaatual + 1)) {
            switch (novamarcha) {
                case -1:

                    this.re = true;
                    document.querySelector('#re').classList.add('acionado');
                    document.getElementById("acaoCarro").innerHTML = "";
                    document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha - Ré";
                    document.getElementById("acaoCarro").innerHTML = "E la vai de moonwalk";
                    trocaimagem('re.gif', 'Carro dando ré');
                    pressaoembreagem(-100);
                    marchaatual = novamarcha;
                    break;
                case 0:
                    this.re = false;
                    this.neutro = true;
                    document.querySelector('#neutro').classList.add('acionado');
                    document.querySelector('#re').classList.remove('acionado');
                    document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha - Ponto Morto";
                    document.getElementById("acaoCarro").innerHTML = "E ai, qual vai ser?";
                    marchaatual = novamarcha;
                    break;
                case 1:
                    if (valorrotacao < 20) {
                        console.log("aceleracao insuficiente");
                        motorMorre();
                    } else if ((carro.freiodemao == true || carro.freio == true) && carro.embreagem == true) {
                        valoraceleracao(-20);
                        this.neutro = false;
                        this.primeira = true;
                        this.freiodemao = false;
                        this.freio = false;

                        document.querySelector('#primeira').classList.add('acionado');
                        document.querySelector('#neutro').classList.remove('acionado');
                        document.querySelector('#freiodemao').classList.remove('acionado');
                        document.querySelector('#freio').classList.remove('acionado');
                        document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha - Primeira";
                        document.getElementById("acaoCarro").innerHTML = "Aqui anda até uns 15km/h";
                        trocaimagem('primeira.gif', 'Na primeira marcha');
                        pressaoembreagem(-100);
                        marchaatual = novamarcha;
                    }
                    break;
                case 2:
                    if (valorrotacao < 40) {
                        console.log("aceleracao insuficiente");
                        motorMorre();
                    } else {
                        valoraceleracao(-20);
                        this.primeira = false;
                        this.segunda = true;
                        document.querySelector('#segunda').classList.add('acionado');
                        document.querySelector('#primeira').classList.remove('acionado');
                        document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha - Segunda";
                        document.getElementById("acaoCarro").innerHTML = "Aqui anda até uns 25km/h";
                        trocaimagem('segunda.gif', 'Na segunda marcha');
                        pressaoembreagem(-100);
                        marchaatual = novamarcha;
                    }
                    break;
                case 3:
                    if (valorrotacao < 40) {
                        console.log("aceleracao insuficiente");
                        motorMorre();
                    } else {
                        valoraceleracao(-20);
                        this.segunda = false;
                        this.terceira = true;
                        document.querySelector('#terceira').classList.add('acionado');
                        document.querySelector('#segunda').classList.remove('acionado');
                        document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha - Terceira";
                        document.getElementById("acaoCarro").innerHTML = "Aqui anda até uns 45km/h";
                        trocaimagem('terceira.gif', 'Na terceira marcha');
                        pressaoembreagem(-100);
                        marchaatual = novamarcha;
                    }
                    break;
                case 4:
                    if (valorrotacao < 40) {
                        console.log("aceleracao insuficiente");
                        motorMorre();
                    } else {
                        valoraceleracao(-20);
                        this.terceira = false;
                        this.quarta = true;
                        document.querySelector('#quarta').classList.add('acionado');
                        document.querySelector('#terceira').classList.remove('acionado');
                        document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha - Quarta";
                        document.getElementById("acaoCarro").innerHTML = "Aqui anda até uns 60km/h";
                        trocaimagem('quarta.gif', 'Na quarta marcha');
                        pressaoembreagem(-100);
                        marchaatual = novamarcha;
                    }
                    break;
                case 5:
                    if (valorrotacao < 40) {
                        console.log("aceleracao insuficiente");
                        motorMorre();
                    } else {
                        valoraceleracao(-20);
                        this.quarta = false;
                        this.quinta = true;
                        document.querySelector('#quinta').classList.add('acionado');
                        document.querySelector('#quarta').classList.remove('acionado');
                        document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha - Quinta";
                        document.getElementById("acaoCarro").innerHTML = "Ta Com Pressa Querido(a)?";
                        trocaimagem('quinta.gif', 'Na quinta marcha');
                        pressaoembreagem(-100);
                        marchaatual = novamarcha;
                    }
                    break;
            }
        } else if (novamarcha == (marchaatual - 1)) {
            switch (novamarcha) {
                case -1:
                    this.re = true;
                    this.neutro = false;
                    document.querySelector('#re').classList.add('acionado');
                    document.querySelector('#neutro').classList.remove('acionado');
                    document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha - Ré";
                    document.getElementById("acaoCarro").innerHTML = "E la vai de moonwalk";
                    trocaimagem('re.gif', 'Carro dando ré');
                    pressaoembreagem(-100);
                    marchaatual = novamarcha;
                    break;

                case 0:
                    if (valorrotacao > 0) {
                        document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha - Neutro";
                        document.getElementById("acaoCarro").innerHTML = "DESACELERAAAAAAAAAAAAAAA";
                        trocaimagem('neutroacelerado.gif', 'Imagem de Susto');
                    } else {
                        valoraceleracao(20);
                        this.neutro = true;
                        this.primeira = false;
                        document.querySelector('#neutro').classList.add('acionado');
                        document.querySelector('#primeira').classList.remove('acionado');
                        document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha - Ponto Morto";
                        document.getElementById("acaoCarro").innerHTML = "E ai, qual vai ser?";
                        pressaoembreagem(-100);
                        marchaatual = novamarcha;
                    }
                    break;
                case 1:
                    if (valorrotacao > 20) {
                        console.log("Diminua a Acelação Ande de Reduzir a Marcha");
                        trocaerrada();
                    } else {
                        valoraceleracao(20);
                        this.segunda = false;
                        this.primeira = true;
                        document.querySelector('#primeira').classList.add('acionado');
                        document.querySelector('#segunda').classList.remove('acionado');
                        document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha - Primeira";
                        document.getElementById("acaoCarro").innerHTML = "Aqui anda até uns 15km/h";
                        trocaimagem('primeira.gif', 'Na primeira marcha');
                        pressaoembreagem(-100);
                        marchaatual = novamarcha;
                    }
                    break;
                case 2:
                    if (valorrotacao > 20) {
                        console.log("Diminua a Acelação Ande de Reduzir a Marcha");
                        trocaerrada();
                    } else {
                        valoraceleracao(20);
                        this.segunda = true;
                        this.terceira = false;
                        document.querySelector('#segunda').classList.add('acionado');
                        document.querySelector('#terceira').classList.remove('acionado');
                        document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha - Segunda";
                        document.getElementById("acaoCarro").innerHTML = "Aqui anda até uns 25km/h";
                        trocaimagem('segunda.gif', 'Na segunda marcha');
                        pressaoembreagem(-100);
                        marchaatual = novamarcha;
                    }
                    break;
                case 3:
                    if (valorrotacao > 20) {
                        console.log("Diminua a Acelação Ande de Reduzir a Marcha");
                        trocaerrada();
                    } else {
                        valoraceleracao(20);
                        this.quarta = false;
                        this.terceira = true;
                        document.querySelector('#terceira').classList.add('acionado');
                        document.querySelector('#quarta').classList.remove('acionado');
                        document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha - Terceira";
                        document.getElementById("acaoCarro").innerHTML = "Aqui anda até uns 45km/h";
                        trocaimagem('terceira.gif', 'Na terceira marcha');
                        pressaoembreagem(-100);
                        marchaatual = novamarcha;
                    }
                    break;
                case 4:
                    if (valorrotacao > 20) {
                        console.log("Diminua a Acelação Ande de Reduzir a Marcha");
                        trocaerrada();
                    } else {
                        valoraceleracao(20);
                        this.quarta = true;
                        this.quinta = false;
                        document.querySelector('#quarta').classList.add('acionado');
                        document.querySelector('#quinta').classList.remove('acionado');
                        document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha - Quarta";
                        document.getElementById("acaoCarro").innerHTML = "Aqui anda até uns 60km/h";
                        trocaimagem('quarta.gif', 'Na quarta marcha');
                        pressaoembreagem(-100);
                        marchaatual = novamarcha;
                    }
                    break;
                case 5:
                    this.quinta = true;
                    document.querySelector('#quinta').classList.add('acionado');
                    document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha - Quinta";
                    document.getElementById("acaoCarro").innerHTML = "Ta Com Pressa Querido(a)?";
                    trocaimagem('quinta.gif', 'Na quinta marcha');
                    pressaoembreagem(-100);
                    marchaatual = novamarcha;
                    break;
            }

        } else {
            document.getElementById("statusCarro").innerHTML = carro.nome + " Troca de Marcha Fora da Sequência";
            document.getElementById("acaoCarro").innerHTML = "É recomendado trocar a marcha de acordo com a sequência";

        }
    }





}




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
    neutro: true,
    re: false,
    primeira: false,
    segunda: false,
    terceira: false,
    quarta: false,
    quinta: false,

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
        window.location.reload(true);

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

    /* acelerador: function() {
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
    }, */


    pisarfreio: function(rotacao) {
        this.freio = true;
        document.querySelector('#freio').classList.add('acionado')
        valoraceleracao(rotacao * -1);
        trocastatus('freio', 'Pressionado');
    },

    soltarfreio: function() {
        this.freio = false;
        document.querySelector('#freio').classList.remove('acionado')
        trocastatus('freio', 'Livre');

        if (this.freiodemao == false && (this.acelerar == false || carro.neutro == true)) {
            document.getElementById("statusCarro").innerHTML = carro.nome + " Em movimento";
            trocaimagem('freiodemaosemfreio.gif', 'Imagem Carro em Movimento');
        } else if (this.freiodemao == false) {
            document.getElementById("acaoCarro").innerHTML = "Engate a Primeira e Faça Meia Embreagem Antes de Soltar o Freio de Mão!!!";

        } else if (carro.neutro == true) {
            document.getElementById("acaoCarro").innerHTML = "Engate a Primeira e Faça Meia Embreagem!!!";

        }

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


        if (this.freio == false && (this.acelerar == false || carro.neutro == true)) {
            document.getElementById("statusCarro").innerHTML = carro.nome + " Em movimento";
            trocaimagem('freiodemaosemfreio.gif', 'Imagem Carro em Movimento');
        } else if (this.freio == false) {
            document.getElementById("acaoCarro").innerHTML = "Engate a Primeira e Faça Meia Embreagem Antes de Soltar o Freio!!!";

        } else if (carro.neutro == true) {
            document.getElementById("acaoCarro").innerHTML = "Engate a Primeira e Faça Meia Embreagem!!!";

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

    engatare: function() {
        mudamarcha(-1);
    },
    engataprimeira: function() {
        mudamarcha(1);
    },
    engatasegunda: function() {
        mudamarcha(2);
    },
    engataterceira: function() {
        mudamarcha(3);
    },
    engataquarta: function() {
        mudamarcha(4);
    },
    engataquinta: function() {
        mudamarcha(5);
    },
    engataneutro: function() {
        mudamarcha(0);
    },




};

//console.log(carro['nome'])

//console.log(carro.nome);


//carro.ligar();
//carro.acelerar();

carro.subirfreiodemao();

//onmouseup


progressbar = document.querySelector('.progress-bar');
