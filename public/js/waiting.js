

//"väntar på ping" (för workshop)

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo(){
    await sleep(5000);
    window.location = 'http://192.168.43.40:3000/user/meeting';
}

demo();
