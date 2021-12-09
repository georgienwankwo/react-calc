import { useState, React } from "react";
import styled from "styled-components";
import { create, all } from "mathjs";

const config = {
  epsilon: 1e-2,
  matrix: "Array",
  number: "number",
  precision: 64,
  predictable: false,
  randomSeed: null,
};
const math = create(all, config);

//

let Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em;
  height: 570px;
  width: 370px;
  min-width: 305px;
  max-width: 415px;
  max-height: 570px;
  margin: auto;
`;

let Main = styled.div`
  width: 100%;
  height: 100%;
  background-color: #e7eaff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`;

let CalcArea = styled.div`
  height: 100%;
  width: 100%;
  background-color: #fffbfe;
  border-radius: 45px 45px 0px 0px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1em 0em;
  overflow-y: auto;
  .adv-btn {
    box-shadow: 0px 4px 14px rgba(204, 204, 204, 0.25);
    color: #6b7cfe;
    background: #fff;
  }
  .basic-btn {
    background: #a3acff;
    color: #fff;
  }
  .express {
    background: #a3acff;
    color: #fff;
  }
  .btn-grow {
    width: 69%;
  }
  .btn-shrink {
    width: 12%;
  }
  .last-two {
    width: 90%;
    display: flex;
    justify-content: flex-end;
    Button {
      margin-bottom: 0em;
    }
  }
  .baseline-top {
    position: relative;
    left: 0;
  }
  span {
    position: relative;
    right: 0;
    top: -8px;
  }
`;

let Button = styled.button`
  width: 12%;
  height: 3em;
  border-radius: 10px;
  background-color: #ebebff;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.3em;
  padding: 0px;
  cursor: pointer;
  :hover {
    background-color: #b481ff;
    color: #fff;
    transition: 0.2s;
  }
`;

let CalcInput = styled.input`
  width: 90%;
  font-size: 1.8rem;
  text-align: right;
  font-weight: 400;
  margin-bottom: 0.7em;
  border: none;
  background: transparent;
  color: #8d62cd;
  :focus {
    outline: none;
  }
`;

let CalcDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2em 0em 0em 0em;
`;

let CalcExpression = styled.input`
  width: 90%;
  font-size: 1.4rem;
  font-weight: 100;
  text-align: right;
  border: none;
  background: transparent;
  color: #aaa4b3;
  :focus {
    outline: none;
  }
`;

const HintDiv = styled.div`
  height: auto;
  width: 100%;
  padding-right: 2em;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1em;
`;

const Hint = styled.p`
  width: 50%;
  font-size: 0.7rem;
  text-align: right;
`;
const CalcAreaCentre = styled.div`
  display: flex;
  justify-content: center;
`;

let hold = [];

function calc() {
  const [calcItems, setCalcItems] = useState("");
  const [answer, setAnswer] = useState(" ");
  const [hint, updateHint] = useState("");

  let tempCalcItems = (value) => {
    hold.push(value);
    let calcItemsNew = hold.join("");
    setCalcItems(calcItemsNew);
    if (calcItemsNew.includes("log")) {
      calcItemsNew = calcItemsNew.replace("log", "log10");
    } else if (calcItemsNew.includes("ln")) {
      calcItemsNew = calcItemsNew.replace("ln", "log");
    } else if (calcItemsNew.includes("√(")) {
      calcItemsNew = calcItemsNew.replace("√(", "sqrt(");
    } else if (calcItemsNew.includes("𝜋")) {
      calcItemsNew = calcItemsNew.replace("𝜋", "pi");
    } else if (calcItemsNew.includes("sin-1(")) {
      calcItemsNew = calcItemsNew.replace("sin-1", "asin");
    } else if (calcItemsNew.includes("cos-1(")) {
      calcItemsNew = calcItemsNew.replace("cos-1", "acos");
    } else if (calcItemsNew.includes("tan-1(")) {
      calcItemsNew = calcItemsNew.replace("tan-1", "atan");
    } else if (calcItemsNew.includes("×")) {
      calcItemsNew = calcItemsNew.replace("×", "*");
    } else if (calcItemsNew.includes("÷")) {
      calcItemsNew = calcItemsNew.replace("÷", "/");
    }
    setAnswer(math.evaluate(calcItemsNew));
  };

  const handleUpdate = (event) => {
    tempCalcItems(event.target.value);
  };

  let escapeCharacters = (event) => {
    hold = [];
    tempCalcItems(event.target.value);
  };

  const handleUpdateBasic = (event) => {
    tempCalcItems(event.target.value);
  };

  const handleExpression = () => {
    setCalcItems(answer);
    setAnswer("");
    hold = [answer];
  };

  const handleUpdatePi = (event) => {
    let newCalcItems = calcItems + event.target.value;
    setCalcItems(newCalcItems);
    setAnswer(math.evaluate("pi"));
  };

  const handleDeleteAll = () => {
    setCalcItems("");
    hold = [];
    setAnswer("");
  };

  let pushToStateDel = (event) => {
    event.target.value = "";
  };

  const handleDelete = (event) => {
    hold.pop();
    let popped = hold;
    popped = popped.join("");
    setCalcItems(popped);
    setAnswer("");
  };

  const handleAdvanced = (event) => {
    if (event.target.value == "sin(") {
      updateHint(
        "to use the sin function, the following format should be used: sin(value)"
      );
    } else if (event.target.value == "cos(") {
      updateHint(
        "to use the cos function, the following format should be used: cos(value)"
      );
    } else if (event.target.value == "tan(") {
      updateHint(
        "to use the tan function, the following format should be used: tan(value)"
      );
    } else if (event.target.value == "log(") {
      updateHint(
        "to use the log function, the following format should be used: log(value)"
      );
    } else if (event.target.value == "ln(") {
      updateHint(
        "to use the natural logarithm function, the following format should be used: ln(value)"
      );
    }
    setTimeout(() => {
      updateHint("");
    }, 6000);
    handleUpdate(event);
  };

  let CalcKeypressExpression = (value) => {
    setAnswer(math.evaluate(value));
  };

  let pushToState = (event) => {
    setCalcItems(event.target.value);
    CalcKeypressExpression(event.target.value);
  };

  return (
    <>
      <Body>
        <Main>
          <CalcDisplay>
            {/* <CalcInput defaultValue={calcItems} onChange={escapeCharacters} onKeyPress={keypresscheck}/> */}
            <CalcInput value={calcItems} />
            <CalcExpression value={answer} />
            <HintDiv>
              <Hint>
                <span>{hint}</span>
              </Hint>
            </HintDiv>
          </CalcDisplay>
          <CalcAreaCentre></CalcAreaCentre>
          <CalcArea>
            <Button
              className="adv-btn"
              value={"sin("}
              onClick={(handleUpdate, handleAdvanced)}
            >
              sin
            </Button>
            <Button
              className="adv-btn"
              value={"cos("}
              onClick={(handleUpdate, handleAdvanced)}
            >
              cos
            </Button>
            <Button
              className="adv-btn"
              value={"tan("}
              onClick={(handleUpdate, handleAdvanced)}
            >
              tan
            </Button>
            <Button
              className="adv-btn"
              value={"log("}
              onClick={(handleUpdate, handleAdvanced)}
            >
              log
            </Button>
            <Button
              className="adv-btn"
              value={"ln("}
              onClick={(handleUpdate, handleAdvanced)}
            >
              ln
            </Button>
            <Button className="adv-btn" value={"%"} onClick={handleUpdateBasic}>
              %
            </Button>
            <Button className="adv-btn" value={"^"} onClick={handleUpdate}>
              ^
            </Button>
            <Button className="adv-btn" value={"√("} onClick={handleUpdate}>
              √
            </Button>
            <Button className="adv-btn" value={"𝜋"} onClick={handleUpdate}>
              𝜋
            </Button>
            <Button
              className="adv-btn baseline-top"
              value={"sin-1("}
              onClick={handleUpdate}
            >
              sin <span>-1</span>
            </Button>
            <Button
              className="adv-btn baseline-top"
              value={"cos-1("}
              onClick={handleUpdate}
            >
              cos <span>-1</span>
            </Button>
            <Button
              className="adv-btn baseline-top"
              value={"tan-1"}
              onClick={handleUpdate}
            >
              tan <span>-1</span>
            </Button>
            <Button value={9} onClick={handleUpdate}>
              9
            </Button>
            <Button value={8} onClick={handleUpdate}>
              8
            </Button>
            <Button value={7} onClick={handleUpdate}>
              7
            </Button>
            <Button value={6} onClick={handleUpdate}>
              6
            </Button>
            <Button
              value={"AC"}
              onClick={handleDeleteAll}
              className="basic-arith"
            >
              AC
            </Button>
            <Button value={"del"} onClick={handleDelete} className="basic-btn">
              del
            </Button>
            <Button value={5} onClick={handleUpdate}>
              5
            </Button>
            <Button value={4} onClick={handleUpdate}>
              4
            </Button>
            <Button value={3} onClick={handleUpdate}>
              3
            </Button>
            <Button value={2} onClick={handleUpdate}>
              2
            </Button>
            <Button value={"("} onClick={handleUpdate} className="basic-btn">
              (
            </Button>
            <Button value={")"} onClick={handleUpdate} className="basic-btn">
              )
            </Button>
            <Button value={1} onClick={handleUpdate}>
              1
            </Button>
            <Button value={0} onClick={handleUpdate}>
              0
            </Button>
            <Button value={"."} onClick={handleUpdate}>
              .
            </Button>
            <Button
              className="basic-btn"
              value={"×"}
              onClick={handleUpdateBasic}
            >
              ×
            </Button>
            <Button
              className="basic-btn"
              value={"+"}
              onClick={handleUpdateBasic}
            >
              +
            </Button>
            <Button
              className="basic-btn"
              value={"-"}
              onClick={handleUpdateBasic}
            >
              -
            </Button>
            <Button
              value={"="}
              onClick={handleExpression}
              className="express btn-grow"
            >
              =
            </Button>
            <Button
              className="basic-btn btn-shrink"
              value={"÷"}
              onClick={handleUpdateBasic}
            >
              ÷
            </Button>
          </CalcArea>
        </Main>
      </Body>
    </>
  );
}

export default calc;
