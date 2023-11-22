import socket
import pygame
import threading
import time
import psutil  # Import the psutil library to access battery information

class JoyServer():
    def __init__(self):
        pygame.init()
        pygame.joystick.init()

        self.mapped_value1 = 1000
        self.mapped_value2 = 1000
        self.transmit_value = ""
        self.battery_status = 0  # Initialize the battery status

        if pygame.joystick.get_count() == 0:
            print("No gamepad detected")
            return

        # Initialize the first gamepad
        self.gamepad = pygame.joystick.Joystick(0)
        self.gamepad.init()

        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_host = '192.168.2.66'
        self.server_port = 12345

        self.server_socket.bind((self.server_host, self.server_port))
        self.server_socket.listen(5)
        print("Server is listening for connections...")

        while True:
            client_socket, client_address = self.server_socket.accept()
            print(f"Client Connected: {client_address}")

            client_handler = threading.Thread(target=self.handle_client, args=(client_socket,))
            client_handler.start()

    def get_battery_status(self):
        battery = psutil.sensors_battery()
        if battery:
            self.battery_status = battery.percent
        else:
            self.battery_status = 0

    def handle_client(self, client_socket):
        while True:
            try:
                self.get_battery_status()  # Get battery status

                for event in pygame.event.get():
                    if event.type == pygame.JOYBUTTONDOWN:
                        button = event.button
                        if button == 19:
                            self.transmit_value = 'f'
                        # ... (other button handling code)

                    elif event.type == pygame.JOYAXISMOTION:
                        axis_x = self.gamepad.get_axis(1)
                        axis_y = self.gamepad.get_axis(0)
                        if event.axis == 1:
                            self.mapped_value1 = int(round(axis_x, 3) * 1000)
                        elif event.axis == 0:
                            self.mapped_value2 = int(round(axis_y, 3) * 1000)

                # Calculate speed based on mapped values
                if 0 <= self.mapped_value1 <= 1000:
                    speed = 0
                else:
                    speed = (3 / -1000) * self.mapped_value1

                self.data = "{},{},{},{},{}".format(self.mapped_value1, self.mapped_value2, self.transmit_value, speed, self.battery_status)
                client_socket.sendall(self.data.encode())
                print(self.data)
                time.sleep(0.05)
            except ConnectionError:
                print("Client disconnected! Server is listening for connections...")
                break

def main():
    joy_server = JoyServer()

if __name__ == "__main__":
    main()
