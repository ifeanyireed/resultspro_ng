import re

with open('src/components/onboarding/ResultsProRegistryForm.tsx', 'r') as f:
    content = f.read()

# Add Eye and EyeOff to imports
import_pattern = r"import \{ Check, AlertCircle \} from 'lucide-react';"
import_replacement = "import { Check, AlertCircle, Eye, EyeOff } from 'lucide-react';"
content = re.sub(import_pattern, import_replacement, content)

# Add showPassword state
state_pattern = r"  const \[otpError, setOtpError\] = useState\(''\);"
state_replacement = "  const [otpError, setOtpError] = useState('');\n  const [showPassword, setShowPassword] = useState(false);"
content = re.sub(state_pattern, state_replacement, content)

# Update Password logic
pwd_pattern = r"  const getPasswordStrength = \(\) => \{\n    if \(!data\.password\) return \{ score: 0, text: 'No Password', color: 'bg-slate-200' \};\n    const len = data\.password\.length;\n    if \(len < 6\) return \{ score: 1, text: 'Weak', color: 'bg-rose-500' \};\n    if \(len < 10\) return \{ score: 2, text: 'Medium', color: 'bg-amber-500' \};\n    return \{ score: 3, text: 'Strong', color: 'bg-emerald-500' \};\n  \};\n  \n  const passwordStrength = getPasswordStrength\(\);"

pwd_replacement = """  const passLength = (data.password || '').length >= 8;
  const passHasUpper = /[A-Z]/.test(data.password || '');
  const passHasNumber = /[0-9]/.test(data.password || '');
  const passHasSpecial = /[^A-Za-z0-9]/.test(data.password || '');

  const getPasswordStrength = () => {
    if (!data.password) return { score: 0, text: 'No Password', color: 'bg-slate-200' };
    let score = 0;
    if (passLength) score++;
    if (passHasUpper) score++;
    if (passHasNumber) score++;
    if (passHasSpecial) score++;

    if (score <= 1) return { score: 1, text: 'Weak', color: 'bg-rose-500' };
    if (score === 2) return { score: 2, text: 'Medium', color: 'bg-amber-500' };
    return { score: 3, text: 'Strong', color: 'bg-emerald-500' };
  };
  
  const passwordStrength = getPasswordStrength();"""

content = re.sub(pwd_pattern, pwd_replacement, content)

# Update Password JSX block
pwd_jsx_pattern = r"        \{requirePassword && \(\n          <>\n            <input \n              type=\"password\" \n              placeholder=\"Password \(Min\. 6 characters\)\" \n              disabled=\{\(effectiveIsVerified && requireOtp\)\}\n              value=\{data\.password \|\| ''\}\n              onChange=\{\(e\) => onChange\(\{ password: e\.target\.value \}\)\}\n              className=\{inputClass\}\n              style=\{inputStyle\} \n            />\n\n            \{\/\* Password strength meter \*/\}\n            \{data\.password && \(\n              <div style=\{\{ marginTop: '-1rem', padding: '0 0\.5rem' \}\}>\n                <div style=\{\{ display: 'flex', justifyContent: 'space-between', fontSize: '0\.75rem', fontWeight: 'bold', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0\.25rem' \}\}>\n                  <span>Strength: \{passwordStrength\.text\}</span>\n                </div>\n                <div style=\{\{ height: '4px', width: '100\%', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' \}\}>\n                  <div \n                    style=\{\{ height: '100\%', transition: 'all 0\.5s', width: `\$\{\(passwordStrength\.score / 3\) \* 100\}\%`, background: passwordStrength\.score === 0 \? '#ef4444' : passwordStrength\.score === 1 \? '#f59e0b' : passwordStrength\.score === 2 \? '#3b82f6' : '#10b981' \}\} \n                  />\n                </div>\n              </div>\n            \)\}\n          </>\n        \)\}"

pwd_jsx_replacement = """        {requirePassword && (
          <>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Create a strong password" 
                disabled={effectiveIsVerified && requireOtp}
                value={data.password || ''}
                onChange={(e) => onChange({ password: e.target.value })}
                className={inputClass}
                style={{...inputStyle, paddingRight: '3rem'}} 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Password strength meter */}
            {data.password && (
              <div className="mt-2 p-4 bg-slate-50 border border-slate-200/50 rounded-2xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Password Strength:</span>
                  <span className={`text-[10px] font-extrabold uppercase tracking-widest ${passwordStrength.score === 1 ? 'text-rose-500' :
                      passwordStrength.score === 2 ? 'text-amber-500' : 'text-emerald-500'
                    }`}>{passwordStrength.text}</span>
                </div>
                <div className="h-1.5 rounded-full bg-slate-200/60 overflow-hidden mb-3">
                  <div
                    className={`h-full transition-all duration-500 ${passwordStrength.color}`}
                    style={{ width: `${(passwordStrength.score / 3) * 100}%` }}
                  />
                </div>

                {/* Rules grid */}
                <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-[8px] font-extrabold text-white ${passLength ? 'bg-emerald-500' : 'bg-slate-300'}`}>✓</span>
                    <span className={passLength ? 'text-slate-600' : 'text-slate-400'}>Min 8 characters</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-[8px] font-extrabold text-white ${passHasUpper ? 'bg-emerald-500' : 'bg-slate-300'}`}>✓</span>
                    <span className={passHasUpper ? 'text-slate-600' : 'text-slate-400'}>Uppercase letter</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-[8px] font-extrabold text-white ${passHasNumber ? 'bg-emerald-500' : 'bg-slate-300'}`}>✓</span>
                    <span className={passHasNumber ? 'text-slate-600' : 'text-slate-400'}>At least one number</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-semibold">
                    <span className={`w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-[8px] font-extrabold text-white ${passHasSpecial ? 'bg-emerald-500' : 'bg-slate-300'}`}>✓</span>
                    <span className={passHasSpecial ? 'text-slate-600' : 'text-slate-400'}>Special symbol</span>
                  </div>
                </div>
              </div>
            )}
          </>
        )}"""

content = re.sub(pwd_jsx_pattern, pwd_jsx_replacement, content)

with open('src/components/onboarding/ResultsProRegistryForm.tsx', 'w') as f:
    f.write(content)

print("Advanced Password Added")
