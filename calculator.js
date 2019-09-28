console.log("hello eric");

let calculator = document.getElementById("calculator");

let numericPercentages = [];

function getPercentages() {
    let numerators = calculator.getElementsByClassName("numerator");
    let denominators = calculator.getElementsByClassName("denominator");
    let percentages = calculator.getElementsByClassName("percent");
    let numRows = calculator.rows.length - 1;

    numericPercentages.length = 0;

    for(let i = 0; i < numRows; i++) {
        let numerator = numerators[i].value;
        let denominator = denominators[i].value;

        let grade = "";

        if(numerator.length !== 0 && denominator.length !== 0) {
            numerator = parseFloat(numerator);
            denominator = parseFloat(denominator);

            if(isNaN(numerator) || isNaN(denominator)) {
                grade = "Invalid input";
            } else if(denominator <= 0) {
                grade = "Denominator must be positive and nonzero";
            } else {
                grade = 100 * numerator / denominator;
                numericPercentages.push(grade);
                grade = grade.toFixed(2) + "%";
            }
        }

        percentages[i].innerText = grade;
    }
}

function getMean() {
    let numRows = calculator.rows.length - 1;

    let average = "Invalid percentages to calculate mean";
    if(numericPercentages.length === numRows) {
        let total = numericPercentages.reduce(function(total, element) {
            return total + element;
        }, 0);

        average = total / numRows;
        average = average.toFixed(2) + "%";
    }

    document.getElementById("result").innerText = average;
}

function getWeighted() {
    let weights = calculator.getElementsByClassName("weight");
    let numRows = calculator.rows.length - 1;

    let average = "Invalid weights or percentages to calculate mean";
    if(numericPercentages.length === numRows) {
        let valid = true;
        let total = 0;
        let totalWeights = 0;

        for(let i = 0; i < numRows; i++) {
            let weight = parseFloat(weights[i].value);

            if(isNaN(weight)) {
                valid = false;
                break;
            } else if(weight < 0) {
                average = "Weights cannot be negative";
            } else {
                total += numericPercentages[i] * weight;
                totalWeights += weight;
            }
        }

        if(valid) {
            average = total / totalWeights;
            average = average.toFixed(2) + "%";
        }

    }

    document.getElementById("result").innerText = average;
}

function addRow() {
    let row = calculator.rows[1];
    let clone = row.cloneNode(true);
    let newRow = calculator.appendChild(clone);

    let activityName = newRow.getElementsByClassName("activity_name")[0];
    activityName.innerText = "Activity " + (calculator.rows.length - 1);
    let shortName = newRow.getElementsByClassName("short_name")[0];
    shortName.innerText = "A" + (calculator.rows.length - 1);

    let inputs = newRow.getElementsByTagName("input");
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

    getPercentages();
}

function removeRow() {
    if(calculator.rows.length > 2) {
        calculator.deleteRow(calculator.rows.length - 1);
    }

    getPercentages();
}
