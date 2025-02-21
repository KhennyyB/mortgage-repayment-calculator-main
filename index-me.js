function validateForm() {
  let isValid = true;

  // Validate Mortgage Amount
  const mortgageAmount = document.getElementById("mortgage-amount").value.replace(/,/g, '');
  const mortgageAmountError = document.getElementById("mortgage-amount-error");
  if (!mortgageAmount || isNaN(mortgageAmount) || mortgageAmount <= 0) {
    mortgageAmountError.style.display = "block";
    isValid = false;
  } else {
    mortgageAmountError.style.display = "none";
  }

  // Validate Mortgage Term
  const mortgageTerm = document.getElementById("mortgage-term").value;
  const mortgageTermError = document.getElementById("mortgage-term-error");
  if (!mortgageTerm || isNaN(mortgageTerm) || mortgageTerm <= 0) {
    mortgageTermError.style.display = "block";
    isValid = false;
  } else {
    mortgageTermError.style.display = "none";
  }

  // Validate Interest Rate
  const interestRate = document.getElementById("interest-rate").value;
  const interestRateError = document.getElementById("interest-rate-error");
  if (!interestRate || isNaN(interestRate) || interestRate <= 0) {
    interestRateError.style.display = "block";
    isValid = false;
  } else {
    interestRateError.style.display = "none";
  }

  // If all fields are valid, proceed with calculation
  if (isValid) {
    calculateMortgage();
  }
}

function calculateMortgage() {
  const amount = parseFloat(
    document.getElementById("mortgage-amount").value.replace(/,/g, "")
  );
  const year = parseFloat(document.getElementById("mortgage-term").value);
  const rate = parseFloat(document.getElementById("interest-rate").value);
  const isRepayment = document.getElementById("repayment").checked;

  const monthlyRate = rate / (12 * 100);
  const totalPayment = year * 12;

  let totalAmount;
  let totalRepayment;

  if (isRepayment) {
    totalAmount =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, totalPayment)) /
      (Math.pow(1 + monthlyRate, totalPayment) - 1);
    totalRepayment = totalAmount * totalPayment;
  } else {
    totalAmount = amount * monthlyRate;
    totalRepayment = totalAmount * totalPayment + amount;
  }

  document.getElementById("total-amount").textContent =
    `£ ${totalAmount.toFixed(2)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  document.getElementById("balance").textContent = `£ ${totalRepayment.toFixed(
    2
  )}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function clearForm() {
  document.getElementById("mortgage-amount").value = "";
  document.getElementById("mortgage-term").value = "";
  document.getElementById("interest-rate").value = "";
  document.getElementById("repayment").checked = true;
  document.getElementById("interestOnly").checked = false;
  document.getElementById("total-amount").textContent = "£ 0.00";
  document.getElementById("balance").textContent = "£ 0.00";
  document.getElementById("mortgage-amount-error").style.display = "none";
  document.getElementById("mortgage-term-error").style.display = "none";
  document.getElementById("interest-rate-error").style.display = "none";
}

document
  .getElementById("mortgage-amount")
  .addEventListener("input", function (e) {
    let value = e.target.value.replace(/,/g, "");
    if (value) {
      value = parseInt(value).toLocaleString("en-GB");
      e.target.value = value;
    }
  });

document.getElementById("calculate-btn").addEventListener("click", validateForm);
document.querySelector(".clear-btn").addEventListener("click", clearForm);
