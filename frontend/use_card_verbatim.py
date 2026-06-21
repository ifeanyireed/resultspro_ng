import re

with open('src/app/onboard/parent/page.tsx', 'r') as f:
    content = f.read()

# Replace Step 3 form logic with ResultsProRegistryForm
jsx_pattern = r"                <div className=\{cardStyle\}>\n                  <div className=\"grid grid-cols-1 md:grid-cols-2 gap-6 mb-6\">[\s\S]*?                  \{/\* Verification Reset or Skip \*/\}\n                  <div className=\"mt-8 flex justify-between items-center\">\n                    <button\n                      onClick=\{\(\) => \{\n                        setStudentVerified\(false\);\n                        setSearchError\(''\);\n                        setFormData\(\{ \.\.\.formData, admissionNumber: '', studentDob: '' \}\);\n                      \}\}\n                      className=\"text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-wider transition-colors\"\n                    >\n                      Start Over\n                    </button>\n                  </div>\n                </div>"

jsx_replacement = """                <ResultsProRegistryForm
                  data={{ name: '', email: '', phone: '' }}
                  onChange={() => {}}
                  showName={false}
                  showEmail={false}
                  showPhone={false}
                  requirePassword={false}
                  requireOtp={false}
                  customTopElement={
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-[1rem]">
                        <div>
                          <label className={labelStyle}>Student Admission Number</label>
                          <input
                            type="text"
                            placeholder="e.g. GHS-2026-001"
                            value={formData.admissionNumber}
                            onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
                            className={inputStyle}
                            disabled={studentVerified}
                          />
                        </div>
                        <div>
                          <label className={labelStyle}>Date of Birth</label>
                          <input
                            type="date"
                            value={formData.studentDob}
                            onChange={(e) => setFormData({ ...formData, studentDob: e.target.value })}
                            className={inputStyle}
                            disabled={studentVerified}
                          />
                        </div>
                      </div>

                      {searchError && (
                        <div style={{ padding: '1rem', background: '#fff1f2', border: '1px solid #ffe4e6', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: 'bold', color: '#f43f5e', marginTop: '0.5rem' }}>
                          <AlertCircle size={16} />
                          <span>{searchError}</span>
                        </div>
                      )}

                      {!studentVerified && !isSearchingStudent && (
                        <button
                          type="button"
                          onClick={handleStudentLookup}
                          className="w-full h-[2.5rem] bg-[#146ef5] hover:bg-[#146ef5]/90 text-white font-bold rounded-full text-sm flex items-center justify-center transition-all hover:-translate-y-0.5 mt-2"
                        >
                          Look Up Student Records
                        </button>
                      )}

                      {isSearchingStudent && (
                        <div style={{ padding: '1.5rem', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: '4px', marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                          <div className="w-8 h-8 border-4 border-[#146ef5]/20 border-t-[#146ef5] rounded-full animate-spin mb-3" />
                          <h4 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#1e293b', marginBottom: '0.25rem', textShadow: 'none' }}>Database Queries In Progress</h4>
                          <p style={{ fontSize: '0.75rem', color: '#64748b', textShadow: 'none' }}>{searchStage}</p>
                        </div>
                      )}

                      {studentVerified && verifiedStudentData && (
                        <motion.div
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          style={{ padding: '1.5rem', border: '1px solid #a7f3d0', background: '#ecfdf5', borderRadius: '4px', marginTop: '1rem' }}
                        >
                          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div style={{ width: '3.5rem', height: '3.5rem', background: 'linear-gradient(to top right, #146ef5, #6366f1)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyCenter: 'center', color: 'white', fontWeight: '900', fontSize: '1.125rem' }}>
                                TG
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-0.5">
                                  <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e293b', textShadow: 'none' }}>{verifiedStudentData.name}</h4>
                                  <span style={{ fontSize: '0.65rem', fontWeight: 'bold', background: '#d1fae5', color: '#059669', padding: '0.1rem 0.5rem', borderRadius: '9999px', display: 'flex', alignItems: 'center', gap: '0.25rem', textShadow: 'none' }}>
                                    <Check className="w-3 h-3" /> Verified
                                  </span>
                                </div>
                                <p style={{ fontSize: '0.75rem', color: '#64748b', textShadow: 'none' }}>
                                  {verifiedStudentData.class} • Enrolled {verifiedStudentData.enrolledYear}
                                </p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-center mt-6">
                            <button
                              onClick={() => {
                                setStudentVerified(false);
                                setSearchError('');
                                setFormData({ ...formData, admissionNumber: '', studentDob: '' });
                              }}
                              className="text-[11px] font-extrabold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors"
                            >
                              Search Another Student
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </>
                  }
                />"""

content = re.sub(jsx_pattern, jsx_replacement, content)

with open('src/app/onboard/parent/page.tsx', 'w') as f:
    f.write(content)

print("Card Verbatim Updated")
