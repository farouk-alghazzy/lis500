let video;
let label = "waiting...";
let confidence = 0;
let classifier;

const modelURL = "https://teachablemachine.withgoogle.com/models/e8lQ9X4bh/";

function preload() {
  classifier = ml5.imageClassifier(modelURL + "model.json");
}

function setup() {
  const canvas = createCanvas(640, 520);
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

  image(video, 0, 0, width, 480);

  fill(0);
  rect(0, 480, width, 40);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(24);
  text(`${label} (${(confidence * 100).toFixed(1)}%)`, width / 2, 500);

  let emoji = "❓";

  if (label === "Cup") {
    emoji = "☕";
  } else if (label === "Bowl") {
    emoji = "🥣";
  } else if (label === "Plate") {
    emoji = "🍽️";
  }

  textSize(100);
  text(emoji, width / 2, 240);

  const predictionText = document.getElementById("prediction");
  if (predictionText) {
    predictionText.textContent = `${label} (${(confidence * 100).toFixed(1)}%)`;
  }
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  if (results && results.length > 0) {
    label = results[0].label;
    confidence = results[0].confidence;
  }

  classifyVideo();
}