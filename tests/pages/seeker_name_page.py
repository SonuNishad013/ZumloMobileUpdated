"""Seeker Name page object."""

from appium.webdriver.common.appiumby import AppiumBy
from tests.pages.base_page import BasePage
from tests.utils.logger import get_logger

logger = get_logger(__name__)


class SeekerNamePage(BasePage):
    """Seeker Name page object."""
    
    # Locators
    NAME_INPUT = (AppiumBy.CLASS_NAME, "android.widget.EditText")
    NEXT_BUTTON = (AppiumBy.XPATH, '//android.widget.TextView[@text="Next"]')
    
    def enter_name(self, name):
        """
        Enter user name.
        
        Args:
            name: Name to enter
        """
        logger.info(f"Entering name: {name}")
        self.send_keys(*self.NAME_INPUT, name)
        self.sleep(1)
    
    def click_next(self):
        """Click Next button."""
        logger.info("Clicking Next button")
        self.click(*self.NEXT_BUTTON)
        self.sleep(2)
    
    def complete_name_entry(self, name):
        """
        Complete name entry flow.
        
        Args:
            name: Name to enter
        """
        self.enter_name(name)
        self.click_next()
