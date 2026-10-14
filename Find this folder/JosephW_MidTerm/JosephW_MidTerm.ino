const int piezoPin = 1;
int frequency = 600;
int pulseWidth = 200;
const int resolutionPWM = 12; 
const int potPin1 = 2;
const int potPin2 = 4;
const int buttonPin = 7;
bool buttonState = 0;
bool lastButtonState = 0;
bool toggle = 0;
bool fallToggle = 0;
const int buttonPin1 = 18;
bool buttonState1 = 0;
bool lastButtonState1 = 0;
bool toggle1 = 0;
bool fallToggle1 = 0; 
const int ledPin = 5;
const int ledPin1 = 6;
int atM = 840;
long mtA = 1000;
void setup() 
{
  pinMode(ledPin,OUTPUT);
  pinMode(ledPin1,OUTPUT); 
digitalWrite(ledPin,HIGH);
 Serial.begin(115200);
 analogReadResolution(8);
// ledcAttach(piezoPin,frequency,resolutionPWM);
pinMode(buttonPin,INPUT_PULLUP);
pinMode(buttonPin1,INPUT_PULLUP);
  // put your setup code here, to run once:

}

void loop() 
{
 
  buttonState1 = !digitalRead(buttonPin1);
  buttonState = !digitalRead(buttonPin);
  frequency = map(analogRead(potPin1), 0,255,200,800);
  pulseWidth = map(analogRead(potPin2), 0, 255, 10, 245); 
 ledcWriteTone(piezoPin,frequency); 
  ledcWrite(piezoPin,pulseWidth);
delay(10);
if (buttonState && !lastButtonState)
{

  toggle = !toggle;
}

if (!buttonState && lastButtonState)
{
fallToggle = !fallToggle;
}
lastButtonState = buttonState;

if (buttonState1 && !lastButtonState1 )
{
  toggle1 = !toggle1;
}
 
 if (!buttonState1 && lastButtonState1)
 {

  fallToggle1 = !fallToggle1;
 }

lastButtonState1 = buttonState1;
digitalWrite(ledPin,toggle1);
if (toggle1)
{
tone(piezoPin,analogRead(potPin2));       // Play concert A (440 Hz)
delay(analogRead(potPin1));                 // Let it play for one second          // Stop the tone
tone(piezoPin,820);    
delay(100);
tone(piezoPin,820);    
delay(120);
tone(piezoPin,820);    
delay(140);
tone(piezoPin,820);    
delay(250);
tone(piezoPin,610.5);
delay(300);
tone(piezoPin,610.5);
delay(3500);
tone(piezoPin,610.5);
delay(400);
tone(piezoPin,610.5);
delay(450);
tone(piezoPin,410,2000);
delay(450);

//delay(150);
//tone(piezoPin,940,1200);
//delay(300);
Serial.println("helloWrold"); 

}

if (toggle)
{
atM = map(analogRead(potPin1), 0,255,200,2000);
mtA = map(analogRead(potPin1), 0,255,100,1500);
tone(piezoPin,atM*2,mtA*2);
Serial.println("byeWorld");

}
 Serial.println(buttonState);

}