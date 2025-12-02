from tests.pages.base_page import BasePage
from appium.webdriver.common.appiumby import AppiumBy
from tests.utils.logger import get_logger

logger = get_logger(__name__)

class WellnessPlanPage(BasePage):
    """Page object for the Wellness Plan flow (Physical Health screen)."""

    # Locators
    NEXT_BUTTON = (AppiumBy.ACCESSIBILITY_ID, "physical_health_next_btn")
    
    def select_item(self, index):
        """Select an item by index."""
        locator = (AppiumBy.ACCESSIBILITY_ID, f"physical_health_item_{index}")
        self.click(*locator)
        logger.info(f"Selected item at index {index}")

    def click_next(self):
        """Click Next button."""
        self.click(*self.NEXT_BUTTON)
        logger.info("Clicked Next button")
