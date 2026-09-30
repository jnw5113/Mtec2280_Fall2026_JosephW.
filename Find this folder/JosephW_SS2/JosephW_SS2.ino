const int buttonPin = 41;
const int ledPin = 4; 
const int ledPin2 = 5; 
const int ledPin3 = 6;
const int ledPin4 = 7;
bool buttonState = 0;
bool lastButtonState = 0;
bool toggle = 0;
int timmy = 1;
void setup() 
{
pinMode(buttonPin,INPUT_PULLUP);
pinMode(ledPin,OUTPUT);
pinMode(ledPin2,OUTPUT);
pinMode(ledPin3,OUTPUT);
pinMode(ledPin4,OUTPUT);
Serial.begin(115200);

}

void loop() 
{ 
  Serial.println(timmy);
buttonState = !digitalRead(buttonPin);
digitalWrite(ledPin,toggle);
digitalWrite(ledPin2,toggle);
if(buttonState && !lastButtonState) // low to high 
{
  toggle = !toggle;
  timmy++;
}

if (timmy > 10)
{
digitalWrite(ledPin3,toggle);
digitalWrite(ledPin,toggle);
delay(400);
digitalWrite(ledPin,LOW);
delay(200);
digitalWrite(ledPin2,toggle);
delay(600);
digitalWrite(ledPin2,LOW);
delay(150);
}

else 
{
  digitalWrite(ledPin3,LOW);
delay(1000);
}
if (timmy >20)
{
digitalWrite(ledPin4,toggle);

}

else 
{
  digitalWrite(ledPin4,LOW);
}

if (timmy > 28)
{
digitalWrite(ledPin,toggle);
delay(random(0,1000));
digitalWrite(ledPin,LOW);
delay(random(0,1000));
digitalWrite(ledPin4,toggle);
delay(random(0,1000));
digitalWrite(ledPin4,LOW);
delay(random(0,1000));
}

}
