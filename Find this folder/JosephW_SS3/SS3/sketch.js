/*
P5.JS SERIAL READ

An example p5.js sketch that uses the p5.serialport library to read an 8-bit (1-byte) value from the serial port.
The size and fill color of a circle changes according to the received value, which is also displayed on the canvas.

This code is designed to work with the "Arduino_Serial_Write" example sketch.

NOTES:
- You must run and establish a serial connection with p5.serialcontrol app to use this code:
  https://github.com/p5-serial/p5.serialcontrol/releases/tag/0.1.2

- Remember to add the p5.serialport library to your index.html file. Add this line below <script src="libraries/p5.min.js"></script>:

    <script language="javascript" type="text/javascript" src="https://cdn.jsdelivr.net/npm/p5.serialserver@0.0.28/lib/p5.serialport.js"></script>

- Make sure the baud rate in options matches the baud rate in your Arduino code.
- Remember to change the portName variable to match your own serial port.
*/

let serial; // declare variable for an instance of the serialport library
let portName = '/dev/tty.usbserial-210';  // fill in your serial port name here
let options = {baudRate: 9600}; // change the baud rate to match your Arduino code
let inData = 0; // declare variable for storing incoming serial data
let lilChange = 45;
let isChange = false;
function setup() //setup function runs once at beginning
{
  //P5 SerialPort Setup
  serial = new p5.SerialPort();             // make a new instance of the serialport library
  serial.on('list', printList);             // set a callback function for the serialport list event
  serial.on('connected', serverConnected);  // set callback for connecting to the server
  serial.on('open', portOpen);              // set callback for the port opening
  serial.on('data', serialEvent);           // set callback for when new data received
  serial.on('error', serialError);          // set callback for errors
  serial.on('close', portClose);            // set callback for closing the port
 
  serial.list();                            // list the serial ports
  serial.open(portName, options);           // open a serial port

  //TYPICAL P5.JS SETUP
  createCanvas(500, 500); //set size of canvas
  textSize(72); // set text size
  textAlign(CENTER, CENTER);  // set text alignment

}









function draw() //  draw function loops forever at frame rate
{

  isChange = lilChange;
  if (inData < 10)
  {
isChange = true
  }
  background(inData, 125 - lilChange - lilChange, 200 - lilChange - lilChange);  // clear frame with background color each draw loop

  fill(inData + 50 + lilChange); // set fill color using incoming serial data
  let xAxis = map(inData, 0, 255, 10, width); // scale incoming data from 0 to 255 into circle diameter
  circle(inData, 0, 250);  // draw circle in center of canvas with diameter based on serial data

  fill(0);  // set fill color to black for text
  text(inData, width/2, height - height/8); // display incoming serial data on canvas
  fill(255 - lilChange,0, 0);
  triangle(150, 300, 355, 300, 252, 195); //roof
 fill(210- lilChange,180- lilChange,140-lilChange); //house square
 square(150,300,205);
  fill(120-lilChange,120-lilChange,120-lilChange);
  square(150,300,50);
  square(150,400,50);
  square(305,300,50);
  square(305,400,50);
  fill(0)
  rect(230,400,50,105)
  fill(255-lilChange,255,0);
  circle(270,460,10);
for (let i = 0; i < width; i += 5)
  {
stroke(0,255 - lilChange,0);
line(i, 500, i, 450,);
noStroke()
  }
  


}
 







































//////// Arduino to p5 needed code 








function printList(portList) // gets called when the serial.list() function is called
{
  print("List of Available Serial Ports: ");
  for (var i = 0; i < portList.length; i++) 
  {
    print(i + portList[i]); //print list of available serial ports to console
  }
}

function serverConnected() //gets called when we connect to the serial server
{
  print("CONNECTED TO SERVER");
}
 
function portOpen() //gets called when the serial port opens
{
  print("SERIAL PORT OPEN");
}
 
function serialEvent() //gets called when new data arrives
{
  inData = Number(serial.read()); //Store incoming data as a number
 // print(inData);
  inData2 = Number(serial.read());
}
 
function serialError(err) //gets called when there's an error
{
  print('ERROR: ' + err);
}
 
function portClose() //gets called when the serial port closes
{
  print("*____SERIAL PORT CLOSED");
}