"""Keyword-driven actions for test automation."""

from tests.pages.product_tour_page import ProductTourPage
from tests.pages.login_type_page import LoginTypePage
from tests.pages.seeker_name_page import SeekerNamePage
from tests.pages.register_page import RegisterPage
from tests.pages.otp_page import OTPPage
from tests.utils.email_helper import EmailHelper
from tests.utils.driver_factory import DriverFactory
from tests.utils.logger import get_logger

logger = get_logger(__name__)


class Keywords:
    """Keyword-driven actions for test automation."""
    
    def __init__(self, driver):
        """
        Initialize Keywords with driver.
        
        Args:
            driver: WebDriver instance
        """
        self.driver = driver
        self.product_tour = ProductTourPage(driver)
        self.login_type = LoginTypePage(driver)
        self.seeker_name = SeekerNamePage(driver)
        self.register = RegisterPage(driver)
        self.otp_page = OTPPage(driver)
        self.chrome_driver = None
        self.email_helper = None
        self.test_email = None
        self.otp_code = None
    
    def skip_product_tour(self):
        """Skip product tour."""
        logger.info("KEYWORD: Skip Product Tour")
        self.product_tour.skip_tour()
        return True
    
    def select_new_user(self):
        """Select new user option."""
        logger.info("KEYWORD: Select New User")
        self.login_type.click_new_user()
        return True
    
    def select_existing_user(self):
        """Select existing user option."""
        logger.info("KEYWORD: Select Existing User")
        self.login_type.click_existing_user()
        return True
    
    def enter_user_name(self, name):
        """
        Enter user name.
        
        Args:
            name: User name to enter
        """
        logger.info(f"KEYWORD: Enter User Name - {name}")
        self.seeker_name.complete_name_entry(name)
        return True
    
    def generate_test_email(self, prefix="testuser"):
        """
        Generate unique test email.
        
        Args:
            prefix: Email prefix
        
        Returns:
            Generated email address
        """
        logger.info(f"KEYWORD: Generate Test Email - {prefix}")
        self.chrome_driver = DriverFactory.create_chrome_driver()
        self.email_helper = EmailHelper(self.chrome_driver)
        self.test_email = self.email_helper.generate_unique_email(prefix)
        logger.info(f"Generated email: {self.test_email}")
        return self.test_email
    
    def register_with_email(self, email=None):
        """
        Register with email.
        
        Args:
            email: Email address (uses generated email if None)
        """
        email = email or self.test_email
        logger.info(f"KEYWORD: Register With Email - {email}")
        self.register.register_with_email(email)
        return True
    
    def get_otp_from_email(self, email=None):
        """
        Get OTP from email.
        
        Args:
            email: Email address (uses generated email if None)
        
        Returns:
            OTP code
        """
        email = email or self.test_email
        logger.info(f"KEYWORD: Get OTP From Email - {email}")
        
        if not self.email_helper:
            self.chrome_driver = DriverFactory.create_chrome_driver()
            self.email_helper = EmailHelper(self.chrome_driver)
        
        self.otp_code = self.email_helper.get_otp_from_yopmail(email)
        logger.info(f"OTP retrieved: {self.otp_code}")
        return self.otp_code
    
    def verify_otp(self, otp=None):
        """
        Verify OTP.
        
        Args:
            otp: OTP code (uses retrieved OTP if None)
        """
        otp = otp or self.otp_code
        logger.info(f"KEYWORD: Verify OTP - {otp}")
        self.otp_page.verify_otp(otp)
        return True
    
    def verify_signup_success(self):
        """Verify signup was successful."""
        logger.info("KEYWORD: Verify Signup Success")
        return self.otp_page.is_verification_successful()
    
    def cleanup(self):
        """Cleanup resources."""
        logger.info("KEYWORD: Cleanup")
        if self.chrome_driver:
            DriverFactory.quit_driver(self.chrome_driver)
    
    # Composite keywords (combining multiple actions)
    
    def complete_signup_flow(self, user_name, email_prefix="testuser"):
        """
        Complete entire signup flow.
        
        Args:
            user_name: User name to register
            email_prefix: Email prefix for test email
        
        Returns:
            dict with test_email and otp_code
        """
        logger.info(f"KEYWORD: Complete Signup Flow - {user_name}")
        
        try:
            self.skip_product_tour()
            self.select_new_user()
            self.enter_user_name(user_name)
            email = self.generate_test_email(email_prefix)
            self.register_with_email(email)
            otp = self.get_otp_from_email(email)
            self.verify_otp(otp)
            
            return {
                "success": True,
                "test_email": email,
                "otp_code": otp
            }
        except Exception as e:
            logger.error(f"Signup flow failed: {e}")
            return {
                "success": False,
                "error": str(e)
            }
        finally:
            self.cleanup()
    
    def navigate_to_login(self):
        """Navigate to login screen."""
        logger.info("KEYWORD: Navigate To Login")
        self.skip_product_tour()
        self.select_existing_user()
        return True
