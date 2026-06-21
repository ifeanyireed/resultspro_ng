import re

with open('src/components/onboarding/ResultsProRegistryForm.tsx', 'r') as f:
    content = f.read()

# 1. Container padding
content = re.sub(r"padding: '4rem',", "padding: '2.5rem',", content)

# 2. Grid gaps
content = re.sub(r"gap: '1\.5rem'", "gap: '1rem'", content)

# 3. inputStyle
input_style_pattern = r"const inputStyle = \{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', fontSize: '1rem', width: '100%', background: 'white' \};"
input_style_replacement = "const inputStyle = { padding: '0.75rem 1rem', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', fontSize: '0.875rem', width: '100%', background: 'white' };"
content = re.sub(input_style_pattern, input_style_replacement, content)

# 4. Button heights h-[2.85rem] -> h-[2.5rem]
content = re.sub(r"h-\[2\.85rem\]", "h-[2.5rem]", content)

# 5. Verify Box padding
content = re.sub(r"padding: '2rem', background: '#f0f9ff'", "padding: '1.5rem', background: '#f0f9ff'", content)

with open('src/components/onboarding/ResultsProRegistryForm.tsx', 'w') as f:
    f.write(content)

print("Shrunk")
