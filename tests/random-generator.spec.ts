import { test, expect } from '@playwright/test';

test.describe('Генератор случайных чисел', () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Успешная генерация числа в диапазоне', async ({ page }) => {
    const minVal = 10;
    const maxVal = 20;


    await page.getByTestId('input-min').fill(minVal.toString());
    await page.getByTestId('input-max').fill(maxVal.toString());


    await page.getByTestId('btn-generate').click();


    await expect(page.getByTestId('btn-generate')).toBeEnabled();


    const resultText = await page.getByTestId('result-display').textContent();
    const resultNumber = parseInt(resultText || '0', 10);


    expect(resultNumber).toBeGreaterThanOrEqual(minVal);
    expect(resultNumber).toBeLessThanOrEqual(maxVal);
    

    await expect(page.getByTestId('error-msg')).not.toBeVisible();
  });

  test('Ошибка при некорректном диапазоне (мин больше макс)', async ({ page }) => {

    await page.getByTestId('input-min').fill('50');
    await page.getByTestId('input-max').fill('10');

    await page.getByTestId('btn-generate').click();


    const errorBox = page.getByTestId('error-msg');
    await expect(errorBox).toBeVisible();
    await expect(errorBox).toContainText('Минимальное число должно быть меньше максимального');

    await expect(page.getByTestId('result-display')).not.toBeVisible();
  });

  test('Ошибка при пустых полях', async ({ page }) => {
    await page.getByTestId('input-min').fill('');
    await page.getByTestId('input-max').fill('');

    await page.getByTestId('btn-generate').click();

    await expect(page.getByTestId('error-msg')).toBeVisible();
    await expect(page.getByTestId('error-msg')).toContainText('корректные числа');
  });
});