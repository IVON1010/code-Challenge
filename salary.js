function calculateNetSalary(basicSalary, benefits) {
    // PAYE rates
    const payeRates = [
        { lowerLimit: 0, upperLimit: 24000, rate: 10 },
        { lowerLimit: 24001, upperLimit: 32333, rate: 25 },
        { lowerLimit: 32334, upperLimit: 500000, rate: 30 },
        { lowerLimit: 500001, upperLimit: 800000, rate: 32.5 },
        { lowerLimit: 800001, rate: 35 }
    ];

    // NHIF rates
    const nhifRates = [
        { lowerLimit: 0, upperLimit: 5999, deduction: 150 },
        { lowerLimit: 6000, upperLimit: 7999, deduction: 300 },
        { lowerLimit: 8000, upperLimit: 11999, deduction: 400 },
        { lowerLimit: 12000, upperLimit: 14999, deduction: 500 },
        { lowerLimit: 15000, upperLimit: 19999, deduction: 600 },
        { lowerLimit: 20000, upperLimit: 24999, deduction: 750 },
        { lowerLimit: 25000, upperLimit: 29999, deduction: 850 },
        { lowerLimit: 30000, upperLimit: 34999, deduction: 900 },
        { lowerLimit: 35000, upperLimit: 39999, deduction: 950 },
        { lowerLimit: 40000, upperLimit: 44999, deduction: 1000 },
        { lowerLimit: 45000, upperLimit: 49999, deduction: 1100 },
        { lowerLimit: 50000, upperLimit: 59999, deduction: 1200 },
        { lowerLimit: 60000, upperLimit: 69999, deduction: 1300 },
        { lowerLimit: 70000, upperLimit: 79999, deduction: 1400 },
        { lowerLimit: 80000, upperLimit: 89999, deduction: 1500 },
        { lowerLimit: 90000, upperLimit: 99999, deduction: 1600 },
        { lowerLimit: 100000, deduction: 1700 }
    ];

    // NSSF rates
    const nssfRates = [
        { tier: "I", lowerLimit: 0, upperLimit: 7000, employeeRate: 0.06, employerRate: 0.06 },
        { tier: "II", lowerLimit: 7001, upperLimit: 36000, employeeRate: 0.06, employerRate: 0.06 }
    ];

    // Housing Levy rate
    const housingLevyRate = 0.015; // 1.5%

    // Calculate gross salary
    const grossSalary = basicSalary + benefits;

    // Calculate PAYE (tax)
    let paye = 0;
    for (const rate of payeRates) {
        if (grossSalary > rate.lowerLimit) {
            const taxableAmount = Math.min(grossSalary, rate.upperLimit) - rate.lowerLimit;
            paye += taxableAmount * (rate.rate / 100);
        }
    }

    // Calculate NHIF deductions
    let nhifDeductions = 0;
    for (const rate of nhifRates) {
        if (grossSalary >= rate.lowerLimit && grossSalary <= rate.upperLimit) {
            nhifDeductions = rate.deduction;
            break;
        }
    }

    // Calculate NSSF deductions
    let nssfDeductionsEmployee = 0;
    let nssfDeductionsEmployer = 0;
    for (const rate of nssfRates) {
        if (grossSalary >= rate.lowerLimit && grossSalary <= rate.upperLimit) {
            nssfDeductionsEmployee = grossSalary * rate.employeeRate;
            nssfDeductionsEmployer = grossSalary * rate.employerRate;
            break;
        }
    }

    // Calculate Housing Levy
    const housingLevy = grossSalary * housingLevyRate;

    // Calculate net salary
    const netSalary = grossSalary - paye - nhifDeductions - nssfDeductionsEmployee - housingLevy;

    return {
        grossSalary: grossSalary,
        paye: paye,
        nhifDeductions: nhifDeductions,
        nssfDeductionsEmployee: nssfDeductionsEmployee,
        nssfDeductionsEmployer: nssfDeductionsEmployer,
        housingLevy: housingLevy,
        netSalary: netSalary
    };
}

// Get inputs from the user
const basicSalary = parseFloat("Enter basic salary (Ksh):");
const benefits = parseFloat("Enter benefits (Ksh):");

if (!isNaN(basicSalary) && !isNaN(benefits)) {
    // Calculate and display salary details
    const salaryDetails = calculateNetSalary(basicSalary, benefits);
    console.log("Gross Salary: Ksh", salaryDetails.grossSalary.toFixed(2));
    console.log("PAYE (Tax): Ksh", salaryDetails.paye.toFixed(2));
    console.log("NHIF Deductions: Ksh", salaryDetails.nhifDeductions.toFixed(2));
    console.log("NSSF Deductions (Employee): Ksh", salaryDetails.nssfDeductionsEmployee.toFixed(2));
    console.log("NSSF Deductions (Employer): Ksh", salaryDetails.nssfDeductionsEmployer.toFixed(2));
    console.log("Housing Levy: Ksh", salaryDetails.housingLevy.toFixed(2));
    console.log("Net Salary: Ksh", salaryDetails.netSalary.toFixed(2));
} else {
    console.log("Invalid input. Please enter valid numbers for basic salary and benefits.");
}



