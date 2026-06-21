import re

with open('src/app/onboard/teacher/page.tsx', 'r') as f:
    content = f.read()

# 1. Add import
if "ResultsProRegistryForm" not in content:
    content = content.replace("import { useRouter } from 'next/navigation';", "import { useRouter } from 'next/navigation';\nimport { ResultsProRegistryForm } from '@/components/onboarding/ResultsProRegistryForm';")

# 2. Replace the JSX form block in Step 2 (INVITE)
# Look for `<div className="space-y-6">` under `{step === 2 && (` up to `</div>\n                </div>\n\n                {/* Bottom Navigation`

jsx_pattern = r"                  <div className=\"space-y-6\">[\s\S]*?</div>\n                </div>\n\n                \{\/\* Bottom Navigation"

jsx_replacement = """                  <ResultsProRegistryForm 
                    data={{
                      name: formData.name,
                      email: formData.email,
                      phone: formData.phone,
                      password: formData.password
                    }}
                    onChange={(newData) => {
                      if (newData.password !== undefined) {
                        setFormData({ ...formData, password: newData.password });
                      }
                    }}
                    requireOtp={false}
                    showName={false}
                    showPhone={false}
                    readOnlyFields={['email']}
                    customTopElement={
                      <div className="mb-6">
                        <label className={labelStyle}>Assigned School</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <School className="w-4 h-4 text-slate-400" />
                          </div>
                          <input
                            type="text"
                            value={formData.schoolName}
                            readOnly
                            className={`${inputStyle} pl-11 text-slate-400 select-all cursor-default bg-slate-100 border-slate-200`}
                          />
                        </div>
                      </div>
                    }
                  />
                </div>

                {/* Bottom Navigation"""

# Only replace the FIRST occurrence (which is Step 2's space-y-6)
content = re.sub(jsx_pattern, jsx_replacement, content, count=1)

with open('src/app/onboard/teacher/page.tsx', 'w') as f:
    f.write(content)

print("Teacher Refactored")
