import axios from "axios";
import { useState,useEffect } from "react";
const url="https://b53c-43-89-16-94.ngrok-free.app/getTransactions"
export const About = () => {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [transaction, setTransaction] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch transactions from the database when the component mounts
  useEffect(() => {
    const fetchTransactions = async (url) => {
      try {
        const response = await axios.get(url); // Replace with your actual endpoint
        setTransaction(response.data); // Assuming the response contains the transactions array
      } catch (err) {
        setError(err); // Handle error
        console.error("Error fetching transactions:", err);
      } finally {
        setLoading(false); // Stop loading state
      }
    };

    fetchTransactions(url);
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPayment = {
      phone: phone,
      amount: amount,
    };
    const response = await axios.post(
      "https://b53c-41-81-16-94.ngrok-free.app/stkPush",
      newPayment
    );
    console.log("here is the response:", response);

    const dataSaved = response.data;
    console.log("Data with p&amount:", dataSaved);

    setTransaction((prevState) => [
      ...prevState,
      { phone: dataSaved.phone, amount: dataSaved.amount },
    ]);
  };
  if(loading)return <div>Loading.....</div>
  if(error) return <div>Error fetching the Transaction:{error.message}</div>
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
        {transaction.map((trans) => (
          <div key={trans._id}>
            <h2>{trans.phone}</h2>
            <span>{trans.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
