export const errorHandler = (code) => {
  switch (code) {
    // Email Errors
    case "auth/user-disabled":
      return { type: "email", message: "This user was disabled" };
    case "auth/invalid-email":
      return { type: "email", message: "Invalid email" };
    case "auth/user-not-found":
      return { type: "email", message: "User not found" };
    case "auth/email-already-in-use":
      return { type: "email", message: "This email already has an account" };

    // Password Errors
    case "auth/operation-not-allowed":
      return {
        type: "password",
        message: "Operation not allowed. Contact support please.",
      };
    case "auth/wrong-password":
      return { type: "password", message: "Wrong password" };
    case "auth/weak-password":
      return { type: "password", message: "Weak password" };
    case "auth/too-many-requests":
      return {
        type: "password",
        message: "Operation blocked due to too many requests",
      };

    // Profile Image error
    case "storage/object-not-found":
      return { type: "profileImage", message: `File doesn't exist` };
    case "storage/unauthorized":
      return {
        type: "profileImage",
        message: `User doesn't have permission to access the object`,
      };
    case "storage/canceled":
      return { type: "profileImage", message: `User canceled the upload` };
    case "storage/unknown":
      return {
        type: "profileImage",
        message: `Unknown error occurred, inspect the server response`,
      };

    // Default Error
    default:
      return {
        type: "error",
        message: "An unexpected error occurred. Please contact support.",
      };
  }
};
