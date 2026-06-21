import re

with open('src/components/onboarding/ResultsProRegistryForm.tsx', 'r') as f:
    content = f.read()

# 1. Revert container shadow
container_pattern = r"      background: '#ffffff',\n      maxWidth: '800px',"
container_replacement = "      background: '#ffffff',\n      boxShadow: '0 30px 60px rgba(0,0,0,0.02)',\n      maxWidth: '800px',"
content = re.sub(container_pattern, container_replacement, content)

# 2. Revert Send OTP button shadow
btn1_pattern = r"                className=\{`absolute right-1\.5 top-1/2 -translate-y-1/2 h-\[2\.5rem\] rounded-full font-bold text-sm flex items-center justify-center transition-all \$\{\!\(otpSending \|\| \!data\.phone\) \? 'bg-\[#146ef5\] hover:bg-\[#146ef5\]/90 text-white hover:-translate-y-\[calc\(50\%\+2px\)\]' : 'bg-\[#708bf4\]/50 text-white/80 pointer-events-none'\}\`\}"
btn1_replacement = """                className={`absolute right-1.5 top-1/2 -translate-y-1/2 h-[2.5rem] rounded-full font-bold text-sm flex items-center justify-center transition-all ${!(otpSending || !data.phone) ? 'bg-[#146ef5] hover:bg-[#146ef5]/90 text-white shadow-md hover:-translate-y-[calc(50%+2px)]' : 'bg-[#708bf4]/50 text-white/80 pointer-events-none'}`}"""
content = re.sub(btn1_pattern, btn1_replacement, content)

# 3. Revert Verify button shadow
btn2_pattern = r"                className=\{`h-\[2\.5rem\] rounded-full font-bold text-sm flex items-center justify-center transition-all \$\{\!\(otpCode\.length < 4 \|\| otpVerifying\) \? 'bg-\[#146ef5\] hover:bg-\[#146ef5\]/90 text-white hover:-translate-y-0\.5' : 'bg-\[#708bf4\]/50 text-white/80 pointer-events-none'\}\`\}"
btn2_replacement = """                className={`h-[2.5rem] rounded-full font-bold text-sm flex items-center justify-center transition-all ${!(otpCode.length < 4 || otpVerifying) ? 'bg-[#146ef5] hover:bg-[#146ef5]/90 text-white shadow-md hover:-translate-y-0.5' : 'bg-[#708bf4]/50 text-white/80 pointer-events-none'}`}"""
content = re.sub(btn2_pattern, btn2_replacement, content)

# 4. Remove text shadow from OTP text
otp_text_pattern = r"            <p style=\{\{ fontSize: '0\.875rem', color: '#64748b', marginBottom: '1\.5rem' \}\}>\n              We sent a 4-digit code to <strong>\{data\.phone\}</strong>\. \(SIMULATOR: Type 4892\)\n            </p>"
otp_text_replacement = """            <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '1.5rem', textShadow: 'none' }}>
              We sent a 4-digit code to <strong style={{ textShadow: 'none' }}>{data.phone}</strong>. (SIMULATOR: Type 4892)
            </p>"""
content = re.sub(otp_text_pattern, otp_text_replacement, content)

# Also remove it from h4 just in case
h4_pattern = r"            <h4 style=\{\{ fontSize: '1rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '0\.5rem' \}\}>Verify Your Number</h4>"
h4_replacement = """            <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '0.5rem', textShadow: 'none' }}>Verify Your Number</h4>"""
content = re.sub(h4_pattern, h4_replacement, content)

with open('src/components/onboarding/ResultsProRegistryForm.tsx', 'w') as f:
    f.write(content)

print("Shadows Fixed")
