import re

with open('src/app/onboard/parent/page.tsx', 'r') as f:
    content = f.read()

# Replace inputStyle
input_pattern = r'  const inputStyle = "w-full p-4 bg-slate-50 border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-\[#146ef5\]/20 focus:border-\[#146ef5\] transition-all text-sm font-bold text-slate-800 placeholder:text-slate-400 placeholder:font-medium shadow-inner";'
input_replacement = '  const inputStyle = "w-full px-4 py-3 bg-white border border-[#e2e8f0] rounded focus:outline-none focus:border-[#146ef5] focus:ring-1 focus:ring-[#146ef5] transition-all text-[0.875rem] text-slate-800 placeholder:text-slate-400";'
content = re.sub(input_pattern, input_replacement, content)

# Replace cardStyle
card_pattern = r'  const cardStyle = "bg-white/90 backdrop-blur-2xl border border-slate-200/60 rounded-\[2\.5rem\] p-8 md:p-10 shadow-\[0_20px_50px_rgba\(20,110,245,0\.04\)\]";'
card_replacement = '  const cardStyle = "bg-[#ffffff] border border-[#e2e8f0] rounded p-10 max-w-[800px] mx-auto w-full";'
content = re.sub(card_pattern, card_replacement, content)

# Replace labelStyle
label_pattern = r'  const labelStyle = "block text-xs font-extrabold text-slate-500 uppercase tracking-widest mb-2\.5 ml-1";'
label_replacement = '  const labelStyle = "block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 pl-1";'
content = re.sub(label_pattern, label_replacement, content)

# Update buttons to not be massive round ones but look like step 2's flat buttons
# Look Up Student Records button
btn_pattern1 = r'className="w-full py-4 bg-slate-800 hover:bg-slate-900 text-white font-extrabold rounded-2xl text-xs uppercase tracking-widest transition-all shadow-md"'
btn_replacement1 = 'className="w-full h-[2.5rem] bg-[#146ef5] hover:bg-[#146ef5]/90 text-white font-bold rounded-full text-sm flex items-center justify-center transition-all hover:-translate-y-0.5"'
content = re.sub(btn_pattern1, btn_replacement1, content)

btn_pattern2 = r'className="w-full py-4 bg-\[#1fcb87\] hover:bg-\[#1fcb87\]/90 text-white font-extrabold rounded-2xl text-xs uppercase tracking-widest transition-all shadow-md mt-4 flex items-center justify-center gap-1\.5"'
btn_replacement2 = 'className="w-full h-[2.5rem] bg-[#1fcb87] hover:bg-[#1fcb87]/90 text-white font-bold rounded-full text-sm flex items-center justify-center transition-all hover:-translate-y-0.5 mt-4 gap-1.5"'
content = re.sub(btn_pattern2, btn_replacement2, content)

with open('src/app/onboard/parent/page.tsx', 'w') as f:
    f.write(content)

print("Styles Refactored")
