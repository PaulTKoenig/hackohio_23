import serial
import time
import struct
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from math import cos, sin
import threading
from queue import Queue

data_queue_receive = Queue()
data_queue_get = Queue()


x_pos_list = [0]
y_pos_list = [0]

def update_data():
    print('in the route')
    try:
        with serial.Serial('COM13', 115200) as ser:
            print('Ready to track')
            global data_queue_receive
            while True:
                while ser.in_waiting == 0:
                    pass

                time.sleep(0.01)
                buf = ser.read(size=12)
                if struct.unpack('f', buf[0:4])[0] == 0:
                    continue
                x_pos = struct.unpack('f', buf[0:4])[0]
                y_pos = struct.unpack('f', buf[4:8])[0]
                # global angle
                angle = struct.unpack('f', buf[8:12])[0]

                x_pos_list.append(x_pos)
                y_pos_list.append(y_pos)
                print(angle)

                data_queue_receive.put(angle)
                print(data_queue_receive.empty())
    except:
        print('returned')
        return
data_update_thread = threading.Thread(target=update_data)
data_update_thread.daemon = True
data_update_thread.start()

# print('here')

        # fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))

        # ani = FuncAnimation(fig, update_data, frames=range(1000), interval=100)
        # plt.show()
