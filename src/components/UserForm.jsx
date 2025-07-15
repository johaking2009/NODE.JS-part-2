import React, { useState } from 'react';

function UserForm() {
  const [ism, setIsm] = useState('');
  const [familya, setFamilya] = useState('');
  const [telefon, setTelefon] = useState('');
  const [xabar, setXabar] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setXabar('');
    try {
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ism, familya, telefon }),
      });
      if (res.ok) {
        setXabar('✅ O‘quvchi muvaffaqiyatli ro‘yxatdan o‘tdi!');
        setIsm('');
        setFamilya('');
        setTelefon('');
      } else {
        setXabar('❌ Xatolik: Ma’lumot yuborilmadi');
      }
    } catch (err) {
      setXabar('❌ Serverga ulanishda xatolik');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: '30px auto' }}>
      <h2>O‘quvchini ro‘yxatdan o‘tkazish</h2>
      <input
        type="text"
        placeholder="Ism"
        value={ism}
        onChange={e => setIsm(e.target.value)}
        required
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />
      <input
        type="text"
        placeholder="Familya"
        value={familya}
        onChange={e => setFamilya(e.target.value)}
        required
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />
      <input
        type="text"
        placeholder="Telefon"
        value={telefon}
        onChange={e => setTelefon(e.target.value)}
        required
        style={{ display: 'block', marginBottom: 10, width: '100%' }}
      />
      <button type="submit" style={{ width: '100%' }}>Saqlash</button>
      {xabar && <div style={{ marginTop: 15 }}>{xabar}</div>}
    </form>
  );
}

export default UserForm;