import Parser from "./frontend/parser.ts"
import Environment from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";
import { makeBool, makeNull, makeNum, NumberVal } from "./runtime/values.ts";
pig();

function pig(){
    const parser= new Parser();
    const env = new Environment();
    env.declareVar("x",makeNum(100) as NumberVal)
    env.declareVar("t",makeBool(true));
    env.declareVar("y",makeBool(false));
    console.log("PigScript v0.1");
    while(true){
        const input=prompt(">");
        if(!input || input.includes("exit")){
            Deno.exit(1);
        }
        const program=parser.produceAST(input)
        const result = evaluate(program,env);
        console.log(result)
    }
}