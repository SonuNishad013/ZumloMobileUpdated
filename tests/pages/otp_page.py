"""OTP verification page object."""

from appium.webdriver.common.appiumby import AppiumBy
from tests.pages.base_page import BasePage
from tests.utils.logger import get_logger

logger = get_logger(__name__)


class OTPPage(BasePage):
    """OTP verification page object."""
    
    # Locators
    OTP_INPUTS = (AppiumBy.CLASS_NAME, "android.widget.EditText")
    VERIFY_BUTTON = (AppiumBy.XPATH, '//android.widget.TextView[@text="VERIFY"]')
    RESEND_OTP = (AppiumBy.XPATH, '//android.widget.TextView[contains(@text, "Resend")]')
    
    def enter_otp(self, otp_code):
        """
        Enter OTP code in input fields.
        
        Args:
            otp_code: OTP code as string
        """
        logger.info(f"Entering OTP: {otp_code}")
        otp_inputs = self.find_elements(*self.OTP_INPUTS)
        logger.info(f"Found {len(otp_inputs)} OTP input fields")
        
        for i, digit in enumerate(otp_code):
            if i < len(otp_inputs):
                otp_inputs[i].send_keys(digit)
                self.sleep(0.3)
        
        logger.info("OTP entered successfully")
        self.sleep(2)
    
    def click_verify(self):
        """Click Verify button."""
        try:
            logger.info("Clicking Verify button")
            self.click(*self.VERIFY_BUTTON)
            self.sleep(3)
        except:
            logger.info("Verify button not found, OTP may auto-submit")
    
    def verify_otp(self, otp_code):
        """
        Complete OTP verification flow.
        
        Args:
            otp_code: OTP code to verify
        """
        self.enter_otp(otp_code)
        self.click_verify()
    
    def is_verification_successful(self):
        """
        Check if verification was successful.
        
        Returns:
            True if successful, False otherwise
        """
        success_indicators = [
            (AppiumBy.XPATH, '//*[contains(@text, "success")]'),
            (AppiumBy.XPATH, '//*[contains(@text, "Success")]'),
            (AppiumBy.XPATH, '//*[contains(@text, "Congratulations")]'),
        ]
        
        for locator in success_indicators:
            if self.is_element_present(*locator, timeout=5):
                logger.info("Verification successful")
                return True
        
        logger.warning("Could not confirm verification success")
        return False
