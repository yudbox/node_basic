//        https://nodejs.org/api/globals.html

// console.log('global', global);
// console.log('process', process);
// console.log('module', module);

const url = new URL('https://google.com/users/:id#test')
console.log('hash', url.hash);  //     #test
console.log('host', url.host);  //     google.com
console.log('hostname', url.hostname);  //    google.com
console.log('href', url.href);  //    https://google.com/users/:id'
console.log('pathname', url.pathname);  //   users/:id
console.log('protocol', url.protocol);  //   https

//передача параметров при запуске
// <-------run command node globalNodeObjects.js hello 55 777
// <-------three args 1-hello 2-55 3-777
const args = process.argv
console.log('args', args);
const a = Number(args[3])
const b = Number(args[4])

a>b ? console.log('a more: ', a): console.log('b more: ', b);




console.log('__dirname', __dirname);
console.log('__filename', __filename);