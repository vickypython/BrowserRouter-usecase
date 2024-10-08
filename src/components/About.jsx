import { useState } from "react";

export const About = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [transaction, setTransaction] = useState([
    {id:1, phone: 254708464263, amount: 30 },
    {id:2, phone: 254708464263, amount: 100 },
    { id:3, phone: 254708464263, amount: 100000 },
  ]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const newPayment = {
      id:transaction.length+1,
      phone: phone,
      amount: amount,
    };
    setTransaction([newPayment,...transaction])
  };
  return (
    <div>
      <h1>charity payment list</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="phone">phoneNumber:</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              placeholder="Enter phone no"
            />
          </div>
          <div>
            <label htmlFor="amount">amount:</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              id="amount"
              placeholder="Enter amount"
            />
          </div>
          <button type="submit">pay</button>
        </form>
      </div>
     <div>
     {transaction.map((trans)=> (
        <div key={trans.id}>
          <h2>{trans.phone}</h2>
          <span>{trans.amount}</span>
        </div>
      ))}
     </div>
    </div>
  );
};
