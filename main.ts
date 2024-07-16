import Parser from "./frontend/parser.ts";
import Environment, { createGlobalENV } from "./runtime/environment.ts";
import { evaluate } from "./runtime/interpreter.ts";
import { MK_BOOL, MK_NULL, MK_NUMBER } from "./runtime/values.ts";
let mode=prompt("Run lotus file or use lotus interpreter? (f/i)");
if(mode=="i"){
  lotus();
}else if(mode=="f"){

  run("test.lotus");
}
async function run(filename:string){
  const parser = new Parser();
  const env = createGlobalENV();
  const input=await Deno.readTextFile(filename);
  const program=parser.produceAST(input);
  console.log(program)
  const result=evaluate(program,env);
  // deno-lint-ignore no-explicit-any
  console.log((result as any).value);
}
function lotus() {
  const logo = `
\x1b[38;5;212m ██                                    
\x1b[38;5;212m░██                                  
\x1b[38;5;212m░██        \x1b[1;32m██████  ██████ ██   ██  ██████
\x1b[38;5;212m░██       \x1b[1;32m██░░░░██░░░██░ ░██  ░██ ██░░░░ 
\x1b[38;5;212m░██      \x1b[1;32m░██   ░██  ░██  ░██  ░██░░█████ 
\x1b[38;5;212m░██      \x1b[1;32m░██   ░██  ░██  ░██  ░██ ░░░░░██
\x1b[38;5;212m░████████\x1b[1;32m░░██████   ░░██ ░░██████ ██████ 
\x1b[38;5;212m░░░░░░░░  \x1b[1;32m░░░░░░     ░░   ░░░░░░ ░░░░░░  
\x1b[0m`;
  
    
  const parser = new Parser();
  const env = createGlobalENV();
  console.log(logo);
  console.log("\nLotus v0.1");

  while (true) {
    const input = prompt(">> ");
    if (!input || input.includes("exit")) {
      Deno.exit(1);
    }

    const program = parser.produceAST(input);

    const result = evaluate(program, env);
    // deno-lint-ignore no-explicit-any
    console.log((result as any).value);
  }
}

