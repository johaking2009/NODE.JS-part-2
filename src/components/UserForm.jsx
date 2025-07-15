import React, { useState, useEffect } from 'react';

function UserManagement() {
  const [ism, setIsm] = useState('');
  const [familya, setFamilya] = useState('');
  const [telefon, setTelefon] = useState('');
  const [xabar, setXabar] = useState('');
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // GET: Barcha foydalanuvchilarni olish
  const fetchUsers = async () => {
    try {
      const res = await fetch('https://node-js-alpha-khaki.vercel.app/api/users');
      if (res.ok) {
        const data = await res.json();
        setUsers(data);
      } else {
        setXabar('❌ Foydalanuvchilarni olishda xatolik');
      }
    } catch (err) {
      setXabar('❌ Serverga ulanishda xatolik');
    }
  };

  // Komponent yuklanganda foydalanuvchilarni olish
  useEffect(() => {
    fetchUsers();
  }, []);

  // POST: Yangi foydalanuvchi qo'shish
  const handleSubmit = async (e) => {
    e.preventDefault();
    setXabar('');
    try {
      const res = await fetch('https://node-js-alpha-khaki.vercel.app/api/users', {
        method: editingId ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingId,
          ism,
          familya,
          telefon,
        }),
      });
      if (res.ok) {
        setXabar(editingId ? '✅ O‘quvchi muvaffaqiyatli yangilandi!' : '✅ O‘quvchi muvaffaqiyatli ro‘yxatdan o‘tdi!');
        setIsm('');
        setFamilya('');
        setTelefon('');
        setEditingId(null);
        fetchUsers(); // Yangilangan ro'yxatni olish
      } else {
        setXabar('❌ Xatolik: Ma’lumot yuborilmadi');
      }
    } catch (err) {
      setXabar('❌ Serverga ulanishda xatolik');
    }
  };

  // DELETE: Foydalanuvchini o'chirish
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`https://node-js-alpha-khaki.vercel.app/api/users/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setXabar('✅ O‘quvchi muvaffaqiyatli o‘chirildi!');
        fetchUsers(); // Yangilangan ro'yxatni olish
      } else {
        setXabar('❌ O‘chirishda xatolik');
      }
    } catch (err) {
      setXabar('❌ Serverga ulanishda xatolik');
    }
  };

  // EDIT: Foydalanuvchi ma'lumotlarini tahrirlash uchun formani to'ldirish
  const handleEdit = (user) => {
    setIsm(user.ism);
    setFamilya(user.familya);
    setTelefon(user.telefon);
    setEditingId(user.id);
  };

  return (
    <div style={{ maxWidth: 600, margin: '30px auto' }}>
      <h2>{editingId ? 'O‘quvchini tahrirlash' : 'O‘quvchini ro‘yxatdan o‘tkazish'}</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Ism"
          value={ism}
          onChange={(e) => setIsm(e.target.value)}
          required
          style={{ display: 'block', marginBottom: 10, width: '100%' }}
        />
        <input
          type="text"
          placeholder="Familya"
          value={familya}
          onChange={(e) => setFamilya(e.target.value)}
          required
          style={{ display: 'block', marginBottom: 10, width: '100%' }}
        />
        <input
          type="text"
          placeholder="Telefon"
          value={telefon}
          onChange={(e) => setTelefon(e.target.value)}
          required
          style={{ display: 'block', marginBottom: 10, width: '100%' }}
        />
        <button type="submit" style={{ width: '100%' }}>
          {editingId ? 'Yangilash' : 'Saqlash'}
        </button>
        {xabar && <div style={{ marginTop: 15 }}>{xabar}</div>}
      </form>

      <h3>Foydalanuvchilar ro‘yxati</h3>
      {users.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map((user) => (
            <li
              key={user.id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: 10,
                border: '1px solid #ccc',
                marginBottom: 5,
              }}
            >
              <span>
                {user.ism} {user.familya} - {user.telefon}
              </span>
              <div>
                <button
                  onClick={() => handleEdit(user)}
                  style={{ marginRight: 10 }}
                >
                  Tahrirlash
                </button>
                <button onClick={() => handleDelete(user.id)}>O‘chirish</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Ro‘yxatda foydalanuvchilar yo‘q</p>
      )}
    </div>
  );
}

export default UserManagement;