import { Card, Input, Button } from 'antd';
import { lusolve } from 'mathjs';
import { ReactElement, useState } from 'react'

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

var A: number[][] = [], B: number[] = [], answer: number[] = [], matrixA: ReactElement[] = [], matrixB: ReactElement[] = []
export default function LU() {

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

    const lu = () => {
        initMatrix();
        let decompose = lusolve(A, B);

        decompose.map(el => {
            answer.push(Math.round(el));
        })

        setShowOutput(true);

    }

    return (
        <div style={{ background: "#FFFF", padding: "30px" }}>
            <h2 style={{ color: "black", fontWeight: "bold" }}>LU Decomposition</h2>
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
                        <Button block type="primary" id="submit_button" onClick={() => lu()}>Submit</Button>
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
