import './calculator.css'
import { useState } from 'react'

export default function Calculator() {

    const [currentValue, setCurrentValue] = useState("0")
    const [peddingOperation, setPeddingOperation] = useState<any>(null)
    const [pedingValue, setPeddingValue] = useState<any>(null)
    const [completeOperation, setCompleteOperation] = useState("")



    const keyPadNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
    const operations = ["+", "-", "*", "/"]


    function  handleClick(value: string){
        if (value === "AC"){
            setCurrentValue("0")
            setPeddingOperation(null)
            setPeddingValue(null)
            setCompleteOperation("")
            return
        }

        setCurrentValue(preValues => {
            if (preValues === "0"){
                return value
            }
            return preValues + value
        })

        setCompleteOperation(prevOperation => prevOperation + value)
    }

   function  handleoperation(operation: any){
        setCompleteOperation(currentValue + " " + operation)
        setPeddingOperation(operation)
        setPeddingValue(currentValue)
        setCurrentValue("0")
   }

   function handleCalculate(){
    if(!pedingValue || !peddingOperation){
        return
    }

    const num1 = Number(pedingValue)
    const num2 = Number(currentValue)

    let result = 0

    switch (peddingOperation) {
        case "+":
            result = num1 + num2
            break
        case "-":
            result = num1 - num2
            break
        case "*":
            result = num1 * num2
            break
        case "/":
            if (num2 === 0){
                setCompleteOperation("Error: Divisão por zero")
                setCurrentValue("0")
                setPeddingOperation(null)
                setPeddingValue(null)
                return
            }
            result = num1 / num2
            break
        default:
            break
    }
    
    setCompleteOperation(pedingValue + " " + peddingOperation + " " + currentValue + " = " + result)
    setCurrentValue(result.toString());
    setPeddingOperation(null)
    setPeddingValue(null)

   }


    return (
        <>
            <div className='calculator'>
                <div className="complete-operation">{completeOperation}</div>
                <div className="display">{currentValue}</div>
                <div className="buttons">
                    <button className="ac" onClick={() => handleClick("AC")}>AC</button>
                    {keyPadNumbers.map((number) => (
                        <button key={number} className="number" onClick={() => handleClick(number)}>{number}</button>
                    ))}
                    {
                        operations.map((operation) => (
                            <button key={operation} onClick={() => handleoperation(operation)} className="operation">{operation}</button>
                        ))
                    }
                    <button onClick={() => handleCalculate()} className="operation">=</button>
                </div>
                
            </div>
        </>
    )
}