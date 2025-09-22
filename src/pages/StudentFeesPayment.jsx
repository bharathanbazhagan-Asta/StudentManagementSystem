import React, { useState } from "react";
import "./StudentFeesPayment.css";

const StudentFeesPayment = () => {
  const feeStructure = {
    "PreKG": 8000,
    "LKG": 10000,
    "UKG": 12000,
    "I": 13000,
    "II": 14000,
    "III": 14500,
    "IV": 14800,
    "V": 15000,
    "VI": 16000,
    "VII": 16500,
    "VIII": 17000,
    "IX": 18000,
    "X": 20000,
    "XI-Bio": 25000,
    "XI-CS": 24000,
    "XI-Com": 22000,
    "XII-Bio": 26000,
    "XII-CS": 25000,
    "XII-Com": 23000
  };

  const [studentName, setStudentName] = useState("");
  const [standard, setStandard] = useState("");
  const [group, setGroup] = useState("");
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [total, setTotal] = useState(0);
  const [paid, setPaid] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [msg, setMsg] = useState("");

  // Payment method fields
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [ifsc, setIfsc] = useState("");

  const updateFee = (std, grp) => {
    let key = std;
    if ((std === "XI" || std === "XII") && grp) {
      key = std + "-" + grp;
    }
    
    if (key && feeStructure[key]) {
      const newTotal = feeStructure[key];
      setTotal(newTotal);
      setPaid(0);
      setRemaining(newTotal);
      setAmount("");
    } else {
      setTotal(0);
      setPaid(0);
      setRemaining(0);
      setAmount("");
    }
  };

  const handleStandardChange = (e) => {
    const std = e.target.value;
    setStandard(std);
    setGroup("");
    updateFee(std, "");
  };

  const handleGroupChange = (e) => {
    const grp = e.target.value;
    setGroup(grp);
    updateFee(standard, grp);
  };

  const handleAmountChange = (e) => {
    const inputValue = e.target.value;
    
    // Prevent negative values
    if (inputValue.startsWith('-')) {
      return;
    }
    
    // Only allow numbers
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    
    setAmount(numericValue);
    
    const val = parseInt(numericValue) || 0;
    let newPaid = val;
    if (val > total) newPaid = total;
    
    setPaid(newPaid);
    setRemaining(total - newPaid);
  };

  const selectPaymentMethod = (selectedMethod) => {
    setMethod(selectedMethod);
  };

  const handleCardNumberChange = (e) => {
    // Only allow numbers and limit to 16 digits
    const input = e.target.value.replace(/\D/g, '').slice(0, 16);
    setCardNumber(input);
  };

  const formatCardNumber = (value) => {
    // Format as XXXX-XXXX-XXXX-XXXX
    return value.replace(/(\d{4})(?=\d)/g, '$1-');
  };

  const makePayment = () => {
    setMsg("");
    
    // Validation
    if (!studentName.trim()) {
      setMsg("⚠ Please enter student name.");
      return;
    }
    
    if (!standard) {
      setMsg("⚠ Please select a standard.");
      return;
    }
    
    if ((standard === "XI" || standard === "XII") && !group) {
      setMsg("⚠ Please select a group.");
      return;
    }
    
    if (!method) {
      setMsg("⚠ Please select a payment method.");
      return;
    }
    
    if (paid <= 0) {
      setMsg("⚠ Enter a valid payment amount.");
      return;
    }

    // Method-specific validation
    if (method === "card") {
      if (cardNumber.length !== 16 || isNaN(cardNumber)) {
        setMsg("⚠ Invalid card number.");
        return;
      }
      if (!expiry) {
        setMsg("⚠ Please enter expiry date.");
        return;
      }
      if (cvv.length !== 3 || isNaN(cvv)) {
        setMsg("⚠ Invalid CVV.");
        return;
      }
    }
    
    if (method === "upi") {
      if (!upiId.includes("@")) {
        setMsg("⚠ Invalid UPI ID.");
        return;
      }
    }
    
    if (method === "net") {
      if (!bankName.trim()) {
        setMsg("⚠ Enter bank name.");
        return;
      }
      if (!accountNo || isNaN(accountNo)) {
        setMsg("⚠ Invalid account number.");
        return;
      }
      if (!/^[A-Z]{4}0\d{6}$/.test(ifsc)) {
        setMsg("⚠ Invalid IFSC Code.");
        return;
      }
    }

    // Success
    setMsg(`✅ Payment of ₹${paid.toLocaleString('en-IN')} for ${studentName} successful!`);
    setRemaining(total - paid);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setStudentName("");
      setStandard("");
      setGroup("");
      setAmount("");
      setMethod("");
      setTotal(0);
      setPaid(0);
      setRemaining(0);
      setCardNumber("");
      setExpiry("");
      setCvv("");
      setUpiId("");
      setBankName("");
      setAccountNo("");
      setIfsc("");
      setMsg("");
    }, 3000);
  };

  return (
    <div className="student-fees-container">
      <h1>🎓 Student Fees Payment</h1>

      <label htmlFor="studentName">Student Name</label>
      <input
        type="text"
        id="studentName"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        placeholder="Enter student name"
      />

      <label htmlFor="standard">Select Standard</label>
      <select 
        id="standard" 
        value={standard} 
        onChange={handleStandardChange}
      >
        <option value="">-- Select --</option>
        <option value="PreKG">Pre-KG</option>
        <option value="LKG">LKG</option>
        <option value="UKG">UKG</option>
        <option value="I">I</option>
        <option value="II">II</option>
        <option value="III">III</option>
        <option value="IV">IV</option>
        <option value="V">V</option>
        <option value="VI">VI</option>
        <option value="VII">VII</option>
        <option value="VIII">VIII</option>
        <option value="IX">IX</option>
        <option value="X">X</option>
        <option value="XI">XI</option>
        <option value="XII">XII</option>
      </select>

      {(standard === "XI" || standard === "XII") && (
        <div id="groupBox">
          <label htmlFor="group">Select Group</label>
          <select 
            id="group" 
            value={group} 
            onChange={handleGroupChange}
          >
            <option value="">-- Select Group --</option>
            <option value="Bio">Bio-Math</option>
            <option value="CS">CS-Math</option>
            <option value="Com">Commerce</option>
          </select>
        </div>
      )}

      {total > 0 && (
        <div className="summary" id="summaryBox">
          <p><b>Total Fees:</b> ₹<span id="totalFees">{total.toLocaleString('en-IN')}</span></p>
          <p><b>Paid:</b> ₹<span id="paidAmount">{paid.toLocaleString('en-IN')}</span></p>
          <p><b>Remaining:</b> ₹<span id="remainingFees">{remaining.toLocaleString('en-IN')}</span></p>
        </div>
      )}

      <label htmlFor="amount">Enter Amount to Pay</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={handleAmountChange}
        placeholder="Enter amount"
        min="0"
        onKeyDown={(e) => {
          // Prevent negative sign, minus key, and arrow down
          if (e.key === '-' || e.key === 'ArrowDown') {
            e.preventDefault();
          }
        }}
      />

      <label>Choose Payment Method</label>
      <div className="payment-methods">
        <div 
          className={`method-card ${method === "card" ? "selected" : ""}`}
          onClick={() => selectPaymentMethod("card")}
        >
          <input 
            type="radio" 
            name="method" 
            value="card" 
            id="card" 
            checked={method === "card"}
            onChange={() => selectPaymentMethod("card")}
          />
          <label htmlFor="card">
            <img src="https://img.icons8.com/color/96/000000/bank-card-back-side.png" alt="Card" />
            <div>Card</div>
          </label>
        </div>
        
        <div 
          className={`method-card ${method === "upi" ? "selected" : ""}`}
          onClick={() => selectPaymentMethod("upi")}
        >
          <input 
            type="radio" 
            name="method" 
            value="upi" 
            id="upi" 
            checked={method === "upi"}
            onChange={() => selectPaymentMethod("upi")}
          />
          <label htmlFor="upi">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
              <path fill="#ff9700" d="M10,10h28c2.2,0,4,1.8,4,4v20c0,2.2-1.8,4-4,4H10c-2.2,0-4-1.8-4-4V14C6,11.8,7.8,10,10,10z"/>
              <path fill="#ffffff" d="M24,17c-3.9,0-7,3.1-7,7s3.1,7,7,7s7-3.1,7-7S27.9,17,24,17z M24,29c-2.8,0-5-2.2-5-5s2.2-5,5-5s5,2.2,5,5 S26.8,29,24,29z"/>
              <path fill="#ffffff" d="M30,21h-2v2h2v2h-4v-6h2V21z M20,21h2v2h-2v2h4v-6h-2V21z"/>
            </svg>
            {/* <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" /> */}
            <div>UPI</div>
          </label>
        </div>
        
        <div 
          className={`method-card ${method === "net" ? "selected" : ""}`}
          onClick={() => selectPaymentMethod("net")}
        >
          <input 
            type="radio" 
            name="method" 
            value="net" 
            id="net" 
            checked={method === "net"}
            onChange={() => selectPaymentMethod("net")}
          />
          <label htmlFor="net">
            <img src="https://img.icons8.com/color/96/000000/bank-building.png" alt="Net Banking" />
            <div>Net Banking</div>
          </label>
        </div>
      </div>

      {method === "card" && (
        <div id="cardBox">
          <label>Card Number (16 digits)</label>
          <input
            type="text"
            id="cardNumber"
            value={formatCardNumber(cardNumber)}
            onChange={handleCardNumberChange}
            maxLength={19}
            placeholder="xxxx-xxxx-xxxx-xxxx"
            inputMode="numeric"
          />
          
          <label>Expiry Date</label>
          <input
            type="month"
            id="expiry"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          
          <label>CVV</label>
          <input
            type="password"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
            maxLength={3}
            placeholder="123"
            inputMode="numeric"
          />
        </div>
      )}

      {method === "upi" && (
        <div id="upiBox">
          <label>UPI ID</label>
          <input
            type="text"
            id="upiId"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            placeholder="example@upi"
          />
        </div>
      )}

      {method === "net" && (
        <div id="netBox">
          <label>Bank Name</label>
          <input
            type="text"
            id="bankName"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            placeholder="Enter bank name"
          />
          
          <label>Account Number</label>
          <input
            type="text"
            id="accountNo"
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter account number"
            inputMode="numeric"
          />
          
          <label>IFSC Code</label>
          <input
            type="text"
            id="ifsc"
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value.toUpperCase())}
            placeholder="ABCD0123456"
          />
        </div>
      )}

      <button onClick={makePayment}>Pay Now</button>
      
      {msg && (
        <div id="msg" className={msg.includes("✅") ? "success" : "error"}>
          {msg}
        </div>
      )}
    </div>
  );
};

export default StudentFeesPayment;