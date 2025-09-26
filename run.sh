#!/bin/bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
sudo apt-get update && sudo apt-get install -y texlive-latex-base texlive-fonts-recommended
uvicorn main:app --host 0.0.0.0 --port 8000 &
sleep 5
curl http://localhost:8000/