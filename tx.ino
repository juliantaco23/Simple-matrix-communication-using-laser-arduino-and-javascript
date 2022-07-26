#define LED_PIN 7
#define BUTTON_PIN A0
#define PERIOD 30


char* string = "CA54X011100010N100010101N011101010N110011100N100001000N010010010N001100111X\n";   //este es nuestro mensaje 
int string_length;

void setup() 
{
  pinMode(LED_PIN, OUTPUT);
  //pinMode(BUTTON_PIN, INPUT_PULLUP);
  string_length = strlen(string);
}

void loop() 
{
  digitalWrite(LED_PIN, HIGH);
  delay(1000);
  for(int i = 0; i < string_length; i ++)
  {
    send_byte(string[i]);
  }
  delay(1000);
}

void send_byte(char my_byte)
{
  digitalWrite(LED_PIN, LOW);
  delay(PERIOD);

  //transmission of bits
  for(int i = 0; i < 8; i++)
  {
    digitalWrite(LED_PIN, (my_byte&(0x01 << i))!=0 );
    delay(PERIOD);
  }

 digitalWrite(LED_PIN, HIGH);
  delay(PERIOD);
  
}
