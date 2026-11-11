let port;               // variable for serial port instance
let baudRate = 115200;  // change the baud rate to match your Arduino code

let rxFlag = false;         // boolean to flag when new data has been received
let firstContact = false;   // boolean to flag when 1st contact has been made with serial port
let sensors = [0, 0, 0, 0]; // declare array for incoming sensor data, and initialize with zeros
let pot1 = 0;               
let pot2 = 0;               
let button1 = 0;            
let button2 = 0;  
let twoFace = false;
let Rick = 250;
let Morty = 250;
let currentTime = 0;
let lastTime = 0; 
let timerInterval = 10000;
let Tom = 50;
let Jerry = 104;
let Score = 0;

function setup() 
{
    createCanvas(500, 500);

   port = createSerial(); // make a new instance of the serial port

  // if we've connected to a serial port before, reopen it
  let used = usedSerialPorts();
  if (used.length > 0) 
  {
    port.open(used[0], baudRate);

  }
}

function draw() 
{
   // background(220);

    let inString = port.readUntil('\n'); // read incoming serial data until newline
  if (inString.length > 0)  //if we actually received data...
  {
    firstContact = true;  // we have made contact, set firstContact to true
    print(inString);

    if (rxFlag)  //if rxFlag is true...
    {
      sensors = inString.split(','); // split at commas, store in array

      if (sensors.length >= 4)  // if we have all 4 sensors...
      {
        button1 = map(Number(sensors[0]), 0, 1, 0, 1); // map button 1 to 0-255
        button2 = map(Number(sensors[1]), 0, 1, 0, 1); // map button 2 to 0-255
        pot1 = floor(map(Number(sensors[2]), 0, 1023, 0, 499)); // map pot 1 to 0-255
        pot2 = floor(map(Number(sensors[3]), 0, 1023, 0, 499)); // map pot 2 to 0-255

        port.write('A');  //ask for the next reading
      }
    }
  }


  if (!firstContact)  //if we have not yet received any data...
  {
  //display "Waiting" page
     background(0, 100, 127);
    fill(255);
    // noStroke();
    // text("Welcome", 250, 250);
    // text("Click Circle to Begin", width/2, height/3);
    // circle(width/2, height/2, 140);
    // fill(0);
    // text("START RX", width/2, height/2);

   circle(random(0,500),random(0,500),10);
    circle(300,300,300);
    fill(0);
    noStroke();
    textSize(28);
    text("Click To Enter --->",1,300);
    fill(227,0,0);
    rect(230,270,150,50);
  }
  else  //if we have established contact with the serial port, show main sketch...
{

  background (20,100,0);
  fill(255,0,0); 
 text("'A' in the Haystack",5,50);
 text("Score", 250, 50);
 text(Score,350,50);
for (let i = 20; i < 500; i += 50)
{
fill(0,0,0);
circle(i,100,50);
circle(i,150,50);
circle(i,200,50);
circle(i,250,50);
circle(i,300,50);
circle(i,350,50);
circle(i,400,50);
circle(i,450,50);
}
fill(0,0,0);
circle(50 + pot1,50 + pot2,60);
fill(255,255,255);
circle(50 + pot1,50 + pot2,50);
fill(0,0,0);
strokeWeight(10);
stroke(101,67,33);
strokeWeight(10);
line(50 + pot1,75 + pot2,50 + pot1, 110 + pot2);
currentTime = millis();
if (currentTime - lastTime >= timerInterval)
{
  lastTime = currentTime; 
  Tom = random(10,475);
  Jerry = random(60,475);

}

if (rxFlag) // if rxFlag is true, we are receiving data, so...
    {     
     twoFace = true;
      fill(255,255,255);
      rect(390,18,180,40);
       fill(0);
      noStroke();
      text("PAUSE", 400,50);  // display "PAUSE RX" on the button
      strokeWeight(10);
      stroke(0,0,0);
       line(0,57,500,57);
       text("A",Tom,Jerry);

    }
    else  //if rxFlag is false, we are not receiving data, so...
    {
      twoFace = true;
      fill(255, 0, 0 );
      noStroke();
      text("START",400 ,50);  //display "PAUSED" on the button
    }
  }

  if (dist(50 + pot1,50 + pot2,Tom,Jerry) <40 && button1 == 1) 
  {
Score += 1
 Tom = random(10,475);
  Jerry = random(60,475);
  button1 = 0; 

  }
  




}



function mousePressed() //if mouse is pressed...
{


  if (dist(mouseX, mouseY, Rick, Morty) < 70) // if mouse postion is within the radius of the circle button...
  {
    if (!port.opened()) // if the port isn't open yet...
    {
      port.open(baudRate); // open the serial port (choose your board in the browser pop-up)
    }

    rxFlag = !rxFlag; // toggle the rxFlag

    if (rxFlag) //if rxFlag is true, we want to receive data, so...
    {
      port.write('A'); // send 'A' to the serial port to indicate that we want to receive data
    }
    else  //if rxFlag is false, we want to pause receiving data, so...
    {
      port.write('B'); // send 'B' to the serial port to indicate that we want to pause receiving data
    }
  }
  if (twoFace == true)
  {
Rick = 490
Morty = 50

  }
}
