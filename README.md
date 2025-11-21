# 🚀 DevConnect — Global Solution
### Plataforma full-stack para conexão entre desenvolvedores

---

## 📌 Descrição do Projeto e Estrutura de Pastas

O **DevConnect** é um projeto full-stack que simula uma plataforma onde desenvolvedores podem se conectar.  
Ele é dividido em dois módulos principais — **frontend** e **backend**, que precisam rodar simultaneamente.

### 📁 Estrutura

| Pasta | Descrição |
|-------|-----------|
| **backend-python/** | Backend em Python + Flask (API que fornece os dados). |
| **gs_frontdev/** | Frontend em Next.js + React (interface que exibe os perfis). |

---

## 🧰 Tecnologias Utilizadas

### 🎨 Frontend
- Next.js  
- React  
- TailwindCSS  
- Axios  

### 🧱 Backend
- Python  
- Flask  
- Flask-CORS  

---

## 🔧 Pré-requisitos

Você precisa ter instalado:

- **Node.js 18+** (para o Frontend)  
- **Python 3.8+** (para o Backend)  
- **pip**  

---

# 🚀 Guia de Instalação e Execução

> ⚠️ Importante: o backend e o frontend devem rodar ao mesmo tempo.  
Use **2 terminais separados**.

---

# 🐍 1. Rodando o Backend (Terminal 1)

### ➤ Navegue até a pasta do backend

```bash
cd C:\Caminho\Para\SeuProjeto\backend-python
```

---

### ➤ (Opcional) Criar e ativar ambiente virtual

```bash
python -m venv venv
```

**Windows:**
```bash
.\venv\Scripts\activate
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

---

### ➤ Instalar dependências

```bash
pip install -r requirements.txt
```

---

### ➤ Rodar servidor backend

```bash
python app.py
```

Terminal deve mostrar:

```
 * Running on http://127.0.0.1:5000
```

---

# ⚛️ 2. Rodando o Frontend (Terminal 2)

### ➤ Navegue até o frontend

```bash
cd C:\Caminho\Para\SeuProjeto\gs_frontdev
```

---

### ➤ Instalar dependências

```bash
npm install
```

---

### ➤ Rodar servidor frontend

```bash
npm run dev
```

Mensagem esperada:

```
✓ Ready in 3.2s
✓ TTP: http://localhost:3000
```

---

# 🖥️ 3. Acessando a Aplicação

Abra o navegador em:

**https://devconnect-phi-nine.vercel.app/**

---

# 🧑‍💻 Informações do Aluno

| Campo | Informação |
|-------|------------|
| **Nome:** | Vitor Rampazzi, Daniel Brito, Gustavo Palomares |
| **RM:** | 562270, 564621, 566236 |
| **Turma:** | 1ESR |

---
