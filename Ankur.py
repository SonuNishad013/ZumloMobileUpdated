from appium import webdriver
from appium.options.android import UiAutomator2Options

options = UiAutomator2Options()
options.platform_name = "Android"
options.device_name = "emulator-5554"  # Check with 'adb devices'
options.app = "/Users/ditsdev/Documents/ZumloMobileUpdated/android/app/build/intermediates/apk/ZumloApp/debug/app-ZumloApp-debug.apk"
options.app_package = "com.zumlo.app"
options.app_activity = "com.zumlo.app.MainActivity"
options.app_wait_activity = "*" # Wait for any activity to start
options.automation_name = "UiAutomator2"

driver = webdriver.Remote("http://127.0.0.1:4723", options=options)
import time

# driver.find_element("id", "com.androidsample.generalstore:id/nameField").send_keys("Test User")
print("App launched successfully! Check the emulator.")
input("Press Enter to close the app and quit the script...")
driver.quit()
