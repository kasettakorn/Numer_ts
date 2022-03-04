import { Card, Input, Button } from 'antd';
import { det } from 'mathjs';
import { ReactElement, useState } from 'react'
import Graph from '../../components/Graph.component';

interface IDimentionInput {
    row: number,
    col: number
}
interface IInput {
    arr: number
}
interface IOutput {
    arr: number
}

var A: number[][] = [], B: number[] = [], answer: string[] = [], matrixA: ReactElement[] = [], matrixB: ReactElement[] = []
export default function Gauss() {

    const [dimention, setDimention] = useState<IDimentionInput>({
        row: 0,
        col: 0
    });

    const [input, setInput] = useState<ReactElement[] | null>(null);
    const [output, setOutput] = useState<IOutput[] | null>(null);
    const [showOutput, setShowOutput] = useState(false);
    const [showInput, setShowInput] = useState(false);

    const createMatrix = () => {
        for (var i = 1; i <= dimention.row; i++) {
            for (var j = 1; j <= dimention.col; j++) {
                matrixA.push(<Input style={{
                    width: "12%",
                    height: "50%",
                    backgroundColor: "#007c1b",
                    marginInlineEnd: "3%",
                    marginBlockEnd: "5%",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold"
                }}
                    id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={"a" + i + "" + j} />)
            }
            matrixA.push(<br />)
            matrixB.push(<Input style={{
                width: "12%",
                height: "50%",
                backgroundColor: "black",
                marginInlineEnd: "3%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"b" + i} key={"b" + i} placeholder={"b" + i} />)
        }

        setShowInput(true);

    }

    const initMatrix = () => {
        for (var i = 0; i < dimention.row; i++) {
            A[i] = []
            for (var j = 0; j < dimention.col; j++) {
                A[i][j] = Number((document.getElementById("a" + (i + 1) + "" + (j + 1)) as HTMLInputElement).value);
            }
            B[i] = Number((document.getElementById("b" + (i + 1)) as HTMLInputElement).value);

        }
    }

    const gauss_eliminate = () => {
        initMatrix();
        let n = dimention.col;
        if (A[0][0] === 0) { //pivoting
            var tempRow = JSON.parse(JSON.stringify(A[0]));
            var tempColumn = B[0];
            A[0] = A[1];
            A[1] = tempRow;
            B[0] = B[1];
            B[1] = tempColumn;
        }
        //Forward eliminated
        for (var k = 0; k < n; k++) {
            for (var i = k + 1; i < n; i++) {
                var factor = A[i][k] / A[k][k];
                for (var j = k; j < n; j++) {
                    A[i][j] = A[i][j] - factor * A[k][j];
                }
                B[i] = B[i] - factor * B[k];
            }
        }
        //Backward Substitution
        let X = new Array(n);
        X[n - 1] = Math.round(B[n - 1] / A[n - 1][n - 1]); //find Xn
        for (i = n - 2; i >= 0; i--) { //find Xn-1 to X1
            var sum = B[i];
            for (j = i + 1; j < n; j++) {
                sum = sum - A[i][j] * X[j];
            }
            X[i] = Math.round(sum / A[i][i]);
        }
        for (i = 0; i < n; i++) {
            answer.push("x" + (i + 1) + " = " + X[i] + "\n");
        }

        setShowOutput(true);
    }

    return (
        <div style={{ background: "#FFFF", padding: "30px" }}>
            <h2 style={{ color: "black", fontWeight: "bold" }}>Cramer's Rule</h2>
            <div className="row">
                {!showInput && <div className="offset-md-1 col-4">
                    <Card
                        bordered={true}
                        style={{ background: "black", color: "#FFFFFFFF" }}

                        id="inputCard"
                    >
                        <h3 style={{ color: "white" }}>Row</h3><Input size="middle" name="row" onChange={(e) => {
                            setDimention({
                                ...dimention,
                                row: Number(e.target.value)
                            })
                        }}></Input>
                        <h3 style={{ color: "white" }}>Column</h3><Input size="middle" name="col" onChange={(e) => {
                            setDimention({
                                ...dimention,
                                col: Number(e.target.value)
                            })
                        }}></Input><br /><br />
                        <Button block type="primary" id="submit_button" onClick={() => createMatrix()}>Submit</Button>
                    </Card>
                </div>}
                {showInput && <div className="offset-md-1 col-4">
                    <Card
                        style={{ background: "black", color: "#FFFFFFFF" }}

                    >
                        {
                            <div>
                                <h3 style={{ color: "white" }}>Matrix [A]</h3>{matrixA}
                                <h3 style={{ color: "white" }}>Vector [B]</h3>{matrixB}
                            </div>
                        }
                        <Button block type="primary" id="submit_button" onClick={() => gauss_eliminate()}>Submit</Button>
                    </Card>
                </div>}
                <div className="col-6 offset-md-1">
                    {showOutput &&
                        <Card
                            title={"Output"}
                            style={{ background: "#409540", color: "#FFFFFFFF" }}
                        >
                            {answer}
                        </Card>
                    }
                </div>
            </div>

        </div>
    );
}
