//Serial Handshaking
//-Bi-Directional Serial communication betweeb Mircocontroller & P5,JS
// -Transmit(tx) and recieves (Rx) Serial Data
// - Recieves a control byte of either ASCII charcater 'A' or 'B'
// - Sends semsor sensor data when 'A' byte recieved 
// - Sends status message when 'B' byte recieved 

const int adcPin_1 = 1;
const int adcPin_2 = 2; 
const int buttonPin_1 = 41;
const int buttonPin_2 = 42;
const int ledPin = 4; 

bool buttonState_1 = 0;
bool buttonState_2 = 0;

int adcRead_1 = 0;
int adcRead_2 = 0;
int inByte = 0;


void setup() 
{
  pinMode(buttonPin_1, INPUT_PULLUP);
 pinMode(buttonPin_2, INPUT_PULLUP);
 pinMode(ledPin,OUTPUT);
 digitalWrite(ledPin,0);
 analogReadResolution(10);
 Serial.begin(115200);

  // put your setup code here, to run once:

}

void loop() 
{
  if (Serial.available()) // if serial buffer is greater thab zero...
  {
    inByte = Serial.read(); // store incoming byte
    if (inByte == 'A') // if incoming byte us 'A' ....
    {
      digitalWrite(ledPin,1); //turn led on
      adcRead_1 = analogRead(adcPin_1);
      adcRead_2 = analogRead(adcPin_2);
      buttonState_1 = !digitalRead(buttonPin_1);
      buttonState_2 = !digitalRead(buttonPin_2);
      Serial.print(buttonState_1);
      Serial.print(',');
      Serial.print(buttonState_2);
       Serial.print(',');
       Serial.print(adcRead_1);
        Serial.print(',');
        Serial.print(adcRead_2);
        Serial.print('\n'); 
    }
    else if (inByte == 'B')
    {
        digitalWrite(ledPin,0);
        Serial.println("Sensor Update Paused...");

    }

    else // if neither a nor B Rx'ed
    {
      digitalWrite (ledPin,0);
      Serial.println("Rx Byte is neither 'A' nor 'B'");

    }
  }
  // put your main code here, to run repeatedly:

}
