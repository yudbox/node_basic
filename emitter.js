const Logger = require('./emitterLogger')

myLogger = new Logger()

console.log('myLogger', myLogger);

myLogger.on('some_name_event', (args)=> {
    const {id, text} = args
    console.log('id, text', id, text);
})

myLogger.emitterLogger('start')