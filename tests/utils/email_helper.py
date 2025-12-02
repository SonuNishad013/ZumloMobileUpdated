"""Email helper for YopMail automation."""

import time
import re
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from tests.config import config
from tests.utils.logger import get_logger

logger = get_logger(__name__)


class EmailHelper:
    """Helper class for YopMail email operations."""
    
    def __init__(self, driver):
        """
        Initialize EmailHelper.
        
        Args:
            driver: Selenium WebDriver instance
        """
        self.driver = driver
        self.wait = WebDriverWait(driver, config.DEFAULT_WAIT)
    
    def generate_unique_email(self, prefix="testuser"):
        """
        Generate a unique email address.
        
        Args:
            prefix: Email prefix (default: testuser)
        
        Returns:
            Unique email address
        """
        timestamp = str(int(time.time()))
        email = f"{prefix}{timestamp}@{config.EMAIL_DOMAIN}"
        logger.info(f"Generated email: {email}")
        return email
    
    def open_yopmail_inbox(self, email):
        """
        Open YopMail inbox for the given email.
        
        Args:
            email: Email address to check
        """
        username = email.split('@')[0]
        url = f"{config.YOPMAIL_BASE_URL}?login={username}"
        logger.info(f"Opening YopMail inbox: {url}")
        self.driver.get(url)
        time.sleep(3)
    
    def get_latest_email_content(self):
        """
        Get the content of the latest email.
        
        Returns:
            Email body text
        """
        try:
            # Switch to inbox iframe
            logger.info("Switching to inbox iframe")
            self.driver.switch_to.frame("ifinbox")
            time.sleep(2)
            
            # Click on the latest email
            logger.info("Clicking on latest email")
            email_item = self.wait.until(
                EC.presence_of_element_located((By.CSS_SELECTOR, ".m"))
            )
            email_item.click()
            time.sleep(2)
            
            # Switch to mail content iframe
            self.driver.switch_to.default_content()
            logger.info("Switching to mail content iframe")
            self.driver.switch_to.frame("ifmail")
            time.sleep(2)
            
            # Get email body
            mail_body = self.driver.find_element(By.TAG_NAME, "body").text
            logger.info(f"Email content retrieved (length: {len(mail_body)})")
            
            return mail_body
            
        except Exception as e:
            logger.error(f"Failed to get email content: {e}")
            raise
        finally:
            self.driver.switch_to.default_content()
    
    def extract_otp_from_email(self, email_content, pattern=r'\b(\d{4,6})\b'):
        """
        Extract OTP code from email content.
        
        Args:
            email_content: Email body text
            pattern: Regex pattern for OTP (default: 4-6 digits)
        
        Returns:
            OTP code as string
        """
        logger.info("Extracting OTP from email")
        match = re.search(pattern, email_content)
        
        if match:
            otp = match.group(1)
            logger.info(f"OTP extracted: {otp}")
            return otp
        else:
            logger.error("OTP not found in email")
            logger.debug(f"Email content: {email_content[:500]}")
            raise ValueError("OTP not found in email content")
    
    def get_otp_from_yopmail(self, email, max_retries=3, retry_delay=5):
        """
        Complete flow to get OTP from YopMail.
        
        Args:
            email: Email address to check
            max_retries: Maximum number of retries
            retry_delay: Delay between retries in seconds
        
        Returns:
            OTP code
        """
        for attempt in range(max_retries):
            try:
                logger.info(f"Attempt {attempt + 1}/{max_retries} to retrieve OTP")
                
                self.open_yopmail_inbox(email)
                email_content = self.get_latest_email_content()
                otp = self.extract_otp_from_email(email_content)
                
                return otp
                
            except Exception as e:
                logger.warning(f"Attempt {attempt + 1} failed: {e}")
                if attempt < max_retries - 1:
                    logger.info(f"Retrying in {retry_delay} seconds...")
                    time.sleep(retry_delay)
                else:
                    logger.error("All attempts to retrieve OTP failed")
                    raise
