import { invoke } from "@tauri-apps/api/tauri";
import { useState } from "react";
import classes from "./app.module.css";

const { main, outputText, buttons, btnRow, calculatorBtn, calculatorBtnZero } = classes;
const opSymbols = ["+", "-", "*", "/"];

function App() {
    const [output, setOutput] = useState("0");

    async function handleEqualClick() {
        try {
            const result: number = await invoke("calculate", { formula: output });
            setOutput(result.toString());
        } catch (error) {
            setOutput("Invalid Formula!");
        }
    }

    function handleDeleteLast() {
        return () => setOutput(output.length > 1 ? output.substring(0, output.length - 1).trimEnd() : "0");
    }

    function handleNumberClick(number: string) {
        return () => {
            if (output == "0" && number == "0") return;
            if (output == "0" && number != "0") {
                setOutput(number);
                return;
            }
            if (opSymbols.includes(output[outputLenghtSafe()])) {
                setOutput(output == "Invalid Formula!" ? number : `${output} ${number}`);
                return;
            }
            setOutput(output == "Invalid Formula!" ? number : `${output}${number}`);
        };
    }

    function handleSymbolClick(symbol: string) {
        return () => {
            if (["/", "+", "-", "x"].includes(output[output.length - 1])) {
                setOutput(`${output.substring(0, output.length - 1)} ${symbol}`);
                return;
            }
            setOutput(output == "Invalid Formula!" ? "" : `${output} ${symbol}`);
        };
    }

    function handleParenthesisClick() {
        // TODO: Add support for parenthesis
    }

    function handleClearClick() {
        return () => setOutput("0");
    }

    return (
        <div className={main}>
            <div className={classes.output}>
                <span className={outputText}>{output}</span>
            </div>
            <div className={buttons}>
                <div className={btnRow}>
                    <button className={calculatorBtn} onClick={handleClearClick()}>
                        AC
                    </button>
                    <button className={calculatorBtn} onClick={handleParenthesisClick}>
                        ()
                    </button>
                    <button className={calculatorBtn} onClick={handleDeleteLast()}>
                        ◁
                    </button>
                    <button className={calculatorBtn} onClick={handleSymbolClick("/")}>
                        /
                    </button>
                </div>
                <div className={btnRow}>
                    <button className={calculatorBtn} onClick={handleNumberClick("1")}>
                        1
                    </button>
                    <button className={calculatorBtn} onClick={handleNumberClick("2")}>
                        2
                    </button>
                    <button className={calculatorBtn} onClick={handleNumberClick("3")}>
                        3
                    </button>
                    <button className={calculatorBtn} onClick={handleSymbolClick("x")}>
                        x
                    </button>
                </div>
                <div className={btnRow}>
                    <button className={calculatorBtn} onClick={handleNumberClick("4")}>
                        4
                    </button>
                    <button className={calculatorBtn} onClick={handleNumberClick("5")}>
                        5
                    </button>
                    <button className={calculatorBtn} onClick={handleNumberClick("6")}>
                        6
                    </button>
                    <button className={calculatorBtn} onClick={handleSymbolClick("-")}>
                        -
                    </button>
                </div>
                <div className={btnRow}>
                    <button className={calculatorBtn} onClick={handleNumberClick("7")}>
                        7
                    </button>
                    <button className={calculatorBtn} onClick={handleNumberClick("8")}>
                        8
                    </button>
                    <button className={calculatorBtn} onClick={handleNumberClick("9")}>
                        9
                    </button>
                    <button className={calculatorBtn} onClick={handleSymbolClick("+")}>
                        +
                    </button>
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
