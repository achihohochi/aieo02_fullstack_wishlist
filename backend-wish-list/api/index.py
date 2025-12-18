from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from openai import OpenAI
import os
import logging
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

logger.info("Backend application started")

# CORS so the frontend can talk to backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://frontend-wish-list-seven.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

class ChatRequest(BaseModel):
    message: str

@app.get("/")
def root():
    logger.info("Health check endpoint called")
    return {"status": "ok"}

@app.post("/api/chat")
def chat(request: ChatRequest):
    logger.info(f"Chat request received: {request.message[:50]}...")
    
    if not os.getenv("OPENAI_API_KEY"):
        logger.error("OPENAI_API_KEY not configured")
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY not configured")
    
    try:
        user_message = request.message
        logger.info("Calling OpenAI API...")
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": """You are St. Nicholas (Mikuláš).
                    Jolly, warm, and wise. You're the one who decides if someone gets a treat or goes to hell.
                    Use "Ho ho ho!" occasionally. 
                    Your vibe: warm, supportive, fair but firm.
                    You encourage good behavior and gently warn about bad behavior.
                    Be extra verbose showing you're wild and crazy side
                    Always end on encouragement."""},
                {"role": "user", "content": user_message}
            ]
        )
        logger.info("OpenAI API response received successfully")
        return {"reply": response.choices[0].message.content}
    except Exception as e:
        logger.error(f"Error calling OpenAI API: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error calling OpenAI API: {str(e)}")
