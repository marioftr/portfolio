#!/usr/bin/env python3
# -*- coding: utf-8 -*-

with open('src/data/content.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace teaser scroll-snap with 3-column grid
# This pattern should find the flex-based teaser container and replace with grid

# First, let's replace the opening container from flex scroll-snap to 3-column grid
old_pattern = 'display: flex; gap: 10px; overflow-x: auto; overflow-y: hidden; padding: 10px 0; scroll-snap-type: x mandatory; scroll-behavior: smooth; -webkit-overflow-scrolling: touch;'
new_pattern = 'display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin: 20px 0;'

content = content.replace(old_pattern, new_pattern)

# Now remove the scroll-snap specific styles from individual items
old_item = 'flex: 0 0 calc(100% - 20px); max-width: 600px; scroll-snap-align: start; scroll-snap-stop: always;'
new_item = ''

content = content.replace(old_item, new_item)

with open('src/data/content.js', 'w', encoding='utf-8') as f:
    f.write(content)

print('✅ Teaser layout updated to 3-column grid!')
