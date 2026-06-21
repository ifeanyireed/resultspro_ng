import re

with open('src/app/onboard/agent/page.tsx', 'r') as f:
    content = f.read()

# 1. Add import
if "ResultsProRegistryForm" not in content:
    content = content.replace("import { ResultsProBottomNav } from '@/components/onboarding/ResultsProBottomNav';", "import { ResultsProBottomNav } from '@/components/onboarding/ResultsProBottomNav';\nimport { ResultsProRegistryForm } from '@/components/onboarding/ResultsProRegistryForm';")

# 2. Replace the JSX form block (from `<div className="space-y-6">` to just before bottom nav)
jsx_pattern = r"                  <div className=\"space-y-6\">[\s\S]*?</div>\n                </div>\n\n                \{\/\* Bottom Navigation"
jsx_replacement = """                  <ResultsProRegistryForm 
                    data={{
                      name: formData.fullName,
                      email: formData.email,
                      phone: formData.phone,
                      address: formData.address,
                      zone: formData.zone
                    }}
                    onChange={(newData) => setFormData({ 
                      ...formData, 
                      fullName: newData.name ?? formData.fullName,
                      email: newData.email ?? formData.email,
                      phone: newData.phone ?? formData.phone,
                      address: newData.address ?? formData.address,
                      zone: newData.zone ?? formData.zone
                    })}
                    requireOtp={false}
                    requirePassword={false}
                    showAddress={true}
                    showZone={true}
                    zoneOptions={nigerianZones}
                  />
                </div>

                {/* Bottom Navigation"""

content = re.sub(jsx_pattern, jsx_replacement, content)

with open('src/app/onboard/agent/page.tsx', 'w') as f:
    f.write(content)

print("Agent Refactored")
