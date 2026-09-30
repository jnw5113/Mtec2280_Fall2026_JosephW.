int timmy = 1;
const int ledPin = 4;
const int ledPin1 = 5;
const int ledPin2 = 6;
const int ledPin3 = 7;
int wbls = 500;
void setup() 
{
  pinMode(ledPin,OUTPUT);
  pinMode(ledPin1,OUTPUT);
  pinMode(ledPin2,OUTPUT);
  pinMode(ledPin3,OUTPUT);
  Serial.begin(115200);
  // put your setup code here, to run once:

}

void loop() {
  timmy++;

  Serial.println(timmy);
    Serial.println("you will get it");
    if (timmy>7000) 
    { 
digitalWrite(ledPin, HIGH);
delay(wbls);
digitalWrite(ledPin, LOW);
delay(wbls);

    }
    else
    {
digitalWrite(ledPin,LOW);
    }

    if (timmy > 7008)
    {
digitalWrite(ledPin1, HIGH);
delay(wbls);
digitalWrite(ledPin1, LOW);
delay(wbls);

    }
    else 
{
digitalWrite(ledPin2,LOW);
}

if (timmy>7024) 
    { 
digitalWrite(ledPin2, HIGH);
delay(wbls);
digitalWrite(ledPin2, LOW);
delay(wbls);

    }
    else
    {
digitalWrite(ledPin2,LOW);
    }
if (timmy>7028) 
    { 
digitalWrite(ledPin3, HIGH);
delay(250);
digitalWrite(ledPin3, LOW);
delay(500);
digitalWrite(ledPin,HIGH);
delay(250);
digitalWrite(ledPin,LOW);

    }
    else
    {
digitalWrite(ledPin3,LOW);
    }
  // put your main code here, to run repeatedly:


}