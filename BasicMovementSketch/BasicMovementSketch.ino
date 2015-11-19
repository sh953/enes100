#include <SoftwareSerial.h>
#include "enes100.h"

int enable1Pin = 2;
int enable2Pin = 3;
int in1Pin = 4;
int in2Pin = 5;
int in3Pin = 6;
int in4Pin = 7;
int x;
int y;
int orientation;
int FACING_FORWARD = 0;
int FACING_BACKWORDS = 3.14;

int degree;

int MARKER = 117;


SoftwareSerial sSerial(8, 9); \


enes100::RfClient<SoftwareSerial> rf(&sSerial);

enes100::Marker marker;


void setup() {

  sSerial.begin(9600);
  Serial.begin(9600);

  delay(500);

  rf.resetServer();
  rf.sendMessage("1141 Test.");
  Serial.println("1141 Hello");

  pinMode(in1Pin, OUTPUT);
  pinMode(in2Pin, OUTPUT);
  pinMode(in3Pin, OUTPUT);
  pinMode(in4Pin, OUTPUT);
  pinMode(enable1Pin, OUTPUT);
  pinMode(enable2Pin, OUTPUT)

  delay(500);


  rf.resetServer();
}

void loop() {
  delay(100);
  if (rf.receiveMarker(&marker, MARKER)) {
     /*if (theta>.01 && theta<-.01)
        
     }*/
  }
}



void start() {
  digitalWrite(enable1Pin, HIGH);
  digitalWrite(enable2Pin, HIGH);
}

void halt() {
  digitalWrite(enable1Pin, LOW);
  digitalWrite(enable2Pin, LOW);
}
void moveBackword() {
  digitalWrite(in1Pin, LOW);
  digitalWrite(in2Pin, HIGH);
  digitalWrite(in3Pin, HIGH);
  digitalWrite(in4Pin, LOW);
}

void moveForward() {
  digitalWrite(in1Pin, HIGH);
  digitalWrite(in2Pin, LOW);
  digitalWrite(in3Pin, LOW);
  digitalWrite(in4Pin, HIGH);
}

void leftTurn(double degreeIn) {
  double radians = degreeIn * 0.0174533;
  do {
    digitalWrite(in1Pin, LOW);
    digitalWrite(in2Pin, HIGH);
    digitalWrite(in3Pin, LOW);
    digitalWrite(in4Pin, HIGH);
  } while ();
}

void rightTurn() {
  digitalWrite(in1Pin, HIGH);
  digitalWrite(in2Pin, LOW);
  digitalWrite(in3Pin, HIGH);
  digitalWrite(in4Pin, LOW);
}

/*
bool isFinished = false;
x = getx();
y = gety();
orientation = getorientation(); //

do {
  if (y < 1000)
  {
    if (orientation = < 270 && orientation >= 90)
      turnRight(2550);
    else if (orientation > 270 || orientation < 90)
      turnLeft(2550);
    else
      isFinished = true;
  }
  if (y > 1000)
  {
    if (orientation >= 270 && orientation < 90)
      turnRight(2550);
    else if (orientation < 270 || orientation < 90)
      turnLeft(2550);
    else
      isFinished = true;
  }
} while (!isFinished)

  do {
    goForward();
    if (y < 980)
      goLeft(100);
    if (y > 1020)
      goright(100);
  } while (x < 2000)

    goLeft(2550);

do {
  goForward();
  if (x < 1980)
    goRight(100);
  if (y > 2020)
    goLeft(100);
} while (y < 1300)

  goRight(2550);

do {
  goForward();
  if (y < 1280)
    goLeft(100);
  if (y > 1320)
    goright(100);
} while (x < 3000)

}
void goRight(int duration) {

}
void goForward() {

}
void goLeft(int duration) {

}
int gety() {

}
int getx() {

}
int getOrientation() {
  //convert arbitrary value to degrees. 0 degrees being
  //directly right facing
}
*/


/*

void setup() {
  sSerial.begin(9600);
  Serial.begin(9600);

  delay(500);


  rf.resetServer();
  rf.sendMessage("1141 Hi Mike.");
  Serial.println("1141 hello");
}

void loop() {
  delay(100);
  //rf.ReceiveMarker returns true if a marker was received
  //before timing out, and false otherwise.
  if(rf.receiveMarker(&marker, 117)){
    Serial.println(marker.x);
    x-coor=marker.x;
    y-coor=marker.y;


    if(marker.x >= 1.0) {
      rf.sendMessage("t1 reached right side");
    }
  }
}*/

