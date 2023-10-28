#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_ADXL343.h>
#include <Adafruit_L3GD20_U.h>

Adafruit_ADXL343 accel = Adafruit_ADXL343(12345);
Adafruit_L3GD20_Unified gyro = Adafruit_L3GD20_Unified(20);

int threshold = 12;
int steps, flag = 0;
uint32_t last_step_time = 0;
float x_pos, y_pos = 0;
int last_time;
float true_angle, gyro_val;

bool state = false;

void setup()
{
  Serial.begin(115200);
  while (!Serial);
  pinMode(LED_BUILTIN, OUTPUT);

  if (!accel.begin() || !gyro.begin())
  {
    /* There was a problem detecting the ADXL343 ... check your connections */
    Serial.println("somethings not connected");
    while (1);
  }

  accel.setRange(ADXL343_RANGE_16_G);
  accel.setDataRate(ADXL343_DATARATE_3200_HZ);
  gyro.enableAutoRange(true);
  last_time = millis();
}

void sendFloat(float floatValue) {
  byte *floatBytes = (byte *)&floatValue;

  for (int i = 0; i < 4; i++) {
    Serial.write(floatBytes[i]);
  }
}

void loop() {

  if (millis() - last_step_time > 50) {
    if (get_steps()) {
      x_pos -= sin(true_angle) * 3;
      y_pos += cos(true_angle) * 3;
      sendFloat(x_pos);
      sendFloat(y_pos);
      sendFloat(true_angle);
      digitalWrite(LED_BUILTIN, state);
      state != state;

    }
    last_step_time = millis();
  }

  if (digitalRead(A3) == 1) {
    true_angle = 0;
    x_pos = 0;
    y_pos = 0;
  }

  sensors_event_t event_gyro;
  gyro.getEvent(&event_gyro);
  gyro_val = event_gyro.gyro.z;

  // integrate gyro to get angle
  true_angle += (double(millis() - last_time) / 1000.0) * gyro_val;
  last_time = millis();
}

bool get_steps() {
  sensors_event_t event_accel;
  accel.getEvent(&event_accel);
  float zaccl = event_accel.acceleration.z;

  if (abs(zaccl) > threshold && flag == 0) {
    steps += 1;
    flag = 1;
    return true;
  }
  if (abs(zaccl) < threshold && flag == 1) {
    flag = 0;
  }
  return false;
}
