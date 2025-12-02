"""Login Type page object."""

from appium.webdriver.common.appiumby import AppiumBy
from tests.pages.base_page import BasePage
from tests.utils.logger import get_logger

logger = get_logger(__name__)


class LoginTypePage(BasePage):
    """Login Type page object."""
    
    # Locators
    NEW_USER_BUTTON = (AppiumBy.ACCESSIBILITY_ID, "new_user_btn")
    EXISTING_USER_BUTTON = (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().textContains("been here before")')
    
    def click_new_user(self):
        """Click 'I'm new to Zumlo' button."""
        logger.info("Clicking 'I'm new to Zumlo' button")
        self.click(*self.NEW_USER_BUTTON)
        self.sleep(2)
    
    def click_existing_user(self):
        """Click 'I've been here before' button."""
        logger.info("Clicking 'I've been here before' button")
        self.click(*self.EXISTING_USER_BUTTON)
        self.sleep(2)
