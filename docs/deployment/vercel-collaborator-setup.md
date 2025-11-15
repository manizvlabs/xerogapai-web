# Vercel Collaborator Setup Guide

## Adding GitHub User as Vercel Collaborator

To prevent Vercel build failures when commits are made by different GitHub users, you need to add the `manish-tf` GitHub user as a collaborator in Vercel.

## Step 1: Add Collaborator in Vercel Dashboard

### Method 1: Via Project Settings (Recommended)

1. **Go to Vercel Dashboard**
   - Navigate to [https://vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your project (VyaptIX website)

2. **Access Project Settings**
   - Click on **Settings** tab
   - Navigate to **Collaborators** section

3. **Add New Collaborator**
   - Click **"Add Collaborator"** or **"Invite Team Member"**
   - Enter the GitHub username: `manish-tf`
   - Select permission level:
     - **Developer** (recommended): Can deploy and manage deployments
     - **Viewer**: Read-only access
   - Click **"Send Invitation"**

4. **Accept Invitation**
   - The `manish-tf` user will receive an email invitation
   - They need to accept the invitation to gain access

### Method 2: Via Team Settings (If using Vercel Team)

1. **Go to Team Settings**
   - Navigate to [https://vercel.com/teams](https://vercel.com/teams)
   - Select your team/organization

2. **Add Team Member**
   - Go to **Members** section
   - Click **"Add Member"**
   - Enter GitHub username: `manish-tf`
   - Assign role: **Developer** or **Member**
   - Click **"Add"**

## Step 2: Verify GitHub Integration

### Check GitHub App Installation

1. **Go to Project Settings → Git**
   - Verify that the GitHub repository is connected
   - Repository should show: `manizvlabs/xerogapai-web`

2. **Check GitHub App Permissions**
   - Go to [GitHub Settings → Applications → Authorized OAuth Apps](https://github.com/settings/applications)
   - Find **Vercel** application
   - Ensure it has access to:
     - ✅ Repository access to `manizvlabs/xerogapai-web`
     - ✅ Read/write access to repository contents
     - ✅ Access to commit statuses

### Grant Repository Access to manish-tf

1. **GitHub Repository Settings**
   - Go to: `https://github.com/manizvlabs/xerogapai-web/settings/access`
   - Click **"Add people"** or **"Invite a collaborator"**
   - Enter GitHub username: `manish-tf`
   - Select permission level:
     - **Write** (recommended): Can push commits and create branches
     - **Read**: Read-only access
   - Click **"Add [username] to this repository"**

2. **Accept Repository Invitation**
   - The `manish-tf` user will receive a GitHub notification
   - They need to accept the repository invitation

## Step 3: Configure Vercel Build Settings

### Update Build Command Permissions

1. **Go to Project Settings → General**
   - Scroll to **Build & Development Settings**
   - Verify **Build Command**: `npm run build`
   - Verify **Output Directory**: `.next`

2. **Environment Variables**
   - Go to **Settings → Environment Variables**
   - Ensure all required variables are set for:
     - ✅ Production
     - ✅ Preview
     - ✅ Development

### Configure Git Integration

1. **Go to Project Settings → Git**
   - **Production Branch**: `main`
   - **Preview Branches**: `feature/*`, `develop`
   - **Auto Deploy**: Enabled
   - **Deploy Hooks**: Configure if needed

2. **Deployment Protection**
   - Go to **Settings → Git**
   - Under **Deployment Protection**, ensure:
     - ✅ "Deploy on push" is enabled
     - ✅ "Deploy on pull request" is enabled (optional)

## Step 4: Test Deployment

### Verify Both Users Can Deploy

1. **Test with manizvlabs user**
   - Make a commit as `manizvlabs` user
   - Push to `main` branch
   - Verify deployment succeeds in Vercel

2. **Test with manish-tf user**
   - Make a commit as `manish-tf` user
   - Push to `main` branch
   - Verify deployment succeeds in Vercel

### Check Deployment Logs

1. **View Deployment History**
   - Go to **Deployments** tab in Vercel
   - Check that deployments show correct commit author
   - Verify no authentication errors

2. **Check Build Logs**
   - Click on any deployment
   - Review build logs for errors
   - Ensure no permission-related failures

## Troubleshooting

### Issue: Build fails with "Permission denied" or "Authentication failed"

**Solution:**
1. Verify `manish-tf` is added as collaborator in Vercel
2. Verify `manish-tf` has repository access in GitHub
3. Check that GitHub App has correct permissions
4. Re-authenticate GitHub connection in Vercel if needed

### Issue: Commits by manish-tf don't trigger deployments

**Solution:**
1. Verify GitHub App installation includes `manish-tf` user
2. Check that `manish-tf` has write access to repository
3. Verify Vercel webhook is configured correctly
4. Check GitHub repository webhook settings

### Issue: "User not authorized" errors

**Solution:**
1. Ensure `manish-tf` accepted Vercel invitation
2. Ensure `manish-tf` accepted GitHub repository invitation
3. Verify user has correct permission level (Developer or higher)
4. Check team/organization membership if applicable

## Best Practices

1. ✅ **Use Team Accounts**: If working with multiple users, consider using Vercel Teams
2. ✅ **Role-Based Access**: Assign appropriate permission levels (Developer, Viewer)
3. ✅ **Monitor Deployments**: Regularly check deployment logs for any issues
4. ✅ **Document Access**: Keep track of who has access to what
5. ✅ **Regular Audits**: Periodically review collaborator access

## Quick Reference

### Required Access Levels

| User | GitHub Access | Vercel Access | Purpose |
|------|---------------|---------------|---------|
| `manizvlabs` | Owner/Admin | Owner/Admin | Primary account |
| `manish-tf` | Write | Developer | Secondary committer |

### Important URLs

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repository**: https://github.com/manizvlabs/xerogapai-web
- **Vercel Project Settings**: https://vercel.com/[team]/[project]/settings
- **GitHub Collaborators**: https://github.com/manizvlabs/xerogapai-web/settings/access

## Next Steps

After completing these steps:

1. ✅ Both users should be able to commit and deploy
2. ✅ Vercel builds should succeed regardless of commit author
3. ✅ All deployments should appear in Vercel dashboard
4. ✅ No authentication errors in build logs

If you encounter any issues, refer to the troubleshooting section above or contact Vercel support.

