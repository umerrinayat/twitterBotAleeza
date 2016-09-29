var exec = require('child_process').exec;
var cmd = 'touch newfile';
exec(cmd, display);

function display(){
    console.log('Cmd is fininshed');
}