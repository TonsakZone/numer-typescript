import React, { useState, FormEvent, ChangeEvent } from "react"
import { det, multiply } from 'mathjs'
import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Cramer.css'
import { Table } from '@mantine/core'
import { Link } from "react-router-dom";

type Data = {
  iteration: number;
  ans: number;
};

type FinalAnswer = {
  det: number;
}

const Cramer: React.FC = () => {
  const [data, setData] = useState<Data[]>([]);
  const [valueIter, setValueIter] = useState<number[]>([]);
  const [showGraph, setshowGraph] = useState<boolean>(false);
  const [html, setHtml] = useState<JSX.Element | null>(null);
  const [html2, setHtml2] = useState<JSX.Element | null>(null);
  const [Ans, setAns] = useState<number[]>([]);
  const [D, setD] = useState<number[]>([]);
  const [FinalAns, setFinalAns] = useState<FinalAnswer[]>([]);
  const [TestAns, setTestAns] = useState<number[]>([]);
  const [N, setN] = useState<number>(0);
  const [A, setA] = useState<number>(0);
  const [Aiter, setAiter] = useState<number[]>([]);
  const [NSize, setNSize] = useState<number>(2)
  const [Matrix, setMatrix] = useState<number[][]>(
    Array(NSize)
      .fill(null)
      .map(() => Array<number>(NSize + 1).fill(0))
  );

  const printAns = (): JSX.Element => {
    console.log(data);
    setValueIter(data.map((x) => x.iteration));
    setAns(data.map((x) => x.ans));
    return (
      <Table>
        <thead>
          <tr>
            <th>X</th>
            <th>Answer det</th>
          </tr>
        </thead>
        <tbody>
          {data.map((element, index) => {
            return (
              <tr key={index}>
                <td>{element.iteration}</td>
                <td>{element.ans}</td>
              </tr>)
          })}
        </tbody>
      </Table>
    );
  }

  const setDet = (): JSX.Element => {
    setD(FinalAns.map((x) => x.det))
    return (
      <div>
        {FinalAns.map((element, index) => {
        return (
            <tr key={index}>
                <p>Det{index+1} &nbsp;</p>

                <td>{element.det}</td>
            </tr>)
    })}
      </div>
      
    )
  }

  const print = (e: ChangeEvent<HTMLInputElement>, row: number, col: number): JSX.Element => {
    const value = parseInt(e.target.value);
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
                    <input type="number" value={value} onChange={event => print(event, i, j)} className="matrixtable" />
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

  const inputN = (e: ChangeEvent<HTMLInputElement>) => {
    const n = parseInt(e.target.value);
    setN(n)
    if (n >= 2 && n < 20) {
      setNSize(n);
      setMatrix(Array(n).fill(null).map(() => Array(n + 1).fill(0)));
    } else {
      alert("N value must more than 1 and must not exceed 5");
    }
  }

  const calculate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValueIter([]);
    setAns([]);
    setData([]);
    setFinalAns([]);
    setN(Matrix.length);

    let arr_group_row = [];
    let arr_A = [];
    let arr_det = [];
    let Cramer_Answer = [];
    let answer = [];
    let test = [];
    var replace = 0;
    let obj: Data = { iteration: 0, ans: 0 };
    let obj1: FinalAnswer = { det: 0 }

    console.log(Matrix);
    for (var l = 0; l < Matrix.length; l++) {
      for (var r = 0; r < Matrix.length; r++) {
        arr_group_row.push(Matrix[l][r]);
      }
      console.log("grouppp : " + arr_group_row)
      arr_A.push(arr_group_row);
      arr_group_row = [];
    }
    console.log("arr_A");
    console.log(arr_A);

    for (var a = 0; a < Matrix.length; a++) {
      for (var l = 0; l < Matrix.length; l++) {
        for (var r = 0; r < Matrix.length; r++) {
          if (r == replace) {
            arr_group_row.push(Matrix[l][Matrix.length]);
          } else {
            arr_group_row.push(Matrix[l][r]);
          }

        }
        console.log("group det : ");
        console.log(arr_group_row);
        arr_det.push(arr_group_row);
        arr_group_row = [];
      }
      console.log("array det");
      console.log(arr_det);
      var up = det(arr_det);
      var down = det(arr_A);
      setA(down)
      var dett = up / down;
      // answer.push(dett);
      // setFinalAns(answer);
      test.push(dett*down);
      setTestAns(test);
      Cramer_Answer.push(dett);
      // setAiter([dett]);
      // answer.push(multiply(dett,det(arr_A)))
      // setFinalAns(answer)
      obj1 = {
        det: det(arr_det)
      }
      FinalAns.push(obj1)
      replace++;
      arr_det = [];
      obj = {
        iteration: replace,
        ans: dett,
      };
      data.push(obj);

    }
    console.log("Cramer_Answer : ");
    console.log(Cramer_Answer);

    setshowGraph(true);
    setAns(Cramer_Answer);
    setHtml(printAns());
    setHtml2(setDet());
  }


  // setAns(data.map((x) => x.ans));
  return (
    <div className="cramer">
      <div className="container cramer-input" style={{ margin: "2vh 2vw", padding: "20px" }}>
        <form style={{ width: "20vw" }} onSubmit={(e) => calculate(e)}>
          <u><h4><b>Cramer's Rule</b></h4></u>
          <h5><b>Please fill the input below</b></h5>
          <label>&nbsp; N value</label>
          <br />
          <input
            required
            disabled
            type="number"
            name="n"
            className="form-control"
            placeholder="Enter N"
            style={{ borderRadius: "5px" }}
            onChange={inputN}
            value={NSize}
            defaultValue={3} />
          <br />
          <div>
            <table id="met-table">
              <tbody>
                {Matrix.map((row, i) =>
                  <tr key={i} style={{"padding":"5px"}}>

                    {row.map((value, j) =>
                      <td key={j} style={{"padding":"5px"}}>
                        <input type="number" step='0.01' className="form-control" placeholder={j == NSize ? "B" + (i + 1) : "A" + (i + 1) + (j + 1)} onChange={event => print(event, i, j)} id="met-input" />
                      </td>
                    )}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="cramer-child">
            <div>
              <button className="btn btn-primary btn-block" id="btn-submit" style={{ backgroundColor: "#ad2e24", borderColor: "#540804", marginBottom: "10px" }} type="submit">Calculate</button>
            </div>
            <div>
              <button disabled className="btn btn-primary btn-block" id="btn-load" style={{ backgroundColor: "#ea8c55", borderColor: "#ffbe0b", marginBottom: "10px" }} onClick={() => { }}>Example</button>
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
            <div className="container cramer-answer" style={{ margin: "2vh 2vw", padding: "10px 20px", border: "3px solid #ea8c55", borderRadius: "8px" }}>
              <div>
                <h4><u><b>Input N: {N}</b></u></h4>
              </div>
              <div>
                <h4><u><b>Result</b></u></h4>
                <h5 style={{ color: "white" }}><b>detA = {A}</b></h5>
                
                {/* <h5 style={{ color: "white" }}><b>detA1 = {Aiter[0]}</b></h5>
                <h5 style={{ color: "white" }}><b>detA2 = {Aiter[1]}</b></h5> */}
                {html2}
                {/* <h5 style={{ color: "white" }}><b>X1*detA = {FinalAns[0]}</b></h5>
                <h5 style={{ color: "white" }}><b>X2*detA = {FinalAns[1]}</b></h5> */}
              </div>
            </div>
            <div className="container cramer-table" style={{ margin: "2vh 1vw", padding: "20px", border: "2px solid #c75146", borderRadius: "8px" }}>
              <h4><u><b>Calculate values</b></u></h4>
              {html}
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Cramer;