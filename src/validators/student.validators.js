import validator from "validator";

export const validateEmailPassword = (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: "Valid email is required" });
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!password || !passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters and include a letter, a number, and a special character",
      });
    }

    next(); 
  } catch (error) {
    console.error("Validation error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
