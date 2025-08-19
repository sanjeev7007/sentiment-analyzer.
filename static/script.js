let vantaEffect = VANTA.NET({
  el: "#background",
  mouseControls: true,
  touchControls: true,
  minHeight: 200.00,
  minWidth: 200.00,
  scale: 1.0,
  scaleMobile: 1.0,
  color: 0x00ffcc,
  backgroundColor: 0x0,
  points: 12.0,
  maxDistance: 25.0,
  spacing: 18.0
});

async function analyzeSentiment() {
  const text = document.getElementById("userInput").value;
  if (!text.trim()) {
    document.getElementById("result").innerText = "⚠️ Please enter some text!";
    return;
  }

  const response = await fetch("/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text })
  });

  const data = await response.json();
  document.getElementById("result").innerText = 
    `Sentiment: ${data.sentiment} | Polarity: ${data.polarity.toFixed(2)}`;
    
}
document.addEventListener("mousemove", e => {
  const cursor = document.querySelector(".cursor");
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});
const text = "Sentiment Analyzer";
let i = 0;
function typeWriter() {
  if (i < text.length) {
    document.getElementById("title").innerHTML = text.substring(0, i+1);
    i++;
    setTimeout(typeWriter, 100);
  }
}
window.onload = typeWriter;
const textarea = document.getElementById("userInput");
const counter = document.getElementById("charCount");

textarea.addEventListener("input", () => {
  counter.textContent = textarea.value.length + " / 200 characters";
});
