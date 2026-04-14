let video;
let label = "waiting...";
let confidence = 0;
let classifier;

const modelURL = "https://teachablemachine.withgoogle.com/models/e8lQ9X4bh/";

function preload() {
  classifier = ml5.imageClassifier(modelURL + "model.json");
}

function setup() {
  const canvas = createCanvas(640, 480);
  canvas.parent("canvas-container");

  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  classifyVideo();
}

function classifyVideo() {
  classifier.classify(video, gotResults);
}

function draw() {
  background(0);
  image(video, 0, 0, width, height);

  const predictionText = document.getElementById("prediction");
  const predictionEmoji = document.getElementById("prediction-emoji");

  let emoji = "❓";

  if (label === "Cup") {
    emoji = "☕";
  } else if (label === "Bowl") {
    emoji = "🥣";
  } else if (label === "Plate") {
    emoji = "🍽️";
  }

  // ✅ Keep percentage here
  if (predictionText) {
    predictionText.textContent = `${label} (${(confidence * 100).toFixed(1)}%)`;
  }

  if (predictionEmoji) {
    predictionEmoji.textContent = emoji;
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  if (results && results.length > 0) {
    label = results[0].label;
    confidence = results[0].confidence; // ← keep this
  }

  classifyVideo();
}