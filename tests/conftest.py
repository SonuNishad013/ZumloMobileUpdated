"""Pytest configuration and fixtures."""

import pytest
from tests.utils.driver_factory import DriverFactory
from tests.utils.logger import get_logger

logger = get_logger(__name__)


@pytest.fixture(scope="function")
def mobile_driver():
    """
    Fixture to create and quit mobile driver.
    
    Yields:
        Appium WebDriver instance
    """
    logger.info("Setting up mobile driver")
    driver = DriverFactory.create_mobile_driver()
    
    yield driver
    
    logger.info("Tearing down mobile driver")
    DriverFactory.quit_driver(driver)


@pytest.fixture(scope="function")
def chrome_driver():
    """
    Fixture to create and quit Chrome driver.
    
    Yields:
        Chrome WebDriver instance
    """
    logger.info("Setting up Chrome driver")
    driver = DriverFactory.create_chrome_driver()
    
    yield driver
    
    logger.info("Tearing down Chrome driver")
    DriverFactory.quit_driver(driver)


@pytest.fixture(scope="session", autouse=True)
def test_session_setup():
    """Setup and teardown for entire test session."""
    logger.info("=" * 80)
    logger.info("TEST SESSION STARTED")
    logger.info("=" * 80)
    
    yield
    
    logger.info("=" * 80)
    logger.info("TEST SESSION COMPLETED")
    logger.info("=" * 80)


@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    """
    Hook to capture test results and take screenshots on failure.
    """
    outcome = yield
    rep = outcome.get_result()
    
    if rep.when == "call" and rep.failed:
        logger.error(f"Test failed: {item.name}")
        
        # Try to take screenshot if driver is available
        if "mobile_driver" in item.fixturenames:
            try:
                driver = item.funcargs["mobile_driver"]
                from tests.utils.helpers import take_screenshot
                take_screenshot(driver, f"failure_{item.name}")
            except:
                pass


def pytest_configure(config):
    """Configure pytest with custom markers."""
    config.addinivalue_line(
        "markers", "smoke: mark test as smoke test"
    )
    config.addinivalue_line(
        "markers", "regression: mark test as regression test"
    )
    config.addinivalue_line(
        "markers", "signup: mark test as signup flow test"
    )
    config.addinivalue_line(
        "markers", "login: mark test as login flow test"
    )
