"""Configuration settings for test automation framework."""

import os
from pathlib import Path

# Base paths
BASE_DIR = Path(__file__).parent.parent.parent
TESTS_DIR = Path(__file__).parent.parent
REPORTS_DIR = TESTS_DIR / "reports"
SCREENSHOTS_DIR = REPORTS_DIR / "screenshots"

# Ensure directories exist
REPORTS_DIR.mkdir(exist_ok=True)
SCREENSHOTS_DIR.mkdir(exist_ok=True)

# Appium Configuration
APPIUM_SERVER = "http://127.0.0.1:4723"
APPIUM_TIMEOUT = 300

# Android Configuration
ANDROID_HOME = os.getenv("ANDROID_HOME", "/Users/ditsdev/Library/Android/sdk")
ANDROID_SDK_ROOT = os.getenv("ANDROID_SDK_ROOT", ANDROID_HOME)
PLATFORM_NAME = "Android"
DEVICE_NAME = "emulator-5554"
AUTOMATION_NAME = "UiAutomator2"

# App Configuration
APP_PACKAGE = "com.zumlo.app"
APP_ACTIVITY = "com.zumlo.app.MainActivity"
APP_PATH = str(BASE_DIR / "android/app/build/intermediates/apk/ZumloApp/debug/app-ZumloApp-debug.apk")

# Wait times (in seconds)
DEFAULT_WAIT = 20
SHORT_WAIT = 5
LONG_WAIT = 30

# Chrome Configuration (for email verification)
CHROME_HEADLESS = False

# Email Configuration
EMAIL_DOMAIN = "yopmail.com"
YOPMAIL_BASE_URL = "https://yopmail.com/en/"

# Test Data
DEFAULT_USER_NAME = "TestUser"
DEFAULT_PASSWORD = "Test@123456"

# Logging
LOG_LEVEL = "INFO"
LOG_FORMAT = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
LOG_FILE = REPORTS_DIR / "test_execution.log"
