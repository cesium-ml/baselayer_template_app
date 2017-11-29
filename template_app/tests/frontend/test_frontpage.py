import pytest
from selenium import webdriver


def test_front_page(driver):
    driver.get("/")
    assert 'localhost' in driver.current_url
    driver.wait_for_xpath("//div[contains(@title,'connected')]")
    button = driver.wait_for_xpath("//button[contains(text(), 'Click here')]")
    button.click()
    driver.wait_for_xpath("//div[contains(text(),'Hello from Baselayer')]")
