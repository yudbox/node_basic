const EventEmitter = require('events')

//const emitter = new EventEmitter()

/*если в каждом модуле/файле вызывать конструктор EventEmitter
* то это будет новые объект в кождом файле и on/emit не будут раюотать вместе
* для этого в одном файле создаем Класс эммитера а в другие его импортируют
*/

class Logger extends EventEmitter {
    emitterLogger = (msg) => {
        console.log(msg);
        this.emit('some_name_event', {id: 1, text: 'hehhei im ok'})
    }
}

module.exports = Logger