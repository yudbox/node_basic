//передача параметров при запуске
// <-------run command node app.js hello 55 777
// <-------three args 1-hello 2-55 3-777
const args = process.argv
console.log('args', args);
const a = Number(args[3])
const b = Number(args[4])

a>b ? console.log('a more: ', a): console.log('b more: ', b);