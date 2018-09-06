const User = function(name) {
    this.name = name;
    this.chatroom = null;
}

User.prototype = {
    send: function(message, to) {
        this.chatroom.send(message, this, to);

    },
    recieve: function(message, from) {
        console.log(`${from.name} to ${this.name}: ${message}`);

    }
}

const Chatroom = function() {
    let users = {}; // list of users 

    return {
        register: function(user) {
            users[user.name] = user;
            user.chatroom = this;

        },
        send: function(message, from, to) {
            if (to) {
                // Single User message 
                to.recieve(message, from);

            } else {

                // Mass Message 
                for (key in users) {

                    if (users[key] !== from) {
                        users[key].recieve(message, from);
                    }
                }

            }

        }
    }
}

const ragavan = new User('Ragavan');
const mike = new User('Mike');
const paul = new User('Paul');
const jackie = new User('Jackie');

const chatroom = new Chatroom();

chatroom.register(ragavan);
chatroom.register(mike);
chatroom.register(paul);
chatroom.register(jackie);

ragavan.send('Hello Mike', mike);
jackie.send('Hello Ragavan, you are the best dev ever!', ragavan);
paul.send('Hello Everyone!!!');