#!/bin/bash

# Test execution script for Zumlo Mobile App

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}Zumlo Mobile App Test Execution${NC}"
echo -e "${GREEN}========================================${NC}"

# Set environment variables
export ANDROID_HOME=/Users/ditsdev/Library/Android/sdk
export ANDROID_SDK_ROOT=$ANDROID_HOME

echo -e "\n${YELLOW}Environment Setup:${NC}"
echo "ANDROID_HOME: $ANDROID_HOME"
echo "ANDROID_SDK_ROOT: $ANDROID_SDK_ROOT"

# Check if Appium server is running
echo -e "\n${YELLOW}Checking Appium server...${NC}"
if ! curl -s http://127.0.0.1:4723/status > /dev/null; then
    echo -e "${RED}Error: Appium server is not running!${NC}"
    echo "Please start Appium server with: appium"
    exit 1
else
    echo -e "${GREEN}✓ Appium server is running${NC}"
fi

# Check if emulator is running
echo -e "\n${YELLOW}Checking Android emulator...${NC}"
if ! adb devices | grep -q "emulator-5554"; then
    echo -e "${RED}Warning: Emulator emulator-5554 not found${NC}"
    echo "Available devices:"
    adb devices
else
    echo -e "${GREEN}✓ Emulator is running${NC}"
fi

# Navigate to tests directory
cd "$(dirname "$0")/tests"

# Parse command line arguments
TEST_TYPE=${1:-all}

echo -e "\n${YELLOW}Running tests...${NC}"

case $TEST_TYPE in
    signup)
        echo "Running signup tests only"
        pytest test_signup.py -v -s --html=reports/signup_report.html
        ;;
    login)
        echo "Running login tests only"
        pytest test_login.py -v -s --html=reports/login_report.html
        ;;
    smoke)
        echo "Running smoke tests only"
        pytest -m smoke -v -s --html=reports/smoke_report.html
        ;;
    all)
        echo "Running all tests"
        pytest -v -s --html=reports/full_report.html
        ;;
    *)
        echo "Usage: $0 {signup|login|smoke|all}"
        exit 1
        ;;
esac

TEST_EXIT_CODE=$?

echo -e "\n${GREEN}========================================${NC}"
if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo -e "${GREEN}✓ Tests completed successfully!${NC}"
else
    echo -e "${RED}✗ Tests failed with exit code: $TEST_EXIT_CODE${NC}"
fi
echo -e "${GREEN}========================================${NC}"

exit $TEST_EXIT_CODE
