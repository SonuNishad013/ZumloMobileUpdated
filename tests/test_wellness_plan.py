import pytest
from tests.pages.wellness_plan_page import WellnessPlanPage
from tests.utils.logger import get_logger

logger = get_logger(__name__)

@pytest.mark.wellness
class TestWellnessPlan:
    """Test suite for the Wellness Plan feature."""

    def test_physical_health_selection(self, mobile_driver):
        """
        Test selecting items on Physical Health screen and proceeding.
        Note: This test assumes the app is navigated to the Physical Health screen.
        """
        wellness_page = WellnessPlanPage(mobile_driver)
        
        logger.info("Starting Physical Health selection test")
        
        # Select items (using indices corresponding to the list items)
        # In the app code, indices 2 and 5 are pre-selected. Clicking them should toggle.
        wellness_page.select_item(2)
        wellness_page.select_item(5)
        
        # Click Next
        wellness_page.click_next()
        
        logger.info("Physical Health selection completed")
