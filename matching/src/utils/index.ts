export const handleDatabaseError = (error: any) => {
    console.error("Database error:", error);
    throw new Error("Internal server error");
};
