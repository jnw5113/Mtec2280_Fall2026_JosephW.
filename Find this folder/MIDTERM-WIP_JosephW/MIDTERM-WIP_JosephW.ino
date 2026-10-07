const int pinRGB = 38;
const int potPin = 2;
const int numReads = 256;
int reading[numReads];
int count = 0; 
//const int buttonPin = 41;
//bool buttonState = 0;

void setup() 
{

analogReadResolution(11);
Serial.begin(115200);
//pinMode(buttonPin,INPUT_PULLUP);
  // put your setup code here, to run once:

}

void loop() 
{

reading[count] = analogRead(potPin);
count++;
//buttonState = !digitalRead(buttonPin);
if (count >= numReads)
{
  count = 0;
}

int sum = 0;
for (int i = 0; i < numReads; i++)
{

  sum += reading[i];
}
//Serial.println(buttonState);
int analogValue = sum / numReads;
int mapVal = map(analogValue,0,1690,0,255); // mapval allows you to scale ranges. 
rgbLedWrite(pinRGB,mapVal,0,0);
   // put your main code here, to run repeatedly:

}
