import { useState } from 'react'
import { Card, Input, Button, Table } from 'antd';
import 'antd/dist/antd.css';
import { error, func } from '../../services';
import Graph from '../../components/Graph.component';
import { onepointColumn } from '../../constants';

interface IInput {
    FX: math.MathExpression, 
    X0: number
}
interface IOutput {
    i: number,
    X: number | string,
    Error: number | string
}

var outputTable : IOutput[] = []
function Onepoint()  {
    const [input, setInput] = useState<IInput>({
        FX: "",
        X0: 0
    });
    const [output, setOutput] = useState<IOutput | null>(null);
    const [showOutput, setShowOutput] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
        
    const onepoint = () => {
        outputTable = []
        const { FX, X0 } = input;

        var xnew = 0, xold = X0;
        var epsilon = parseFloat("0.000000");

        do {
            xnew = func({fx: FX, X: xold.toString()})
            console.log(xnew);
            
            
            epsilon = error({ xnew, xold })
            
            outputTable.push({
                i: outputTable.length+1,
                X: xnew.toFixed(5),
                Error: Math.abs(epsilon).toFixed(8)
            })
            xold = xnew;

        } while (outputTable.length < 50 && Math.abs(epsilon) > 0.000001);
        console.log(outputTable);
        
        setShowOutput(true);
        setShowGraph(true);
    }

    return (
        <div style={{ background: "#FFFF", padding: "30px" }}>
            <h2 style={{ color: "black", fontWeight: "bold" }}>One Point iteration</h2>
            <div className="row">
                <div className="offset-md-1 col-4">
                    <Card
                        bordered={true}
                        style={{ background: "black", color: "#FFFFFFFF" }}
                     
                        id="inputCard"
                    >
                        <h3 style={{color:"white"}}>f(x)</h3><Input size="middle" name="fx" onChange={(e) => {
                            setInput({
                                ...input,
                                FX: e.target.value
                            })
                        }}></Input>
                        <h3 style={{color:"white"}}>X<sub>0</sub></h3><Input size="middle" name="xr" onChange={(e) => {
                            setInput({
                                ...input,
                                X0: Number(e.target.value)
                            })
                        }}></Input><br /><br />
                        <Button block type="primary" id="submit_button" onClick={() => onepoint()}>Submit</Button>
                    </Card>
                </div>
                <div className="col-6 offset-md-1">
                    {showGraph && <Graph fx={input.FX} title="One Point Iteration Method" />}
                </div>
            </div>
            <div className="row">
                <div className="col offset-md-1">
                {showOutput &&
                    <Table size='small' rowKey='i' pagination={{defaultPageSize: 5}} dataSource={outputTable} bordered>
                        {onepointColumn.map(column => {
                            return <Table.Column title={column.title} dataIndex={column.dataIndex} key={column.key} align='left' />
                        })}                     
                    </Table>
                }                    
                </div>
            </div>
        </div>
    );
}

export default Onepoint;