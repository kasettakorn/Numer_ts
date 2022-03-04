import { useState } from 'react'
import { Card, Input, Button, Table } from 'antd';
import 'antd/dist/antd.css';
import { error, func } from '../../services';
import Graph from '../../components/Graph.component';
import { columns } from '../../constants';

interface IInput {
    FX: math.MathExpression, 
    XL: number,
    XR: number
}
interface IOutput {
    i: number,
    XL: number | string,
    XR: number | string,
    X: number | string,
    Error: number | string
}

var outputTable : IOutput[] = []
function FalsePosition()  {
    const [input, setInput] = useState<IInput>({
        FX: "",
        XL: 0,
        XR: 0
    });
    const [output, setOutput] = useState<IOutput | null>(null);
    const [showOutput, setShowOutput] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
        
    const false_position = () => {
        outputTable = []

        const { FX, XL, XR } = input;

        var xl = XL, xr = XR
        var xi = 0;
        var sum = 0;

        do {
            xi = (xl * func({fx: FX, X: xr.toString()}) - xr * func({fx: FX, X: xl.toString()})) / (func({fx: FX, X: xr.toString()}) - func({fx: FX, X: xl.toString()}))
            
            if (func({fx: FX, X: xi.toString()}) * func({fx: FX, X: xr.toString()}) < 0) {
                sum = error({xnew: xi, xold: xr});
                xl = xi;
            }
            else {
                sum = error({xnew: xi, xold: xl});
                xr = xi
            }
        
            outputTable.push({
                i: outputTable.length+1,
                XL: xl.toFixed(5),
                XR: xr.toFixed(5),
                X: xi.toFixed(8),
                Error: Math.abs(sum).toFixed(8)
            })
        } while (/**/ outputTable.length < 50 && Math.abs(sum) > 0.000001);

        setShowOutput(true);
        setShowGraph(true);
    }

    return (
        <div style={{ background: "#FFFF", padding: "30px" }}>
            <h2 style={{ color: "black", fontWeight: "bold" }}>False Position</h2>
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
                        <h3 style={{color:"white"}}>X<sub>L</sub></h3><Input size="middle" name="xl" onChange={(e) => {
                            setInput({
                                ...input,
                                XL: Number(e.target.value)
                            })
                        }}></Input>
                        <h3 style={{color:"white"}}>X<sub>R</sub></h3><Input size="middle" name="xr" onChange={(e) => {
                            setInput({
                                ...input,
                                XR: Number(e.target.value)
                            })
                        }}></Input><br /><br />
                        <Button block type="primary" id="submit_button" onClick={() => false_position()}>Submit</Button>
                    </Card>
                </div>
                <div className="col-6 offset-md-1">
                    {showGraph && <Graph fx={input.FX} title="False Position Method" />}
                </div>
            </div>
            <div className="row">
                <div className="col offset-md-1">
                {showOutput &&
                    <Table size='small' rowKey='i' pagination={{defaultPageSize: 5}} dataSource={outputTable} bordered>
                        {columns.map(column => {
                            return <Table.Column title={column.title} dataIndex={column.dataIndex} key={column.key} align='left' />
                        })}                     
                    </Table>
                }                    
                </div>
            </div>
        </div>
    );
}

export default FalsePosition;