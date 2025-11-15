# Supabase Keys Security Explanation

## Safe to Expose (Client-Side) ✅

### `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Purpose**: Anonymous/public key for Supabase client-side operations
- **Security**: ✅ **SAFE** to expose in browser/client code
- **Why**: This key is designed to be public. Supabase uses Row Level Security (RLS) policies to protect your data
- **Usage**: Used in `src/lib/supabase.ts` for client-side database queries
- **Vercel Warning**: Vercel shows a warning because it contains "KEY" in the name, but this is a false positive - it's safe to expose

## Keep Secret (Server-Side Only) 🔒

### `SUPABASE_SERVICE_ROLE_KEY`
- **Purpose**: Service role key that bypasses RLS policies
- **Security**: 🔒 **MUST BE KEPT SECRET** - Never expose to client
- **Why**: This key has full database access and bypasses all security policies
- **Usage**: Only used in server-side code (API routes, server components)
- **Note**: This is NOT prefixed with `NEXT_PUBLIC_` so it won't be exposed to the browser

## How Supabase Security Works

1. **Anonymous Key (Public)**: 
   - Can only access data allowed by RLS policies
   - Safe to use in client-side code
   - Users can only see/modify data they're authorized for

2. **Service Role Key (Secret)**:
   - Bypasses all RLS policies
   - Full database access
   - Only used server-side for admin operations

## Vercel Import Instructions

When importing `NEXT_PUBLIC_SUPABASE_ANON_KEY` into Vercel:

1. Vercel will show a warning: "This key might expose sensitive information"
2. **Click "I understand, continue"** or similar option
3. This is safe because:
   - The anon key is designed to be public
   - Your data is protected by RLS policies
   - This is standard practice for Supabase applications

## Verification

To verify your setup is secure:

1. ✅ `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public, safe to expose
2. ✅ `SUPABASE_SERVICE_ROLE_KEY` - Secret, NOT prefixed with `NEXT_PUBLIC_`
3. ✅ RLS policies are enabled on your Supabase tables
4. ✅ Service role key is only used in server-side code

## References

- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase API Keys Documentation](https://supabase.com/docs/guides/api/api-keys)

