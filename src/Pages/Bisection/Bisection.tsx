import React, { useState, ChangeEvent } from "react"
import { Button, Container, Form } from "react-bootstrap";
import { evaluate } from 'mathjs'
import { Table } from '@mantine/core'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    LogarithmicScale,
} from 'chart.js';
import { Line, Scatter } from 'react-chartjs-2';
import Plot from 'react-plotly.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

type Data = {
    iteration: number;
    XL: number;
    Xm: number;
    Xr: number;
    E: number;
};

const Bisection: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [valueIter, setValueIter] = useState<number[]>([]);
    const [valueXL, setValueXL] = useState<number[]>([]);
    const [valueXm, setValueXm] = useState<number[]>([]);
    const [valueXr, setValueXr] = useState<number[]>([]);
    const [valueE, setValueE] = useState<number[]>([]);
    const [showGraph, setshowGraph] = useState<boolean>(false);

    const [html, setHtml] = useState<JSX.Element | null>(null);
    const [Equation, setEquation] = useState<string>("(x^4)-13")
    const [X, setX] = useState<number>(0)
    const [XL, setXL] = useState<string>("0")
    const [XR, setXR] = useState<string>("0")
    const print = (): JSX.Element => {
        console.log(data);
        setValueIter(data.map((x) => x.iteration));
        setValueXL(data.map((x) => x.XL));
        setValueXm(data.map((x) => x.Xm));
        setValueXr(data.map((x) => x.Xr));
        setValueE(data.map((x) => x.E));
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Iteration</th>
                        <th>XL</th>
                        <th>XM</th>
                        <th>XR</th>
                        <th>Error</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((element, index) => {
                        return (
                            <tr key={index}>
                                <td>{element.iteration}</td>
                                <td>{element.XL}</td>
                                <td>{element.Xm}</td>
                                <td>{element.Xr}</td>
                                <td>{element.E}</td>
                            </tr>)
                    })}
                </tbody>
            </Table>
        );
    }

    const error = (xold: number, xnew: number) => Math.abs((xnew - xold) / xnew) * 100;

    const Calbisection = (xL: number, xr: number) => {
        let xm, fXm, fXr, ea, scope;
        let iter = 0;
        let MAX = 50;
        const e = 0.00001;
        let obj: Data = { iteration: 0, XL: 0, Xm: 0, Xr: 0, E: 100 };
        do {
            xm = (xL + xr) / 2.0;
            scope = {
                x: xr,
            }
            fXr = evaluate(Equation, scope)

            scope = {
                x: xm,
            }
            fXm = evaluate(Equation, scope)

            iter++;
            if (fXm * fXr > 0) {
                ea = error(xr, xm);
                obj = {
                    iteration: iter,
                    XL: xL,
                    Xm: xm,
                    Xr: xr,
                    E: ea
                }
                data.push(obj)
                xr = xm;
            }
            else {
                ea = error(xL, xm);
                obj = {
                    iteration: iter,
                    XL: xL,
                    Xm: xm,
                    Xr: xr,
                    E: ea
                }
                data.push(obj)
                xL = xm;
                console.log(data);
            }
        } while (ea > e && iter < MAX)
        setX(xm)
        setshowGraph(true)
    }

    const options = {
        scales: {
            xAxis: {
                display: false,
                grid: {
                    display: false,
                }
            },
            yAxis: {
                // display: false,
                // type: 'logarithmic',
                // type: 'logarithmic',
            //   ticks: {
            //     min: 0,
            //     max: 10000000000,
            //     callback: function(value: number, index: number, values: number) {
            //       return Number(value.toString());
            //     }
            //   }
            },
        },
        plugins: {
            legend: {
                display: false
            }
        }
    }

    const chartdata = {
        labels: valueIter,
        datasets: [
            {
                label: '',
                data: valueE,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    }

    const chart = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Chart.js Line Chart - Logarithmic'
                }
            },
            scales: {
                x: {
                    display: true,
                },
                y: {
                    display: true,
                    type: 'logarithmic',
                }
            }
        },
    };

    const inputEquation = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        console.log(input)
        setEquation(input)
    }

    const inputXL = (e: ChangeEvent<HTMLInputElement>) => {
        const inputXL = e.target.value;
        console.log(inputXL);
        setXL(inputXL);

    };


    const inputXR = (e: ChangeEvent<HTMLInputElement>) => {
        const inputXR = e.target.value;
        console.log(inputXR);
        setXR(inputXR);
    }

    const calculateRoot = () => {
        const xlnum = parseFloat(XL)
        const xrnum = parseFloat(XR)
        Calbisection(xlnum, xrnum);
        setHtml(print());

        console.log(valueIter)
        console.log(valueXL)
    }

    const resetPage = () => {

    }

    return (
        <Container style={{ background: '#ffbe0b' }}>
            <Form >
                <Form.Group className="mb-3">
                    <Form.Label>Input f(x)</Form.Label>
                    <input type="text" id="equation" value={Equation} onChange={inputEquation} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label>Input XL</Form.Label>
                    <input type="number" id="XL" onChange={inputXL} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                    <Form.Label>Input XR</Form.Label>
                    <input type="number" id="XR" onChange={inputXR} style={{ width: "20%", margin: "0 auto" }} className="form-control"></input>
                </Form.Group>
                <Button variant="dark" onClick={calculateRoot}>
                    Calculate
                </Button>
                <Button variant="dark" onClick={resetPage}>
                    Reset
                </Button>
            </Form>
            <br></br>
            <h5>Answer = {X.toPrecision(3)}</h5>
            {showGraph == true &&
                <Container>
                    {/* <Plot
                        data={[
                            {
                                x: valueIter,
                                y: valueE,
                                type: 'scatter',
                                // mode: 'lines+markers',
                                marker: { color: 'red' },
                            },
                        ]}
                        layout={
                            {
                                // width: 320,
                                // height: 240,
                                title: 'A Fancy Plot',
                                xaxis: { type: 'log' },
                                yaxis: { type: 'log' }
                            }
                        }
                    /> */}
                    <Line options={options} data={chartdata} {...LogarithmicScale} />
                    {/* <Plot data={chartdata} layout={options}/> */}
                    {html}
                </Container>
            }

        </Container>

    )
}

export default Bisection