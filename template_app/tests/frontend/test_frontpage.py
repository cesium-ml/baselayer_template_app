def test_front_page(driver):
    driver.get("/")
    assert "localhost" in driver.current_url
    driver.wait_for_xpath("//div[contains(@title,'connected')]")
    button = driver.wait_for_xpath(
        "//button[contains(text(), 'Frontend-generated notification')]"
    )
    button.click()
    driver.wait_for_xpath("//div[contains(text(),'Hello from Baselayer')]")


def test_push_notification(driver):
    driver.get("/")
    assert "localhost" in driver.current_url
    driver.wait_for_xpath("//div[contains(@title,'connected')]")
    button = driver.wait_for_xpath(
        "//button[contains(text(), 'Backend-generated notification')]"
    )
    button.click()
    driver.wait_for_xpath(
        "//div[contains(text(),'Sample notification triggered by push_notification')]"
    )
