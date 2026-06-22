import sys

with open('frontend/src/app/onboard/school/page.tsx', 'r') as f:
    content = f.read()

# Locate STEP 4
step4_start = content.find('{/* STEP 4: CLASSES & SECTIONS */}')
if step4_start == -1:
    print("Could not find step 4")
    sys.exit(1)
step5_start = content.find('{/* STEP 5: SUBJECTS */}')
if step5_start == -1:
    print("Could not find step 5")
    sys.exit(1)

step4_block = content[step4_start:step5_start]

# We need to replace the grid block inside map
replacement = """                      <div key={cls.id} className="p-6 bg-slate-50 border border-slate-200 rounded-2xl relative">
                        <button onClick={() => setClassesList(classesList.filter((_, i) => i !== classIndex))} className="absolute top-4 right-4 text-slate-400 hover:text-rose-500 text-xs font-bold uppercase">Remove</button>
                        <h3 className="font-bold text-slate-900 tracking-wider border-b border-slate-200" style={{ fontSize: '14px', paddingBottom: '1rem', marginBottom: '1.25rem' }}>Class {classIndex + 1}</h3>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                          <div className="relative">
                            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 pl-1">Class Name <span className="text-rose-500">*</span></label>
                            <div className="relative">
                              <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input
                                type="text"
                                value={cls.name}
                                onChange={e => {
                                  const newClasses = [...classesList];
                                  newClasses[classIndex].name = e.target.value;
                                  setClassesList(newClasses);
                                }}
                                className="focus:border-[#146ef5] focus:ring-1 focus:ring-[#146ef5] transition-all text-slate-800 placeholder:text-slate-400"
                                style={{ padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', fontSize: '0.875rem', width: '100%', background: 'white' }}
                                placeholder="e.g. Grade 10"
                              />
                            </div>
                          </div>
                          <div className="relative">
                            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 pl-1">Level / Order</label>
                            <div className="relative">
                              <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <input
                                type="number"
                                value={cls.level}
                                onChange={e => {
                                  const newClasses = [...classesList];
                                  newClasses[classIndex].level = e.target.value;
                                  setClassesList(newClasses);
                                }}
                                className="focus:border-[#146ef5] focus:ring-1 focus:ring-[#146ef5] transition-all text-slate-800 placeholder:text-slate-400"
                                style={{ padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', fontSize: '0.875rem', width: '100%', background: 'white' }}
                                placeholder="e.g. 1"
                              />
                            </div>
                          </div>
                          <div className="md:col-span-2 relative">
                            <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 pl-1">Curriculum</label>
                            <div className="relative">
                              <BookOpen className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                              <select
                                value={cls.curriculum_id}
                                onChange={e => {
                                  const newClasses = [...classesList];
                                  newClasses[classIndex].curriculum_id = e.target.value;
                                  setClassesList(newClasses);
                                }}
                                className="focus:border-[#146ef5] focus:ring-1 focus:ring-[#146ef5] transition-all text-slate-800 placeholder:text-slate-400 appearance-none bg-white cursor-pointer"
                                style={{ padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', fontSize: '0.875rem', width: '100%' }}
                              >
                                <option value="">None</option>
                                <option value="national">National Curriculum</option>
                                <option value="cambridge">Cambridge</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="pl-4 border-l-2 border-blue-100">
                          <h4 className="font-bold text-slate-700 text-xs uppercase tracking-widest mb-4">Sections</h4>
                          {cls.sections.map((section, sectionIndex) => (
                            <div key={section.id} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem', alignItems: 'end' }}>
                              <div className="relative">
                                <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 pl-1">Section Name <span className="text-rose-500">*</span></label>
                                <div className="relative">
                                  <Layers className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                  <input
                                    type="text"
                                    value={section.name}
                                    onChange={e => {
                                      const newClasses = [...classesList];
                                      newClasses[classIndex].sections[sectionIndex].name = e.target.value;
                                      setClassesList(newClasses);
                                    }}
                                    className="focus:border-[#146ef5] focus:ring-1 focus:ring-[#146ef5] transition-all text-slate-800 placeholder:text-slate-400"
                                    style={{ padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', fontSize: '0.875rem', width: '100%', background: 'white' }}
                                    placeholder="e.g. A, Science"
                                  />
                                </div>
                              </div>
                              <div className="flex gap-2 items-center w-full">
                                <div className="flex-1 relative">
                                  <label className="block text-[11px] font-extrabold uppercase tracking-widest text-slate-400 mb-2 pl-1">Room Number</label>
                                  <div className="relative">
                                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                      type="text"
                                      value={section.room_number}
                                      onChange={e => {
                                        const newClasses = [...classesList];
                                        newClasses[classIndex].sections[sectionIndex].room_number = e.target.value;
                                        setClassesList(newClasses);
                                      }}
                                      className="focus:border-[#146ef5] focus:ring-1 focus:ring-[#146ef5] transition-all text-slate-800 placeholder:text-slate-400"
                                      style={{ padding: '0.75rem 1rem 0.75rem 2.5rem', border: '1px solid #e2e8f0', borderRadius: '4px', outline: 'none', fontSize: '0.875rem', width: '100%', background: 'white' }}
                                      placeholder="e.g. Room 204"
                                    />
                                  </div>
                                </div>
                                <button 
                                  onClick={() => {
                                    const newClasses = [...classesList];
                                    newClasses[classIndex].sections = newClasses[classIndex].sections.filter((_, i) => i !== sectionIndex);
                                    setClassesList(newClasses);
                                  }}
                                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          ))}
"""

# Find the start of the <div key={cls.id} className="p-6 ... "> loop inside step4_block
start_loop = step4_block.find('{classesList.map((cls, classIndex) => (')
if start_loop == -1:
    print("Could not find classesList map")
    sys.exit(1)
start_div = step4_block.find('<div key={cls.id}', start_loop)

# Find the end of the sections map block
end_sections = step4_block.find('))}
                          <button ', start_div)

if end_sections == -1:
    print("Could not find end of sections loop")
    sys.exit(1)

# we need to skip `))}` which is 3 characters
new_step4_block = step4_block[:start_div] + replacement.strip() + '\n' + step4_block[end_sections + 3:]

content = content[:step4_start] + new_step4_block + content[step5_start:]

with open('frontend/src/app/onboard/school/page.tsx', 'w') as f:
    f.write(content)

print("Classes block rewritten")
