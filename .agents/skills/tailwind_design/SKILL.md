---
name: Tailwind JIT Styling Fixes
description: Guidelines on how to handle Tailwind JIT compiler issues where newly added classes are ignored during hot-reloads, and how to fix them using inline styles.
---

# Tailwind JIT Compiler Workaround

When adding brand new Tailwind utility classes (e.g., `pt-14`, `px-6`, `mt-8`) to an existing file that hasn't previously used them, the Next.js/Tailwind JIT (Just-In-Time) compiler may occasionally fail to compile these classes during a hot-reload or in the current dev server session. This results in the classes having zero effect, appearing as "no spacing at all" or "no visible padding."

## The Fix
Instead of trying to force Tailwind to compile the new classes or repeatedly asking the user for confirmation, bypass the Tailwind stylesheet entirely by using **hardcoded inline styles** for any layout properties (like padding, margin, width, and height) that fail to render.

### Example

**Problem:** 
Adding `mt-8` to a button doesn't work because `mt-8` wasn't compiled.
```tsx
<button className="flex items-center gap-3 mt-8">Confirm Link</button>
```

**Solution:**
Remove the failing Tailwind class and apply it directly using the React `style` prop.
```tsx
<button className="flex items-center gap-3" style={{ marginTop: '2rem' }}>Confirm Link</button>
```

## Guidelines
1. **Always Verify First**: If you add spacing, layout, or color classes and the user reports "no change" or "no spacing at all", immediately assume it is a Tailwind JIT compilation failure.
2. **Do Not Keep Failing Classes**: Remove the uncompiled Tailwind classes to avoid future confusion.
3. **Use Accurate Values**: Translate Tailwind spacing units accurately when writing the inline style. For example:
   - `mt-8` -> `marginTop: '2rem'`
   - `pt-14` -> `paddingTop: '3.5rem'`
   - `px-6` -> `paddingLeft: '1.5rem', paddingRight: '1.5rem'`
   - `h-[46px]` -> `height: '46px'`
4. **Preserve Existing Classes**: Do not replace Tailwind classes that *are* currently compiling properly. Only use the inline style workaround for the specific modifiers you are newly introducing.
