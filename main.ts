import Parser from "./frontend/parser.ts"

pig();

function pig(){
    const parser= new Parser();
    console.log("PigScript v0.1");
    while(true){
        const input=prompt(">");
        if(!input || input.includes("exit")){
            Deno.exit(1);
        }
        const program=parser.produceAST(input)
        console.log(program);
    }
}