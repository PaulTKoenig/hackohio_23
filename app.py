from flask import Flask, jsonify
import serial
import time
import struct
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from math import cos, sin
import threading
from queue import Queue

# data_queue_get = track_route.data_queue_get
# data_queue_receive = track_route.data_queue_receive

data_queue_receive = Queue()
x_pos_list = [0]
y_pos_list = [0]

app = Flask(__name__)

data = [0,0,0]

@app.route('/get_values', methods=['GET'])
def get_values():
    global data
    global data_queue_receive

    if not data_queue_receive.empty():
        while not data_queue_receive.empty():
            latest_data = data_queue_receive.get()
        x_pos = latest_data[0]
        y_pos = latest_data[1]
        angle = latest_data[2]
        data = latest_data
    else:
        x_pos = data[0]
        y_pos = data[1]
        angle = data[2]

    # return str(angle)

    output_dict = {'x_position': x_pos,
                   'y_position': y_pos,
                   'current_angle': angle}
    
    return jsonify(output_dict)

if __name__ == '__main__':
    print('starting')

    def update_data():
        # print('in the route')
        with serial.Serial('COM13', 115200) as ser:
            # print('Ready to track')
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

                data_queue_receive.put([x_pos, y_pos, angle])
                # print(data_queue_receive.empty())
        
    data_update_thread = threading.Thread(target=update_data)
    data_update_thread.daemon = True
    data_update_thread.start()

    app.run(debug=False)
    data_update_thread.join()