var app = new Vue({

    // Elemento que o aplicativo será iniciado
    el: "#app",

    // Propriedades do aplicativo
    data: {
        user: '',
        text: null,
        messages: [],
        ws: null,
    },

    // Quando iniciado o aplicativo
    created: function() {
        // Inicia a conexão com o websocket
        this.connect();
    },

    // Métodos do aplicatvo
    methods: {

        // Método responsável por iniciar conexão com o websocket
        connect: function(onOpen) {

            var self = this;

            // Conectando
            self.ws = new WebSocket('wss://commgroup.herokuapp.com:8080');
            //self.ws = new WebSocket('ws://localhost:8080');

            // Evento que será chamado ao abrir conexão
            self.ws.onopen = function() {
                self.addSuccessNotification('Conectado');
                // Se houver método de retorno
                if (onOpen) {
                    onOpen();
                }
            };

            // Evento que será chamado quando houver erro na conexão
            self.ws.onerror = function() {
                self.addErrorNotification('Não foi possível conectar-se ao servidor');
            };

            // Evento que será chamado quando recebido dados do servidor
            self.ws.onmessage = function(e) {
                self.addMessage(JSON.parse(e.data));
            };

        },

        // Método responsável por adicionar uma mensagem de usuário
        addMessage: function(data) {
            this.messages.push(data);
            this.scrollDown();
        },

        // Método responsável por adicionar uma notificação de sucesso
        addSuccessNotification: function(text) {
            // this.addMessage({color: 'green', text: text});
            this.addMessage({color: 'blue', text: 'Olá, turma!'});
            this.addMessage({color: 'gray', text: 'Hoje vamos aprender sobre número primos!'});
            this.addMessage({color: 'green', text: 'Me informe um número e eu te darei a resposta!'});
        },

        // Método responsável por adicionar uma notificação de erro
        addErrorNotification: function(text) {
            this.addMessage({color: 'red', text: text});
        },

        // Método responsável por enviar uma mensagem
        sendMessage: function() {

            var self = this;

            // Se não houver o nome de usuário
            if (!self.user) {
                alert('Informe o nick de usuário para enviar a mensagem!');
                // Saindo do método
                return;
            }

            // Se não houver o texto da mensagem
            if (!self.text) {
                alert('Informe a mensagem que deseja enviar!');
                // Saindo do método
                return;
            }

            // Se o valor do texto não for um número ou for menor ou igual a zero
            if (isNaN(parseInt(self.text)) || parseInt(self.text) <= 0) {
                alert('Informe um valor válido!');
                // Saindo do método
                return;
            }

            // Se a conexão não estiver aberta
            if (self.ws.readyState !== self.ws.OPEN) {

                // Exibindo notificação de erro
                self.addErrorNotification('Problemas na conexão. Tentando reconectar...');

                // Tentando conectar novamente e caso tenha sucesso
                // envia a mensagem novamente
                self.connect(function() {
                    self.sendMessage();
                });

                // Saindo do método
                return;
            }

            // Envia os dados para o servidor através do websocket
            self.ws.send(JSON.stringify({
                user: self.user,
                text: parseInt(self.text),
            }));

            // Limpando texto da mensagem
            self.text = null;

        },

        // Método responsável por "rolar" a scroll do chat para baixo
        scrollDown: function() {
            var container = this.$el.querySelector('#messages');
            container.scrollTop = container.scrollHeight;
        },

    }

});
