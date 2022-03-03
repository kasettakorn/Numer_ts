import React, { useState } from 'react'
import { Card, Input, Button, Table } from 'antd';
import 'antd/dist/antd.css';
import { error, func } from '../../services';
import Graph from '../../components/Graph.component';

interface IInput {
    fx: string | math.MathExpression,
    xl: Number | string,
    xr: Number | string
}

interface HandleChangeInterface {
    target: HTMLInputElement;
  }

function Bisection()  {
    const [input, setInput] = useState<IInput | null>(null);
    const [showOutput, setShowOutput] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    
    const bisection = (x1 : Number, x2 : Number) => {
        // var increaseFunction = false;
        // var xm = 0;
        // var sum = 0;
        // var n = 0;
        // var data : any
        // data['xl'] = []
        // data['xr'] = []
        // data['x'] = []
        // data['error'] = []
        // if (func(fx, xl) < func(this.state.fx, xr)) {
        //     increaseFunction = true;
        // }

        // do {
        //     xm = (xl + xr) / 2;
        //     if (func(this.state.fx, xm) * func(this.state.fx, xr) < 0) {
        //         sum = error(xm, xr);
        //         if (increaseFunction) {
        //             xl = xm;
        //         }
        //         else {
        //             xr = xm;
        //         }

        //     }
        //     else {
        //         sum = error(xm, xl);
        //         if (increaseFunction) {
        //             xr = xm;
        //         }
        //         else {
        //             xl = xm;
        //         }
        //     }
        //     data['xl'][n] = xl;
        //     data['xr'][n] = xr;
        //     data['x'][n] = xm.toFixed(8);
        //     data['error'][n] = Math.abs(sum).toFixed(8);
        //     n++;
        // } while (Math.abs(sum) > 0.000001);
        // this.createTable(data['xl'], data['xr'], data['x'], data['error']);
        // this.setState({
        //     showOutputCard: true,
        //     showGraph: true,

        // })
        setShowOutput(true);
        setShowGraph(true);


    }

    return (
        <div style={{ background: "#FFFF", padding: "30px" }}>
            <h2 style={{ color: "black", fontWeight: "bold" }}>Bisection</h2>
            <div className="row">
                <div className="col-4">
                    <Card
                        bordered={true}
                        style={{ background: "black", color: "#FFFFFFFF" }}
                     
                        id="inputCard"
                    >
                        <h3 style={{color:"white"}}>f(x)</h3><Input size="large" name="fx"></Input>
                        <h3 style={{color:"white"}}>X<sub>L</sub></h3><Input size="large" name="xl" ></Input>
                        <h3 style={{color:"white"}}>X<sub>R</sub></h3><Input size="large" name="xr" ></Input><br /><br />
                        <Button block type="primary" id="submit_button" onClick={() => bisection(1.5, 2)}>Submit</Button>
                    </Card>
                </div>
                <div className="col">
                    {showGraph && <Graph fx={"x^4-13"} title="Bisection Method" />}
                </div>
            </div>
            <div className="row">
                {showOutput &&
                    <Card
                        title={"Output"}
                        bordered={true}
                        id="outputCard"
                    >
                        {/* <Table pagination={{defaultPageSize: 5}} columns={columns} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}></Table> */}
                    </Card>
                }
            </div>
        </div>

    );
}

export default Bisection;