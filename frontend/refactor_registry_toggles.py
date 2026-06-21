import re

with open('src/components/onboarding/ResultsProRegistryForm.tsx', 'r') as f:
    content = f.read()

# 1. Update Props
props_pattern = r"  readOnlyFields\?: \('name'\|'email'\|'phone'\|'address'\|'zone'\)\[\];\n\}"
props_replacement = "  readOnlyFields?: ('name'|'email'|'phone'|'address'|'zone')[];\n  showName?: boolean;\n  showEmail?: boolean;\n  showPhone?: boolean;\n}"
content = re.sub(props_pattern, props_replacement, content)

# 2. Update function signature
sig_pattern = r"  readOnlyFields = \[\]\n\}: Props"
sig_replacement = "  readOnlyFields = [],\n  showName = true,\n  showEmail = true,\n  showPhone = true\n}: Props"
content = re.sub(sig_pattern, sig_replacement, content)

# 3. Wrap Name and Email in condition
# We just replace the grid containing name and email
grid_pattern = r"        <div style=\{\{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1\.5rem' \}\}>\n          <input \n            type=\"text\" \n            placeholder=\"Full Name\" \n            disabled=\{\(effectiveIsVerified && requireOtp\) \|\| readOnlyFields\.includes\('name'\)\}\n            value=\{data\.name\}\n            onChange=\{\(e\) => onChange\(\{ name: e\.target\.value \}\)\}\n            className=\{inputClass\}\n            style=\{inputStyle\} \n          />\n          <input \n            type=\"email\" \n            placeholder=\"Email Address\" \n            disabled=\{\(effectiveIsVerified && requireOtp\) \|\| readOnlyFields\.includes\('email'\)\}\n            value=\{data\.email\}\n            onChange=\{\(e\) => onChange\(\{ email: e\.target\.value \}\)\}\n            className=\{inputClass\}\n            style=\{inputStyle\} \n          />\n        </div>"

grid_replacement = """        {(showName || showEmail) && (
          <div style={{ display: 'grid', gridTemplateColumns: (showName && showEmail) ? '1fr 1fr' : '1fr', gap: '1.5rem' }}>
            {showName && (
              <input 
                type="text" 
                placeholder="Full Name" 
                disabled={(effectiveIsVerified && requireOtp) || readOnlyFields.includes('name')}
                value={data.name}
                onChange={(e) => onChange({ name: e.target.value })}
                className={inputClass}
                style={inputStyle} 
              />
            )}
            {showEmail && (
              <input 
                type="email" 
                placeholder="Email Address" 
                disabled={(effectiveIsVerified && requireOtp) || readOnlyFields.includes('email')}
                value={data.email}
                onChange={(e) => onChange({ email: e.target.value })}
                className={inputClass}
                style={inputStyle} 
              />
            )}
          </div>
        )}"""
content = re.sub(grid_pattern, grid_replacement, content)

# 4. Wrap Phone in condition
phone_pattern = r"        <div style=\{\{ position: 'relative' \}\}>\n          <input \n            type=\"tel\" \n            placeholder=\"Phone Number \(\+234\.\.\.\)\" \n            disabled=\{\(effectiveIsVerified && requireOtp\) \|\| readOnlyFields\.includes\('phone'\)\}\n            value=\{data\.phone\}\n            onChange=\{\(e\) => onChange\(\{ phone: e\.target\.value \}\)\}\n            className=\{inputClass\}\n            style=\{\{ \.\.\.inputStyle, paddingRight: requireOtp \? '8\.5rem' : '1rem' \}\} \n          />\n          \{requireOtp && !effectiveIsVerified && \(\n            <button\n              type=\"button\"\n              onClick=\{handleSendOtp\}\n              disabled=\{otpSending \|\| !data\.phone\}\n              className=\{`absolute right-1\.5 top-1/2 -translate-y-1/2 h-\[2\.85rem\] rounded-full font-bold text-sm flex items-center justify-center transition-all \$\{\!\(otpSending \|\| \!data\.phone\) \? 'bg-\[#146ef5\] hover:bg-\[#146ef5\]/90 text-white shadow-md hover:-translate-y-\[calc\(50\%\+2px\)\]' : 'bg-\[#708bf4\]/50 text-white/80 pointer-events-none'\}\`\}\n              style=\{\{ paddingLeft: '2rem', paddingRight: '2rem' \}\}\n            >\n              \{otpSending \? 'Sending\.\.\.' : otpSent \? 'Resend' : 'Send OTP'\}\n            </button>\n          \)\}\n          \{requireOtp && effectiveIsVerified && \(\n            <div style=\{\{ position: 'absolute', right: '1rem', top: '50\%', transform: 'translateY\(-50\%\)', color: '#10b981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' \}\}>\n              <Check size=\{16\} strokeWidth=\{3\} /> Verified\n            </div>\n          \)\}\n        </div>"

phone_replacement = """        {showPhone && (
          <div style={{ position: 'relative' }}>
            <input 
              type="tel" 
              placeholder="Phone Number (+234...)" 
              disabled={(effectiveIsVerified && requireOtp) || readOnlyFields.includes('phone')}
              value={data.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className={inputClass}
              style={{ ...inputStyle, paddingRight: requireOtp ? '8.5rem' : '1rem' }} 
            />
            {requireOtp && !effectiveIsVerified && (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={otpSending || !data.phone}
                className={`absolute right-1.5 top-1/2 -translate-y-1/2 h-[2.85rem] rounded-full font-bold text-sm flex items-center justify-center transition-all ${!(otpSending || !data.phone) ? 'bg-[#146ef5] hover:bg-[#146ef5]/90 text-white shadow-md hover:-translate-y-[calc(50%+2px)]' : 'bg-[#708bf4]/50 text-white/80 pointer-events-none'}`}
                style={{ paddingLeft: '2rem', paddingRight: '2rem' }}
              >
                {otpSending ? 'Sending...' : otpSent ? 'Resend' : 'Send OTP'}
              </button>
            )}
            {requireOtp && effectiveIsVerified && (
              <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#10b981', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Check size={16} strokeWidth={3} /> Verified
              </div>
            )}
          </div>
        )}"""
content = re.sub(phone_pattern, phone_replacement, content)

with open('src/components/onboarding/ResultsProRegistryForm.tsx', 'w') as f:
    f.write(content)

print("Toggles Added")
