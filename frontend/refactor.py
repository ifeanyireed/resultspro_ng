import re

with open('src/app/onboard/parent/page.tsx', 'r') as f:
    content = f.read()

# 1. Add import
content = content.replace("import { ResultsProBottomNav } from '@/components/onboarding/ResultsProBottomNav';", "import { ResultsProBottomNav } from '@/components/onboarding/ResultsProBottomNav';\nimport { ResultsProRegistryForm } from '@/components/onboarding/ResultsProRegistryForm';")

# 2. Remove OTP local state
otp_state_pattern = r"  // OTP Simulator States\n  const \[otpSent, setOtpSent\] = useState\(false\);\n  const \[otpCode, setOtpCode\] = useState\(''\);\n  const \[otpError, setOtpError\] = useState\(''\);\n  const \[otpVerified, setOtpVerified\] = useState\(false\);\n  const \[otpSending, setOtpSending\] = useState\(false\);\n  const \[otpVerifying, setOtpVerifying\] = useState\(false\);\n  const \[otpTimer, setOtpTimer\] = useState\(60\);"
replacement = "  // OTP Simulator States\n  const [otpVerified, setOtpVerified] = useState(false);"
content = re.sub(otp_state_pattern, replacement, content)

# 3. Remove useEffect
use_effect_pattern = r"  // OTP Timer countdown simulator\n  useEffect\(\(\) => \{\n    let interval: NodeJS\.Timeout;\n    if \(otpSent && otpTimer > 0 && !otpVerified\) \{\n      interval = setInterval\(\(\) => \{\n        setOtpTimer\(\(prev\) => prev - 1\);\n      \}, 1000\);\n    \}\n    return \(\) => clearInterval\(interval\);\n  \}, \[otpSent, otpTimer, otpVerified\]\);"
content = re.sub(use_effect_pattern, "", content)

# 4. Remove getPasswordStrength and OTP handlers
handlers_pattern = r"  // Password Strength Evaluator\n  const getPasswordStrength = \(\) => \{\n    if \(!formData\.parentPassword\) return \{ score: 0, text: 'No Password', color: 'bg-slate-200' \};\n    const len = formData\.parentPassword\.length;\n    if \(len < 6\) return \{ score: 1, text: 'Weak', color: 'bg-rose-500' \};\n    if \(len < 10\) return \{ score: 2, text: 'Medium', color: 'bg-amber-500' \};\n    return \{ score: 3, text: 'Strong', color: 'bg-emerald-500' \};\n  \};\n\n  const passwordStrength = getPasswordStrength\(\);\n\n  // OTP actions\n  const handleSendOtp = \(\) => \{\n    if \(!formData\.parentPhone \|\| !formData\.parentEmail\) \{\n      setOtpError\('Please fill out Email and Phone Number first\.'\);\n      return;\n    \}\n    setOtpSending\(true\);\n    setOtpError\(''\);\n    setTimeout\(\(\) => \{\n      setOtpSending\(false\);\n      setOtpSent\(true\);\n      setOtpTimer\(60\);\n    \}, 1200\);\n  \};\n\n  const handleVerifyOtp = \(\) => \{\n    setOtpVerifying\(true\);\n    setOtpError\(''\);\n    setTimeout\(\(\) => \{\n      setOtpVerifying\(false\);\n      if \(otpCode === '4892'\) \{\n        setOtpVerified\(true\);\n      \} else \{\n        setOtpError\('Invalid OTP code\. Use 4892 to simulate success\.'\);\n      \}\n    \}, 900\);\n  \};\n"
content = re.sub(handlers_pattern, "", content)

# 5. Replace JSX wrapper
# We'll use regex to match from `<div style={{ \n                  padding: '4rem',` down to `</div>\n                </div>` just before `{/* Spacer between form and bottom nav */}`
jsx_pattern = r"                <div style=\{\{ \n                  padding: '4rem',[\s\S]*?</div>\n                </div>"
jsx_replacement = """                <ResultsProRegistryForm 
                  data={{
                    name: formData.parentName,
                    email: formData.parentEmail,
                    phone: formData.parentPhone,
                    password: formData.parentPassword
                  }}
                  onChange={(newData) => setFormData({ 
                    ...formData, 
                    parentName: newData.name ?? formData.parentName,
                    parentEmail: newData.email ?? formData.parentEmail,
                    parentPhone: newData.phone ?? formData.parentPhone,
                    parentPassword: newData.password ?? formData.parentPassword
                  })}
                  isVerified={otpVerified}
                  onVerifiedChange={setOtpVerified}
                />"""
content = re.sub(jsx_pattern, jsx_replacement, content)

with open('src/app/onboard/parent/page.tsx', 'w') as f:
    f.write(content)

print("Done")
