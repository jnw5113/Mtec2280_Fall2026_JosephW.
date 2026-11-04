/*
<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
||||||||||||||||||||||||||||||||||||||||||||
||    "Multiple Sensors to Processing"    ||
||          "String Version"              ||
||||||||||||||||||||||||||||||||||||||||||||     
- Example of sending a String of Comma Separated Values via Serial UART.
- We are using the ASCII character '/n', aka "New Line", aka "Line Feed" to signal end of transmitted message. 
- Data is sent via Serial.print() INSTEAD of Serial.write(), as we did in the previous example.
<><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
*/

//Define Pins
const int adcPin_1 = 1;
const int adcPin_2 = 2;
const int buttonPin_1 = 4;
const int buttonPin_2 = 42;

//Button Variables
bool buttonState_1 = 0;
bool buttonState_2 = 0;

//Pot Variables
int adcRead_1 = 0;
int adcRead_2 = 0;

//Software Timer Variables
int lastTime = 0;
int currentTime = 0;
int timerInterval = 5; //milliseconds

//piezo Pin
const int piezoPin = 5;       // piezo buzzer pin
const int resolutionPWM = 12; // resolution of PWM duty cycle, 12 is max value
int pulseWidth = 127;         // 8-bit 0-255 range, 127 is 50% Duty Cycle
int frequency = 300;          // frequency, measured in Hz (or cycles per second)
int freqMin = 300;            // min frequency, in Hz
int freqMax = 600;           // max frequency, in Hz
int bigBelly = 0 ;
void setup() 
{
  //set button pin modes to Input with internal Pullup resistors
  pinMode(buttonPin_1, INPUT_PULLUP);
  pinMode(buttonPin_2, INPUT_PULLUP);
  analogReadResolution(10); //set ADC read to 10-bit (0-1023) range
  Serial.begin(115200);  //start serial comm @ 115200 baud rate
  ledcAttach(piezoPin, frequency, resolutionPWM); // attach PWM output to piezoPin
}


void loop() 
{
  //read analog pot value
  adcRead_1 = analogRead(adcPin_1);
  adcRead_2 = analogRead(adcPin_2);
  //read button state on pins [NOTE: logic is inverted due to Pullup config]
  buttonState_1 = !digitalRead(buttonPin_1);
  buttonState_2 = !digitalRead(buttonPin_2);
  currentTime = millis();                       //read current elapsed time
  if (currentTime - lastTime >= timerInterval)  //if we have reached our timer interval...
  {
    lastTime = currentTime;  //store current time as lastTime so we know when timer last triggered

    //Send Data to P5.JS Sketch via Serial UART using print() and Comma Separation
    Serial.print(buttonState_1);  //send 1st message
    Serial.print(',');            //send comma character
    Serial.print(buttonState_2);  //send 2nd message
    Serial.print(',');            //send comma character
    Serial.print(adcRead_1);      //send 3rd message
    Serial.print(',');            //send comma character
    Serial.print(adcRead_2);      //sends 4th message            //sends comma character   
    Serial.print('\n');           //send "Line Feed", or "New Line" character, or use println() instead.
  }
    frequency = map(adcRead_1, 0, 1023, freqMin,freqMax);
  bigBelly = map(adcRead_2, 0,1023,0,10);
  ledcWrite(piezoPin,frequency * bigBelly);
}
