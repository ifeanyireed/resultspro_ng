import re

with open('src/app/onboard/school/page.tsx', 'r') as f:
    content = f.read()

# 1. Add import
if "ResultsProRegistryForm" not in content:
    content = content.replace("import { motion, AnimatePresence } from 'framer-motion';", "import { motion, AnimatePresence } from 'framer-motion';\nimport { ResultsProRegistryForm } from '@/components/onboarding/ResultsProRegistryForm';")

# 2. Replace the JSX form block in Step 1 (BASICS)
jsx_pattern = r"                  <div className=\{cardStyle\}>\n                    <div className=\"space-y-8\">\n                      <div>\n                        <label className=\{labelStyle\}>Official School Name</label>[\s\S]*?</div>\n                      </div>\n                    </div>\n                  </div>\n\n                  <div className=\"flex justify-end mt-12\">"

jsx_replacement = """                  <div className="w-full">
                    <ResultsProRegistryForm 
                      data={{
                        name: formData.schoolName,
                        email: formData.email,
                        phone: formData.phone,
                      }}
                      onChange={(newData) => setFormData({ 
                        ...formData, 
                        schoolName: newData.name ?? formData.schoolName,
                        email: newData.email ?? formData.email,
                        phone: newData.phone ?? formData.phone,
                      })}
                      requireOtp={false}
                      requirePassword={false}
                      showName={false}
                      customTopElement={
                        <div className="space-y-6 mb-6">
                          <div>
                            <label className={labelStyle}>Official School Name</label>
                            <input
                              type="text"
                              placeholder="e.g. Royal Academy"
                              value={formData.schoolName}
                              onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                              className={inputStyle}
                            />
                          </div>
                          <div>
                            <label className={labelStyle}>School Motto</label>
                            <input
                              type="text"
                              placeholder="e.g. Excellence in Service"
                              value={formData.motto}
                              onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                              className={inputStyle}
                            />
                          </div>
                        </div>
                      }
                    />
                  </div>

                  <div className="flex justify-end mt-12">"""

# Replace only the step 1 block
content = re.sub(jsx_pattern, jsx_replacement, content, count=1)

with open('src/app/onboard/school/page.tsx', 'w') as f:
    f.write(content)

print("School Refactored")
