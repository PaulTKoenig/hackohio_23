import serial
import time
import struct
import matplotlib.pyplot as plt
from matplotlib.figure import Figure
from matplotlib.animation import FuncAnimation
from math import cos, sin
from flask import Flask

app = Flask(__name__)

x_pos_list = [0]
y_pos_list = [0]
angle = 0

axs = []

fig = Figure()
axs.append(fig.add_subplot(211))
axs.append(fig.add_subplot(221))

with serial.Serial('COM13', 115200) as ser:
    print('ready to track')
    def update_data(i):
        while ser.in_waiting == 0:
            pass

        time.sleep(0.01)
        buf = ser.read(size=12)
        x_pos = struct.unpack('f', buf[0:4])[0]
        y_pos = struct.unpack('f', buf[4:8])[0]
        angle = struct.unpack('f', buf[8:12])[0]
        x_pos_list.append(x_pos)
        y_pos_list.append(y_pos)

        print(x_pos, y_pos)

        axs[0].clear()
        axs[1].clear()
        axs[0].plot(x_pos_list, y_pos_list)
        axs[1].plot([0, cos(angle)], [0, sin(angle)])


    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(10, 4))
    ax1.set_xlim(-50,50)
    ax1.set_ylim(-50,50)
    ax2.set_xlim(-50,50)
    ax2.set_ylim(-50,50)

    ani = FuncAnimation(fig, update_data, frames=range(1000), interval=100)
    plt.show()



    
