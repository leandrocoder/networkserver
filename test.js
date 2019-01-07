
function checkPort(port, callback)
{
    
}


let p = 5000;

checkPort(p, (isFree) => {
    console.log(`check port ${p} => ${isFree}`);
})


