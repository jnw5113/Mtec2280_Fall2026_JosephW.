const int adcPin = 1;
int adcRead = 0; 
int lastTime = 0;
int currentTime = 0;
int timerInterval = 2;



void setup() 
{
  Serial.begin(9600);
  analogReadResolution(8);
  // put your setup code here, to run once:

}

void loop() 
{
  adcRead = analogRead(adcPin);
  currentTime = millis();

  if (currentTime - lastTime >= timerInterval)
  {

  lastTime = currentTime;
  Serial.write(adcRead); //sends binary date to UART
//Serial.println(adcRead);
  }
  // anything you add here will run more frequently than code insode of above statement 
}
