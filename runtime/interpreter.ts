import {makeBool, makeNull, NumberVal, RuntimeVal, ValueType} from "./values.ts"
import { BinaryExpr, Identifier, NodeType,NumericLiteral,Program,Stmt } from "../frontend/ast.ts"
import { NullVal } from "./values.ts";
import Environment from "./environment.ts";
function evaluate_binary_expr(binop: BinaryExpr, env:Environment): RuntimeVal{
    const left=evaluate(binop.left,env);
    const right=evaluate(binop.right,env);

    if(right.type=="number"&&left.type=="number"){
        return eval_numeric_binary_expr(left as NumberVal, right as NumberVal, binop.operator);

    }
    return makeNull();
}
function evaluate_program(program: Program, env:Environment): RuntimeVal{
    let lastEvaluated:  RuntimeVal=makeNull();
    for(const statement of program.body){
        lastEvaluated=evaluate(statement,env);
    }
    return lastEvaluated;
}
function eval_numeric_binary_expr(left:NumberVal, right:NumberVal, operator:string): NumberVal{
    let result: number;
    if(operator=="+"){
        result=left.value+right.value
    }
    else if(operator=="-"){
        result=left.value-right.value
    }
    else if(operator=="*"){
        result=left.value*right.value
    }
    else if(operator=="/"){
        result=left.value/right.value
    }
    else{
        result=left.value%right.value
    }

    return {value: result, type:"number"};

}

function eval_identifier(ident: Identifier, env: Environment): RuntimeVal{
    const val=env.lookupVar(ident.symbol)
    return val;
}

export function evaluate (astNode: Stmt, env: Environment): RuntimeVal {
    switch(astNode.kind){
        case "NumericLiteral":
            return {
                value: ((astNode as NumericLiteral).value),
                type: "number",
            } as NumberVal;

        case "BinaryExpr":
            return evaluate_binary_expr(astNode as BinaryExpr, env);
        case "Program":
            return evaluate_program(astNode as Program,env);
        case "Identifier":
            return eval_identifier(astNode as Identifier, env);
        default:
            console.error("This AST Node has not yet been setup for intepretation", astNode);
            Deno.exit(0);
            
    }
}