import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import classes from "./app.module.css";

const { main, outputText, buttons, btnRow, calculatorBtn, calculatorBtnZero } = classes;

function App() {
    const [output, setOutput] = useState("0");

    function handleEqualClick() {
        return async () => {
            try {
                const result = (await invoke("calculator", { formula: output })) as number;
                setOutput(result.toString());
            } catch (error) {
                setOutput("Invalid Fromula!");
            }
        };
    }

    function handleNumberClick(number: string) {
        return () => setOutput(output == "Invalid Formula!" ? number : `${output}${number}`);
    }

    function handleSymbolClick(symbol: string) {
        return () => setOutput(output == "Invalid Formula!" ? "" : `${output} ${symbol}`);
    }

    function handleParenthesisClick() {
        // TODO: Add support for parenthesis
    }

    function handleClearClick() {
        return () => setOutput("");
    }

    return (
        <div className={main}>
            <div className={classes.output}>
                <span className={outputText}>{output}</span>
            </div>
            <div className={buttons}>
                <div className={btnRow}>
                    <button className={calculatorBtn} onClick={handleClearClick()}>AC</button>
                    <button className={calculatorBtn} onClick={handleParenthesisClick}>()</button>
                    <button className={calculatorBtn} onClick={handleSymbolClick("%")}>%</button>
                    <button className={calculatorBtn} onClick={handleSymbolClick("/")}>/</button>
                </div>
                <div className={btnRow}>
                    <button className={calculatorBtn} onClick={handleNumberClick("1")}>1</button>
                    <button className={calculatorBtn} onClick={handleNumberClick("2")}>2</button>
                    <button className={calculatorBtn} onClick={handleNumberClick("3")}>3</button>
                    <button className={calculatorBtn} onClick={handleSymbolClick("x")}>x</button>
                </div>
                <div className={btnRow}>
                    <button className={calculatorBtn} onClick={handleNumberClick("4")}>4</button>
                    <button className={calculatorBtn} onClick={handleNumberClick("5")}>5</button>
                    <button className={calculatorBtn} onClick={handleNumberClick("6")}>6</button>
                    <button className={calculatorBtn} onClick={handleSymbolClick("-")}>-</button>
                </div>
                <div className={btnRow}>
                    <button className={calculatorBtn} onClick={handleNumberClick("7")}>7</button>
                    <button className={calculatorBtn} onClick={handleNumberClick("8")}>8</button>
                    <button className={calculatorBtn} onClick={handleNumberClick("9")}>9</button>
                    <button className={calculatorBtn} onClick={handleSymbolClick("+")}>+</button>
                </div>
                <div className={btnRow}>
                    <button className={calculatorBtnZero}>0</button>
                    <button className={calculatorBtn}>.</button>
                    <button className={calculatorBtn} onClick={handleEqualClick}>
                        =
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;
