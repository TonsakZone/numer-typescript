import React, { useState, FormEvent, ChangeEvent } from "react"
import { sum, multiply, inv, add } from "mathjs";
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './LinearRegression.css'
import Plot from 'react-plotly.js'
import { Link } from "react-router-dom";
import axios from "axios";

interface Option {
    value: string;
    // label: string;
}

const LinearRegression: React.FC = () => {
    const [X, setX] = useState<number>(0)
    const [N, setN] = useState<number>(0)
    const [showGraph, setshowGraph] = useState<boolean>(false);
    const [NSize, setNSize] = useState<number>(2);
    const [Ans, setAns] = useState<number[]>([]);
    const [FinalAns, setFinalAns] = useState<any>(null);
    const [FinalGraph, setFinalGraph] = useState<number[]>([])
    const [AX, setAX] = useState<number[]>([]);
    const [AY, setAY] = useState<number[]>([]);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [Authorization, setAuthorization] = useState<string>('');
    const [Matrix, setMatrix] = useState<number[][]>(
        Array(NSize)
            .fill(null)
            .map(() => Array(2).fill(null))
    );
    // let answerArr: number[]=[];

    const print = (e: ChangeEvent<HTMLInputElement>, row: number, col: number): JSX.Element => {
        const value = parseFloat(e.target.value);
        setMatrix(Matrix.map((rowValues, i) =>
            i === row ? rowValues.map((colValue, j) =>
                j === col ? value : colValue
            ) : rowValues
        ));
        return (
            <div style={{ "display": "flex" }}>
                <table>
                    <tbody>
                        {Matrix.map((row, i) =>
                            <tr key={i}>
                                {row.map((value, j) =>
                                    <td key={j}>
                                        <input type="number" step="0.01" value={value} onChange={event => print(event, i, j)} className="matrixtable" />
                                    </td>
                                )
                                }
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        );
    };

    // const print_example = ( row: number, col: number): JSX.Element => {
    //     return (
    //         setMatrix(Matrix.map((rowValues, i) =>
    //         i === row ? rowValues.map((colValue, j) =>
    //             j === col ? value : colValue
    //         ) : rowValues
    //     ));

    //     )
    // }

    const inputN = (e: ChangeEvent<HTMLInputElement>) => {
        const n = parseInt(e.target.value);
        setN(n)
        if (n > 0) {
            setNSize(n);
            setMatrix(Array(n).fill(null).map(() => Array(2).fill(null)));
        } else {
            alert("N value must more than 1");
        }
    }

    const calculate = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setAns([]);
        setN(Matrix.length);
        setFinalAns([]);
        setFinalGraph([]);
        let answerArr = [];

        if (N < 0) {
            alert("N value must more than 1");
        } else {
            setX(e.currentTarget.x.value)
            console.log(X);
            let arr_x = []
            let arr_y = []
            let arr_ans = []
            let A = []
            let B = []

            for (let i = 0; i < Matrix.length; i++) {
                arr_x.push(Matrix[i][0])
                arr_y.push(Matrix[i][1])
            }
            setAX(arr_x);
            setAY(arr_y);
            console.log("arr_X");
            console.log(arr_x);
            console.log("arr_Y");
            console.log(arr_y);

            let sumX = sum(arr_x);
            let sumY = sum(arr_y);
            let sumXPower = 0;
            let sumXY = 0;

            for (let i = 0; i < NSize; i++) {
                sumXPower += Math.pow(arr_x[i], 2);
                sumXY += (arr_x[i] * arr_y[i]);
            }

            let top = [N, sumX]
            let bottom = [sumX, sumXPower]
            let answer = []
            A.push(top);
            A.push(bottom);
            top = [sumY]
            bottom = [sumXY]
            B.push(top);
            B.push(bottom);

            arr_ans = multiply(inv(A), B)
            console.log(arr_ans);
            setAns(arr_ans);
            let back = multiply(arr_ans[1], X)
            let front = add(arr_ans[0], back)
            setFinalGraph(front);

            console.log(front);

            for (let i = 0; i < NSize; i++) {
                back = multiply(arr_ans[1], arr_x[i])
                front = add(arr_ans[0], back)
                console.log(front);
                answerArr.push(...front);
            }
            setAns(front);
            console.log(answerArr)
            setFinalAns(answerArr)
            console.log(front);
            setshowGraph(true)
        }
    }

    const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        console.log(selectedValue);
        
        if(selectedValue == 'empty') {
            alert("Value cannot be empty");
        }

        // const selectedLabel = e.target.selectedOptions[0].label;
        // console.log(selectedLabel);
        console.log(selectedValue);
        console.log(Authorization);
        setSelectedOption({ value: selectedValue });

        // Make axios.post request to API endpoint with selected value
        axios.post('http://localhost:5000/methods',{pages: 'linearregressions', Equation: selectedValue}, {headers: {authorization: `${Authorization}`}})
            .then(response => {
                const inputN = document.getElementById('n-input') as HTMLInputElement;
                const inputX = document.getElementById('x-input') as HTMLInputElement;
                const inputMat = document.getElementById('met-input') as HTMLInputElement;
                inputN.value = response.data.NSize;
                inputX.value = response.data.Xval;
                inputMat.value = response.data.Matrix
                // inputXr.value = response.data[0].XR;
                console.log(response.data.Matrix);
                // setMatrixData(response.data[0].Matrix);                
                setNSize(response.data.NSize);
                // setMatrix(Array(response.data[0].NSize).fill(null).map(() => Array(2).fill(null)));
                setMatrix(response.data.Matrix)

                // print_example()
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="lr">
            <div className="container lr-input" style={{ margin: "2vh 2vw", padding: "20px" }}>
            <u><h4><b>Linear Regression</b></h4></u>
                    <h5><b>Please fill the input below</b></h5>
            <div>
                <label htmlFor="my-select">Select an example: &nbsp;</label>
                    <select id="my-select" value={selectedOption?.value} onChange={handleOptionChange}>
                        <option value="empty"></option>
                        <option value="option1">X=65, N=9</option>
                        <option value="option2">X=25, N=6</option>
                    </select>
                </div>
                <form style={{ width: "20vw" }} onSubmit={(e) => calculate(e)}>
                    <label>&nbsp; Enter N</label>
                    <br />
                    <input
                        required
                        id="n-input"
                        type="number"
                        name="n"
                        className="form-control"
                        placeholder="Enter N"
                        style={{ borderRadius: "5px" }}
                        onChange={inputN}
                        value={NSize}
                        // defaultValue={3} 
                    />
                    <br />
                    <label>&nbsp; Enter X</label>
                    <br />
                    <input
                        required
                        id="x-input"
                        type="number"
                        name="x"
                        className="form-control"
                        placeholder="Enter X"
                        style={{ borderRadius: "5px" }}
                         />
                    <br />
                    <label>&nbsp; Enter numbers</label>
                    <div>
                        <table id="met-table">
                            <tbody>
                                {Matrix.map((row, i) =>
                                    <tr key={i} style={{ "padding": "5px" }}>
                                        {row.map((value, j) =>
                                            <td key={j} style={{ "padding": "5px" }}>
                                                <input type="number" step='0.01' className="form-control" value={value} placeholder={j == NSize ? "B" + (i + 1) : "A" + (i + 1) + (j + 1)} onChange={event => print(event, i, j)} id="met-input" />
                                            </td>
                                        )}
                                    </tr>
                                )}
                            </tbody>
                        </table>
                       
                    </div>
                    <div className="lr-child">
                        <div>
                            <button className="btn btn-primary btn-block" id="btn-submit" style={{ backgroundColor: "#ad2e24", borderColor: "#540804", marginBottom: "10px" }} type="submit">Calculate</button>
                        </div>
                        <div>
                            <button className="btn btn-primary btn-block" id="btn-load" style={{ backgroundColor: "#000000", borderColor: "#000000", marginBottom: "10px" }}><Link to="/solutiontechnique">Back</Link></button>
                        </div>
                        
                    </div>
                </form>
            </div>
            <div>
                {showGraph === true &&
                    <div>
                        <div className="container lr-answer" style={{ margin: "2vh 2vw", padding: "10px 20px", border: "3px solid #ea8c55", borderRadius: "8px" }}>
                            <div>
                                <h4><u><b>Input N: {N}</b></u></h4>
                                <h4><u><b>Input X: {X}</b></u></h4>
                            </div>
                            <div>
                                <h4><u><b>Result</b></u></h4>
                                <h5 style={{ color: "white" }}><b>Answer = {FinalGraph}</b></h5>
                            </div>
                        </div>
                        <div style={{ margin: "2vh 2vw", padding: "20px", border: "2px solid #c75146", borderRadius: "8px" }}>
                            <h4><u><b>Linear Regression graph</b></u></h4>
                            <Plot
                                data={[
                                    {
                                        x: AX,
                                        y: AY,
                                        type: 'scatter',
                                        mode: 'markers',
                                        marker: { color: 'orange' },
                                        name: 'dataline'
                                    },

                                    { type: 'scatter', mode: 'markers', marker: { color: 'red' }, name: 'CalValue', x: [X], y: FinalGraph },
                                    {
                                        x: AX,
                                        y: FinalAns,
                                        type: 'scatter',
                                        mode: 'lines+markers',
                                        marker: { color: 'blue' },
                                        name: 'Linear line'
                                    },
                                ]}
                                layout={{ width: 720, height: 500 }}
                            />
                        </div>
                        
                    </div>
                }
            </div>
        </div>
    )
}

export default LinearRegression;
