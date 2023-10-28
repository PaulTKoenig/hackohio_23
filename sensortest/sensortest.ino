#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_ADXL343.h>
#include <Adafruit_L3GD20_U.h>

Adafruit_ADXL343 accel = Adafruit_ADXL343(12345);
Adafruit_L3GD20_Unified gyro = Adafruit_L3GD20_Unified(20);

float accel_x;
float accel_y;

float gyro_z;

int pos_x = 0;
int pos_y = 0;
float angle = 0;
float test_angle = 0;

float temp_accel_x[100];
float temp_accel_y[100];
float temp_gyro[100];
float gyro_val;


uint32_t start_millis;
uint32_t end_millis;
double time_diff;

void setup(void)
{
  Serial.begin(500000);
  while (!Serial);

  if(!accel.begin() || !gyro.begin())
  {
    /* There was a problem detecting the ADXL343 ... check your connections */
    Serial.println("somethings not connected");
    while(1);
  }

  accel.setRange(ADXL343_RANGE_16_G);
  accel.setDataRate(ADXL343_DATARATE_3200_HZ);
  gyro.enableAutoRange(true);

  delay(1000);

  start_millis = millis();

  for (int i = 0; i < 100; i++) {
    sensors_event_t event_gyro;
    gyro.getEvent(&event_gyro);
    temp_gyro[i] = event_gyro.gyro.z;
  }
  test_angle += 0.0000001*temp_gyro[0];
  Serial.println(test_angle);
  
  end_millis = millis();
  time_diff = double(end_millis - start_millis) / 100000.0;
  Serial.print(time_diff);
  Serial.print("   ");
}

void loop(void)
{
  // get acceleration data
//  sensors_event_t event_accel;
//  accel.getEvent(&event_accel);
//  
//  accel_x = event_accel.acceleration.x;
//  accel_y = event_accel.acceleration.y;


  // get gyroscope data
//  sensors_event_t event_gyro;
//  gyro.getEvent(&event_gyro);
//
//  gyro_z = event_gyro.gyro.z;

//  Serial.print("accel: "); Serial.print(accel_x);
//  Serial.print("  gyro: "); Serial.println(gyro_z);


    sensors_event_t event_gyro;
    gyro.getEvent(&event_gyro);
    gyro_val = event_gyro.gyro.z;
    angle += time_diff*gyro_val;

  Serial.println(angle);
  
  
}
