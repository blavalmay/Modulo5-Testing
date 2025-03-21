import { test, expect } from "@playwright/test";

test('should show submodule list when visiting /submodule-list url', async ({
  page,
}) => {
  // Arrange

  // Act
  await page.goto('#/login');
  await page.fill('input[name="user"]', 'admin');
  await page.fill('input[name="password"]', 'test');
  await page.getByRole('button', { name: /login/i }).click();

  await page.goto('#/submodule-list');

  // Assert
  await expect(page.getByRole('link').getByRole('heading', {level: 5})).toHaveCount(2);
});

test('should show sidebar menu with list items when clicking on menu icon', async ({
  page,
}) => {
  // Arrange

  // Act
  await page.goto('#/login');
  await page.fill('input[name="user"]', 'admin');
  await page.fill('input[name="password"]', 'test');
  await page.getByRole('button', { name: /login/i }).click();

  await page.goto('#/submodule-list');
  await page.getByRole('button', {name: /menu/i}).first().click();

  // Assert
  await expect(page.getByRole('list').getByRole('button')).toHaveCount(3);
});

test('should show profile menu with 2 list items when clicking on profile icon', async ({
  page,
}) => {
  // Arrange

  // Act
  await page.goto('#/login');
  await page.fill('input[name="user"]', 'admin');
  await page.fill('input[name="password"]', 'test');
  await page.getByRole('button', { name: /login/i }).click();

  await page.goto('#/submodule-list');
  await page.getByRole('button', {name: /menu/i}).nth(1).click();

  // Assert
  await expect(page.getByRole('menuitem')).toHaveCount(2);
});

test('should navigate to /projects when clicking on projects menu item', async ({
  page,
}) => {
  // Arrange

  // Act
  await page.goto('#/login');
  await page.fill('input[name="user"]', 'admin');
  await page.fill('input[name="password"]', 'test');
  await page.getByRole('button', { name: /login/i }).click();

  await page.goto('#/submodule-list');
  await page.getByRole('link').getByText('Proyectos').click();

  // Assert
  await expect(page).toHaveURL("http://localhost:5173/#/projects");;
});

test('should navigate to /employees when clicking on employees menu item', async ({
  page,
}) => {
  // Arrange

  // Act
  await page.goto('#/login');
  await page.fill('input[name="user"]', 'admin');
  await page.fill('input[name="password"]', 'test');
  await page.getByRole('button', { name: /login/i }).click();

  await page.goto('#/submodule-list');
  await page.getByRole('link').getByText('Empleados').click();

  // Assert
  await expect(page).toHaveURL("http://localhost:5173/#/employees");;
});
