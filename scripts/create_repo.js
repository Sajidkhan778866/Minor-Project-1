const puppeteer = require('puppeteer-core');

(async () => {
  console.log("Starting browser...");
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    headless: false, // Show the browser to the user so they can intervene if 2FA is needed
    defaultViewport: null
  });

  try {
    const page = await browser.newPage();
    
    // 1. Go to login
    console.log("Navigating to GitHub login...");
    await page.goto('https://github.com/login');

    // 2. Fill credentials
    console.log("Filling credentials...");
    await page.waitForSelector('#login_field');
    await page.type('#login_field', 'sajid@parul.ac.in'); // Using their email
    await page.type('#password', 'Bushra0310');
    await page.click('[name="commit"]');

    // 3. Wait for login to complete (could be 2FA, wait for dashboard)
    console.log("Waiting for login to complete. (If 2FA is requested, please complete it in the browser window!)");
    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 60000 });

    // Check if we are on a 2FA page
    if (page.url().includes('two-factor') || page.url().includes('sessions/two-factor')) {
      console.log("2FA required! Please complete it in the visible browser window.");
      await page.waitForFunction("window.location.hostname === 'github.com' && window.location.pathname === '/'", { timeout: 120000 });
    }

    // 4. Go to create repo page
    console.log("Navigating to new repository page...");
    await page.goto('https://github.com/new');

    // 5. Fill repository name
    console.log("Filling repository details...");
    await page.waitForSelector('input[data-testid="repository-name-input"]'); // GitHub's new React UI uses testid
    await page.type('input[data-testid="repository-name-input"]', 'Minor-Project-1');

    // Wait for the availability check to pass
    await new Promise(r => setTimeout(r, 2000));

    // 6. Click Create
    console.log("Creating repository...");
    
    // GitHub's submit button can be tricky to select in the new UI.
    const createButtonSelectors = [
      'button[aria-label="Create repository"]',
      'button:has-text("Create repository")',
      'form button[type="submit"]'
    ];
    
    let clicked = false;
    for (const sel of createButtonSelectors) {
      try {
        const btn = await page.$(sel);
        if (btn) {
          await btn.click();
          clicked = true;
          break;
        }
      } catch (e) {}
    }
    
    if (!clicked) {
        // Fallback: evaluate and click
        await page.evaluate(() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const createBtn = btns.find(b => b.innerText.includes('Create repository'));
            if(createBtn) createBtn.click();
        });
    }

    console.log("Waiting for creation to finish...");
    await page.waitForNavigation({ waitUntil: 'networkidle0', timeout: 30000 });
    
    console.log("Repository created successfully at:", page.url());

  } catch (error) {
    console.error("An error occurred:", error);
  } finally {
    console.log("Closing browser in 5 seconds...");
    setTimeout(() => browser.close(), 5000);
  }
})();
