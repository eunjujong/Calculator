import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import Title from "./components/Title";

import React, { useState } from "react";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "="],
];

const toLocalString = (num) => {
  return String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
};

const removeSpaces = (num) => (num ? num.toString().replace(/\s/g, "") : "");

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: "0",
    res: "0",
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
          calc.num === "0" && value === "0"
              ? "0"
              : calc.num === "0"
              ? value
              : toLocalString(Number(removeSpaces(calc.num + value))),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
  
    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;
        
      const numRes = parseFloat(removeSpaces(calc.res));
      const numCalc = parseFloat(removeSpaces(calc.num));
      
      setCalc({
        ...calc,
        res:
          calc.num === "0" && calc.sign === "/"
            ? "Can't divide by 0"
            : toLocalString(math(numRes, numCalc, calc.sign)),    
        num: "0",        
        sign: "",
      });
    } 
  };

  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? toLocalString(removeSpaces(calc.num) * -1) : 0,
      res: calc.res ? toLocalString(removeSpaces(calc.res) * -1) : 0,
      sign: "",
    });
  };

  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
    let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

    setCalc({
      ...calc,
      num: num / 100,
      res: res / 100,
      sign: "",
    });
  };

  const resetClickHandler = () => {
    setCalc({
      ...calc,
      num: 0,
      res: 0,
      sign: "",
    });
  };

  return (
    <div>
      <Title/>
      <Wrapper>
        <Screen value={calc.num !== "0" ? calc.num : calc.res} />
        <ButtonBox>
          {
            btnValues.flat().map((btn, i) => {
              return (
                <Button
                  key={i}
                  className={btn === "=" ? "equals" : ""}
                  value={btn}
                  onClick={
                    btn === "C"
                      ? resetClickHandler
                      : btn === "+-"
                      ? invertClickHandler
                      : btn === "%"
                      ? percentClickHandler
                      : btn === "="
                      ? equalsClickHandler
                      : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                      ? signClickHandler
                      : btn === "."
                      ? commaClickHandler
                      : numClickHandler
                  }
                />
              );
            })
          }
        </ButtonBox>
      </Wrapper>
    </div>
  );
}

export default App;
