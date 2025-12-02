"""Test data for test cases."""

from tests.config import config


class TestData:
    """Test data class."""
    
    # User data
    DEFAULT_USER_NAME = config.DEFAULT_USER_NAME
    DEFAULT_PASSWORD = config.DEFAULT_PASSWORD
    
    # Test users
    VALID_USERS = [
        {
            "name": "TestUser1",
            "email_prefix": "testuser1",
        },
        {
            "name": "TestUser2",
            "email_prefix": "testuser2",
        },
    ]
    
    # Invalid data for negative testing
    INVALID_EMAILS = [
        "invalid.email",
        "@example.com",
        "test@",
        "test @example.com",
    ]
    
    INVALID_NAMES = [
        "",
        "123",
        "!@#$",
    ]

    # Wellness plan valid data
    VALID_WELLNESS_PLANS = [
        {
            "name": "Alice",
            "email": "alice@example.com",
            "age": 30,
            "goal": "Improve sleep"
        },
        {
            "name": "Bob",
            "email": "bob@example.com",
            "age": 45,
            "goal": "Reduce stress"
        }
    ]

    # Wellness plan invalid data for edge cases
    INVALID_AGES = [0, -1, 150]
    DUPLICATE_WELLNESS_PLAN = {
        "name": "Alice",
        "email": "alice@example.com",
        "age": 30,
        "goal": "Improve sleep"
    }
