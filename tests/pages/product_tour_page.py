"""Product Tour page object."""

from appium.webdriver.common.appiumby import AppiumBy
from tests.pages.base_page import BasePage
from tests.utils.logger import get_logger

logger = get_logger(__name__)


class ProductTourPage(BasePage):
    """Product Tour page object."""
    
    # Locators
    SKIP_BUTTON = (AppiumBy.XPATH, '//android.widget.TextView[@text="Skip"]')
    
    def skip_tour(self):
        """Skip the product tour."""
        try:
            logger.info("Attempting to skip product tour")
            if self.is_element_present(*self.SKIP_BUTTON, timeout=5):
                self.click(*self.SKIP_BUTTON)
                logger.info("Product tour skipped")
                self.sleep(2)
                return True
            else:
                logger.info("Skip button not found, tour may be completed")
                return False
        except Exception as e:
            logger.warning(f"Could not skip tour: {e}")
            return False
