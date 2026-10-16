# Visual regression test

The inventory page visual test adds an item to the cart, then compares a full-page screenshot with a saved Playwright baseline. It masks the changing cart badge with a bright color and applies `tests/visual-regression.css` during capture to suppress motion and the text caret, and recolor product cards for the screenshot. A separate scroll test moves the page once, checks that it moved, and compares a viewport screenshot from that position.

Create or intentionally update the baseline:

```sh
npm run test:visual:update
```

Review the generated images under `tests/visual-regression.test.ts-snapshots/` and commit them. Compare against them later with:

```sh
npm run test:visual
```

If the screenshot differs, inspect Playwright's expected, actual, and diff images in `test-results/` before updating the baseline. Generate and review baselines on the same operating system and browser version used in CI. The test uses the existing Sauce Demo authenticated-page fixture and needs network access and valid test credentials.
