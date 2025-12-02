"""Device capabilities configuration."""

from appium.options.android import UiAutomator2Options
from tests.config import config


def get_android_capabilities():
    """Get Android device capabilities."""
    options = UiAutomator2Options()
    options.platform_name = config.PLATFORM_NAME
    options.device_name = config.DEVICE_NAME
    options.app = config.APP_PATH
    options.app_package = config.APP_PACKAGE
    options.app_activity = config.APP_ACTIVITY
    options.automation_name = config.AUTOMATION_NAME
    options.auto_grant_permissions = True
    options.new_command_timeout = config.APPIUM_TIMEOUT
    options.no_reset = False
    options.full_reset = False
    
    return options


def get_chrome_options():
    """Get Chrome browser options."""
    from selenium.webdriver.chrome.options import Options
    
    chrome_options = Options()
    chrome_options.add_argument('--start-maximized')
    chrome_options.add_argument('--disable-blink-features=AutomationControlled')
    
    if config.CHROME_HEADLESS:
        chrome_options.add_argument('--headless')
    
    return chrome_options
