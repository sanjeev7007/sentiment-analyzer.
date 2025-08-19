from flask import Flask, request, jsonify, render_template
from textblob import TextBlob
from flask_cors import CORS

app = Flask(__name__, template_folder="templates")
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    text = data.get("text", "")
    if not text.strip():
        return jsonify({"error": "No text provided"}), 400
    
    analysis = TextBlob(text)
    polarity = analysis.sentiment.polarity
    subjectivity = analysis.sentiment.subjectivity

    if polarity > 0:
        sentiment = "Positive 😊"
    elif polarity < 0:
        sentiment = "Negative 😞"
    else:
        sentiment = "Neutral 😐"

    return jsonify({
        "sentiment": sentiment,
        "polarity": round(polarity, 2),
        "subjectivity": round(subjectivity, 2)
    })

if __name__ == "__main__":
    app.run(debug=True)
