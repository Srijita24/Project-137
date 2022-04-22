status = "";
objects = [];

function setup() {
    canvas = createCanvas(480,380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("object_name").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function draw() {
    image(video, 0, 0, 480, 380);

    if (status != "")
    {
        objectDetector.detect(video, gotresult);
        for (i = 0; i < objects.length; i++)
        {
            fill("#FF0000");
            percent = floor(objects[i].confidence*100);
            text(objects[i].label + " " + percent + " %", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (objects[i].label == object_name)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("found_or_not").innerHTML = object_name + " found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(object_name + " found");
                synth.speak(utterThis);
            }
            else
            {
                document.getElementById("found_or_not").innerHTML = object_name + " not found";
            }
        }
        
    }
}

function gotresult(results, error)
{
    if (error)
    {
        console.log(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}