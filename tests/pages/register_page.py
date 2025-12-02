"""Register page object."""

from appium.webdriver.common.appiumby import AppiumBy
from tests.pages.base_page import BasePage
from tests.utils.logger import get_logger

logger = get_logger(__name__)


class RegisterPage(BasePage):
    """Register page object."""
    
    # Locators
    EMAIL_INPUT = (AppiumBy.CLASS_NAME, "android.widget.EditText")
    SEND_CODE_BUTTON = (AppiumBy.XPATH, '//android.widget.TextView[@text="Send me the code "]')
    EMAIL_TAB = (AppiumBy.XPATH, '//android.widget.TextView[@text="Email"]')
    PHONE_TAB = (AppiumBy.XPATH, '//android.widget.TextView[@text="Phone"]')
    
    def select_email_tab(self):
        """Select Email tab."""
        logger.info("Selecting Email tab")
        if self.is_element_present(*self.EMAIL_TAB):
            self.click(*self.EMAIL_TAB)
            self.sleep(1)
    
    def select_phone_tab(self):
        """Select Phone tab."""
        logger.info("Selecting Phone tab")
        if self.is_element_present(*self.PHONE_TAB):
            self.click(*self.PHONE_TAB)
            self.sleep(1)
    
    def enter_email(self, email):
        """
        Enter email address.
        
        Args:
            email: Email address to enter
        """
        logger.info(f"Entering email: {email}")
        self.send_keys(*self.EMAIL_INPUT, email)
        self.sleep(1)
    
    def click_send_code(self):
        """Click 'Send me the code' button."""
        logger.info("Clicking 'Send me the code' button")
        self.click(*self.SEND_CODE_BUTTON)
        self.sleep(3)
    
    def register_with_email(self, email):
        """
        Complete email registration flow.
        
        Args:
            email: Email address to register with
        """
        self.select_email_tab()
        self.enter_email(email)
        self.click_send_code()
