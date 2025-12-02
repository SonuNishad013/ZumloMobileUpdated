"""Driver factory for creating and managing driver instances."""

from appium import webdriver as appium_webdriver
from selenium import webdriver as selenium_webdriver
from tests.config import config
from tests.config.capabilities import get_android_capabilities, get_chrome_options
from tests.utils.logger import get_logger

logger = get_logger(__name__)


class DriverFactory:
    """Factory class for creating driver instances."""
    
    @staticmethod
    def create_mobile_driver():
        """Create and return Appium driver for mobile testing."""
        try:
            logger.info(f"Initializing mobile driver for {config.DEVICE_NAME}")
            capabilities = get_android_capabilities()
            driver = appium_webdriver.Remote(
                config.APPIUM_SERVER,
                options=capabilities
            )
            logger.info("Mobile driver initialized successfully")
            return driver
        except Exception as e:
            logger.error(f"Failed to initialize mobile driver: {e}")
            raise
    
    @staticmethod
    def create_chrome_driver():
        """Create and return Chrome driver for web testing."""
        try:
            logger.info("Initializing Chrome driver")
            options = get_chrome_options()
            driver = selenium_webdriver.Chrome(options=options)
            logger.info("Chrome driver initialized successfully")
            return driver
        except Exception as e:
            logger.error(f"Failed to initialize Chrome driver: {e}")
            raise
    
    @staticmethod
    def quit_driver(driver):
        """Safely quit the driver."""
        try:
            if driver:
                driver.quit()
                logger.info("Driver quit successfully")
        except Exception as e:
            logger.warning(f"Error while quitting driver: {e}")
