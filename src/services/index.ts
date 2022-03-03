import math, { compile, derivative } from 'mathjs';
var Algebrite = require('algebrite');

interface IFunc {
    fx : string,
    X: string
}
interface IFuncDiff {
    fx : string | math.MathNode,
    X: string,
    degree: number  
}
interface InterfaceX {
    xnew: number,
    xold: number
}
interface IIntegrate {
    fx: string,
    a: number,
    b: number
}

const func = ({ fx, X } : IFunc) => {
    var expr = compile(fx); // f(x)
    let scope = { x: parseFloat(X) }; //f(x) ; x=input
    return expr.evaluate(scope);
}
const funcDiff = ({ fx, X } : IFunc) => {
    var expr = derivative(fx, 'x');
    let scope = {x:parseFloat(X)};
    return expr.evaluate(scope); 
}

const funcDiffDegreeN = ({ fx, X, degree } : IFuncDiff) => {
    var temp = fx, expr;
    for (var i=1 ; i<=degree ; i++) {
        temp = derivative(temp, 'x')
        expr = temp
    }
    
    let scope = {x:parseFloat(X)}
    return expr?.evaluate(scope)
}
const error = ({ xnew, xold } : InterfaceX) => {
    return Math.abs((xnew - xold) / xnew);
}
const exactIntegrate = ({ fx, a, b } : IIntegrate) => {
    var expr = compile(Algebrite.integral(Algebrite.eval(fx)).toString())
    return expr.evaluate({x:b}) - expr.evaluate({x:a})

}
export { func, funcDiff, funcDiffDegreeN, error, exactIntegrate };