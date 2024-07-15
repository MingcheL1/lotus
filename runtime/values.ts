export type ValueType="null" | "number" | "boolean";

export interface RuntimeVal{
    type: ValueType;
}
export interface NullVal extends RuntimeVal{
    type: "null";
    value: null;
}
export interface BooleanVal extends RuntimeVal{
    type: "boolean";
    value: boolean;
}
export interface NumberVal extends RuntimeVal{
    type: "number";
    value: number;
}

export function makeNum(n=0){
    return{type:"number", value:n} as NumberVal;
}

export function makeNull(){
    return{type:"null", value:null} as NullVal;
}

export function makeBool(b=true){
    return{type:"boolean", value:b} as BooleanVal;
}