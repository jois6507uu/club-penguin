

//"väntar på ping" (för workshop)

function sleep(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo(){
    await sleep(5000);
    console.log("väntat 5 sek");    
}

demo();
