import { useState, useEffect } from "react";
import GrayBtn from "../../components/calculator/GrayBtn";
import ColorBtn from "../../components/calculator/ColorBtn";
import DarkBtn from "../../components/calculator/DarkBtn";
import NavBar from "../../components/NavBar/NavBar";

export default function Calculator() {
	const [firstNum, setFirstNum] = useState("");
	const [secondNum, setSecondNum] = useState("");
	const [total, setTotal] = useState("");
	const [operator, setOperator] = useState("");

	function clear() {
		setTotal("");
		setFirstNum("");
		setSecondNum("");
		setOperator("");
	}

	function backSpace() {
		var num1: string = firstNum;
		var num2: string = secondNum;
		if (secondNum !== "")
			setSecondNum((num2 = secondNum.substring(0, secondNum.length - 1)));
		else if (operator !== "") setOperator("");
		else if (firstNum !== "")
			setFirstNum((num1 = firstNum.substring(0, firstNum.length - 1)));

		if (num1 === "") setTotal("");

		updateTotal(num1, num2);
	}

	function appendNum(num: string) {
		var num1: string = firstNum;
		var num2: string = secondNum;
		if (operator === "") num1 = firstNum + num;
		else num2 = secondNum + num;

		setFirstNum(num1);
		setSecondNum(num2);
		updateTotal(num1, num2);
	}

	function handleOperator(op: string) {
		var num1: string = firstNum;
		var num2: string = secondNum;
		if (secondNum !== "") {
			if (op === "+/-") num2 = String(Number(secondNum) * -1);
			else if (op === "%") num2 = String(Number(secondNum) / 100);
		} else if (firstNum !== "") {
			if (op === "+/-") num1 = String(Number(firstNum) * -1);
			else if (op === "%") num1 = String(Number(firstNum) / 100);
		} else if (total !== "") {
			setFirstNum((num1 = total));
		}

		update(num1, num2, op);
	}

	function update(num1: string, num2: string, op: string) {
		updateTotal(num1, num2);
		if (op === "/" || op === "x" || op === "-" || op === "+") {
			if (num2 !== "") {
				setFirstNum(combineNumsWithOp(num1, num2));
				setSecondNum("");
			}

			setOperator(op);
		} else if (op === "=") {
			setFirstNum("");
			setSecondNum("");
			setOperator("");
		} else {
			setFirstNum(num1);
			setSecondNum(num2);
			if (op !== "+/-" && op !== "%") setOperator("");
		}
	}

	function updateTotal(num1: string, num2: string) {
		if (num2 !== "") setTotal(combineNumsWithOp(num1, num2));
		else if (num1 !== "") setTotal(num1);
	}

	function combineNumsWithOp(num1: string, num2: string) {
		var result: string = "";
		if (operator === "/") result = String(Number(num1) / Number(num2));
		else if (operator === "x") result = String(Number(num1) * Number(num2));
		else if (operator === "-") result = String(Number(num1) - Number(num2));
		else if (operator === "+") result = String(Number(num1) + Number(num2));

		return result;
	}

	return (
		<>
			<NavBar />
			<div className="bg-gray-900 flex">
				<div className="w-96 overflow-hidden mx-auto mt-10 mb-auto shadow-lg bg-gray-900 border rounded-lg">
					<div>
						<div className="p-5 text-white text-center text-3xl">
							Calculator
						</div>
						<div className=" p-5 pb-0 h-12 bg-slate-800 text-white text-right text-3xl">
							{firstNum} {operator} {secondNum}
						</div>
						<div className="p-5 text-white bg-slate-800 text-right text-3xl">
							= {total}
						</div>

						<div className="flex items-stretch h-24">
							<GrayBtn action={clear} text="C" />
							<GrayBtn action={handleOperator} text="+/-" />
							<GrayBtn action={handleOperator} text="%" />
							<ColorBtn action={handleOperator} text="/" />
						</div>

						<div className="flex items-stretch h-24">
							<DarkBtn action={appendNum} text="7" />
							<DarkBtn action={appendNum} text="8" />
							<DarkBtn action={appendNum} text="9" />
							<ColorBtn action={handleOperator} text="x" />
						</div>

						<div className="flex items-stretch h-24">
							<DarkBtn action={appendNum} text="4" />
							<DarkBtn action={appendNum} text="5" />
							<DarkBtn action={appendNum} text="6" />
							<ColorBtn action={handleOperator} text="-" />
						</div>

						<div className="flex items-stretch h-24">
							<DarkBtn action={appendNum} text="1" />
							<DarkBtn action={appendNum} text="2" />
							<DarkBtn action={appendNum} text="3" />
							<ColorBtn action={handleOperator} text="+" />
						</div>

						<div className="flex items-stretch h-24 mb-4">
							<DarkBtn action={backSpace} text="<--" />
							<DarkBtn action={appendNum} text="0" />
							<DarkBtn action={appendNum} text="." />
							<ColorBtn action={handleOperator} text="=" />
						</div>
					</div>
				</div>
				<div className="h-screen" />
			</div>
		</>
	);
}
