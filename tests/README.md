# Test Automation Framework for Zumlo Mobile App

## Directory Structure
```
tests/
├── config/
│   ├── __init__.py
│   ├── config.py          # Configuration settings
│   └── capabilities.py    # Device capabilities
├── pages/
│   ├── __init__.py
│   ├── base_page.py       # Base page class
│   ├── product_tour_page.py
│   ├── login_type_page.py
│   ├── seeker_name_page.py
│   ├── register_page.py
│   └── otp_page.py
├── utils/
│   ├── __init__.py
│   ├── driver_factory.py  # Driver initialization
│   ├── email_helper.py    # YopMail automation
│   ├── logger.py          # Logging utility
│   └── helpers.py         # Common helper functions
├── data/
│   ├── __init__.py
│   └── test_data.py       # Test data
├── test_signup.py         # Signup test cases
├── test_login.py          # Login test cases
├── conftest.py            # Pytest fixtures
└── requirements.txt       # Dependencies
```

## Setup Instructions

1. Install dependencies:
   ```bash
   pip install -r tests/requirements.txt
   ```

2. Configure environment:
   - Update `tests/config/config.py` with your settings
   - Ensure Appium server is running on http://127.0.0.1:4723

3. Run tests:
   ```bash
   # Run all tests
   pytest tests/ -v

   # Run specific test
   pytest tests/test_signup.py -v

   # Run with HTML report
   pytest tests/ --html=tests/reports/report.html
   ```

## Features

- **Page Object Model (POM)**: Clean separation of test logic and page elements
- **Configuration Management**: Centralized config for easy maintenance
- **Logging**: Detailed logs for debugging
- **Email Automation**: YopMail integration for OTP verification
- **Reusable Components**: Base classes and utilities
- **Pytest Integration**: Fixtures, parametrization, and reporting
- **Cross-browser Support**: Easy to extend for different browsers/devices
