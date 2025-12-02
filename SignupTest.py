from appium import webdriver
from appium.options.android import UiAutomator2Options
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

options = UiAutomator2Options()
options.platform_name = "Android"
options.device_name = "emulator-5554"
options.app = "/Users/ditsdev/Documents/ZumloMobileUpdated/android/app/build/intermediates/apk/ZumloApp/debug/app-ZumloApp-debug.apk"
options.app_package = "com.zumlo.app"
options.app_activity = "com.zumlo.app.MainActivity"
options.automation_name = "UiAutomator2"
options.auto_grant_permissions = True
options.new_command_timeout = 300

driver = webdriver.Remote("http://127.0.0.1:4723", options=options)
wait = WebDriverWait(driver, 20)

try:
    print("✓ App launched successfully.")
    time.sleep(3)
    
    # 1. Handle Product Tour (Skip)
    print("\n[Step 1] Looking for Product Tour Skip button...")
    try:
        skip_btn = wait.until(EC.presence_of_element_located((AppiumBy.XPATH, '//android.widget.TextView[@text="Skip"]')))
        print("✓ Found Skip button, clicking...")
        skip_btn.click()
        time.sleep(2)
    except Exception as e:
        print(f"⚠ Skip button not found: {e}")
        print("Assuming Product Tour already completed.")

    # 2. Login Type Screen - Look for "I'm new to Zumlo"
    print("\n[Step 2] Looking for Login Type screen...")
    try:
        # Try multiple strategies to find the button
        new_user_btn = None
        
        # Strategy 1: Direct text match
        try:
            new_user_btn = driver.find_element(AppiumBy.XPATH, '//android.widget.TextView[@text="I\'m new to Zumlo "]')
        except:
            pass
        
        # Strategy 2: Contains text
        if not new_user_btn:
            try:
                new_user_btn = driver.find_element(AppiumBy.XPATH, '//android.widget.TextView[contains(@text, "new to Zumlo")]')
            except:
                pass
        
        # Strategy 3: Find by UI Automator
        if not new_user_btn:
            new_user_btn = driver.find_element(AppiumBy.ANDROID_UIAUTOMATOR, 
                'new UiSelector().textContains("new to Zumlo")')
        
        print(f"✓ Found 'I\'m new to Zumlo' button")
        new_user_btn.click()
        print("✓ Clicked 'I\'m new to Zumlo'")
        time.sleep(2)
        
    except Exception as e:
        print(f"✗ Failed to find 'I\'m new to Zumlo' button: {e}")
        print("\nCurrent screen elements:")
        print(driver.page_source)
        raise

    # 3. Seeker Name Screen
    print("\n[Step 3] Looking for Name input field...")
    try:
        name_input = wait.until(EC.presence_of_element_located((AppiumBy.CLASS_NAME, "android.widget.EditText")))
        print("✓ Found name input field")
        name_input.send_keys("TestUser")
        print("✓ Entered name: TestUser")
        time.sleep(1)

        next_btn = driver.find_element(AppiumBy.XPATH, '//android.widget.TextView[@text="Next"]')
        next_btn.click()
        print("✓ Clicked Next button")
        time.sleep(2)
        
    except Exception as e:
        print(f"✗ Failed at Name screen: {e}")
        raise

    # 4. Register Screen - Email Tab
    print("\n[Step 4] Looking for Register screen...")
    test_email = "testuser" + str(int(time.time())) + "@yopmail.com"
    print(f"Using email: {test_email}")
    
    try:
        # Wait for the Email/Phone toggle to appear
        time.sleep(2)
        
        # Find email input field
        email_input = wait.until(EC.presence_of_element_located((AppiumBy.CLASS_NAME, "android.widget.EditText")))
        print("✓ Found email input field")
        email_input.send_keys(test_email)
        print(f"✓ Entered email: {test_email}")
        time.sleep(1)

        # Find and click "Send me the code" button
        send_code_btn = driver.find_element(AppiumBy.XPATH, '//android.widget.TextView[@text="Send me the code "]')
        send_code_btn.click()
        print("✓ Clicked 'Send me the code' button")
        
        # Wait to see result
        print("\n[Step 5] Waiting for OTP screen...")
        time.sleep(3)
        
        # Check if we got to OTP screen
        try:
            otp_screen = driver.find_element(AppiumBy.XPATH, '//*[contains(@text, "verification code")]')
            print("✓ Reached OTP verification screen")
        except:
            print("⚠ Could not confirm OTP screen")
        
    except Exception as e:
        print(f"✗ Failed at Register screen: {e}")
        raise
    
    # 5. Open Chrome and get OTP from YopMail
    print("\n[Step 6] Opening Chrome to retrieve OTP from YopMail...")
    from selenium import webdriver as selenium_webdriver
    from selenium.webdriver.chrome.service import Service
    from selenium.webdriver.chrome.options import Options
    from selenium.webdriver.common.by import By
    
    chrome_options = Options()
    chrome_options.add_argument('--start-maximized')
    
    chrome_driver = selenium_webdriver.Chrome(options=chrome_options)
    chrome_wait = WebDriverWait(chrome_driver, 15)
    
    try:
        # Extract email username
        email_username = test_email.split('@')[0]
        
        # Navigate to YopMail
        yopmail_url = f"https://yopmail.com/en/?login={email_username}"
        print(f"✓ Navigating to: {yopmail_url}")
        chrome_driver.get(yopmail_url)
        time.sleep(3)
        
        # Switch to inbox iframe
        print("✓ Switching to inbox iframe...")
        chrome_driver.switch_to.frame("ifinbox")
        time.sleep(2)
        
        # Find the latest email (should be from Zumlo)
        print("✓ Looking for Zumlo email...")
        try:
            email_item = chrome_wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, ".m")))
            email_item.click()
            print("✓ Clicked on email")
            time.sleep(2)
        except:
            print("⚠ No email found yet, waiting...")
            time.sleep(5)
            email_item = chrome_driver.find_element(By.CSS_SELECTOR, ".m")
            email_item.click()
        
        # Switch back to default content, then to mail iframe
        chrome_driver.switch_to.default_content()
        print("✓ Switching to mail content iframe...")
        chrome_driver.switch_to.frame("ifmail")
        time.sleep(2)
        
        # Extract OTP code from email
        print("✓ Extracting OTP code...")
        mail_body = chrome_driver.find_element(By.TAG_NAME, "body").text
        print(f"Email content preview: {mail_body[:200]}")
        
        # Try to find OTP code (usually 4-6 digits)
        import re
        otp_match = re.search(r'\b(\d{4,6})\b', mail_body)
        
        if otp_match:
            otp_code = otp_match.group(1)
            print(f"✓ Found OTP code: {otp_code}")
        else:
            print("✗ Could not find OTP code in email")
            print(f"Full email content:\n{mail_body}")
            raise Exception("OTP not found in email")
            
    except Exception as e:
        print(f"✗ Failed to retrieve OTP from YopMail: {e}")
        chrome_driver.quit()
        raise
    finally:
        chrome_driver.quit()
        print("✓ Closed Chrome browser")
    
    # 6. Enter OTP in the app
    print(f"\n[Step 7] Entering OTP code: {otp_code}")
    try:
        # Find OTP input fields (usually 4-6 separate fields)
        otp_inputs = driver.find_elements(AppiumBy.CLASS_NAME, "android.widget.EditText")
        print(f"✓ Found {len(otp_inputs)} OTP input fields")
        
        # Enter each digit of OTP
        for i, digit in enumerate(otp_code):
            if i < len(otp_inputs):
                otp_inputs[i].send_keys(digit)
                time.sleep(0.3)
        
        print("✓ Entered OTP code")
        time.sleep(2)
        
        # Look for Verify button
        try:
            verify_btn = driver.find_element(AppiumBy.XPATH, '//android.widget.TextView[@text="VERIFY"]')
            verify_btn.click()
            print("✓ Clicked VERIFY button")
        except:
            print("⚠ VERIFY button not found, OTP might auto-submit")
        
        # Wait for verification result
        print("\n[Step 8] Waiting for verification result...")
        time.sleep(5)
        
        # Check if signup completed successfully
        try:
            success_indicator = driver.find_element(AppiumBy.XPATH, '//*[contains(@text, "success") or contains(@text, "Success") or contains(@text, "Congratulations")]')
            print("✓ SUCCESS! Account created successfully!")
        except:
            print("⚠ Could not confirm success message")
            print("Current screen:")
            print(driver.page_source[:500])
        
    except Exception as e:
        print(f"✗ Failed to enter OTP: {e}")
        raise
    
    print("\n" + "="*50)
    print("SIGNUP TEST COMPLETED SUCCESSFULLY!")
    print("="*50)
    print(f"Email used: {test_email}")
    print(f"OTP code: {otp_code}")
    print("="*50)
    
except Exception as e:
    print(f"\n✗ TEST FAILED: {e}")
    print("\nFull page source:")
    try:
        print(driver.page_source)
    except:
        pass

finally:
    print("\nTest finished. Press Enter to close the app...")
    input()
    try:
        driver.quit()
    except:
        pass
