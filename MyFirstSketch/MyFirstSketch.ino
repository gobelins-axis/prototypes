// #include <Adafruit_NeoPixel.h>;

// int PIN = 12;
// int NUMPIXELS = 2;

// Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

void setup()
{
    pinMode(LED_BUILTIN, OUTPUT);
}

void loop()
{
    // pixels.clear();

    digitalWrite(LED_BUILTIN, HIGH);
    delay(1000);
    digitalWrite(LED_BUILTIN, LOW);
    delay(1000);
}
