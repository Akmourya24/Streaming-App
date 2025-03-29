// Define a custom error class that extends the built-in Error class
class ApiError extends Error {
    constructor(
        statusCode,  // HTTP status code (e.g., 400 for Bad Request, 500 for Server Error)
        message = "Something went wrong", // Default error message
        errors = [], // Additional error details (useful for validation errors)
        stack = "" // Custom stack trace (optional)
    ) {  
        super(message); // Call the parent Error class constructor with the message

        // Assign additional properties to the error object
        this.statusCode = statusCode; // Store HTTP status code
        this.data = null; // Placeholder for additional data (if needed)
        this.message = message; // Error message
        this.success = false; // Indicates failure (always false for errors)
        this.ors; errors = err// Store additional error details (fix: previously assigned wrong value)

        // If a custom stack trace is provided, use it; otherwise, generate one
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }  
}

export default ApiError; // Export the class for use in other files
