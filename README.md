# Daisy Reed's Art Portfolio

A responsive portfolio website showcasing artwork across different categories.

## Adding Images

To add new artwork to the portfolio:

1. Place the image files in the appropriate category folder:
   - `images/gcse-artbook/` - For GCSE Art course work
   - `images/drawings/` - For drawings (pencil, charcoal, ink)
   - `images/oil-and-acrylic/` - For oil and acrylic paintings
   - `images/other/` - For other artwork types

2. Update the corresponding `list.json` file in each folder to include the image filenames:
   ```json
   {
       "images": [
           "artwork1.jpg",
           "artwork2.jpg"
       ]
   }
   ```

## Features

- Responsive design that works on all devices
- Image carousels for each category
- Touch-friendly navigation for mobile devices
- Automatic image rotation on the home page
- Support for both landscape and portrait images

## File Structure

```
├── images/
│   ├── gcse-artbook/
│   │   └── list.json
│   ├── drawings/
│   │   └── list.json
│   ├── oil-and-acrylic/
│   │   └── list.json
│   └── other/
│       └── list.json
├── scripts/
│   ├── carousel.js
│   └── gallery.js
├── styles/
│   └── main.css
├── index.html
├── gcse-artbook.html
├── drawings.html
├── oil-and-acrylic.html
└── other.html
```

## Hosting

The site is hosted on GitHub Pages and can be accessed at: https://paulreed999.github.io/Daisy-Reed-Portfolio/
