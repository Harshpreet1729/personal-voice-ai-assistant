# 🧠 Personal Voice AI Assistant (Jarvis Lite) *Currently working on it (adding more features).

A voice-based AI assistant built with Flask and JavaScript that listens to your voice, sends queries to a language model (GROQ LLaMA 3), and responds using speech synthesis — just like J.A.R.V.I.S.!

> 🚧 **This project is still under active development.**

---

## 🌐 Tech Stack

- **Frontend**: HTML, CSS, JavaScript (Web Speech API for mic and speech)
- **Backend**: Python (Flask)
- **AI Model**: [GROQ](https://console.groq.com/) - LLaMA 3 (`llama3-8b-8192`)
- **Security**: `.env` + `python-dotenv`

---

## 📁 Project Structure

personal-voice-ai-assistant/
│
├── backend/
│ ├── app.py
│ └── .env # Contains GROQ_API_KEY (ignored in Git)
│
├── frontend/
│ ├── index.html
│ ├── main.html
│ ├── script.js
│ ├── style.css
│ └── assets/
│ ├── images/
│ ├── fonts/
│ └── jarvis-tts-file.mp3
│
├── .gitignore
├── README.md


---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` folder with:
GROQ_API_KEY=your_actual_groq_api_key
> ✅ This file is ignored from Git using `.gitignore`.
