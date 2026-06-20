from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import pipeline
from PIL import Image
import base64
import io
import uvicorn
import sys
import os
from contextlib import asynccontextmanager

# Suppress symlink warnings on Windows
os.environ["HF_HUB_DISABLE_SYMLINKS_WARNING"] = "1"

# Global variable for the model
classifier = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global classifier
    # We use google/vit-base-patch16-224 as it is highly compatible with transformers
    # and provides excellent image classification performance.
    model_id = "google/vit-base-patch16-224"
    print(f"Loading Hugging Face model: {model_id}...")
    try:
        classifier = pipeline("image-classification", model=model_id)
        print("Model loaded successfully. Ready for inference.")
        yield
    except Exception as e:
        print(f"CRITICAL: Failed to load model {model_id}: {e}")
        sys.exit(1)

app = FastAPI(lifespan=lifespan)
HOST = os.environ.get("HOST", "0.0.0.0")
PORT = int(os.environ.get("PORT", "5001"))

class ImageRequest(BaseModel):
    image: str # base64 string

@app.get("/health")
async def health():
    return {"status": "ok", "model_loaded": classifier is not None}

@app.post("/predict")
async def predict(request: ImageRequest):
    if classifier is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    try:
        # Decode base64 image
        header, encoded = request.image.split(",", 1) if "," in request.image else ("", request.image)
        image_data = base64.b64decode(encoded)
        image = Image.open(io.BytesIO(image_data)).convert("RGB")
        
        # Inference
        results = classifier(image)
        # Results is a list of dicts: [{'label': '...', 'score': ...}, ...]
        return results
    except Exception as e:
        print(f"Inference error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host=HOST, port=PORT)
