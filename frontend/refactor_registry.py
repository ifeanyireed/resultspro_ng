import re

with open('src/components/onboarding/ResultsProRegistryForm.tsx', 'r') as f:
    content = f.read()

# 1. Update Props
props_pattern = r"  showZone\?: boolean;\n  zoneOptions\?: string\[\];\n\}"
props_replacement = "  showZone?: boolean;\n  zoneOptions?: string[];\n  readOnlyFields?: ('name'|'email'|'phone'|'address'|'zone')[];\n}"
content = re.sub(props_pattern, props_replacement, content)

# 2. Update function signature
sig_pattern = r"  showZone = false,\n  zoneOptions = \[\]\n\}: Props"
sig_replacement = "  showZone = false,\n  zoneOptions = [],\n  readOnlyFields = []\n}: Props"
content = re.sub(sig_pattern, sig_replacement, content)

# 3. Update Name input
name_pattern = r"disabled=\{effectiveIsVerified && requireOtp\}(\s+)value=\{data\.name\}"
name_replacement = r"disabled={(effectiveIsVerified && requireOtp) || readOnlyFields.includes('name')}\1value={data.name}"
content = re.sub(name_pattern, name_replacement, content)

# 4. Update Email input
email_pattern = r"disabled=\{effectiveIsVerified && requireOtp\}(\s+)value=\{data\.email\}"
email_replacement = r"disabled={(effectiveIsVerified && requireOtp) || readOnlyFields.includes('email')}\1value={data.email}"
content = re.sub(email_pattern, name_replacement, content) # oops name_replacement uses data.name! We need email_replacement

# Let's just do it cleanly by replacing the whole form section
