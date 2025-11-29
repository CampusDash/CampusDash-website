import { useState } from 'react';
 import './waitlistButton.css'; 

export default function WaitlistButton() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, sending, success, error
  const [message, setMessage] = useState('');

  function validateEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');

    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('Please enter a valid email.');
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('http://localhost:4000/api/waitlist', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Something went wrong');

      setStatus('success');
      setMessage('You are now on the waitlist!');
      setEmail('');

    } catch (err) {
      setStatus('error');
      setMessage(err.message);
    }
  }

  return (
    <form className="waitlist-container" onSubmit={handleSubmit}>

      <input
        type="email"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button disabled={status === "sending"}>
        {status === "sending" ? "Adding..." : "Get early acess"}
      </button>

      {message && (
        <p className={status === "error" ? "error" : "success"}>
          {message}
        </p>
      )}
    </form>
  );
}