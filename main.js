Webcam.set({
    width: 375,
    height: 325,
    image_format: "png",
    png_quality: 200
});

Webcam.attach('#camera');

function takePic() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="capturedImg" src="' + data_uri + '">';
    });
}

console.log("ml5 version: ", ml5.version);
Classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/oMdm2Mz_x/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model is Loaded!!");
}

function IdentifyPic() {
    Image = document.getElementById("capturedImg");
    Classifier.classify(Image, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        document.getElementById("objectName").innerHTML = results[0].label;
        document.getElementById("answerAccuracy").innerHTML = results[0].confidence.toFixed(3);
    }
}