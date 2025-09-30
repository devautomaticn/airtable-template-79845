
import { supabase } from "@/lib/supabase";

// This service handles authentication but never exposes credentials in client-side code
export const loginToAdminPortal = async (email: string, password: string) => {
  try {
    console.log('Attempting login with email:', email); // Added logging
    
    // Normalize email to lowercase for consistency
    const normalizedEmail = email.toLowerCase().trim();
    console.log('Normalized email:', normalizedEmail);
    
    // First check if it's the admin email before even attempting to login
    if (!isAdminEmail(normalizedEmail)) {
      console.log('Not an admin email, rejecting login attempt');
      return { 
        success: false, 
        message: "You do not have permission to access the admin portal." 
      };
    }
    
    // Proceed with login attempt
    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (error) {
      console.error('Supabase login error:', error); // More detailed error logging
      return { 
        success: false, 
        message: error.message || "Invalid credentials. Please try again." 
      };
    }
    
    console.log('Login successful, user data:', data.user?.email);
    
    // Double-check admin permission after successful login
    if (!data.user || !isAdminEmail(data.user.email)) {
      console.log('User logged in but not an admin, signing out');
      await supabase.auth.signOut(); // Sign out if not an admin
      return { 
        success: false, 
        message: "You do not have permission to access the admin portal." 
      };
    }
    
    return { success: true, user: data.user };
  } catch (error: any) {
    console.error("Login error:", error.message);
    return { 
      success: false, 
      message: error.message || "Failed to login. Please check your credentials." 
    };
  }
};

export const logoutFromAdminPortal = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error: any) {
    console.error("Logout error:", error.message);
    return { success: false, message: error.message };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data } = await supabase.auth.getSession();
    if (!data.session?.user) return null;
    
    // Only return the user if they're an admin
    if (isAdminEmail(data.session.user.email)) {
      return data.session.user;
    }
    return null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
};

export const isAdminEmail = (email: string | undefined) => {
  if (!email) {
    console.log('No email provided to isAdminEmail check');
    return false;
  }
  
  // Normalize the email before checking
  const normalizedEmail = email.toLowerCase().trim();
  
  // Add more logging for the admin check
  const isAdmin = normalizedEmail === 'dev@automaticnation.com';
  console.log(`Admin check for ${normalizedEmail}: ${isAdmin ? 'is admin' : 'not admin'}`);
  
  // Only allow the specific admin email
  // This check happens on the client side, but we also have RLS policies on the server
  return isAdmin;
};

// For development purposes, ensure the admin user can be easily authenticated
// This is automatically called when the app starts in development mode
if (import.meta.env.DEV) {
  (async () => {
    console.log('Checking for admin user in development...');
    const { data } = await supabase.auth.getSession();
    if (!data.session) {
      console.log('No active session. You may need to create the admin user in Supabase.');
      console.log('Use email: dev@automaticnation.com');
    } else if (isAdminEmail(data.session.user.email)) {
      console.log('Admin user is already logged in:', data.session.user.email);
    }
  })();
}
