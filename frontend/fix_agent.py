import re

with open('src/app/onboard/agent/page.tsx', 'r') as f:
    content = f.read()

# Add import
if "ResultsProRegistryForm" not in content:
    content = content.replace("import { useRouter } from 'next/navigation';", "import { useRouter } from 'next/navigation';\nimport { ResultsProRegistryForm } from '@/components/onboarding/ResultsProRegistryForm';")

with open('src/app/onboard/agent/page.tsx', 'w') as f:
    f.write(content)

print("Agent Import Fixed")
