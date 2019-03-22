<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Comunicação em Grupo</title>

    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/chat.css">

</head>
<body>
<div id="app" class="container">
    <div id="messages">
        <div class="row">
            <div class="col s12">
                <ul class="list-unstyled" v-cloak>
                    <li v-for="message in messages">
                        <span class="date" v-if="message.date">[{{ message.date }}]</span>
                        <span class="name" v-if="message.user">{{ message.user }}:</span>
                        <span class="text" :style="{ color: message.color }">
                        {{ message.text }}
                    </span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div id="access">
        <div class="row">
            <div class="col-12 col-sm-3">
                <input type="text" class="form-control form-input" placeholder="Nick" v-model="user"
                       @keyup.enter="sendMessage">
            </div>
            <div class="col-12 col-sm-9">
                <input type="text" class="form-control form-input" placeholder="Mensagem" v-model="text"
                       @keyup.enter="sendMessage">
            </div>
        </div>
    </div>
</div>
<script type="text/javascript" src="js/lib/vue.min.js"></script>
<script type="text/javascript" src="js/chat.js"></script>
</body>
</html>