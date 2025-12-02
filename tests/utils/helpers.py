"""Common helper functions."""

import time
from datetime import datetime
from tests.config import config
from tests.utils.logger import get_logger

logger = get_logger(__name__)


def take_screenshot(driver, name="screenshot"):
    """
    Take a screenshot and save it.
    
    Args:
        driver: WebDriver instance
        name: Screenshot name
    
    Returns:
        Path to saved screenshot
    """
    try:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"{name}_{timestamp}.png"
        filepath = config.SCREENSHOTS_DIR / filename
        
        driver.save_screenshot(str(filepath))
        logger.info(f"Screenshot saved: {filepath}")
        return filepath
    except Exception as e:
        logger.error(f"Failed to take screenshot: {e}")
        return None


def wait_for_element(driver, locator, timeout=None):
    """
    Wait for element to be present.
    
    Args:
        driver: WebDriver instance
        locator: Tuple of (By, value)
        timeout: Wait timeout in seconds
    
    Returns:
        WebElement if found
    """
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    
    timeout = timeout or config.DEFAULT_WAIT
    try:
        element = WebDriverWait(driver, timeout).until(
            EC.presence_of_element_located(locator)
        )
        return element
    except Exception as e:
        logger.error(f"Element not found: {locator}")
        raise


def safe_click(element, driver=None):
    """
    Safely click an element with error handling.
    
    Args:
        element: WebElement to click
        driver: Optional driver for screenshot on failure
    """
    try:
        element.click()
        logger.debug("Element clicked successfully")
    except Exception as e:
        logger.error(f"Failed to click element: {e}")
        if driver:
            take_screenshot(driver, "click_failure")
        raise


def safe_send_keys(element, text, driver=None):
    """
    Safely send keys to an element with error handling.
    
    Args:
        element: WebElement to send keys to
        text: Text to send
        driver: Optional driver for screenshot on failure
    """
    try:
        element.clear()
        element.send_keys(text)
        logger.debug(f"Text entered: {text}")
    except Exception as e:
        logger.error(f"Failed to send keys: {e}")
        if driver:
            take_screenshot(driver, "sendkeys_failure")
        raise


def retry_on_exception(func, max_retries=3, delay=2, *args, **kwargs):
    """
    Retry a function on exception.
    
    Args:
        func: Function to retry
        max_retries: Maximum number of retries
        delay: Delay between retries
        *args, **kwargs: Arguments to pass to function
    
    Returns:
        Function result
    """
    for attempt in range(max_retries):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            if attempt < max_retries - 1:
                logger.warning(f"Attempt {attempt + 1} failed: {e}. Retrying...")
                time.sleep(delay)
            else:
                logger.error(f"All {max_retries} attempts failed")
                raise
