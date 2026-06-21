import re

with open('src/components/onboarding/ResultsProRegistryForm.tsx', 'r') as f:
    content = f.read()

# Update Props
props_pattern = r"  showPhone\?: boolean;\n\}"
props_replacement = "  showPhone?: boolean;\n  namePlaceholder?: string;\n  nameLabel?: string;\n  customTopElement?: React.ReactNode;\n}"
content = re.sub(props_pattern, props_replacement, content)

# Update signature
sig_pattern = r"  showEmail = true,\n  showPhone = true\n\}: Props"
sig_replacement = "  showEmail = true,\n  showPhone = true,\n  namePlaceholder = 'Full Name',\n  nameLabel,\n  customTopElement\n}: Props"
content = re.sub(sig_pattern, sig_replacement, content)

# Add customTopElement and nameLabel
grid_pattern = r"        \{\(showName \|\| showEmail\) && \(\n          <div style=\{\{ display: 'grid', gridTemplateColumns: \(showName && showEmail\) \? '1fr 1fr' : '1fr', gap: '1\.5rem' \}\}\>\n            \{showName && \(\n              <input \n                type=\"text\" \n                placeholder=\"Full Name\""

grid_replacement = """        {customTopElement}
        
        {(showName || showEmail) && (
          <div style={{ display: 'grid', gridTemplateColumns: (showName && showEmail) ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
            {showName && (
              <div>
                {nameLabel && <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 pl-1">{nameLabel}</label>}
                <input 
                  type="text" 
                  placeholder={namePlaceholder}"""
content = re.sub(grid_pattern, grid_replacement, content)

# Make sure we close the div for showName
input_end_pattern = r"                style=\{inputStyle\} \n              />\n            \)\}"
input_end_replacement = """                style={inputStyle} 
                />
              </div>
            )}"""
content = re.sub(input_end_pattern, input_end_replacement, content)

# Wrap email in div for label matching (though we don't have emailLabel yet, just to keep grid aligned if nameLabel exists)
email_start_pattern = r"            \{showEmail && \(\n              <input \n                type=\"email\""
email_start_replacement = """            {showEmail && (
              <div>
                {nameLabel && <div className="block text-[11px] mb-2">&nbsp;</div>}
                <input 
                  type="email\""""
content = re.sub(email_start_pattern, email_start_replacement, content)

email_end_pattern = r"                className=\{inputClass\}\n                style=\{inputStyle\} \n              />\n            \)\}"
email_end_replacement = """                className={inputClass}
                  style={inputStyle} 
                />
              </div>
            )}"""
content = re.sub(email_end_pattern, email_end_replacement, content)


with open('src/components/onboarding/ResultsProRegistryForm.tsx', 'w') as f:
    f.write(content)

print("Props Added")
