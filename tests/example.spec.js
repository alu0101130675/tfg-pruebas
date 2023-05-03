// @ts-check
import { test, expect } from '@playwright/test'
test('has title', async ({ page }) => {
  await page.goto('https://women-info.netlify.app/')
  await expect(page).toHaveTitle(/Visualizador/)
})

test('get iniciativas link', async ({ page }) => {
  await page.goto('https://women-info.netlify.app/')
  await page.getByRole('link', { name: 'INICIATIVAS' }).click()
  await expect(page).toHaveURL(/.*InitiativeMap/)
})
test('get cuenta link', async ({ page }) => {
  await page.goto('https://women-info.netlify.app/')
  await page.getByRole('link', { name: 'CUENTA' }).click()
  await expect(page).toHaveURL(/.*login/)
})
test('get initiative form', async ({ page }) => {
  await page.goto('  https://women-info.netlify.app/InitiativeMap')
  await expect(page.getByText('Email')).toBeHidden()
  await page.getByRole('link', { name: 'Publica tu iniciativa' }).click()
  await expect(page.getByText('Email')).toBeVisible()
})
test('got to login if user has not log in yet', async ({ page }) => {
  await page.goto('  https://women-info.netlify.app/InitiativeMap')
  await page.getByRole('link', { name: 'Publica tu iniciativa' }).click()
  page.getByLabel('Email').fill('email@gmail.com')
  page.getByLabel('Nombre de la iniciativa').fill('Iniciativa de prueba')
  await page.getByRole('button', { name: 'Publicar iniciativa' }).click()
  await expect(page).toHaveURL(/.*login/)
})
