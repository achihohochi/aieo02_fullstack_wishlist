# 🎅 Magical Wish List

A full-stack Christmas wish list application with an AI-powered Santa chat feature. Built with Next.js frontend and FastAPI backend.

## Features

- **Wish List Management**: Add and track your Christmas wishes
- **AI Santa Chat**: Chat with St. Nicholas (Mikuláš) powered by OpenAI GPT-4o-mini
- **Spirit Meter**: Visual progress indicator based on wishes added
- **Theme Selector**: Multiple visual themes (classic, snow, aurora, gingerbread)
- **Snowfall Animation**: Festive snow effects

## Project Structure

```
├── frontend-wish-list/    # Next.js frontend
└── backend-wish-list/     # FastAPI backend
```

## Prerequisites

- Node.js 18+
- Python 3.9+
- OpenAI API key

## Backend Setup

### Local Development

```bash
cd backend-wish-list

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp api/.env.example api/.env
# Edit .env and add your OPENAI_API_KEY

# Run server
uvicorn api.index:app --reload --port 8000
```

Backend runs at `http://localhost:8000`

### Vercel Deployment

1. Push `backend-wish-list` to a GitHub repo
2. Import to Vercel
3. Add environment variable: `OPENAI_API_KEY`
4. Deploy

## Frontend Setup

### Local Development

```bash
cd frontend-wish-list

# Install dependencies
npm install

# Run development server
npm run dev
```

Frontend runs at `http://localhost:3000`

### Vercel Deployment

1. Push `frontend-wish-list` to a GitHub repo
2. Import to Vercel
3. Deploy

## Environment Variables

### Backend
| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | Your OpenAI API key |

## Tech Stack

**Frontend:**
- Next.js 16
- React 19
- Tailwind CSS 4
- Radix UI components

**Backend:**
- FastAPI
- OpenAI API
- Python 3.9+

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| POST | `/api/chat` | Send message to AI Santa |
