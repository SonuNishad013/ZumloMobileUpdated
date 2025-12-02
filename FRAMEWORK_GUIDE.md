# Zumlo Mobile App Test Automation Framework

## 📋 Overview

This is a comprehensive test automation framework for the Zumlo Mobile App, built using:
- **Appium** for mobile automation
- **Selenium** for web automation (email verification)
- **Pytest** for test execution and reporting
- **Page Object Model (POM)** for maintainability

## 🏗️ Framework Architecture

```
tests/
├── config/              # Configuration files
│   ├── config.py       # Central configuration
│   └── capabilities.py # Device capabilities
├── pages/              # Page Object Model
│   ├── base_page.py
│   ├── product_tour_page.py
│   ├── login_type_page.py
│   ├── seeker_name_page.py
│   ├── register_page.py
│   └── otp_page.py
├── utils/              # Utility modules
│   ├── driver_factory.py
│   ├── email_helper.py
│   ├── logger.py
│   └── helpers.py
├── data/               # Test data
│   └── test_data.py
├── reports/            # Test reports & screenshots
├── test_signup.py      # Signup test cases
├── test_login.py       # Login test cases
└── conftest.py         # Pytest fixtures
```

## 🚀 Quick Start

### Prerequisites

1. **Python 3.8+** installed
2. **Node.js** and **Appium** installed
3. **Android SDK** configured
4. **Chrome browser** installed
5. **Android emulator** or physical device

### Installation

```bash
# 1. Install Python dependencies
pip install -r tests/requirements.txt

# 2. Verify Appium installation
appium --version

# 3. Start Appium server
appium
```

### Running Tests

```bash
# Run all tests
./run_tests.sh all

# Run signup tests only
./run_tests.sh signup

# Run smoke tests only
./run_tests.sh smoke

# Run with pytest directly
cd tests
pytest test_signup.py -v -s
```

## 📝 Test Execution Options

### Using run_tests.sh

```bash
./run_tests.sh {signup|login|smoke|all}
```

### Using pytest directly

```bash
# Run all tests
pytest tests/ -v

# Run specific test file
pytest tests/test_signup.py -v

# Run tests with specific marker
pytest tests/ -m smoke -v

# Run with HTML report
pytest tests/ --html=tests/reports/report.html

# Run in parallel (requires pytest-xdist)
pytest tests/ -n 2
```

## 🎯 Key Features

### 1. **Page Object Model**
- Clean separation of test logic and page elements
- Reusable page components
- Easy maintenance

### 2. **Configuration Management**
- Centralized configuration in `config/config.py`
- Environment-specific settings
- Easy to modify for different environments

### 3. **Logging**
- Detailed logs for debugging
- Both file and console logging
- Automatic screenshot on failure

### 4. **Email Automation**
- YopMail integration for OTP verification
- Automatic email generation
- OTP extraction with regex

### 5. **Pytest Integration**
- Fixtures for setup/teardown
- Parametrized tests
- Custom markers (smoke, regression, etc.)
- HTML reporting

## 📊 Test Reports

Reports are generated in `tests/reports/` directory:
- **HTML Reports**: `report.html`
- **Screenshots**: `screenshots/`
- **Logs**: `test_execution.log`

## 🔧 Configuration

### Modify Device Settings

Edit `tests/config/config.py`:

```python
DEVICE_NAME = "emulator-5554"  # Change device name
APP_PATH = "path/to/your/app.apk"  # Update APK path
```

### Modify Wait Times

```python
DEFAULT_WAIT = 20  # Default wait time
SHORT_WAIT = 5     # Short wait time
LONG_WAIT = 30     # Long wait time
```

## 📖 Writing New Tests

### Example Test Case

```python
import pytest
from tests.pages.login_type_page import LoginTypePage
from tests.utils.logger import get_logger

logger = get_logger(__name__)

@pytest.mark.smoke
def test_example(mobile_driver):
    """Example test case."""
    logger.info("Starting test")
    
    # Initialize page object
    login_page = LoginTypePage(mobile_driver)
    
    # Perform actions
    login_page.click_new_user()
    
    # Add assertions
    assert True
    
    logger.info("Test completed")
```

### Adding New Page Objects

1. Create new file in `tests/pages/`
2. Extend `BasePage` class
3. Define locators and methods

```python
from tests.pages.base_page import BasePage
from appium.webdriver.common.appiumby import AppiumBy

class NewPage(BasePage):
    # Locators
    BUTTON = (AppiumBy.XPATH, '//android.widget.Button')
    
    def click_button(self):
        self.click(*self.BUTTON)
```

## 🐛 Debugging

### Enable Debug Logging

In `tests/config/config.py`:
```python
LOG_LEVEL = "DEBUG"
```

### View Logs

```bash
tail -f tests/reports/test_execution.log
```

### Screenshots

Screenshots are automatically taken on test failure in:
```
tests/reports/screenshots/
```

## 📚 Best Practices

1. **Use Page Objects**: Keep test logic separate from page elements
2. **Add Logging**: Log important steps for debugging
3. **Use Fixtures**: Leverage pytest fixtures for setup/teardown
4. **Parametrize Tests**: Use `@pytest.mark.parametrize` for data-driven tests
5. **Add Assertions**: Always verify expected outcomes
6. **Handle Waits**: Use explicit waits instead of sleep
7. **Take Screenshots**: Capture evidence on failures

## 🔍 Troubleshooting

### Appium Server Not Running
```bash
# Start Appium server
appium

# Or with specific port
appium -p 4723
```

### Emulator Not Found
```bash
# List available devices
adb devices

# Start emulator
emulator -avd <avd_name>
```

### Element Not Found
- Increase wait time in config
- Verify locator strategy
- Check app version compatibility

### Chrome Driver Issues
```bash
# Update Chrome driver
pip install --upgrade selenium
```

## 📞 Support

For issues or questions:
1. Check logs in `tests/reports/test_execution.log`
2. Review screenshots in `tests/reports/screenshots/`
3. Verify Appium server is running
4. Ensure emulator/device is connected

## 🎓 Additional Resources

- [Appium Documentation](http://appium.io/docs/en/about-appium/intro/)
- [Pytest Documentation](https://docs.pytest.org/)
- [Selenium Documentation](https://www.selenium.dev/documentation/)
- [Page Object Model](https://www.selenium.dev/documentation/test_practices/encouraged/page_object_models/)

---

**Framework Version**: 1.0.0  
**Last Updated**: 2025-11-28
