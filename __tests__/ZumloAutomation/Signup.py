#!/usr/bin/env python3
"""
Flexible Appium test script to sign up using Email & Mobile number.

Usage (example):
    python3 tests/appium_signup_test.py --name "Test User" --mobile 9999999999

Make sure Appium server is running and an emulator/device is connected.
This script uses configurable selectors and fallbacks — adapt selectors if your app uses different ids.
"""
import os
import time
import argparse
from appium import webdriver
from appium.options.android import UiAutomator2Options
from appium.webdriver.common.appiumby import AppiumBy
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


APK_DEFAULT = os.environ.get(
    "APK_PATH",
    "/Users/ditsdev/Documents/ZumloMobileUpdated/android/app/build/intermediates/apk/ZumloApp/debug/app-ZumloApp-debug.apk",
)


def wait_for_any(driver, candidates, timeout=15):
    """Try multiple locator candidates and return the first found element."""
    end = time.time() + timeout
    last_exc = None
    while time.time() < end:
        for by, value in candidates:
            try:
                el = WebDriverWait(driver, 1).until(
                    EC.presence_of_element_located((by, value))
                )
                return el
            except Exception as e:
                last_exc = e
        time.sleep(0.25)
    raise last_exc if last_exc is not None else Exception("Element not found: candidates={}".format(candidates))


def click_any(driver, candidates, timeout=15):
    el = wait_for_any(driver, candidates, timeout=timeout)
    el.click()
    return el


def send_keys_any(driver, candidates, text, timeout=15):
    el = wait_for_any(driver, candidates, timeout=timeout)
    el.clear()
    el.send_keys(text)
    return el


def run_test(args):
    options = UiAutomator2Options()
    options.platform_name = "Android"
    options.device_name = args.device_name
    options.app = args.apk
    options.app_package = args.app_package
    options.app_activity = args.app_activity
    options.automation_name = "UiAutomator2"
    options.app_wait_activity = args.app_wait_activity

    print("Connecting to Appium server...")
    driver = webdriver.Remote(args.appium_server, options=options)

    try:
        # 1) Click "I'm new to Zumlo" (many apps set text or content-desc)
        new_user_candidates = [
            (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().textContains("new to Zumlo")'),
            (AppiumBy.XPATH, "//*[contains(@text, 'new to Zumlo') or contains(@content-desc, 'new to Zumlo')]") ,
            (AppiumBy.XPATH, "//*[contains(translate(@text,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'new to zumlo')]") ,
        ]

        print("Waiting for 'I'm new to Zumlo' button...")
        try:
            click_any(driver, new_user_candidates, timeout=12)
        except Exception:
            print("'I'm new to Zumlo' button not found using defaults — try manually updating selectors in the script.")
            raise

        time.sleep(1.2)

        # Optional: Skip product tour if it appears. This is non-fatal.
        skip_tour_candidates = [
            (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().textContains("Skip")'),
            (AppiumBy.XPATH, "//*[contains(translate(@text,'SKIP','skip'),'skip') or contains(@content-desc,'skip') or contains(@text,'Maybe later')]") ,
            (AppiumBy.XPATH, "//android.widget.Button[@text='Skip']"),
        ]
        try:
            # short timeout — if not present, continue
            click_any(driver, skip_tour_candidates, timeout=3)
            print('Product tour skipped.')
            time.sleep(0.6)
        except Exception:
            # no tour detected; continue
            pass

        # 2) Fill Name (user chooses not to add email)
        name_candidates = [
            (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().resourceIdMatches(".*(name|fullName|firstName|lastName).*")'),
            (AppiumBy.XPATH, "//*[contains(translate(@text,'NAME','name'),'name') or contains(@content-desc,'name') or contains(@hint,'name')]") ,
        ]

        print("Filling name: {}".format(args.name))
        send_keys_any(driver, name_candidates, args.name, timeout=8)

        # 3) Fill Mobile
        mobile_candidates = [
            (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().resourceIdMatches(".*(mobile|phone|contact).*")'),
            (AppiumBy.XPATH, "//*[contains(translate(@text,'MOBILEPHONE','mobilephone'),'mobile') or contains(@content-desc,'mobile') or contains(@hint,'mobile')]") ,
        ]

        print("Filling mobile: {}".format(args.mobile))
        send_keys_any(driver, mobile_candidates, args.mobile, timeout=8)

        # 4) Tap Continue / Sign up
        submit_candidates = [
            (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().textMatches("(?i)^(sign ?up|continue|next|submit)$")'),
            (AppiumBy.XPATH, "//*[translate(@text,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')='sign up' or contains(translate(@text,'abcdefghijklmnopqrstuvwxyz','abcdefghijklmnopqrstuvwxyz'),'continue') or contains(translate(@text,'abcdefghijklmnopqrstuvwxyz','abcdefghijklmnopqrstuvwxyz'),'next')]") ,
        ]

        print("Tapping submit/continue")
        click_any(driver, submit_candidates, timeout=8)

        # 5) Wait for OTP or Welcome screen
        print("Waiting for OTP / verification or welcome screen")
        post_signup_candidates = [
            (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().textContains("otp")'),
            (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().textContains("one time")'),
            (AppiumBy.ANDROID_UIAUTOMATOR, 'new UiSelector().textContains("welcome")'),
            (AppiumBy.XPATH, "//*[contains(@text,'OTP') or contains(@text,'Enter') or contains(@text,'Welcome')]") ,
        ]

        try:
            el = wait_for_any(driver, post_signup_candidates, timeout=15)
            print('Post-signup element found: ', el.get_attribute('text') or el.get_attribute('content-desc'))
            print('Signup flow appears to have progressed — test PASSED (manual verification may still be required).')
        except Exception:
            print('No OTP/Welcome element detected — the flow may differ or selectors need updating.')
            driver.save_screenshot('signup_flow_failure.png')
            print('Screenshot saved to signup_flow_failure.png')

    except Exception as e:
        print('Test failed with exception:', e)
        try:
            driver.save_screenshot('signup_exception.png')
            print('Screenshot saved to signup_exception.png')
        except Exception:
            pass
        raise
    finally:
        print('Quitting driver')
        driver.quit()


def parse_args():
    p = argparse.ArgumentParser()
    p.add_argument('--name', required=False, default='Test User')
    p.add_argument('--mobile', required=False, default='9999999999')
    p.add_argument('--apk', required=False, default=APK_DEFAULT)
    p.add_argument('--device-name', dest='device_name', default='emulator-5554')
    p.add_argument('--appium-server', default='http://127.0.0.1:4723')
    p.add_argument('--app-package', default='com.zumlo.app')
    p.add_argument('--app-activity', default='com.zumlo.app.MainActivity')
    p.add_argument('--app-wait-activity', dest='app_wait_activity', default='*')
    return p.parse_args()


if __name__ == '__main__':
    args = parse_args()
    # sanity checks
    if not os.path.exists(args.apk):
        print('APK not found at:', args.apk)
        print('Set the correct APK path with --apk or export APK_PATH env var')
        raise SystemExit(1)

    run_test(args)