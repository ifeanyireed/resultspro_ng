import re

with open('src/app/onboard/parent/page.tsx', 'r') as f:
    content = f.read()

# 1. Add import
if "ResultsProStudentVerificationForm" not in content:
    content = content.replace("import { ResultsProRegistryForm } from '@/components/onboarding/ResultsProRegistryForm';", "import { ResultsProRegistryForm } from '@/components/onboarding/ResultsProRegistryForm';\nimport { ResultsProStudentVerificationForm } from '@/components/onboarding/ResultsProStudentVerificationForm';")

# 2. Replace Step 3 card content
jsx_pattern = r"                <div className=\{cardStyle\}>\n                  <div className=\"grid grid-cols-1 md:grid-cols-2 gap-6 mb-6\">[\s\S]*?                  \{/\* Verification Reset or Skip \*/\}\n                  <div className=\"mt-8 flex justify-between items-center\">\n                    <button\n                      onClick=\{\(\) => \{\n                        setStudentVerified\(false\);\n                        setSearchError\(''\);\n                        setFormData\(\{ \.\.\.formData, admissionNumber: '', studentDob: '' \}\);\n                      \}\}\n                      className=\"text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider transition-colors\"\n                    >\n                      Start Over\n                    </button>\n                  </div>\n                </div>"

jsx_replacement = """                <ResultsProStudentVerificationForm 
                  admissionNumber={formData.admissionNumber}
                  studentDob={formData.studentDob}
                  onAdmissionNumberChange={(val) => setFormData({ ...formData, admissionNumber: val })}
                  onStudentDobChange={(val) => setFormData({ ...formData, studentDob: val })}
                  onVerify={handleStudentLookup}
                  isVerifying={isSearchingStudent}
                  isVerified={studentVerified}
                  error={searchError}
                  searchStage={searchStage}
                  verifiedStudentData={verifiedStudentData}
                />

                {studentVerified && (
                  <div className="flex justify-center mt-2">
                    <button
                      onClick={() => {
                        setStudentVerified(false);
                        setSearchError('');
                        setFormData({ ...formData, admissionNumber: '', studentDob: '' });
                      }}
                      className="text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider transition-colors"
                    >
                      Search Another Student
                    </button>
                  </div>
                )}"""

content = re.sub(jsx_pattern, jsx_replacement, content)

with open('src/app/onboard/parent/page.tsx', 'w') as f:
    f.write(content)

print("Parent Student Step Refactored")
