from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
import threading
import os


def load_and_click(i, html_file_path, camera_channel):
    with open(html_file_path, 'r', encoding='utf-8') as file:
        html_data = file.read()

    soup = BeautifulSoup(html_data, 'html.parser')

    # Modify the necessary form fields for each display
    region = soup.find('input', id='region')
    region['value'] = 'us-west-2'
    accessKeyId = soup.find('input', id='accessKeyId')
    accessKeyId['value'] = 'AKIA4BEOL24LFFMLYR2F'
    secret_access_key = soup.find('input', id='secretAccessKey')
    secret_access_key['value'] = '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'
    signaling_channel = soup.find('input', {'id': 'channelName'})
    signaling_channel['value'] = camera_channel  
    with open(html_file_path, 'w', encoding='utf-8') as file:
        file.write(str(soup))

    drivers[i].get('file://' + html_file_path)

    # Simulate a button click using Selenium for each display
    selenium_button = drivers[i].find_element(By.ID, 'viewer-button')
    selenium_button.click()

    selenium_button = drivers[i].find_element(By.ID, 'stop-viewer-button')
    selenium_button.click()

    time.sleep(2)
    selenium_button = drivers[i].find_element(By.ID, 'viewer-button')
    selenium_button.click()

    drivers[i].maximize_window()

html_file_paths = [r"E:\ControlOne\backend\test\lokesh1.html"]


# Get the path to the user's AppData directory
appdata_path = os.getenv('LOCALAPPDATA')

if appdata_path:
    chrome_profile_path = os.path.join(appdata_path, 'Google', 'Chrome', 'User Data', 'Profile 1')
    profile_directories = [chrome_profile_path]
    print("Chrome Profile Directory:", profile_directories)
else:
    print("AppData directory not found.")

camera_channels = ['channel50'] 
# Set Chrome options and profile directories for each display
chrome_options_list = []
for profile_directory in profile_directories:
    chrome_options = Options()
    chrome_options.add_argument('--user-data-dir=' + profile_directory)
    chrome_options.add_argument('--use-fake-ui-for-media-stream')
    chrome_options.add_argument('--window-size=1080,720') 
    chrome_options_list.append(chrome_options)
        #chrome is running by automated software(error clear)
    chrome_options.add_experimental_option("excludeSwitches",["enable-automation"])


# Create Chrome webdrivers for each display
drivers = []
for chrome_options in chrome_options_list:
    driver = webdriver.Chrome(options=chrome_options)
    drivers.append(driver)

# Load HTML content and simulate button clicks for each display in the background
threads = []
for i, html_file_path in enumerate(html_file_paths):
    thread = threading.Thread(target=load_and_click, args=(i, html_file_path, camera_channels[i]))
    threads.append(thread)
    thread.start()


# Keep the script running
while True:
    time.sleep(1)
