"""Base page class with common page operations."""

import time
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from tests.config import config
from tests.utils.logger import get_logger
from tests.utils.helpers import take_screenshot

logger = get_logger(__name__)


class BasePage:
    """Base page class with common page operations."""
    
    def __init__(self, driver):
        """
        Initialize BasePage.
        
        Args:
            driver: WebDriver instance
        """
        self.driver = driver
        self.wait = WebDriverWait(driver, config.DEFAULT_WAIT)
    
    def find_element(self, locator_type, locator_value, timeout=None):
        """
        Find an element with explicit wait.
        
        Args:
            locator_type: Type of locator (e.g., AppiumBy.XPATH)
            locator_value: Locator value
            timeout: Optional custom timeout
        
        Returns:
            WebElement
        """
        timeout = timeout or config.DEFAULT_WAIT
        try:
            element = WebDriverWait(self.driver, timeout).until(
                EC.presence_of_element_located((locator_type, locator_value))
            )
            logger.debug(f"Element found: {locator_value}")
            return element
        except Exception as e:
            logger.error(f"Element not found: {locator_value}")
            take_screenshot(self.driver, "element_not_found")
            raise
    
    def find_elements(self, locator_type, locator_value):
        """
        Find multiple elements.
        
        Args:
            locator_type: Type of locator
            locator_value: Locator value
        
        Returns:
            List of WebElements
        """
        try:
            elements = self.driver.find_elements(locator_type, locator_value)
            logger.debug(f"Found {len(elements)} elements: {locator_value}")
            return elements
        except Exception as e:
            logger.error(f"Elements not found: {locator_value}")
            raise
    
    def click(self, locator_type, locator_value):
        """
        Click an element.
        
        Args:
            locator_type: Type of locator
            locator_value: Locator value
        """
        try:
            element = self.find_element(locator_type, locator_value)
            element.click()
            logger.info(f"Clicked element: {locator_value}")
        except Exception as e:
            logger.error(f"Failed to click: {locator_value}")
            take_screenshot(self.driver, "click_failed")
            raise
    
    def send_keys(self, locator_type, locator_value, text):
        """
        Send keys to an element.
        
        Args:
            locator_type: Type of locator
            locator_value: Locator value
            text: Text to send
        """
        try:
            element = self.find_element(locator_type, locator_value)
            element.clear()
            element.send_keys(text)
            logger.info(f"Entered text in: {locator_value}")
        except Exception as e:
            logger.error(f"Failed to send keys to: {locator_value}")
            take_screenshot(self.driver, "sendkeys_failed")
            raise
    
    def get_text(self, locator_type, locator_value):
        """
        Get text from an element.
        
        Args:
            locator_type: Type of locator
            locator_value: Locator value
        
        Returns:
            Element text
        """
        element = self.find_element(locator_type, locator_value)
        return element.text
    
    def is_element_present(self, locator_type, locator_value, timeout=5):
        """
        Check if element is present.
        
        Args:
            locator_type: Type of locator
            locator_value: Locator value
            timeout: Wait timeout
        
        Returns:
            True if present, False otherwise
        """
        try:
            WebDriverWait(self.driver, timeout).until(
                EC.presence_of_element_located((locator_type, locator_value))
            )
            return True
        except:
            return False
    
    def wait_for_element_to_disappear(self, locator_type, locator_value, timeout=None):
        """
        Wait for element to disappear.
        
        Args:
            locator_type: Type of locator
            locator_value: Locator value
            timeout: Optional timeout
        """
        timeout = timeout or config.DEFAULT_WAIT
        WebDriverWait(self.driver, timeout).until_not(
            EC.presence_of_element_located((locator_type, locator_value))
        )
    
    def sleep(self, seconds):
        """
        Sleep for specified seconds.
        
        Args:
            seconds: Sleep duration
        """
        time.sleep(seconds)
        logger.debug(f"Slept for {seconds} seconds")
    
    def take_screenshot(self, name):
        """
        Take a screenshot.
        
        Args:
            name: Screenshot name
        """
        return take_screenshot(self.driver, name)
