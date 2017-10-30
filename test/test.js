const b64Tester = require('../index.js')
let stringTest = "Hola, Hello, Bonjour !"
console.log('Testing Lib with : ' + stringTest)

b64Tester('SG9sYSwgSGVsbG8sIEJvbmpvdXIgIQ==').then( res => {
  if(res === stringTest){
    console.log('Test Pass !');
  } else {
    console.log('Test Fail, Wrong matches');
  }
}, err => {
  console.log(err);
})
