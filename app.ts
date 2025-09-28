
import { createInterface } from "readline/promises";
/*const rl = createInterface({
    input:process.stdin,
    output: process.stdout
});*/

/*
async function menu () {
    setTimeout(async () => {
        console.clear();
        console.log('1-Opçao 1');
        console.log('2-Opçao 2');
        const answer: string = await rl.question('Escolha a sua opçao: ');
        switch(answer) {
            case "1":
                console.log("Escolheu a aopção 1");
                break;
        }
    });
}*/


interface FetchResponse<T> {
    data:T;
    status:number;
    statustext: string;
    headers: Record<string,string>;
}

async function fetchJson<T>(url:string):Promise<FetchResponse<T>> {
    const response = await fetch(url);
    const headers:Record<string, string> = {};
    response.headers.forEach((value, key) => {
        headers[key] = value;
    });
    const data = await response.json();
    return {
        data:  data as T,
        status: response.status,
        statustext: response.statusText,
        headers
    }
}
/*
(async () => {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.clear();
    let nome: string = await rl.question('Diz ao seu nome: ');
    console.log(nome);
    let idade: number = Number(await rl.question('Idade?: '));
    if(!Number.isNaN(idade)) {
       if(idade < 18) {
            console.log('Menor de idade');
        }
        else {
            console.log('maior de idade')
        }
    }
    else {
        console.log('Valor de idade inválido!');
    }

    console.log('Ola, Alfredo!');
    process.exit(0);
})()

*/

import { }