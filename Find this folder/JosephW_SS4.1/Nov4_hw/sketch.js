/*
P5.JS SERIAL READ STRING

An example p5.js sketch that uses the p5.webserial library to read comma-separated string values from the serial port.
The size and fill color of a circle changes according to the received values, which are also displayed on the canvas.

This code is designed to work with the "Arduino_Serial_Multi_String" example sketch.

p5.webserial library repo: 
https://github.com/gohai/p5.webserial

NOTES:
- You must open this sketch in a browser that supports Web Serial API (like Chrome or Edge).
- Make sure the baud rate matches in Arduino sketch.
- Only one serial connection can be open at a time:
    - Close Arduino IDE Serial Monitor before running p5 sketch.
    - Close p5 sketch before uploading new code to microcontroller.

- Remember to add the p5.serialport library to your index.html file. Add this line in the <head> section, below <script src="libraries/p5.min.js"></script>:
    <script src="https://unpkg.com/@gohai/p5.webserial@1/libraries/p5.webserial.js"></script>
*/

let port;                       // variable for Web Serial port instance
let baudRate = 115200;          // NOTE: baud rate must match in Arduino sketch
let sensors = [0, 0, 0, 0];     // array for: [button1, button2, pot1, pot2,piezobuzzer]

let r, g, b;                    // background color
let diameter = 100;        // circle diameter
let growth = 50;                   // growth rate

function setup() 
{
  // canvas and text setup
  createCanvas(800, 800);
  textSize(64);
  textAlign(CENTER, CENTER);
  strokeWeight(5);
  stroke(0);

  //serial communication setup
  port = createSerial();          // create the serial port instance

  let used = usedSerialPorts();   // store previously used serial ports

  if (used.length > 0)            // if there are previously used ports...
  {
    port.open(used[0], baudRate); // reopen last used serial port
  }
  
}

function draw() 
{
  //***___SERIAL READ___START
  let inString = port.readUntil('\n');

  if (inString.length > 0) //if we received serial data...
  {
    inString = inString.trim(); // remove newline char at end of message

    let parts = inString.split(','); // split incoming string by comma

    if (parts.length === 4) //if we received 4 values...
    {        
      for (let i = 0; i < parts.length; i++) 
      {
        sensors[i] = Number(parts[i]); // convert every String value into Number
      }
    }

    port.clear(); // clear the buffer after reading
    //NOTE: VERY IMPORTANT TO CLEAR BUFFER each frame, otherwise old data will accumulate and cause lag
  }
  //***___SERIAL READ___END

  //r = map(sensors[2], 0, 1023, 0, 255);    
  //g = map(sensors[3], 0, 1023, 0, 255);
  //b = sensors[0] * 255;
 appleTree = map(sensors[3] + sensors[4], 0 , 1023, 20 , 800);
 twigTree = map(sensors[2], 0 ,1023, 20, 800);
  background(230,0,0);
  fill(0);
 stroke(0);
//  circle(twigTree,appleTree,900);
//   strokeWeight(4);
//  line(35,0,35,110);
//  line(35,35,200,35);
//  line(35,110,200,110);
//  strokeWeight(8);
//  stroke(0,100,100);
//  line(200,35,200,110); 
//  circle(50 + twigTree, 50 + appleTree, 50);
//  circle(70 + twigTree, 70 + appleTree, 70);
{

}

if (sensors[0] == 1)
{
  
  rect(30 + appleTree, 20 + twigTree, 55, 50, 20);
}

if (sensors [1] == 1)
{
  

kiwiTree = map(sensors[3], 0 , 1023, 20 , 600);
figTree = map(sensors[2], 0 ,1023, 20, 600);
fill(255);
rect(30 + kiwiTree + 40, 20 + figTree, 55, growth, 20);
fill(255);
rect(160 + kiwiTree + 40, 20 + figTree, 55, growth, 20);
fill(30,80,120);
circle(80 + kiwiTree, 80 + figTree, 80 );
circle(200 + kiwiTree, 80 + figTree, 80 );
fill(50,60,70);
line(110 + kiwiTree, 110 + figTree, 168 + kiwiTree, 110 + figTree);
circle(diameter + kiwiTree,200 + figTree,diameter);

line(80 + kiwiTree, 20 + figTree, 140 + kiwiTree, 20 + figTree);
line(200 + kiwiTree , 20 + figTree, 240 + kiwiTree ,20 + figTree);

 if (kiwiTree > 100)
 {
 diameter++ 

 }

 if (figTree > 100)
 {
growth++
 }

  if (kiwiTree < 100 & diameter > 60)
  {

    diameter-- 
  }

  if (figTree < 100 & growth > 60)
  {
    growth-- 
  }

}
 // fill(255 * !sensors[1]);

  // if (sensors[0]) 
  // {
  //   diameter += grow;
  // }

  // if (sensors[1]) 
  // {
  //   diameter -= grow;
  // }
 // diameter = constrain(diameter, 20, width - 10);
 // circle(width / 2, height / 2, diameter);

  //fill(255);
  //text(sensors, width / 2, height - 120);

  // if (port.opened()) // if port is connected...
  // {
  //   text('Connected', width / 2, 120); // display connected status
  // }
  // else // if port is not connected...
  // {
  //   text('Click to Connect', width / 2, 120); // display instructions
  // }


}

function mousePressed() 
{
  if (!port.opened()) //if the port is not connected...
  {
    port.open(baudRate); // open the serial port using selection pop-up
  }
}