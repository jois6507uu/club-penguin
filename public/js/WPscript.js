

//"väntar på ping" (för workshop)

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo(){
    await sleep(10000);
    console.log("väntat 10 sek");    
    window.location.href = 'http://192.168.43.40:3000/user/contacts';
}

demo();
