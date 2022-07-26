
from xml.dom.pulldom import END_ELEMENT
import pyfirmata
import time

threshold = 3.80
bitTime = 250/1000 #Time [ms]
readPin = 4
counter = 0
counterHelp = 0

# connect with board
try:
    board = pyfirmata.ArduinoMega('COM4',baudrate=9600)
    print("Connect to Arduino")

except:
    print("Error during connection")

board.analog[readPin].mode = pyfirmata.INPUT 
it = pyfirmata.util.Iterator(board)  
it.start()


def checkForStartTheSequence():
    print("start sequence")
    startSequence = readEntryBinary()
    print("aa")
    while (True) :
        if(startSequence != None):
            startSequence +=readEntryBinary()
            if (startSequence[len(startSequence)-13:len(startSequence)-1] =="111111111111") :
                print("b")
                waitForNextZero()
                print("c")
                break
        else:
            startSequence = readEntryBinary()

def getLastTwelveBits(currentSequence):
    if (len(currentSequence) <= 12):
        if(readEntryBinary() != None):
            return currentSequence + readEntryBinary()
    else:
        print(currentSequence[1:] + readEntryBinary()[len(currentSequence)-12:])
        return currentSequence[1:] + readEntryBinary()

def readEntryBinary():
  time.sleep(float(0.5*bitTime))  
  inputVoltage = board.analog[readPin].read()
  if(inputVoltage != None):
    inputVoltage = float(board.analog[readPin].read()) * 5
    time.sleep(float(0.5*bitTime))
    if (inputVoltage > threshold):  
        return "1"
    else: 
        return "0"
  else:
    return None

def waitForNextZero():
    while (True) :
        mbit=readEntryBinary(); 
        if(mbit[0]=='0'):
          break

def fromHexaToSymbol(hexa):
  if       (hexa ==("0000000")): return "0"
  elif  (hexa ==("000001")): return "1"
  elif  (hexa ==("000010")): return "2"
  elif  (hexa ==("000011")): return "3"
  elif  (hexa ==("000100")): return "4"
  elif  (hexa ==("000101")): return "5"
  elif  (hexa ==("000110")): return "6"
  elif  (hexa ==("000111")): return "7"
  elif  (hexa ==("001000")): return "8"
  elif  (hexa ==("001001")): return "9"
  elif  (hexa ==("001010")): return "A"
  elif  (hexa ==("001011")): return "B"
  elif  (hexa ==("001100")): return "C"
  elif  (hexa ==("001101")): return "D"
  elif  (hexa ==("001110")): return "E"
  elif  (hexa ==("001111")): return "F"
  elif  (hexa ==("010000")): return "N"
  elif  (hexa ==("110000")): return "X"
  elif  (hexa ==("111000")): return "Z"
  else:                      return "?"



while(True):
    checkForStartTheSequence()
    print('0', end='')
    while(True):
        counter += 1   
        counterHelp += 1                          
        if(counter%6 == 0):
            print('\n')
            counter = 0
        print((readEntryBinary())[0], end='')



