import re

with open(r'c:\Users\mario\Documents\git\portfolio\src\data\content.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find the project with id: 'colorin'
# We'll look for the object that has id: 'colorin'
# The projects array starts with 'export const projects = ['

project_match = re.search(r"id:\s*'colorin'.*?description:\s*\{(.*?)\},.*?longDescription:\s*\{(.*?)\},", content, re.DOTALL)

if project_match:
    desc_part = project_match.group(1)
    long_desc_part = project_match.group(2)
    
    # Extract es: '...' or es: `...`
    desc_es_match = re.search(r"es:\s*'(.*?)'", desc_part, re.DOTALL)
    if desc_es_match:
        print("project.description.es repr:")
        print(repr(desc_es_match.group(1)))
    
    long_desc_es_match = re.search(r"es:\s*`(.*?)`", long_desc_part, re.DOTALL)
    if long_desc_es_match:
        print("\nproject.longDescription.es repr:")
        print(repr(long_desc_es_match.group(1)))
else:
    print("Project 'colorin' not found or regex failed.")
