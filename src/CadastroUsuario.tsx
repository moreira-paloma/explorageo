import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  password: string;
};

function CadastroUsuario() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      alert(data.message || 'Cadastro feito!');
      setFormData({ name: '', email: '', password: '' });
    } catch (err) {
      console.error('Erro ao cadastrar:', err);
      alert('Erro ao cadastrar');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-blue-900/40 p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Cadastro de Usuário</h2>

      <input
        type="text"
        name="name"
        placeholder="Nome"
        value={formData.name}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded bg-blue-800 text-white"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded bg-blue-800 text-white"
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleChange}
        className="w-full mb-4 p-2 rounded bg-blue-800 text-white"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Cadastrar
      </button>
    </form>
  );
}

export default CadastroUsuario;