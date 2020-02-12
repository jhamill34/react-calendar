import { addParameters } from '@storybook/react'
import { setupPreview } from '@spedue/storybook-preset/dist/preview'
import { create } from '@storybook/theming'

const myTheme = create({
  base: 'light',

  colorPrimary: '#b12121',
  colorSecondary: '#b12121',

  // Typograph
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Toolbar default and active colors
  barTextColor: '#F0F2F5',
  barSelectedColor: '#F0F2F5',
  barBg: '#b12121',

  brandTitle: 'React Calendar',
  brandImage: 'https://placehold.it/350x150',
})

setupPreview(addParameters)

addParameters({
  options: {
    theme: myTheme,
  },
})
