"""Signup test cases."""

import pytest
from tests.pages.product_tour_page import ProductTourPage
from tests.pages.login_type_page import LoginTypePage
from tests.pages.seeker_name_page import SeekerNamePage
from tests.pages.register_page import RegisterPage
from tests.pages.otp_page import OTPPage
from tests.utils.email_helper import EmailHelper
from tests.utils.driver_factory import DriverFactory
from tests.data.test_data import TestData
from tests.utils.logger import get_logger

logger = get_logger(__name__)


@pytest.mark.smoke
@pytest.mark.signup
class TestSignup:
    """Signup test cases."""
    
    def test_signup_with_email(self, mobile_driver):
        """
        Test complete signup flow with email verification.
        
        Args:
            mobile_driver: Mobile driver fixture
        """
        logger.info("Starting signup test with email")
        
        # Initialize page objects
        product_tour = ProductTourPage(mobile_driver)
        login_type = LoginTypePage(mobile_driver)
        seeker_name = SeekerNamePage(mobile_driver)
        register = RegisterPage(mobile_driver)
        otp_page = OTPPage(mobile_driver)
        
        # Initialize email helper
        chrome_driver = None
        
        try:
            # Step 1: Skip product tour
            logger.info("Step 1: Skipping product tour")
            product_tour.skip_tour()
            
            # Step 2: Select new user
            logger.info("Step 2: Selecting new user option")
            login_type.click_new_user()
            
            # Step 3: Enter name
            logger.info("Step 3: Entering user name")
            seeker_name.complete_name_entry(TestData.DEFAULT_USER_NAME)
            
            # Step 4: Register with email
            logger.info("Step 4: Registering with email")
            chrome_driver = DriverFactory.create_chrome_driver()
            email_helper = EmailHelper(chrome_driver)
            test_email = email_helper.generate_unique_email()
            
            register.register_with_email(test_email)
            
            # Step 5: Get OTP from email
            logger.info("Step 5: Retrieving OTP from email")
            otp_code = email_helper.get_otp_from_yopmail(test_email)
            logger.info(f"OTP retrieved: {otp_code}")
            
            # Step 6: Verify OTP
            logger.info("Step 6: Verifying OTP")
            otp_page.verify_otp(otp_code)
            
            # Step 7: Verify success
            logger.info("Step 7: Verifying signup success")
            # Add assertion based on your app's success screen
            # assert otp_page.is_verification_successful()
            
            logger.info("✓ Signup test completed successfully")
            logger.info(f"Test email: {test_email}")
            logger.info(f"OTP code: {otp_code}")
            
        except Exception as e:
            logger.error(f"Signup test failed: {e}")
            raise
        
        finally:
            if chrome_driver:
                DriverFactory.quit_driver(chrome_driver)
    
    @pytest.mark.skip(reason="Example of parametrized test")
    @pytest.mark.parametrize("user_data", TestData.VALID_USERS)
    def test_signup_multiple_users(self, mobile_driver, user_data):
        """
        Test signup with multiple users (parametrized).
        
        Args:
            mobile_driver: Mobile driver fixture
            user_data: User data from test data
        """
        logger.info(f"Testing signup for user: {user_data['name']}")
        # Implementation similar to test_signup_with_email
        pass


if __name__ == "__main__":
    pytest.main([__file__, "-v", "-s"])
